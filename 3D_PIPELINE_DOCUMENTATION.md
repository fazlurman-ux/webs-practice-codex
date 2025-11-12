# 3D Pipeline Documentation

This document provides a comprehensive guide to the 3D integration using React Three Fiber and Drei.

## Table of Contents

1. [Architecture Overview](#architecture-overview)
2. [Components](#components)
3. [Hooks](#hooks)
4. [Asset Pipeline](#asset-pipeline)
5. [Performance Optimization](#performance-optimization)
6. [Usage Examples](#usage-examples)
7. [Troubleshooting](#troubleshooting)

---

## Architecture Overview

The 3D pipeline is built on the following technologies:

- **React Three Fiber**: React renderer for Three.js
- **Drei**: Helper library with useful R3F components
- **Three.js**: 3D graphics library
- **Zustand**: State management for 3D scene data
- **Draco**: Geometry compression for optimized model loading

### Directory Structure

```
/components/three/
  ├── CanvasContainer.tsx   # Main Canvas wrapper with SSR support
  ├── LightingRig.tsx       # Reusable lighting configurations
  ├── Loaders.tsx           # Loading states and progress indicators
  ├── SampleModel.tsx       # Example model component
  └── index.ts              # Export barrel file

/hooks/
  ├── useThreeStore.ts      # Zustand store for 3D state management
  ├── useIsMobile.ts        # Mobile device detection
  └── index.ts              # Export barrel file

/assets/models/             # Source 3D models (GLTF, GLB)
/public/draco/              # Draco decoder WASM files
/public/models/             # Compressed production-ready models
```

---

## Components

### CanvasContainer

The main wrapper for all 3D content. Handles SSR compatibility, performance optimization, and provides a configured Canvas environment.

**Props:**
- `cameraPosition?: [number, number, number]` - Camera position (default: [0, 2, 5])
- `cameraTarget?: [number, number, number]` - Camera look-at target (default: [0, 0, 0])
- `enableControls?: boolean` - Enable OrbitControls (default: true)
- `autoAdjustPerformance?: boolean` - Auto-reduce quality on mobile (default: true)
- `className?: string` - Additional CSS classes
- `backgroundColor?: string` - Canvas background color (default: transparent)

**Integration Points:**
1. **Canvas Setup**: WebGL renderer with anti-aliasing, shadows, and color management
2. **Camera**: PerspectiveCamera with FOV 75, configurable position
3. **Controls**: OrbitControls for user interaction (rotate, zoom, pan)
4. **Events**: Pointer events for raycasting and object interaction
5. **Performance**: Auto-adjusts DPR and quality based on device

**SSR Usage (Next.js):**
```tsx
import dynamic from 'next/dynamic';

const CanvasContainer = dynamic(
  () => import('@/components/three/CanvasContainer').then(m => m.CanvasContainer),
  { ssr: false }
);
```

### LightingRig

Provides three preset lighting configurations:

1. **LightingRig** (Standard)
   - Three-point lighting setup
   - Ambient + 3 directional lights + point light
   - Shadow support (respects performance settings)

2. **MinimalLightingRig** (Performance)
   - Ambient + single directional light
   - No shadows
   - Lowest overhead

3. **NeonLightingRig** (Stylized)
   - Low ambient for dramatic effect
   - Neon-colored point lights (purple, cyan, lime)
   - Matches site theme

**Usage:**
```tsx
<Canvas>
  <LightingRig />
  {/* or <MinimalLightingRig /> or <NeonLightingRig /> */}
  <YourModel />
</Canvas>
```

### Loaders

Three types of loading indicators:

1. **Loader** - In-canvas loading bar with percentage (uses Drei's useProgress)
2. **FallbackLoader** - Outside-canvas spinner for Suspense boundaries
3. **LoaderError** - Error state with retry button

**Usage:**
```tsx
// In-canvas loader
<Canvas>
  <Suspense fallback={<Loader />}>
    <Model />
  </Suspense>
</Canvas>

// Outside-canvas loader
<Suspense fallback={<FallbackLoader />}>
  <LazyCanvas />
</Suspense>
```

### SampleModel

Example component demonstrating GLTF loading with Draco compression.

**Features:**
- Draco-compressed GLTF loading
- Rotation animation
- Configurable scale and position
- Placeholder geometry (replace with real model)

**Props:**
- `modelPath?: string` - Path to GLTF/GLB file
- `animate?: boolean` - Enable rotation animation
- `scale?: number` - Scale factor
- `position?: [number, number, number]` - Position in 3D space

---

## Hooks

### useThreeStore

Centralized Zustand store for 3D scene state.

**State:**
```tsx
{
  viewport: { width, height, dpr },
  cameraPosition: [x, y, z],
  cameraTarget: [x, y, z],
  reducedEffects: boolean,
  enableShadows: boolean,
  enablePostProcessing: boolean,
}
```

**Actions:**
- `setViewport(width, height, dpr)`
- `setCameraPosition([x, y, z])`
- `setCameraTarget([x, y, z])`
- `setReducedEffects(boolean)`
- `toggleShadows()`
- `togglePostProcessing()`

**Usage:**
```tsx
const { cameraPosition, setCameraPosition, reducedEffects } = useThreeStore();
```

### useIsMobile

Detects mobile devices based on viewport width.

**Parameters:**
- `breakpoint?: number` - Width threshold (default: 768px)

**Returns:**
- `boolean` - True if viewport is below breakpoint

**Usage:**
```tsx
const isMobile = useIsMobile();

if (isMobile) {
  // Reduce quality, disable effects, etc.
}
```

---

## Asset Pipeline

### GLTF Compression Workflow

#### Tools Required

1. **gltfpack** (recommended)
   ```bash
   npm install -g gltfpack
   ```

2. **Blender** (alternative)
   - Export with Draco compression enabled

3. **Online Tools** (quick testing)
   - https://gltf.report/ (analysis)
   - https://glb.babylonjs.com/ (converter)

#### Compression Steps

1. **Convert to GLTF/GLB**
   - From Blender: File → Export → glTF 2.0
   - From FBX: Use online converter or Blender

2. **Compress with gltfpack**
   ```bash
   # Basic compression
   gltfpack -i model.gltf -o model-compressed.glb -cc

   # With texture compression
   gltfpack -i model.gltf -o model-compressed.glb -cc -tc

   # With mesh simplification (50% reduction)
   gltfpack -i model.gltf -o model-compressed.glb -cc -si 0.5

   # Maximum compression
   gltfpack -i model.gltf -o model-compressed.glb -cc -tc -si 0.7 -noq
   ```

3. **Compression Options**
   - `-cc` - Compress geometry with Draco
   - `-tc` - Compress textures with KTX2/Basis
   - `-si [0-1]` - Simplify mesh (1.0 = no simplification)
   - `-noq` - Disable quantization for better quality
   - `-vp 14` - Position quantization bits (higher = better quality)
   - `-vt 12` - Texture coordinate quantization bits
   - `-vn 10` - Normal quantization bits

4. **Place Compressed Models**
   ```
   /assets/models/           # Source files (version control)
   /public/models/           # Compressed production files
   ```

### File Size Expectations

| Model Complexity | Original | Compressed | Reduction |
|------------------|----------|------------|-----------|
| Simple (< 10k tris) | 1-5 MB | 100-500 KB | 80-90% |
| Medium (10-50k tris) | 5-20 MB | 500 KB - 2 MB | 85-90% |
| Complex (> 50k tris) | 20-100 MB | 2-10 MB | 90-95% |

### Loading Models in Components

```tsx
import { useGLTF } from '@react-three/drei';

function MyModel() {
  // Load with Draco support
  const { scene } = useGLTF('/models/my-model.glb', '/draco/');
  
  return <primitive object={scene} />;
}

// Preload for faster initial load
useGLTF.preload('/models/my-model.glb', '/draco/');
```

### Draco Decoder Configuration

The Draco decoder files are located in `/public/draco/` and include:
- `draco_decoder.js`
- `draco_decoder.wasm`
- `draco_wasm_wrapper.js`

These are automatically used by Drei's useGLTF hook when you pass `/draco/` as the second parameter.

---

## Performance Optimization

### Automatic Optimizations

The pipeline automatically:
1. Reduces DPR on mobile devices (1.5x vs 2x)
2. Disables shadows on low-power devices
3. Adjusts anti-aliasing based on performance mode
4. Uses Suspense for lazy loading

### Manual Optimizations

1. **Reduce Polygon Count**
   ```bash
   gltfpack -i model.gltf -o model-optimized.glb -cc -si 0.5
   ```

2. **Use LOD (Level of Detail)**
   ```tsx
   import { Detailed } from '@react-three/drei';
   
   <Detailed distances={[0, 10, 20]}>
     <HighPolyModel />
     <MediumPolyModel />
     <LowPolyModel />
   </Detailed>
   ```

3. **Instancing for Repeated Objects**
   ```tsx
   import { Instances, Instance } from '@react-three/drei';
   
   <Instances>
     <boxGeometry />
     <meshStandardMaterial />
     <Instance position={[0, 0, 0]} />
     <Instance position={[2, 0, 0]} />
     {/* ... more instances */}
   </Instances>
   ```

4. **Frustum Culling**
   ```tsx
   <mesh frustumCulled>
     <boxGeometry />
     <meshStandardMaterial />
   </mesh>
   ```

5. **Texture Optimization**
   - Use power-of-2 dimensions (512, 1024, 2048)
   - Compress with KTX2/Basis
   - Use mipmaps for distant objects

### Performance Monitoring

```tsx
import { Stats, PerformanceMonitor } from '@react-three/drei';

<Canvas>
  <PerformanceMonitor
    onIncline={() => console.log('Performance improved')}
    onDecline={() => console.log('Performance degraded')}
  >
    <Stats />
    {/* Your scene */}
  </PerformanceMonitor>
</Canvas>
```

---

## Usage Examples

### Basic Scene

```tsx
'use client';

import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import { FallbackLoader } from '@/components/three';

const CanvasContainer = dynamic(
  () => import('@/components/three').then(m => m.CanvasContainer),
  { ssr: false, loading: () => <FallbackLoader /> }
);

const LightingRig = dynamic(
  () => import('@/components/three').then(m => m.LightingRig),
  { ssr: false }
);

const SampleModel = dynamic(
  () => import('@/components/three/SampleModel').then(m => m.SampleModel),
  { ssr: false }
);

export default function ThreeDPage() {
  return (
    <div className="w-full h-screen">
      <CanvasContainer>
        <LightingRig />
        <SampleModel />
      </CanvasContainer>
    </div>
  );
}
```

### Multiple Models with Loading States

```tsx
'use client';

import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import { Loader } from '@/components/three';

const CanvasContainer = dynamic(
  () => import('@/components/three').then(m => m.CanvasContainer),
  { ssr: false }
);

const LightingRig = dynamic(
  () => import('@/components/three').then(m => m.LightingRig),
  { ssr: false }
);

function Scene() {
  return (
    <>
      <LightingRig />
      <Suspense fallback={<Loader />}>
        <Model1 />
        <Model2 />
        <Model3 />
      </Suspense>
    </>
  );
}

export default function MultiModelPage() {
  return (
    <div className="w-full h-screen">
      <CanvasContainer>
        <Scene />
      </CanvasContainer>
    </div>
  );
}
```

### Interactive Model with State

```tsx
'use client';

import { useState } from 'react';
import { useThreeStore } from '@/hooks';
import dynamic from 'next/dynamic';

const CanvasContainer = dynamic(
  () => import('@/components/three').then(m => m.CanvasContainer),
  { ssr: false }
);

export default function InteractivePage() {
  const [modelColor, setModelColor] = useState('#e91e8c');
  const { toggleShadows, enableShadows } = useThreeStore();

  return (
    <div className="w-full h-screen relative">
      {/* Controls */}
      <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
        <button onClick={toggleShadows} className="btn-neon">
          Shadows: {enableShadows ? 'ON' : 'OFF'}
        </button>
        <input
          type="color"
          value={modelColor}
          onChange={(e) => setModelColor(e.target.value)}
          className="w-20 h-10"
        />
      </div>

      {/* Canvas */}
      <CanvasContainer>
        <LightingRig />
        <YourInteractiveModel color={modelColor} />
      </CanvasContainer>
    </div>
  );
}
```

### Performance-Optimized Scene

```tsx
'use client';

import { useIsMobile } from '@/hooks';
import dynamic from 'next/dynamic';

const CanvasContainer = dynamic(
  () => import('@/components/three').then(m => m.CanvasContainer),
  { ssr: false }
);

const MinimalLightingRig = dynamic(
  () => import('@/components/three').then(m => m.MinimalLightingRig),
  { ssr: false }
);

function OptimizedScene() {
  const isMobile = useIsMobile();

  return (
    <>
      <MinimalLightingRig />
      {isMobile ? <LowPolyModel /> : <HighPolyModel />}
    </>
  );
}

export default function PerformancePage() {
  return (
    <div className="w-full h-screen">
      <CanvasContainer autoAdjustPerformance>
        <OptimizedScene />
      </CanvasContainer>
    </div>
  );
}
```

---

## Troubleshooting

### SSR Errors

**Problem:** "window is not defined" or "document is not defined"

**Solution:** Always use `dynamic` import with `ssr: false`:
```tsx
const CanvasContainer = dynamic(
  () => import('@/components/three').then(m => m.CanvasContainer),
  { ssr: false }
);
```

### Model Not Loading

**Problem:** Model doesn't appear in scene

**Checklist:**
1. Check model path is correct (relative to `/public/`)
2. Ensure Draco decoder path is set (`/draco/`)
3. Verify model file is in `/public/models/`
4. Check browser console for errors
5. Test model in https://gltf.report/ to verify it's valid

### Performance Issues

**Problem:** Low FPS or janky animations

**Solutions:**
1. Enable performance monitoring:
   ```tsx
   import { Stats } from '@react-three/drei';
   <Canvas><Stats /></Canvas>
   ```

2. Reduce polygon count with gltfpack
3. Enable `autoAdjustPerformance` on CanvasContainer
4. Use `MinimalLightingRig` instead of `LightingRig`
5. Disable shadows: `useThreeStore().setReducedEffects(true)`
6. Lower DPR manually: `<Canvas dpr={1} />`

### Draco Decompression Errors

**Problem:** "Could not load Draco decoder" or "DRACOLoader" errors

**Solutions:**
1. Verify `/public/draco/` contains decoder files
2. Check decoder path in useGLTF: `useGLTF('/model.glb', '/draco/')`
3. Ensure model is actually Draco-compressed (check with gltf.report)
4. Try recopying Draco files:
   ```bash
   cp -r node_modules/three/examples/jsm/libs/draco/* public/draco/
   ```

### TypeScript Errors

**Problem:** Type errors with Three.js or R3F

**Solution:** Ensure types are installed:
```bash
npm install --save-dev @types/three
```

### Black Screen

**Problem:** Canvas renders but scene is black

**Checklist:**
1. Add lighting (`<LightingRig />` or `<ambientLight />`)
2. Check camera position (not inside objects)
3. Verify objects have materials
4. Check object scale (too small or too large)
5. Use `<axesHelper />` to debug coordinate system

---

## Additional Resources

- [React Three Fiber Docs](https://docs.pmnd.rs/react-three-fiber)
- [Drei Docs](https://github.com/pmndrs/drei)
- [Three.js Docs](https://threejs.org/docs/)
- [gltfpack Documentation](https://github.com/zeux/meshoptimizer)
- [glTF Validator](https://github.com/KhronosGroup/glTF-Validator)

---

## Next Steps

1. Replace placeholder geometry in `SampleModel.tsx` with real GLTF model
2. Create custom model components for your specific needs
3. Implement post-processing effects using `@react-three/postprocessing`
4. Add physics using `@react-three/rapier` or `@react-three/cannon`
5. Create interactive experiences with raycasting and events
6. Optimize for production with code splitting and lazy loading
