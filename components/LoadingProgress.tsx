'use client';

import { useState, useEffect } from 'react';

interface LoadingProgressProps {
  onLoadingComplete?: () => void;
  minimumDisplayTime?: number;
}

/**
 * LoadingProgress: Global loading progress indicator for better perceived performance.
 * 
 * Features:
 * - Smooth progress animation
 * - Minimum display time to prevent flashing
 * - Configurable completion callback
 * - GPU-accelerated animations
 * 
 * Usage: Wrap around critical components like HeroSection
 */
export function LoadingProgress({ 
  onLoadingComplete, 
  minimumDisplayTime = 1000 
}: LoadingProgressProps) {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const startTime = useState(Date.now())[0];

  useEffect(() => {
    // Simulate loading progress
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 90) {
          clearInterval(progressInterval);
          return 90;
        }
        return prev + Math.random() * 15;
      });
    }, 100);

    // Complete loading after minimum time
    const completeTimeout = setTimeout(() => {
      setProgress(100);
      
      // Hide progress bar after animation
      setTimeout(() => {
        setIsVisible(false);
        onLoadingComplete?.();
      }, 300);
    }, minimumDisplayTime);

    return () => {
      clearInterval(progressInterval);
      clearTimeout(completeTimeout);
    };
  }, [minimumDisplayTime, onLoadingComplete]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-dark-950 to-dark-900">
      <div className="text-center space-y-8">
        {/* Loading Text */}
        <div className="space-y-4">
          <h1 className="text-2xl sm:text-3xl font-bold text-white animate-pulse">
            Premium Experience
          </h1>
          <p className="text-dark-300 text-sm sm:text-base max-w-md mx-auto">
            Optimizing your 3D experience for maximum performance
          </p>
        </div>

        {/* Progress Bar */}
        <div className="w-64 sm:w-80 mx-auto">
          <div className="relative h-1 bg-dark-800 rounded-full overflow-hidden">
            <div 
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-neon-purple to-neon-lime rounded-full transition-all duration-300 ease-out"
              style={{ 
                width: `${progress}%`,
                boxShadow: '0 0 20px rgba(233, 30, 140, 0.5)'
              }}
            />
          </div>
          <div className="mt-3 text-center">
            <span className="text-xs text-dark-400 font-mono">
              {Math.round(progress)}%
            </span>
          </div>
        </div>

        {/* Loading Animation */}
        <div className="flex justify-center space-x-2">
          <div className="w-2 h-2 bg-neon-purple rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
          <div className="w-2 h-2 bg-neon-lime rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
          <div className="w-2 h-2 bg-neon-cyan rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
        </div>

        {/* Performance Tips */}
        <div className="text-xs text-dark-500 max-w-sm mx-auto space-y-1">
          <p>⚡ Optimizing 3D assets</p>
          <p>🎯 Preloading critical resources</p>
          <p>📱 Calibrating for your device</p>
        </div>
      </div>

      {/* Gradient Overlay for depth */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          background: 'radial-gradient(circle at center, transparent 30%, rgba(233, 30, 140, 0.1) 100%)',
        }}
      />
    </div>
  );
}