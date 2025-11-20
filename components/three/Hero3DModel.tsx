'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Group, Vector3 } from 'three';

interface Hero3DModelProps {
  /** Mouse position [x, y] normalized to [-1, 1] range */
  mousePosition?: { x: number; y: number };
  /** Scroll progress from 0 to 1 */
  scrollProgress?: number;
  /** Enable touch-based rotation */
  enableTouch?: boolean;
}

/**
 * Hero3DModel: Primary product placeholder for hero section.
 * 
 * Camera Control Logic:
 * ---------------------
 * 1. Mouse/Touch Rotation:
 *    - Mouse position drives subtle rotation on X and Y axes
 *    - Rotation is smoothly interpolated using lerp for natural feel
 *    - Constrained to ±15° to prevent disorienting movement
 *    - Touch gestures follow same logic as mouse for consistent UX
 * 
 * 2. Scroll-driven Camera Dolly:
 *    - As user scrolls, model gradually moves backward (Z-axis)
 *    - Scale slightly increases to maintain visual presence
 *    - Creates parallax depth effect during page navigation
 *    - Smooth easing prevents jarring transitions
 * 
 * 3. Performance Optimization:
 *    - Single useFrame hook for all animations
 *    - Lerp interpolation runs at 60fps without heavy computation
 *    - Simple geometry for placeholder (real model should use LOD)
 * 
 * Integration:
 * Use this component inside CanvasContainer with mouse tracking:
 * ```tsx
 * <CanvasContainer enableControls={false}>
 *   <LightingRig type="neon" />
 *   <Hero3DModel 
 *     mousePosition={mousePos}
 *     scrollProgress={scrollY}
 *   />
 * </CanvasContainer>
 * ```
 */
export function Hero3DModel({
  mousePosition = { x: 0, y: 0 },
  scrollProgress = 0,
  enableTouch = true,
}: Hero3DModelProps) {
  const groupRef = useRef<Group>(null);
  
  // Target rotation based on mouse/touch input
  const targetRotation = useMemo(() => {
    return {
      x: mousePosition.y * 0.15, // ±15° max rotation
      y: mousePosition.x * 0.15,
    };
  }, [mousePosition.x, mousePosition.y]);

  // Animate rotation and position based on scroll
  useFrame((state, delta) => {
    if (!groupRef.current) return;

    // Smooth rotation interpolation (camera control - mouse/touch)
    // Lerp provides natural easing: currentValue + (target - current) * factor
    // Higher factor = faster response, lower = more damping
    groupRef.current.rotation.x += (targetRotation.x - groupRef.current.rotation.x) * 0.05;
    groupRef.current.rotation.y += (targetRotation.y - groupRef.current.rotation.y) * 0.05;

    // Scroll-driven camera dolly effect
    // As scroll progresses (0 → 1), model moves back and scales slightly
    // Z: 0 → -2 (moves away from camera)
    // Scale: 1 → 1.2 (compensates for distance, maintains visual weight)
    const scrollZ = scrollProgress * -2;
    const scrollScale = 1 + scrollProgress * 0.2;
    
    groupRef.current.position.z += (scrollZ - groupRef.current.position.z) * 0.03;
    
    // Scale interpolation (smoother than direct assignment)
    const currentScale = groupRef.current.scale.x;
    const targetScale = scrollScale;
    const newScale = currentScale + (targetScale - currentScale) * 0.03;
    groupRef.current.scale.set(newScale, newScale, newScale);

    // Subtle idle animation: gentle float/rotate when no interaction
    if (Math.abs(mousePosition.x) < 0.01 && Math.abs(mousePosition.y) < 0.01) {
      groupRef.current.rotation.y += delta * 0.1; // Slow auto-rotation
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1; // Float
    }
  });

  return (
    <group ref={groupRef}>
      {/* Primary Product Placeholder - Replace with actual GLTF model */}
      {/* When using real model: <primitive object={gltf.scene} /> */}
      
      {/* Main product body - metallic finish with neon accent */}
      <mesh castShadow receiveShadow>
        <torusKnotGeometry args={[1, 0.3, 128, 32]} />
        <meshStandardMaterial
          color="#1a1a1a"
          metalness={0.9}
          roughness={0.1}
          emissive="#e91e8c"
          emissiveIntensity={0.2}
        />
      </mesh>

      {/* Accent ring - neon purple glow */}
      <mesh position={[0, 0, 0]} scale={1.3}>
        <torusGeometry args={[1.2, 0.05, 16, 100]} />
        <meshStandardMaterial
          color="#e91e8c"
          metalness={1}
          roughness={0}
          emissive="#e91e8c"
          emissiveIntensity={0.8}
        />
      </mesh>

      {/* Floating accent spheres for visual interest */}
      {[
        { pos: [2, 1, 0], color: '#39ff14' },
        { pos: [-2, -1, 0], color: '#00d9ff' },
        { pos: [0, 2, -1], color: '#e91e8c' },
      ].map((sphere, idx) => (
        <mesh
          key={idx}
          position={sphere.pos as [number, number, number]}
          castShadow
        >
          <sphereGeometry args={[0.2, 32, 32]} />
          <meshStandardMaterial
            color={sphere.color}
            metalness={0.8}
            roughness={0.2}
            emissive={sphere.color}
            emissiveIntensity={0.5}
          />
        </mesh>
      ))}
    </group>
  );
}
