'use client';

import { useThreeStore } from '@/hooks';

/**
 * Standard lighting configuration for 3D scenes.
 * 
 * Provides a three-point lighting setup:
 * 1. Key Light (directional): Main light source with optional shadows
 * 2. Fill Light (directional): Softer secondary light to reduce harsh shadows
 * 3. Rim Light (directional): Backlight for edge definition
 * 4. Ambient Light: Base illumination to prevent pure black areas
 * 
 * Respects performance settings from useThreeStore (shadows disabled on low-power devices).
 * 
 * Usage:
 * ```tsx
 * <Canvas>
 *   <LightingRig />
 *   <YourModel />
 * </Canvas>
 * ```
 */
export function LightingRig() {
  const { enableShadows, reducedEffects } = useThreeStore();

  return (
    <>
      {/* Ambient light - provides base illumination */}
      <ambientLight intensity={reducedEffects ? 0.5 : 0.3} />

      {/* Key light - main directional light from top-front-right */}
      <directionalLight
        position={[5, 10, 5]}
        intensity={1.5}
        castShadow={enableShadows}
        shadow-mapSize-width={enableShadows ? 2048 : 512}
        shadow-mapSize-height={enableShadows ? 2048 : 512}
        shadow-camera-far={50}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
      />

      {/* Fill light - softer light from opposite side to reduce harsh shadows */}
      <directionalLight
        position={[-5, 5, -5]}
        intensity={0.5}
        castShadow={false}
      />

      {/* Rim light - backlight for edge definition and depth */}
      <directionalLight
        position={[0, 5, -10]}
        intensity={0.8}
        castShadow={false}
      />

      {/* Subtle point light at origin for additional depth */}
      {!reducedEffects && (
        <pointLight
          position={[0, 2, 0]}
          intensity={0.3}
          distance={10}
          decay={2}
        />
      )}
    </>
  );
}

/**
 * Minimal lighting rig for performance-critical scenarios.
 * Uses only ambient and a single directional light.
 * 
 * Usage:
 * ```tsx
 * <Canvas>
 *   <MinimalLightingRig />
 *   <YourModel />
 * </Canvas>
 * ```
 */
export function MinimalLightingRig() {
  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 10, 5]} intensity={1.2} castShadow={false} />
    </>
  );
}

/**
 * Dramatic lighting rig with neon accent colors.
 * Matches the site's neon purple/cyan theme.
 * 
 * Usage:
 * ```tsx
 * <Canvas>
 *   <NeonLightingRig />
 *   <YourModel />
 * </Canvas>
 * ```
 */
export function NeonLightingRig() {
  const { enableShadows } = useThreeStore();

  return (
    <>
      {/* Low ambient for dramatic effect */}
      <ambientLight intensity={0.1} />

      {/* Main white light */}
      <directionalLight
        position={[5, 10, 5]}
        intensity={1}
        castShadow={enableShadows}
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />

      {/* Neon purple accent light */}
      <pointLight
        position={[-5, 3, 5]}
        intensity={2}
        color="#e91e8c"
        distance={15}
        decay={2}
      />

      {/* Neon cyan accent light */}
      <pointLight
        position={[5, 3, -5]}
        intensity={2}
        color="#00d9ff"
        distance={15}
        decay={2}
      />

      {/* Neon lime rim light */}
      <pointLight
        position={[0, 5, -10]}
        intensity={1.5}
        color="#39ff14"
        distance={20}
        decay={2}
      />
    </>
  );
}
