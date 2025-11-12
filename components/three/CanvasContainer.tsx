'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { Suspense, ReactNode, useEffect } from 'react';
import { useThreeStore, useIsMobile } from '@/hooks';
import { Loader } from './Loaders';

interface CanvasContainerProps {
  children: ReactNode;
  /** Custom camera position [x, y, z] (default: [0, 2, 5]) */
  cameraPosition?: [number, number, number];
  /** Custom camera look-at target [x, y, z] (default: [0, 0, 0]) */
  cameraTarget?: [number, number, number];
  /** Enable orbit controls for user camera manipulation (default: true) */
  enableControls?: boolean;
  /** Enable automatic performance adjustments on mobile (default: true) */
  autoAdjustPerformance?: boolean;
  /** Additional CSS classes for container */
  className?: string;
  /** Canvas background color (default: transparent) */
  backgroundColor?: string;
}

/**
 * CanvasContainer: SSR-safe wrapper for React Three Fiber Canvas.
 * 
 * Integration Points:
 * ------------------
 * 1. Canvas Setup:
 *    - gl: WebGL renderer configuration with anti-aliasing and color management
 *    - shadows: Enabled for realistic lighting (can be toggled via store)
 *    - dpr: Device pixel ratio clamped to [1, 2] for performance
 *    - camera: Perspective camera with configurable position and FOV
 * 
 * 2. Camera Controls:
 *    - OrbitControls: Mouse/touch interaction for camera manipulation
 *    - Auto-rotation, zoom limits, and pan boundaries can be customized
 *    - Camera position syncs with global state via useThreeStore
 * 
 * 3. Event Handling:
 *    - Canvas captures pointer events for raycasting and interactions
 *    - OrbitControls handles drag, pinch-zoom, and rotation gestures
 *    - All events are properly typed via @react-three/fiber
 * 
 * 4. Performance Optimization:
 *    - Automatic reduced effects on mobile devices (via useIsMobile hook)
 *    - Lower DPR on low-power devices
 *    - Shadows and post-processing can be toggled
 *    - Suspense boundaries for lazy loading heavy assets
 * 
 * Usage:
 * ```tsx
 * <CanvasContainer>
 *   <LightingRig />
 *   <YourModel />
 * </CanvasContainer>
 * ```
 * 
 * For SSR compatibility in Next.js, import this component dynamically:
 * ```tsx
 * const CanvasContainer = dynamic(
 *   () => import('@/components/three/CanvasContainer').then(m => m.CanvasContainer),
 *   { ssr: false }
 * );
 * ```
 */
export function CanvasContainer({
  children,
  cameraPosition = [0, 2, 5],
  cameraTarget = [0, 0, 0],
  enableControls = true,
  autoAdjustPerformance = true,
  className = '',
  backgroundColor = 'transparent',
}: CanvasContainerProps) {
  const {
    enableShadows,
    reducedEffects,
    setReducedEffects,
    setViewport,
  } = useThreeStore();

  const isMobile = useIsMobile();

  // Auto-adjust performance based on device capabilities
  useEffect(() => {
    if (autoAdjustPerformance) {
      // Enable reduced effects on mobile devices
      setReducedEffects(isMobile);
    }
  }, [isMobile, autoAdjustPerformance, setReducedEffects]);

  // Track viewport dimensions for responsive behaviors
  useEffect(() => {
    const updateViewport = () => {
      setViewport(
        window.innerWidth,
        window.innerHeight,
        window.devicePixelRatio
      );
    };

    updateViewport();
    window.addEventListener('resize', updateViewport);

    return () => window.removeEventListener('resize', updateViewport);
  }, [setViewport]);

  return (
    <div className={`w-full h-full ${className}`}>
      <Canvas
        shadows={enableShadows}
        dpr={reducedEffects ? [1, 1.5] : [1, 2]} // Lower DPR on low-power devices
        gl={{
          antialias: !reducedEffects,
          alpha: backgroundColor === 'transparent',
          preserveDrawingBuffer: true, // Enable screenshots
          powerPreference: 'high-performance',
        }}
        style={{
          background: backgroundColor,
        }}
      >
        {/* Suspense boundary for lazy-loaded 3D content */}
        <Suspense fallback={<Loader />}>
          {/* Camera setup with configurable position */}
          <PerspectiveCamera
            makeDefault
            position={cameraPosition}
            fov={75}
            near={0.1}
            far={1000}
          />

          {/* Orbit controls for camera manipulation */}
          {enableControls && (
            <OrbitControls
              target={cameraTarget}
              enablePan={true}
              enableZoom={true}
              enableRotate={true}
              minDistance={2}
              maxDistance={20}
              minPolarAngle={0}
              maxPolarAngle={Math.PI / 1.5} // Prevent flipping under the floor
              dampingFactor={0.05}
              rotateSpeed={0.5}
              zoomSpeed={0.5}
            />
          )}

          {/* User-provided scene content */}
          {children}
        </Suspense>
      </Canvas>
    </div>
  );
}
