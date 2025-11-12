# 3D Integration Guide

Complete guide for integrating 3D content using the established pipeline.

## Table of Contents

1. [Before You Start](#before-you-start)
2. [Integration Checklist](#integration-checklist)
3. [Step-by-Step Integration](#step-by-step-integration)
4. [Common Patterns](#common-patterns)
5. [Performance Best Practices](#performance-best-practices)
6. [Debugging Guide](#debugging-guide)

---

## Before You Start

### Prerequisites

✅ Next.js 16+ project
✅ React 19+
✅ All dependencies installed (`npm install`)
✅ Development server running (`npm run dev`)

### Quick Test

Visit http://localhost:3000/three-demo to see the working example.

---

## Integration Checklist

When adding 3D to a new page:

- [ ] Import components with `dynamic()` and `ssr: false`
- [ ] Wrap scene in `<CanvasContainer>`
- [ ] Add lighting rig
- [ ] Use `<Suspense>` for models
- [ ] Test on mobile devices
- [ ] Verify build succeeds

---

## Step-by-Step Integration

### Step 1: Create Your Page

```bash
# Create new page directory
mkdir -p app/your-page
touch app/your-page/page.tsx
```

### Step 2: Set Up Dynamic Imports

```tsx
'use client';

import dynamic from 'next/dynamic';
import { Suspense } from 'react';

// CRITICAL: Always use ssr: false for 3D components
const CanvasContainer = dynamic(
  () => import('@/components/three').then(m => m.CanvasContainer),
  { ssr: false }
);

const LightingRig = dynamic(
  () => import('@/components/three').then(m => m.LightingRig),
  { ssr: false }
);

const Loader = dynamic(
  () => import('@/components/three').then(m => m.Loader),
  { ssr: false }
);

export default function YourPage() {
  return (
    <div className="w-full h-screen">
      <CanvasContainer>
        <LightingRig />
        <Suspense fallback={<Loader />}>
          {/* Your 3D content here */}
        </Suspense>
      </CanvasContainer>
    </div>
  );
}
```

### Step 3: Add Your 3D Model Component

Create `/components/three/YourModel.tsx`:

```tsx
'use client';

import { useGLTF } from '@react-three/drei';
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Group } from 'three';

interface YourModelProps {
  position?: [number, number, number];
  scale?: number;
  rotation?: [number, number, number];
}

export function YourModel({
  position = [0, 0, 0],
  scale = 1,
  rotation = [0, 0, 0],
}: YourModelProps) {
  const groupRef = useRef<Group>(null);
  
  // Load model with Draco decompression
  const { scene } = useGLTF('/models/your-model.glb', '/draco/');

  // Optional: Add animation
  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.5;
    }
  });

  return (
    <group ref={groupRef} position={position} scale={scale} rotation={rotation}>
      <primitive object={scene} />
    </group>
  );
}

// Preload for better performance
useGLTF.preload('/models/your-model.glb', '/draco/');
```

### Step 4: Import and Use Your Model

```tsx
// In your page.tsx
const YourModel = dynamic(
  () => import('@/components/three/YourModel').then(m => m.YourModel),
  { ssr: false }
);

// Use in scene
<CanvasContainer>
  <LightingRig />
  <Suspense fallback={<Loader />}>
    <YourModel position={[0, 0, 0]} scale={1} />
  </Suspense>
</CanvasContainer>
```

### Step 5: Prepare Your Model

1. **Place source model:**
   ```bash
   cp your-model.gltf assets/models/
   ```

2. **Compress:**
   ```bash
   npm run compress-models
   ```

3. **Verify output:**
   ```bash
   ls -lh public/models/your-model.glb
   ```

### Step 6: Test

```bash
npm run dev
# Visit http://localhost:3000/your-page
```

### Step 7: Build Test

```bash
npm run build
# Ensure no errors
```

---

## Common Patterns

### Pattern 1: Full-Screen 3D Background

```tsx
export default function HeroPage() {
  return (
    <main className="relative h-screen">
      {/* 3D Background */}
      <CanvasContainer
        className="absolute inset-0"
        cameraPosition={[5, 3, 7]}
        enableControls={true}
      >
        <NeonLightingRig />
        <Suspense fallback={<Loader />}>
          <YourModel />
        </Suspense>
      </CanvasContainer>

      {/* Content Overlay */}
      <div className="relative z-10 flex items-center justify-center h-full">
        <div className="text-center">
          <h1 className="text-6xl font-heading text-gradient-neon">
            Your Title
          </h1>
        </div>
      </div>
    </main>
  );
}
```

### Pattern 2: Embedded 3D Section

```tsx
export default function ProductPage() {
  return (
    <main>
      {/* Regular content */}
      <section className="py-20">
        <Container>
          <h1>Product Details</h1>
        </Container>
      </section>

      {/* 3D Viewer Section */}
      <section className="py-20 h-[600px]">
        <Container className="h-full">
          <CanvasContainer>
            <LightingRig />
            <Suspense fallback={<Loader />}>
              <ProductModel />
            </Suspense>
          </CanvasContainer>
        </Container>
      </section>

      {/* More content */}
      <section className="py-20">
        <Container>
          <h2>Specifications</h2>
        </Container>
      </section>
    </main>
  );
}
```

### Pattern 3: Interactive Model with Controls

```tsx
'use client';

import { useState } from 'react';
import { useThreeStore } from '@/hooks';

export default function InteractivePage() {
  const [modelColor, setModelColor] = useState('#e91e8c');
  const [modelScale, setModelScale] = useState(1);
  const { toggleShadows, enableShadows } = useThreeStore();

  return (
    <div className="flex h-screen">
      {/* Control Panel */}
      <aside className="w-64 bg-charcoal-900 p-6 space-y-4">
        <h2 className="text-xl font-heading text-neon-purple">Controls</h2>
        
        <label className="block">
          <span className="text-sm text-charcoal-200">Color</span>
          <input
            type="color"
            value={modelColor}
            onChange={(e) => setModelColor(e.target.value)}
            className="w-full h-10 mt-1"
          />
        </label>

        <label className="block">
          <span className="text-sm text-charcoal-200">Scale</span>
          <input
            type="range"
            min="0.5"
            max="2"
            step="0.1"
            value={modelScale}
            onChange={(e) => setModelScale(parseFloat(e.target.value))}
            className="w-full mt-1"
          />
        </label>

        <button onClick={toggleShadows} className="btn-neon w-full">
          Shadows: {enableShadows ? 'ON' : 'OFF'}
        </button>
      </aside>

      {/* 3D Viewer */}
      <div className="flex-1">
        <CanvasContainer>
          <LightingRig />
          <Suspense fallback={<Loader />}>
            <YourModel color={modelColor} scale={modelScale} />
          </Suspense>
        </CanvasContainer>
      </div>
    </div>
  );
}
```

### Pattern 4: Performance-Optimized Mobile

```tsx
'use client';

import { useIsMobile } from '@/hooks';

function Scene() {
  const isMobile = useIsMobile();

  return (
    <>
      {/* Use minimal lighting on mobile */}
      {isMobile ? <MinimalLightingRig /> : <LightingRig />}

      <Suspense fallback={<Loader />}>
        {/* Load low-poly model on mobile */}
        {isMobile ? <LowPolyModel /> : <HighPolyModel />}
      </Suspense>
    </>
  );
}

export default function OptimizedPage() {
  return (
    <div className="w-full h-screen">
      <CanvasContainer autoAdjustPerformance>
        <Scene />
      </CanvasContainer>
    </div>
  );
}
```

### Pattern 5: Multiple Models

```tsx
function Scene() {
  return (
    <>
      <LightingRig />
      <Suspense fallback={<Loader />}>
        <Model1 position={[-3, 0, 0]} />
        <Model2 position={[0, 0, 0]} />
        <Model3 position={[3, 0, 0]} />
        
        {/* Ground plane */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]} receiveShadow>
          <planeGeometry args={[20, 20]} />
          <meshStandardMaterial color="#0a0a0a" />
        </mesh>
      </Suspense>
    </>
  );
}
```

---

## Performance Best Practices

### 1. Model Optimization

```bash
# Aggressive compression for large models
npm run compress-models:aggressive

# Check file size
ls -lh public/models/*.glb

# Target sizes:
# - Hero models: < 2 MB
# - Product models: < 500 KB
# - Icons/props: < 100 KB
```

### 2. Lazy Loading

```tsx
// Load models on demand
const HeavyModel = dynamic(
  () => import('@/components/three/HeavyModel').then(m => m.HeavyModel),
  { ssr: false }
);

// Conditional loading
{isVisible && (
  <Suspense fallback={<Loader />}>
    <HeavyModel />
  </Suspense>
)}
```

### 3. LOD (Level of Detail)

```tsx
import { Detailed } from '@react-three/drei';

<Detailed distances={[0, 10, 20]}>
  <HighPolyModel />   {/* < 10 units away */}
  <MediumPolyModel /> {/* 10-20 units away */}
  <LowPolyModel />    {/* > 20 units away */}
</Detailed>
```

### 4. Instancing for Repeated Objects

```tsx
import { Instances, Instance } from '@react-three/drei';

<Instances limit={1000}>
  <boxGeometry />
  <meshStandardMaterial />
  {positions.map((pos, i) => (
    <Instance key={i} position={pos} />
  ))}
</Instances>
```

### 5. Performance Monitoring

```tsx
import { Stats, PerformanceMonitor } from '@react-three/drei';

<Canvas>
  <Stats />
  <PerformanceMonitor
    onIncline={() => console.log('Performance improved')}
    onDecline={() => console.log('Performance degraded')}
  >
    {/* Scene */}
  </PerformanceMonitor>
</Canvas>
```

---

## Debugging Guide

### Issue: "window is not defined"

**Cause:** 3D component imported without `ssr: false`

**Fix:**
```tsx
// ❌ Wrong
import { CanvasContainer } from '@/components/three';

// ✅ Correct
const CanvasContainer = dynamic(
  () => import('@/components/three').then(m => m.CanvasContainer),
  { ssr: false }
);
```

### Issue: Model doesn't appear

**Checklist:**
1. ✅ Model file in `/public/models/`?
2. ✅ Correct path: `/models/file.glb` (no /public/)?
3. ✅ Draco decoder path: `useGLTF('/models/file.glb', '/draco/')`?
4. ✅ Lighting added: `<LightingRig />` or `<ambientLight />`?
5. ✅ Camera position correct (not inside model)?
6. ✅ Model scale appropriate?

**Debug:**
```tsx
// Add helpers to visualize coordinate system
<axesHelper args={[5]} />
<gridHelper args={[10, 10]} />

// Log model data
const { scene } = useGLTF('/models/file.glb', '/draco/');
console.log('Model loaded:', scene);
```

### Issue: Black screen

**Cause:** No lighting

**Fix:**
```tsx
<Canvas>
  <LightingRig />  {/* Add lighting */}
  <YourModel />
</Canvas>
```

### Issue: Low FPS

**Solutions:**
1. Enable auto performance:
   ```tsx
   <CanvasContainer autoAdjustPerformance>
   ```

2. Reduce model complexity:
   ```bash
   npm run compress-models:aggressive
   ```

3. Use minimal lighting on mobile:
   ```tsx
   {isMobile ? <MinimalLightingRig /> : <LightingRig />}
   ```

4. Lower DPR:
   ```tsx
   <Canvas dpr={1}>
   ```

5. Disable shadows:
   ```tsx
   <Canvas shadows={false}>
   ```

### Issue: Draco decoder error

**Cause:** Decoder files missing or wrong path

**Fix:**
```bash
# Verify decoder exists
ls public/draco/draco_decoder.wasm

# If missing, recopy
cp -r node_modules/three/examples/jsm/libs/draco/* public/draco/

# Verify path in code
useGLTF('/models/file.glb', '/draco/') // ✅ Correct
useGLTF('/models/file.glb', 'draco/')  // ❌ Wrong
```

### Issue: Build fails

**Common causes:**
1. Missing `'use client'` directive
2. Importing 3D components without dynamic import
3. TypeScript errors in model components

**Fix:**
```bash
# Clear cache
rm -rf .next

# Rebuild
npm run build

# Check errors in terminal
```

---

## Quick Reference Card

```tsx
// ===== IMPORTS =====
'use client';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';

const CanvasContainer = dynamic(
  () => import('@/components/three').then(m => m.CanvasContainer),
  { ssr: false }
);

// ===== BASIC SCENE =====
<CanvasContainer>
  <LightingRig />
  <Suspense fallback={<Loader />}>
    <YourModel />
  </Suspense>
</CanvasContainer>

// ===== LOAD MODEL =====
import { useGLTF } from '@react-three/drei';
const { scene } = useGLTF('/models/file.glb', '/draco/');
<primitive object={scene} />

// ===== HOOKS =====
const { toggleShadows, setReducedEffects } = useThreeStore();
const isMobile = useIsMobile(768);

// ===== COMPRESSION =====
npm run compress-models
npm run compress-models:aggressive
npm run compress-models:quality
```

---

## Next Steps

1. **Try the Demo**: Visit `/three-demo` to see working examples
2. **Read Full Docs**: See `3D_PIPELINE_DOCUMENTATION.md` for complete reference
3. **Quick Start**: Use `3D_QUICK_START.md` for fast setup
4. **Get Models**: Download free models from Sketchfab, Poly Pizza, or Mixamo
5. **Compress**: Use `npm run compress-models` before deploying
6. **Test Mobile**: Always test on real devices, not just desktop

---

**Happy Building! 🚀**
