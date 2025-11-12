'use client';

import { useGLTF } from '@react-three/drei';
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Group } from 'three';

/**
 * Sample 3D model component demonstrating GLTF loading with Draco compression.
 * 
 * GLTF Asset Pipeline:
 * --------------------
 * This component is designed to load Draco-compressed GLTF models for optimal performance.
 * 
 * Asset Preparation Workflow:
 * 1. Create or obtain a 3D model in any format (FBX, OBJ, BLEND, etc.)
 * 2. Convert to GLTF using tools like Blender, 3DS Max, or online converters
 * 3. Compress with Draco using gltfpack:
 *    ```bash
 *    gltfpack -i model.gltf -o model-compressed.glb -cc -tc
 *    ```
 *    Options:
 *    -cc: Compress geometry using Draco
 *    -tc: Compress textures using KTX2/Basis
 *    -si 1.0: Simplify mesh (1.0 = no simplification, 0.5 = 50% reduction)
 * 
 * 4. Place compressed model in `/assets/models/` directory
 * 5. Update the model path in useGLTF hook below
 * 
 * Draco Decoder Configuration:
 * The Draco decoder is loaded from `/public/draco/` directory.
 * This is configured in the useGLTF hook's DRACOLoader setup.
 * The decoder files are automatically copied from Three.js during setup.
 * 
 * Performance Notes:
 * - Draco compression can reduce file sizes by 90%+
 * - Decompression happens on load, so first render may be slightly delayed
 * - Use <Suspense> boundaries to handle loading states gracefully
 * - Consider using progressive loading for large scenes
 * 
 * Usage:
 * ```tsx
 * <Canvas>
 *   <Suspense fallback={<Loader />}>
 *     <SampleModel />
 *   </Suspense>
 * </Canvas>
 * ```
 */

interface SampleModelProps {
  /** Path to the GLTF/GLB model file */
  modelPath?: string;
  /** Enable rotation animation (default: true) */
  animate?: boolean;
  /** Scale factor for the model (default: 1) */
  scale?: number;
  /** Position [x, y, z] (default: [0, 0, 0]) */
  position?: [number, number, number];
}

export function SampleModel({
  modelPath = '/models/sample.glb', // Update this path to your actual model
  animate = true,
  scale = 1,
  position = [0, 0, 0],
}: SampleModelProps) {
  const groupRef = useRef<Group>(null);

  /**
   * Load GLTF model with Draco decompression support.
   * 
   * The useGLTF hook automatically:
   * 1. Downloads the model file
   * 2. Detects Draco compression
   * 3. Loads Draco decoder from /draco/ directory
   * 4. Decompresses geometry
   * 5. Returns the parsed scene
   * 
   * To enable Draco support, ensure DRACOLoader is configured:
   * This is handled automatically by @react-three/drei when decoder path is set.
   */
  // const { scene } = useGLTF(modelPath, '/draco/');
  
  // For now, we'll create a simple placeholder since we don't have an actual model yet
  // Uncomment the line above and remove the placeholder code below when you have a model

  // Animate rotation
  useFrame((state, delta) => {
    if (groupRef.current && animate) {
      groupRef.current.rotation.y += delta * 0.5;
    }
  });

  return (
    <group ref={groupRef} position={position} scale={scale}>
      {/* Placeholder geometry - replace with: <primitive object={scene} /> when using real model */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial
          color="#e91e8c"
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>
      
      {/* Additional placeholder elements to demonstrate multi-object scenes */}
      <mesh position={[1.5, 0, 0]} castShadow>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial
          color="#00d9ff"
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>

      <mesh position={[-1.5, 0, 0]} castShadow>
        <cylinderGeometry args={[0.5, 0.5, 1, 32]} />
        <meshStandardMaterial
          color="#39ff14"
          metalness={0.7}
          roughness={0.3}
        />
      </mesh>
    </group>
  );
}

/**
 * Preload the model to reduce initial loading time.
 * Call this in your page component or app initialization:
 * 
 * ```tsx
 * useEffect(() => {
 *   SampleModel.preload('/models/your-model.glb', '/draco/');
 * }, []);
 * ```
 */
// Uncomment when using real GLTF models:
// SampleModel.preload = (modelPath: string) => {
//   useGLTF.preload(modelPath, '/draco/');
// };
