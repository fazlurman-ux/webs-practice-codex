'use client';

import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import { Container } from '@/components';
import { useThreeStore } from '@/hooks';

/**
 * Lazy-load 3D components with SSR disabled.
 * This prevents "window is not defined" errors during server-side rendering.
 */
const CanvasContainer = dynamic(
  () => import('@/components/three').then((m) => m.CanvasContainer),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full flex items-center justify-center bg-charcoal-900/50">
        <div className="text-charcoal-300 font-mono">Loading 3D Engine...</div>
      </div>
    ),
  }
);

const LightingRig = dynamic(
  () => import('@/components/three').then((m) => m.LightingRig),
  { ssr: false }
);

const NeonLightingRig = dynamic(
  () => import('@/components/three').then((m) => m.NeonLightingRig),
  { ssr: false }
);

const SampleModel = dynamic(
  () => import('@/components/three/SampleModel').then((m) => m.SampleModel),
  { ssr: false }
);

/**
 * Controls panel for adjusting 3D scene settings
 */
function SceneControls() {
  const {
    enableShadows,
    enablePostProcessing,
    reducedEffects,
    toggleShadows,
    togglePostProcessing,
    setReducedEffects,
  } = useThreeStore();

  return (
    <div className="absolute top-4 right-4 z-10 glass-panel p-4 space-y-3 min-w-[200px]">
      <h3 className="text-sm font-heading uppercase tracking-wider text-neon-purple mb-3">
        Scene Controls
      </h3>

      <label className="flex items-center justify-between gap-3 cursor-pointer group">
        <span className="text-sm text-charcoal-200 group-hover:text-white transition-colors">
          Shadows
        </span>
        <input
          type="checkbox"
          checked={enableShadows}
          onChange={toggleShadows}
          className="w-4 h-4 rounded border-charcoal-600 bg-charcoal-800 checked:bg-neon-purple focus:ring-2 focus:ring-neon-purple"
        />
      </label>

      <label className="flex items-center justify-between gap-3 cursor-pointer group">
        <span className="text-sm text-charcoal-200 group-hover:text-white transition-colors">
          Post Processing
        </span>
        <input
          type="checkbox"
          checked={enablePostProcessing}
          onChange={togglePostProcessing}
          className="w-4 h-4 rounded border-charcoal-600 bg-charcoal-800 checked:bg-neon-purple focus:ring-2 focus:ring-neon-purple"
        />
      </label>

      <label className="flex items-center justify-between gap-3 cursor-pointer group">
        <span className="text-sm text-charcoal-200 group-hover:text-white transition-colors">
          Reduced Effects
        </span>
        <input
          type="checkbox"
          checked={reducedEffects}
          onChange={(e) => setReducedEffects(e.target.checked)}
          className="w-4 h-4 rounded border-charcoal-600 bg-charcoal-800 checked:bg-neon-purple focus:ring-2 focus:ring-neon-purple"
        />
      </label>

      <div className="pt-3 border-t border-charcoal-700">
        <p className="text-xs text-charcoal-400 leading-relaxed">
          Drag to rotate • Scroll to zoom • Right-click to pan
        </p>
      </div>
    </div>
  );
}

/**
 * 3D Demo Page
 * 
 * Demonstrates the complete 3D pipeline with:
 * - SSR-safe Canvas setup using dynamic imports
 * - Suspense boundaries for lazy loading
 * - Interactive controls for performance settings
 * - Multiple lighting presets
 * - Sample model with animation
 */
export default function ThreeDemoPage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen">
        {/* 3D Canvas */}
        <CanvasContainer
          cameraPosition={[4, 3, 6]}
          cameraTarget={[0, 0, 0]}
          enableControls={true}
          autoAdjustPerformance={true}
          className="absolute inset-0"
        >
          <NeonLightingRig />
          <SampleModel animate={true} scale={1} position={[0, 0, 0]} />
          
          {/* Ground plane for shadow receiving */}
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]} receiveShadow>
            <planeGeometry args={[20, 20]} />
            <meshStandardMaterial color="#0a0a0a" metalness={0.1} roughness={0.9} />
          </mesh>
        </CanvasContainer>

        {/* Scene Controls */}
        <SceneControls />

        {/* Content Overlay */}
        <div className="absolute inset-0 pointer-events-none flex items-center">
          <Container>
            <div className="max-w-2xl">
              <h1 className="text-display font-heading text-gradient-neon mb-6">
                3D Pipeline Demo
              </h1>
              <p className="text-xl text-charcoal-200 leading-relaxed mb-8">
                Explore our React Three Fiber integration with Draco-compressed models,
                Suspense-based lazy loading, and performance optimization.
              </p>
              <div className="flex flex-wrap gap-4 pointer-events-auto">
                <a href="#features" className="btn-neon">
                  Learn More
                </a>
                <a
                  href="/3D_PIPELINE_DOCUMENTATION.md"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-glass"
                >
                  View Docs
                </a>
              </div>
            </div>
          </Container>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-charcoal-950">
        <Container>
          <h2 className="text-4xl font-heading text-gradient-neon mb-12 text-center">
            Pipeline Features
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Feature Card 1 */}
            <div className="glass-panel p-6">
              <div className="w-12 h-12 rounded-lg bg-neon-purple/20 flex items-center justify-center mb-4">
                <span className="text-2xl">⚡</span>
              </div>
              <h3 className="text-xl font-heading text-white mb-3">
                SSR Compatible
              </h3>
              <p className="text-charcoal-300 leading-relaxed">
                Dynamic imports with ssr: false prevent hydration issues in Next.js.
              </p>
            </div>

            {/* Feature Card 2 */}
            <div className="glass-panel p-6">
              <div className="w-12 h-12 rounded-lg bg-neon-cyan/20 flex items-center justify-center mb-4">
                <span className="text-2xl">🗜️</span>
              </div>
              <h3 className="text-xl font-heading text-white mb-3">
                Draco Compression
              </h3>
              <p className="text-charcoal-300 leading-relaxed">
                90%+ file size reduction with automatic decompression via Drei.
              </p>
            </div>

            {/* Feature Card 3 */}
            <div className="glass-panel p-6">
              <div className="w-12 h-12 rounded-lg bg-neon-lime/20 flex items-center justify-center mb-4">
                <span className="text-2xl">🎨</span>
              </div>
              <h3 className="text-xl font-heading text-white mb-3">
                Reusable Components
              </h3>
              <p className="text-charcoal-300 leading-relaxed">
                CanvasContainer, LightingRig, and Loaders ready for any scene.
              </p>
            </div>

            {/* Feature Card 4 */}
            <div className="glass-panel p-6">
              <div className="w-12 h-12 rounded-lg bg-neon-purple/20 flex items-center justify-center mb-4">
                <span className="text-2xl">📱</span>
              </div>
              <h3 className="text-xl font-heading text-white mb-3">
                Mobile Optimized
              </h3>
              <p className="text-charcoal-300 leading-relaxed">
                Auto-reduces quality on mobile devices via useIsMobile hook.
              </p>
            </div>

            {/* Feature Card 5 */}
            <div className="glass-panel p-6">
              <div className="w-12 h-12 rounded-lg bg-neon-cyan/20 flex items-center justify-center mb-4">
                <span className="text-2xl">🎮</span>
              </div>
              <h3 className="text-xl font-heading text-white mb-3">
                Interactive Controls
              </h3>
              <p className="text-charcoal-300 leading-relaxed">
                OrbitControls for intuitive camera manipulation with zoom and pan.
              </p>
            </div>

            {/* Feature Card 6 */}
            <div className="glass-panel p-6">
              <div className="w-12 h-12 rounded-lg bg-neon-lime/20 flex items-center justify-center mb-4">
                <span className="text-2xl">📊</span>
              </div>
              <h3 className="text-xl font-heading text-white mb-3">
                State Management
              </h3>
              <p className="text-charcoal-300 leading-relaxed">
                Zustand store for centralized viewport and performance settings.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Documentation Section */}
      <section className="py-20">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl font-heading text-gradient-neon mb-6">
              Ready to Build?
            </h2>
            <p className="text-xl text-charcoal-200 leading-relaxed mb-8">
              Check out the comprehensive documentation to start integrating 3D content
              into your Next.js application.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <a
                href="/3D_PIPELINE_DOCUMENTATION.md"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-neon"
              >
                📖 View Documentation
              </a>
              <a
                href="https://docs.pmnd.rs/react-three-fiber"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-glass"
              >
                React Three Fiber Docs
              </a>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
