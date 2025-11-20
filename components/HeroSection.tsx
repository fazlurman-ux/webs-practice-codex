'use client';

import { useState, useEffect, useRef, Suspense } from 'react';
import dynamic from 'next/dynamic';
import { motion, useScroll, useTransform, useMotionValue, type Variants } from 'framer-motion';
import { Button } from './Button';
import { useIsMobile } from '@/hooks';

// Dynamic import for 3D components (SSR-safe)
const CanvasContainer = dynamic(
  () => import('@/components/three').then(m => m.CanvasContainer),
  { ssr: false }
);
const NeonLightingRig = dynamic(
  () => import('@/components/three').then(m => m.NeonLightingRig),
  { ssr: false }
);
const Hero3DModel = dynamic(
  () => import('@/components/three').then(m => m.Hero3DModel),
  { ssr: false }
);
const HeroBackground = dynamic(
  () => import('@/components/three').then(m => m.HeroBackground),
  { ssr: false }
);
const Loader = dynamic(
  () => import('@/components/three').then(m => m.Loader),
  { ssr: false }
);

/**
 * HeroSection: Full-screen hero with 3D product showcase.
 * 
 * Features:
 * ---------
 * 1. 3D Canvas with primary product model (placeholder)
 * 2. Mouse/touch-driven rotation with smooth interpolation
 * 3. Scroll-driven camera dolly using Framer Motion scroll hooks
 * 4. Animated gradient background with GPU-efficient particles
 * 5. Staggered text entrance animations
 * 6. Floating scroll cue with bounce animation
 * 7. Responsive: simplified controls on mobile, reduced effects on low-power
 * 
 * Interaction Logic:
 * -----------------
 * - Mouse Move: Tracks normalized position [-1, 1], drives model rotation
 * - Touch: Same logic as mouse for consistent mobile UX
 * - Scroll: useScroll hook provides progress [0, 1], drives camera Z position
 * - Performance: Auto-detects mobile, reduces particle count and effects
 * 
 * Accessibility:
 * -------------
 * - CTA buttons have full keyboard navigation
 * - Focus states with neon ring
 * - Semantic HTML structure
 * - ARIA labels for scroll cue
 */
export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  
  // Mouse position tracking for 3D model rotation
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Scroll tracking for camera dolly effect
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  // Transform scroll progress to 0-1 range for 3D scene
  const scrollProgress = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const [scroll3D, setScroll3D] = useState(0);

  // Update 3D scene when scroll changes
  useEffect(() => {
    const unsubscribe = scrollProgress.on('change', (latest) => {
      setScroll3D(latest);
    });
    return () => unsubscribe();
  }, [scrollProgress]);

  // Mouse move handler for model rotation
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      
      // Normalize mouse position to [-1, 1] range
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = ((e.clientY - rect.top) / rect.height) * 2 - 1;

      mouseX.set(x);
      mouseY.set(y);
      setMousePos({ x, y });
    };

    // Touch handler for mobile rotation
    const handleTouchMove = (e: TouchEvent) => {
      if (!containerRef.current || e.touches.length === 0) return;

      const rect = containerRef.current.getBoundingClientRect();
      const touch = e.touches[0];
      
      const x = ((touch.clientX - rect.left) / rect.width) * 2 - 1;
      const y = ((touch.clientY - rect.top) / rect.height) * 2 - 1;

      mouseX.set(x);
      mouseY.set(y);
      setMousePos({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, [mouseX, mouseY]);

  // Animation variants for staggered text entrance
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94] as const,
      },
    },
  };

  const buttonVariants: Variants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: 'backOut',
      },
    },
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.2,
        ease: 'easeOut',
      },
    },
    tap: {
      scale: 0.95,
    },
  };

  return (
    <section
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 50%, #0f0f0f 100%)',
      }}
    >
      {/* 3D Canvas Background */}
      <div className="absolute inset-0 z-0">
        <CanvasContainer
          enableControls={false}
          cameraPosition={[0, 0, 8]}
          autoAdjustPerformance={true}
        >
          <Suspense fallback={<Loader />}>
            {/* Neon lighting for dramatic effect */}
            <NeonLightingRig />
            
            {/* Animated particle background */}
            <HeroBackground
              particleCount={isMobile ? 50 : 100}
              reduced={isMobile}
            />
            
            {/* Hero product model with mouse/scroll controls */}
            <Hero3DModel
              mousePosition={mousePos}
              scrollProgress={scroll3D}
              enableTouch={true}
            />
          </Suspense>
        </CanvasContainer>
      </div>

      {/* Gradient overlay for better text readability */}
      <div 
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at center, transparent 20%, rgba(0,0,0,0.6) 80%)',
        }}
      />

      {/* Content Overlay */}
      <motion.div
        className="relative z-20 h-full flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="max-w-5xl mx-auto text-center space-y-8">
          {/* Premium Typography */}
          <motion.h1
            variants={itemVariants}
            className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight"
          >
            <span className="block neon-text-purple animate-pulse-neon">
              Premium
            </span>
            <span className="block mt-2 bg-gradient-to-r from-white via-dark-100 to-white bg-clip-text text-transparent">
              3D Experience
            </span>
          </motion.h1>

          {/* Subcopy */}
          <motion.p
            variants={itemVariants}
            className="text-lg sm:text-xl lg:text-2xl text-dark-200 max-w-3xl mx-auto leading-relaxed"
          >
            Immersive product showcase with interactive 3D graphics, 
            smooth animations, and cutting-edge design.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4"
          >
            <motion.div
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              <Button
                variant="neon"
                size="lg"
                className="min-w-[200px]"
                aria-label="Explore the product"
              >
                Explore Now
              </Button>
            </motion.div>
            
            <motion.div
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              <Button
                variant="secondary"
                size="lg"
                className="min-w-[200px]"
                aria-label="Watch demo video"
              >
                Watch Demo
              </Button>
            </motion.div>
          </motion.div>

          {/* Feature Highlights */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-12 max-w-3xl mx-auto"
          >
            {[
              { icon: '⚡', text: '60fps Performance' },
              { icon: '🎯', text: 'Interactive 3D' },
              { icon: '📱', text: 'Mobile Optimized' },
            ].map((feature, idx) => (
              <div
                key={idx}
                className="glass rounded-lg p-4 backdrop-blur-md"
              >
                <span className="text-3xl mb-2 block">{feature.icon}</span>
                <span className="text-sm text-dark-200 font-medium">
                  {feature.text}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Floating Scroll Cue */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 1 }}
        aria-label="Scroll down for more content"
        role="button"
        tabIndex={0}
      >
        <span className="text-xs text-dark-400 uppercase tracking-wider font-medium">
          Scroll
        </span>
        <motion.div
          className="w-6 h-10 rounded-full border-2 border-dark-500 flex items-start justify-center p-1.5"
          animate={{
            borderColor: ['#6b7280', '#e91e8c', '#6b7280'],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <motion.div
            className="w-1.5 h-1.5 rounded-full bg-neon-purple"
            animate={{
              y: [0, 16, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
