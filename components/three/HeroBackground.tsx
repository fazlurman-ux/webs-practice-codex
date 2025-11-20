'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { InstancedMesh, Object3D, Color } from 'three';

interface HeroBackgroundProps {
  /** Number of particles (default: 100 for performance) */
  particleCount?: number;
  /** Enable reduced effects for low-power mode */
  reduced?: boolean;
}

/**
 * HeroBackground: GPU-efficient animated particle field.
 * 
 * Performance Strategy:
 * --------------------
 * 1. Instanced Rendering:
 *    - Single draw call for all particles (vs. N draw calls)
 *    - Handles 100-1000+ particles at 60fps
 *    - Each instance has unique position/scale/rotation
 * 
 * 2. Particle Animation:
 *    - Particles drift slowly in 3D space for depth
 *    - Circular motion creates organic flow
 *    - Z-axis variation provides parallax against hero model
 * 
 * 3. Color Scheme:
 *    - Three neon colors match theme palette
 *    - Emissive materials create glow without post-processing
 *    - Low emissive intensity prevents GPU overload
 * 
 * 4. Mobile Optimization:
 *    - Reduced particle count on low-power devices
 *    - Smaller geometry (lower poly count)
 *    - Disabled shadows on particles
 * 
 * Alternative Approach (Shader-based):
 * For even better performance, consider custom shader with:
 * - Vertex shader for position animation
 * - Fragment shader for color/glow
 * - Points material instead of instanced meshes
 * See: https://threejs.org/examples/#webgl_points_dynamic
 */
export function HeroBackground({
  particleCount = 100,
  reduced = false,
}: HeroBackgroundProps) {
  const meshRef = useRef<InstancedMesh>(null);
  
  // Adjust particle count for performance
  const count = reduced ? Math.floor(particleCount / 2) : particleCount;

  // Particle data: position, velocity, color
  const particles = useMemo(() => {
    const temp = [];
    const colors = [
      new Color('#e91e8c'), // Neon purple
      new Color('#39ff14'), // Lime green
      new Color('#00d9ff'), // Cyan
    ];

    for (let i = 0; i < count; i++) {
      temp.push({
        // Random position in sphere around origin
        position: {
          x: (Math.random() - 0.5) * 20,
          y: (Math.random() - 0.5) * 20,
          z: (Math.random() - 0.5) * 15 - 5, // Behind the model
        },
        // Rotation velocity
        velocity: {
          x: (Math.random() - 0.5) * 0.01,
          y: (Math.random() - 0.5) * 0.01,
          z: (Math.random() - 0.5) * 0.005,
        },
        // Random scale for variety
        scale: Math.random() * 0.3 + 0.1,
        // Random color from palette
        color: colors[Math.floor(Math.random() * colors.length)],
        // Phase offset for wave motion
        phase: Math.random() * Math.PI * 2,
      });
    }
    return temp;
  }, [count]);

  // Initialize instance positions/colors
  useMemo(() => {
    if (!meshRef.current) return;

    const dummy = new Object3D();
    const color = new Color();

    particles.forEach((particle, i) => {
      dummy.position.set(
        particle.position.x,
        particle.position.y,
        particle.position.z
      );
      dummy.scale.setScalar(particle.scale);
      dummy.updateMatrix();
      
      meshRef.current!.setMatrixAt(i, dummy.matrix);
      meshRef.current!.setColorAt(i, particle.color);
    });

    meshRef.current.instanceMatrix.needsUpdate = true;
    if (meshRef.current.instanceColor) {
      meshRef.current.instanceColor.needsUpdate = true;
    }
  }, [particles]);

  // Animate particles
  useFrame((state) => {
    if (!meshRef.current) return;

    const dummy = new Object3D();
    const time = state.clock.elapsedTime;

    particles.forEach((particle, i) => {
      // Circular drift motion
      const x = particle.position.x + Math.sin(time * 0.5 + particle.phase) * 0.02;
      const y = particle.position.y + Math.cos(time * 0.3 + particle.phase) * 0.02;
      const z = particle.position.z + Math.sin(time * 0.2 + particle.phase) * 0.01;

      // Slow rotation
      const rotation = time * particle.velocity.x;

      dummy.position.set(x, y, z);
      dummy.rotation.set(
        rotation,
        rotation * 0.5,
        rotation * 0.3
      );
      dummy.scale.setScalar(particle.scale);
      dummy.updateMatrix();

      meshRef.current!.setMatrixAt(i, dummy.matrix);
    });

    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh
      ref={meshRef}
      args={[undefined, undefined, count]}
      frustumCulled={true}
    >
      {/* Simple geometry for particles */}
      <octahedronGeometry args={[reduced ? 0.05 : 0.08, 0]} />
      
      {/* Emissive material for glow effect */}
      <meshStandardMaterial
        emissive="#ffffff"
        emissiveIntensity={0.3}
        metalness={0.8}
        roughness={0.2}
        toneMapped={false} // Prevent color clipping on bright emissive
      />
    </instancedMesh>
  );
}
