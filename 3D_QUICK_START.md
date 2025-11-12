# 3D Pipeline Quick Start

Get started with the 3D pipeline in 5 minutes.

## 1. See the Demo

Visit the example page to see the pipeline in action:

```bash
npm run dev
```

Then navigate to: http://localhost:3000/three-demo

## 2. Basic Usage

### Import Components

```tsx
'use client';

import dynamic from 'next/dynamic';

// Always use dynamic imports with ssr: false for 3D components
const CanvasContainer = dynamic(
  () => import('@/components/three').then(m => m.CanvasContainer),
  { ssr: false }
);

const LightingRig = dynamic(
  () => import('@/components/three').then(m => m.LightingRig),
  { ssr: false }
);
```

### Create a 3D Scene

```tsx
export default function My3DPage() {
  return (
    <div className="w-full h-screen">
      <CanvasContainer>
        <LightingRig />
        {/* Your 3D content here */}
        <mesh>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color="#e91e8c" />
        </mesh>
      </CanvasContainer>
    </div>
  );
}
```

## 3. Load a 3D Model

### Add Your Model

1. Place your GLTF file in `/assets/models/`
2. Compress it:
   ```bash
   npm run compress-models
   ```
3. Compressed model will be in `/public/models/`

### Load in Component

```tsx
import { useGLTF } from '@react-three/drei';

function MyModel() {
  const { scene } = useGLTF('/models/your-model.glb', '/draco/');
  return <primitive object={scene} />;
}

// Use in your page
<CanvasContainer>
  <LightingRig />
  <Suspense fallback={<Loader />}>
    <MyModel />
  </Suspense>
</CanvasContainer>
```

## 4. Control Performance

### Use the Store

```tsx
import { useThreeStore } from '@/hooks';

function MyPage() {
  const { toggleShadows, setReducedEffects } = useThreeStore();

  return (
    <>
      <button onClick={toggleShadows}>Toggle Shadows</button>
      <button onClick={() => setReducedEffects(true)}>Low Quality</button>
      
      <CanvasContainer autoAdjustPerformance>
        {/* Scene automatically adjusts for mobile */}
      </CanvasContainer>
    </>
  );
}
```

### Mobile Detection

```tsx
import { useIsMobile } from '@/hooks';

function MyScene() {
  const isMobile = useIsMobile();

  return (
    <>
      {isMobile ? <MinimalLightingRig /> : <LightingRig />}
      {isMobile ? <LowPolyModel /> : <HighPolyModel />}
    </>
  );
}
```

## 5. Available Components

### Canvas & Setup
- `<CanvasContainer>` - Main wrapper (handles SSR, performance, controls)

### Lighting
- `<LightingRig>` - Standard three-point lighting
- `<MinimalLightingRig>` - Performance-focused single light
- `<NeonLightingRig>` - Stylized neon-colored lights

### Loading States
- `<Loader>` - In-canvas progress bar
- `<FallbackLoader>` - Outside-canvas spinner
- `<LoaderError>` - Error state with retry

### Example Models
- `<SampleModel>` - Demo placeholder (replace with your models)

## 6. Available Hooks

### State Management
```tsx
const {
  viewport,              // { width, height, dpr }
  cameraPosition,        // [x, y, z]
  cameraTarget,          // [x, y, z]
  reducedEffects,        // boolean
  enableShadows,         // boolean
  setCameraPosition,     // function
  toggleShadows,         // function
  setReducedEffects,     // function
} = useThreeStore();
```

### Device Detection
```tsx
const isMobile = useIsMobile(768); // breakpoint in pixels
```

## 7. Compression Commands

```bash
# Standard compression (recommended)
npm run compress-models

# Maximum compression (smaller files, may reduce quality)
npm run compress-models:aggressive

# High quality (larger files, best quality)
npm run compress-models:quality

# Compress specific file
bash scripts/compress-models.sh -f my-model.gltf
```

## 8. File Structure

```
/components/three/
  ├── CanvasContainer.tsx    # Main Canvas wrapper
  ├── LightingRig.tsx        # Lighting presets
  ├── Loaders.tsx            # Loading indicators
  ├── SampleModel.tsx        # Example model component
  └── index.ts               # Exports

/hooks/
  ├── useThreeStore.ts       # Zustand state management
  ├── useIsMobile.ts         # Mobile detection
  └── index.ts               # Exports

/assets/models/              # Source models (before compression)
/public/models/              # Compressed production models
/public/draco/               # Draco decoder (auto-configured)
```

## 9. Common Issues

### "window is not defined"
✅ Use `dynamic` import with `ssr: false`

### Model doesn't load
✅ Check file path: `/models/filename.glb` (no /public/)
✅ Ensure `/public/draco/` decoder files exist
✅ Pass `/draco/` to `useGLTF`: `useGLTF('/models/model.glb', '/draco/')`

### Low FPS
✅ Enable auto performance: `<CanvasContainer autoAdjustPerformance>`
✅ Compress models: `npm run compress-models:aggressive`
✅ Use `<MinimalLightingRig>` on mobile
✅ Reduce model polygon count with simplification

### Black screen
✅ Add lighting: `<LightingRig />` or `<ambientLight />`
✅ Check camera position (not inside objects)
✅ Verify materials are assigned to meshes

## 10. Next Steps

📖 **Read Full Documentation:** `/3D_PIPELINE_DOCUMENTATION.md`

🎨 **Customize Lighting:** Try different lighting rigs or create your own

🚀 **Optimize Performance:** Use LOD, instancing, and frustum culling

🎮 **Add Interactions:** Use raycasting for click/hover events

📦 **Add Post-Processing:** Install `@react-three/postprocessing` for effects

---

## Example: Complete 3D Page

```tsx
'use client';

import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import { Loader } from '@/components/three';

const CanvasContainer = dynamic(
  () => import('@/components/three').then(m => m.CanvasContainer),
  { ssr: false }
);

const NeonLightingRig = dynamic(
  () => import('@/components/three').then(m => m.NeonLightingRig),
  { ssr: false }
);

export default function ThreeDPage() {
  return (
    <main className="relative h-screen">
      {/* 3D Background */}
      <CanvasContainer
        cameraPosition={[5, 3, 7]}
        enableControls={true}
        autoAdjustPerformance={true}
        className="absolute inset-0"
      >
        <NeonLightingRig />
        <Suspense fallback={<Loader />}>
          {/* Your 3D models here */}
          <mesh>
            <boxGeometry args={[2, 2, 2]} />
            <meshStandardMaterial color="#e91e8c" metalness={0.8} roughness={0.2} />
          </mesh>
        </Suspense>
      </CanvasContainer>

      {/* Content Overlay */}
      <div className="relative z-10 flex items-center justify-center h-full">
        <div className="text-center">
          <h1 className="text-6xl font-heading text-gradient-neon mb-4">
            Welcome to 3D
          </h1>
          <p className="text-xl text-white/80">
            Drag to rotate • Scroll to zoom
          </p>
        </div>
      </div>
    </main>
  );
}
```

That's it! You're ready to build amazing 3D experiences. 🎉
