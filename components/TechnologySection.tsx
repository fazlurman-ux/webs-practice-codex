'use client';

import { useState, useEffect, useRef, Suspense, useMemo } from 'react';
import dynamic from 'next/dynamic';
import { motion, AnimatePresence, useScroll, useTransform, type Variants } from 'framer-motion';
import { Button } from './Button';
import { Container } from './Container';
import { Section } from './Section';
import { Badge } from './Badge';
import { useTechStore, useSnapshot, type TechFeature } from '@/hooks/useTechStore';
import { useIsMobile } from '@/hooks';

// Dynamic imports for 3D components (SSR-safe)
const CanvasContainer = dynamic(
  () => import('@/components/three').then(m => m.CanvasContainer),
  { ssr: false }
);
const LightingRig = dynamic(
  () => import('@/components/three').then(m => m.LightingRig),
  { ssr: false }
);
const MinimalLightingRig = dynamic(
  () => import('@/components/three').then(m => m.MinimalLightingRig),
  { ssr: false }
);
const NeonLightingRig = dynamic(
  () => import('@/components/three').then(m => m.NeonLightingRig),
  { ssr: false }
);
const Tech3DModel = dynamic(
  () => import('./three/Tech3DModel').then(m => m.Tech3DModel),
  { ssr: false }
);
const Loader = dynamic(
  () => import('@/components/three').then(m => m.Loader),
  { ssr: false }
);

/**
 * TechnologySection: Interactive breakdown of materials/comfort/performance features.
 * 
 * Features:
 * ---------
 * 1. Tab-based navigation for different technology features
 * 2. 3D scene synchronized with active feature via Valtio state
 * 3. Smooth camera transitions and lighting changes
 * 4. Fallback images for reduced performance devices
 * 5. Responsive design with mobile optimization
 * 
 * State Management:
 * -----------------
 * - Valtio store synchronizes UI tabs with 3D scene state
 * - Camera positions, lighting presets, and animations linked to active feature
 * - Performance toggles for graceful degradation on mobile
 * 
 * 3D Integration:
 * --------------
 * - Camera transitions using R3F useSpring for smooth animations
 * - Dynamic lighting presets (standard, neon, minimal, focused)
 * - Feature-specific highlight colors and annotations
 * - Scroll-based zoom optional enhancement
 */
export function TechnologySection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const threeContainerRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const techSnap = useSnapshot(useTechStore);
  const [isInitialized, setIsInitialized] = useState(false);
  const [scrollZoom, setScrollZoom] = useState(1);

  // Scroll-based zoom enhancement
  const { scrollYProgress } = useScroll({
    target: threeContainerRef,
    offset: ['start end', 'end start'],
  });

  const zoomLevel = useTransform(scrollYProgress, [0, 1], [1, 1.3]);

  // Update zoom level for 3D scene
  useEffect(() => {
    const unsubscribe = zoomLevel.on('change', (latest) => {
      setScrollZoom(latest);
    });
    return unsubscribe;
  }, [zoomLevel]);

  // Define technology features with their 3D scene properties
  const techFeatures: TechFeature[] = useMemo(() => [
    {
      id: 'materials',
      name: 'Advanced Materials',
      description: 'Premium aerospace-grade composites',
      detailedDescription: 'Our proprietary carbon fiber composite delivers exceptional strength-to-weight ratio, featuring 50% lighter construction than traditional materials while maintaining 200% increased durability. The molecular structure provides superior vibration damping and thermal regulation.',
      icon: '🔬',
      cameraPosition: [2, 1.5, 3],
      cameraTarget: [0, 0, 0],
      lightingPreset: 'focused',
      highlightColor: '#e91e8c',
      transitionDuration: 1200,
      zoomLevel: 1.2,
    },
    {
      id: 'comfort',
      name: 'Ergonomic Comfort',
      description: 'Adaptive fit technology',
      detailedDescription: 'Biomechanically engineered with pressure-mapping technology, the adaptive system automatically adjusts to your unique physiology. Memory foam layers with gel infusion provide personalized comfort while maintaining optimal airflow for temperature regulation.',
      icon: '🎯',
      cameraPosition: [-1.5, 2, 2.5],
      cameraTarget: [0, 0.5, 0],
      lightingPreset: 'standard',
      highlightColor: '#39ff14',
      transitionDuration: 1000,
      zoomLevel: 1.0,
    },
    {
      id: 'performance',
      name: 'Performance Engineering',
      description: 'Optimized for peak efficiency',
      detailedDescription: 'Precision-tuned suspension geometry with magnetic damping provides instant response to input. The kinetic energy recovery system captures and redistributes motion energy, reducing fatigue by 40% during extended use while enhancing control precision.',
      icon: '⚡',
      cameraPosition: [0, 1, 4],
      cameraTarget: [0, 0, 0],
      lightingPreset: 'neon',
      highlightColor: '#00d9ff',
      transitionDuration: 1100,
      zoomLevel: 1.5,
      },
      ], []);

  // Initialize store with features
  useEffect(() => {
    useTechStore.setFeatures(techFeatures);
    setIsInitialized(true);
    
    // Set reduced motion for mobile devices
    if (isMobile) {
      useTechStore.setReducedMotion(true);
    }
  }, [techFeatures, isMobile]);

  // Animation variants for tab content
  const contentVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
    exit: { 
      opacity: 0, 
      y: -20,
      transition: { duration: 0.3 },
    },
  };

  // Animation variants for 3D container
  const containerVariants: Variants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  const activeFeature = techSnap.features.find(f => f.id === techSnap.activeFeatureId);

  if (!isInitialized) {
    return (
      <Section className="py-20">
        <Container>
          <div className="flex items-center justify-center h-96">
            <div className="animate-pulse text-neon-cyan">Loading Technology Section...</div>
          </div>
        </Container>
      </Section>
    );
  }

  return (
    <Section className="py-20 overflow-hidden">
      <Container>
        <motion.div
          ref={containerRef}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
        >
          {/* Section Header */}
          <div className="text-center mb-16">
            <motion.h2 
              className="text-4xl md:text-5xl font-bold text-white mb-4"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Technology Breakdown
            </motion.h2>
            <motion.p 
              className="text-xl text-gray-400 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              Explore the innovative features that set our product apart
            </motion.p>
          </div>

          {/* Tab Navigation */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {techFeatures.map((feature, index) => (
              <motion.div
                key={feature.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
              >
                <Button
                  variant={techSnap.activeFeatureId === feature.id ? 'primary' : 'secondary'}
                  onClick={() => useTechStore.setActiveFeature(feature.id)}
                  className="flex items-center gap-2 px-6 py-3"
                  disabled={techSnap.cameraTransitioning}
                >
                  <span className="text-xl">{feature.icon}</span>
                  <span>{feature.name}</span>
                </Button>
              </motion.div>
            ))}
          </div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* 3D Scene */}
            <motion.div
              ref={threeContainerRef}
              className="relative h-96 lg:h-full min-h-[400px] bg-black/20 rounded-2xl overflow-hidden border border-neon-purple/20"
              variants={contentVariants}
              key={`3d-${techSnap.activeFeatureId}`}
              style={{ scale: zoomLevel }}
            >
              {techSnap.enable3D && !isMobile ? (
                <Suspense fallback={<Loader />}>
                  <CanvasContainer
                    cameraPosition={[...techSnap.currentCameraPosition] as [number, number, number]}
                    cameraTarget={[...techSnap.currentCameraTarget] as [number, number, number]}
                    enableControls={!techSnap.cameraTransitioning}
                    className="w-full h-full"
                    backgroundColor="transparent"
                  >
                    {techSnap.currentLightingPreset === 'standard' && <LightingRig />}
                    {techSnap.currentLightingPreset === 'minimal' && <MinimalLightingRig />}
                    {techSnap.currentLightingPreset === 'neon' && <NeonLightingRig />}
                    {techSnap.currentLightingPreset === 'focused' && <LightingRig />}
                    <Tech3DModel
                      activeFeatureId={techSnap.activeFeatureId}
                      highlightColor={activeFeature?.highlightColor}
                      isTransitioning={techSnap.cameraTransitioning}
                      scrollZoom={scrollZoom}
                    />
                  </CanvasContainer>
                </Suspense>
              ) : (
                // Fallback for reduced performance devices
                <div className="w-full h-full flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-6xl mb-4">{activeFeature?.icon}</div>
                    <div className="text-neon-cyan font-semibold mb-2">
                      {activeFeature?.name}
                    </div>
                    <div className="text-gray-400 text-sm">
                      {activeFeature?.description}
                    </div>
                    <div className="mt-4 text-xs text-gray-500">
                      3D view optimized for desktop experience
                    </div>
                  </div>
                </div>
              )}

              {/* Loading overlay */}
              <AnimatePresence>
                {techSnap.cameraTransitioning && (
                  <motion.div
                    className="absolute inset-0 bg-black/50 flex items-center justify-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <div className="text-neon-cyan animate-pulse">Transitioning...</div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Feature Information */}
            <motion.div
              className="space-y-6"
              variants={contentVariants}
              key={`content-${techSnap.activeFeatureId}`}
            >
              <AnimatePresence mode="wait">
                {activeFeature && (
                  <motion.div
                    key={activeFeature.id}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    variants={contentVariants}
                  >
                    {/* Feature Header */}
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-3xl">{activeFeature.icon}</span>
                      <h3 className="text-3xl font-bold text-white">
                        {activeFeature.name}
                      </h3>
                    </div>

                    {/* Feature Description */}
                    <p className="text-xl text-gray-300 mb-6">
                      {activeFeature.description}
                    </p>

                    {/* Detailed Description */}
                    <div className="bg-black/30 border border-neon-purple/20 rounded-xl p-6 mb-6">
                      <p className="text-gray-300 leading-relaxed">
                        {activeFeature.detailedDescription}
                      </p>
                    </div>

                    {/* Feature Badges */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      <Badge color="purple">Advanced</Badge>
                      <Badge color="lime">Performance</Badge>
                      <Badge color="cyan">Innovation</Badge>
                    </div>

                    {/* Call to Action */}
                    <div className="flex gap-4">
                      <Button variant="primary" className="flex-1">
                        Learn More
                      </Button>
                      <Button variant="secondary" className="flex-1">
                        Specifications
                      </Button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>

          {/* Scroll Enhancement Notice */}
          <motion.div
            className="mt-16 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <p className="text-gray-500 text-sm">
              💡 Tip: Scroll while hovering over the 3D view for enhanced zoom control
            </p>
          </motion.div>
        </motion.div>
      </Container>
    </Section>
  );
}