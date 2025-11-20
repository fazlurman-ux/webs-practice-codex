'use client';

import { useEffect, useRef } from 'react';

interface PerformanceMetrics {
  lcp: number;
  cls: number;
  fid: number;
  ttfb: number;
}

/**
 * PerformanceMonitor: Tracks Core Web Vitals and performance metrics.
 * 
 * Features:
 * - Largest Contentful Paint (LCP)
 * - Cumulative Layout Shift (CLS)
 * - First Input Delay (FID)
 * - Time to First Byte (TTFB)
 * - Frame rate monitoring
 * 
 * Usage: Add to root layout to monitor performance in development
 */
export function PerformanceMonitor() {
  const metricsRef = useRef<Partial<PerformanceMetrics>>({});
  const frameCountRef = useRef(0);
  const lastTimeRef = useRef(performance.now());

  useEffect(() => {
    // Only run in development
    if (process.env.NODE_ENV !== 'development') return;

    // Track Core Web Vitals
    const trackWebVitals = () => {
      // LCP - Largest Contentful Paint
      new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        const lastEntry = entries[entries.length - 1];
        metricsRef.current.lcp = lastEntry.startTime;
        
        console.log(`🎯 LCP: ${lastEntry.startTime.toFixed(2)}ms`);
        
        // Check if LCP is under 2.5s target
        if (lastEntry.startTime > 2500) {
          console.warn(`⚠️ LCP above target (2500ms): ${lastEntry.startTime.toFixed(2)}ms`);
        }
      }).observe({ entryTypes: ['largest-contentful-paint'] });

      // CLS - Cumulative Layout Shift
      let clsValue = 0;
      new PerformanceObserver((entryList) => {
        for (const entry of entryList.getEntries()) {
          const layoutShiftEntry = entry as any;
          if (!layoutShiftEntry.hadRecentInput) {
            clsValue += layoutShiftEntry.value;
          }
        }
        metricsRef.current.cls = clsValue;
        
        console.log(`📐 CLS: ${clsValue.toFixed(4)}`);
        
        // Check if CLS is under 0.1 target
        if (clsValue > 0.1) {
          console.warn(`⚠️ CLS above target (0.1): ${clsValue.toFixed(4)}`);
        }
      }).observe({ entryTypes: ['layout-shift'] });

      // FID - First Input Delay
      new PerformanceObserver((entryList) => {
        for (const entry of entryList.getEntries()) {
          const performanceEntry = entry as any;
          metricsRef.current.fid = performanceEntry.processingStart - performanceEntry.startTime;
          
          console.log(`⚡ FID: ${metricsRef.current.fid?.toFixed(2)}ms`);
          
          // Check if FID is under 100ms target
          if (metricsRef.current.fid && metricsRef.current.fid > 100) {
            console.warn(`⚠️ FID above target (100ms): ${metricsRef.current.fid.toFixed(2)}ms`);
          }
        }
      }).observe({ entryTypes: ['first-input'] });

      // TTFB - Time to First Byte
      const navigationEntry = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      if (navigationEntry) {
        metricsRef.current.ttfb = navigationEntry.responseStart - navigationEntry.requestStart;
        
        console.log(`🌐 TTFB: ${metricsRef.current.ttfb?.toFixed(2)}ms`);
        
        // Check if TTFB is under 800ms target
        if (metricsRef.current.ttfb && metricsRef.current.ttfb > 800) {
          console.warn(`⚠️ TTFB above target (800ms): ${metricsRef.current.ttfb.toFixed(2)}ms`);
        }
      }
    };

    // Track frame rate
    const trackFrameRate = () => {
      let lastFrameTime = performance.now();
      
      const measureFPS = (currentTime: number) => {
        frameCountRef.current++;
        
        // Log FPS every second
        if (currentTime >= lastFrameTime + 1000) {
          const fps = Math.round((frameCountRef.current * 1000) / (currentTime - lastFrameTime));
          console.log(`🎮 FPS: ${fps}`);
          
          // Check if FPS is above 30 target
          if (fps < 30) {
            console.warn(`⚠️ FPS below target (30): ${fps}`);
          }
          
          frameCountRef.current = 0;
          lastFrameTime = currentTime;
        }
        
        requestAnimationFrame(measureFPS);
      };
      
      requestAnimationFrame(measureFPS);
    };

    // Track memory usage (if available)
    const trackMemory = () => {
      if ('memory' in performance) {
        const memory = (performance as any).memory;
        const usedMB = (memory.usedJSHeapSize / 1048576).toFixed(2);
        const totalMB = (memory.totalJSHeapSize / 1048576).toFixed(2);
        
        console.log(`💾 Memory: ${usedMB}MB / ${totalMB}MB`);
        
        // Check if memory usage is high
        const usagePercent = (memory.usedJSHeapSize / memory.totalJSHeapSize) * 100;
        if (usagePercent > 80) {
          console.warn(`⚠️ High memory usage: ${usagePercent.toFixed(1)}%`);
        }
      }
    };

    // Start monitoring
    trackWebVitals();
    trackFrameRate();
    
    // Track memory every 5 seconds
    const memoryInterval = setInterval(trackMemory, 5000);

    // Log summary after page load
    window.addEventListener('load', () => {
      setTimeout(() => {
        console.log('📊 Performance Summary:');
        console.table(metricsRef.current);
      }, 3000);
    });

    return () => {
      clearInterval(memoryInterval);
    };
  }, []);

  // Component doesn't render anything
  return null;
}