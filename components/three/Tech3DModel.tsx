'use client';

import { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { useSpring, animated } from '@react-spring/three';
import { Mesh, Group } from 'three';
import { useSnapshot } from 'valtio';
import { useTechStore } from '@/hooks/useTechStore';

interface Tech3DModelProps {
  activeFeatureId: string;
  highlightColor?: string;
  isTransitioning: boolean;
  scrollZoom?: number;
}

/**
 * Tech3DModel: Feature-specific 3D model with synchronized animations.
 * 
 * Integration with Valtio State:
 * -----------------------------
 * - Camera position and target synchronized with techStore
 * - Smooth transitions using R3F useSpring for natural movement
 * - Feature-specific highlighting and materials
 * - Performance optimizations for mobile devices
 * 
 * 3D Scene Logic:
 * --------------
 * - Base model with interchangeable components for each feature
 * - Animated highlights and glow effects matching feature colors
 * - Auto-rotation when idle, pause during transitions
 * - Scroll-based zoom enhancement (optional)
 * - Component visibility toggles based on active feature
 */
export function Tech3DModel({ 
  activeFeatureId, 
  highlightColor, 
  isTransitioning,
  scrollZoom = 1
}: Tech3DModelProps) {
  const groupRef = useRef<Group>(null);
  const techSnap = useSnapshot(useTechStore);
  
  // Spring animation for smooth position transitions
  const [springProps, api] = useSpring(() => ({
    position: [0, 0, 0] as [number, number, number],
    rotation: [0, 0, 0] as [number, number, number],
    scale: 1,
    config: { mass: 1, tension: 170, friction: 26 },
  }));

  // Update spring animation when active feature changes
  useEffect(() => {
    const feature = techSnap.features.find(f => f.id === activeFeatureId);
    if (feature) {
      // Animate to feature-specific position and scale
      api.start({
        position: [0, 0, 0], // Center the model
        rotation: [0, 0, 0],
        scale: (feature.zoomLevel || 1) * scrollZoom, // Apply scroll zoom
      });
    }
  }, [activeFeatureId, api, techSnap.features, scrollZoom]);

  // Auto-rotation when idle
  useFrame((state, delta) => {
    if (groupRef.current && !isTransitioning) {
      // Gentle auto-rotation
      groupRef.current.rotation.y += delta * 0.2;
      
      // Subtle floating animation
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  // Feature-specific component visibility
  const showMaterials = activeFeatureId === 'materials';
  const showComfort = activeFeatureId === 'comfort';
  const showPerformance = activeFeatureId === 'performance';

  return (
    <animated.group
      ref={groupRef}
      position={springProps.position as unknown as [number, number, number]}
      rotation={springProps.rotation as unknown as [number, number, number]}
      scale={springProps.scale}
    >
      {/* Base Product Model */}
      <BaseProductModel />
      
      {/* Materials Feature Components */}
      {showMaterials && (
        <MaterialsComponents 
          highlightColor={highlightColor} 
          isTransitioning={isTransitioning}
        />
      )}
      
      {/* Comfort Feature Components */}
      {showComfort && (
        <ComfortComponents 
          highlightColor={highlightColor} 
          isTransitioning={isTransitioning}
        />
      )}
      
      {/* Performance Feature Components */}
      {showPerformance && (
        <PerformanceComponents 
          highlightColor={highlightColor} 
          isTransitioning={isTransitioning}
        />
      )}
      
      {/* Feature-specific annotations */}
      <FeatureAnnotations 
        activeFeatureId={activeFeatureId}
        highlightColor={highlightColor}
      />
    </animated.group>
  );
}

/**
 * BaseProductModel: Core product geometry that's always visible
 */
function BaseProductModel() {
  const meshRef = useRef<Mesh>(null);
  
  // Placeholder geometry - replace with actual GLTF model
  return (
    <mesh ref={meshRef} castShadow receiveShadow>
      <boxGeometry args={[1.5, 2, 1]} />
      <meshStandardMaterial 
        color="#1a1a1a" 
        metalness={0.8}
        roughness={0.2}
      />
    </mesh>
  );
}

/**
 * MaterialsComponents: Highlighted components for materials feature
 */
function MaterialsComponents({ highlightColor, isTransitioning }: { 
  highlightColor?: string;
  isTransitioning: boolean;
}) {
  const meshRef = useRef<Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current && !isTransitioning) {
      // Pulsing glow effect for material components
      const pulse = Math.sin(state.clock.elapsedTime * 2) * 0.5 + 0.5;
      const material = meshRef.current.material;
      if (material && typeof material === 'object' && 'emissiveIntensity' in material) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (material as any).emissiveIntensity = pulse * 0.3;
      }
    }
  });

  return (
    <mesh 
      ref={meshRef} 
      position={[1.2, 0, 0]} 
      castShadow
    >
      <sphereGeometry args={[0.3, 32, 32]} />
      <meshStandardMaterial 
        color={highlightColor || '#e91e8c'}
        emissive={highlightColor || '#e91e8c'}
        emissiveIntensity={0.2}
        metalness={0.9}
        roughness={0.1}
      />
    </mesh>
  );
}

/**
 * ComfortComponents: Highlighted components for comfort feature
 */
function ComfortComponents({ highlightColor, isTransitioning }: { 
  highlightColor?: string;
  isTransitioning: boolean;
}) {
  const meshRef = useRef<Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current && !isTransitioning) {
      // Gentle breathing animation for comfort components
      const breathe = Math.sin(state.clock.elapsedTime * 1) * 0.1 + 1;
      meshRef.current.scale.setScalar(breathe);
    }
  });

  return (
    <mesh 
      ref={meshRef} 
      position={[0, 1.5, 0]} 
      castShadow
    >
      <torusGeometry args={[0.4, 0.1, 16, 32]} />
      <meshStandardMaterial 
        color={highlightColor || '#39ff14'}
        emissive={highlightColor || '#39ff14'}
        emissiveIntensity={0.15}
        metalness={0.3}
        roughness={0.7}
      />
    </mesh>
  );
}

/**
 * PerformanceComponents: Highlighted components for performance feature
 */
function PerformanceComponents({ highlightColor, isTransitioning }: { 
  highlightColor?: string;
  isTransitioning: boolean;
}) {
  const meshRef = useRef<Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current && !isTransitioning) {
      // Fast rotation for performance components
      meshRef.current.rotation.y = state.clock.elapsedTime * 3;
      meshRef.current.rotation.x = state.clock.elapsedTime * 2;
    }
  });

  return (
    <mesh 
      ref={meshRef} 
      position={[-1.2, 0, 0]} 
      castShadow
    >
      <octahedronGeometry args={[0.25]} />
      <meshStandardMaterial 
        color={highlightColor || '#00d9ff'}
        emissive={highlightColor || '#00d9ff'}
        emissiveIntensity={0.25}
        metalness={1}
        roughness={0}
      />
    </mesh>
  );
}

/**
 * FeatureAnnotations: 3D text labels and indicators for active features
 */
function FeatureAnnotations({ 
  activeFeatureId, 
  highlightColor 
}: { 
  activeFeatureId: string;
  highlightColor?: string;
}) {
  // Feature-specific annotation positions and text
  const annotations = {
    materials: [
      { position: [1.2, 0.5, 0], text: 'Carbon Fiber' },
      { position: [0, -1.5, 0], text: 'Titanium Alloy' },
    ],
    comfort: [
      { position: [0, 2, 0], text: 'Adaptive Fit' },
      { position: [1, 0, 0], text: 'Pressure Relief' },
    ],
    performance: [
      { position: [-1.2, 0.5, 0], text: 'Magnetic Damping' },
      { position: [0, 0, 1.5], text: 'Energy Recovery' },
    ],
  };

  const currentAnnotations = annotations[activeFeatureId as keyof typeof annotations] || [];

  return (
    <>
      {currentAnnotations.map((annotation, index) => (
        <group key={index} position={annotation.position as [number, number, number]}>
          {/* Connection line */}
          <mesh>
            <cylinderGeometry args={[0.01, 0.01, 0.5]} />
            <meshStandardMaterial 
              color={highlightColor || '#ffffff'}
              emissive={highlightColor || '#ffffff'}
              emissiveIntensity={0.3}
            />
          </mesh>
          
          {/* Annotation point */}
          <mesh position={[0, 0.25, 0]}>
            <sphereGeometry args={[0.05, 16, 16]} />
            <meshStandardMaterial 
              color={highlightColor || '#ffffff'}
              emissive={highlightColor || '#ffffff'}
              emissiveIntensity={0.5}
            />
          </mesh>
        </group>
      ))}
    </>
  );
}