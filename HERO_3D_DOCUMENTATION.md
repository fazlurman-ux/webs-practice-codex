# Hero 3D Section Documentation

## Overview

The Hero 3D section is a full-screen interactive experience featuring React Three Fiber (R3F) with smooth camera controls, scroll-driven animations, and Framer Motion integration.

## Features

### 1. 3D Product Showcase
- **Placeholder Model**: Torus knot with neon accent spheres (replace with actual product GLTF)
- **Lighting**: Neon-themed lighting rig with colored accent lights
- **Background Particles**: GPU-efficient instanced mesh system (100 particles on desktop, 50 on mobile)
- **60fps Performance**: Optimized for smooth interaction on desktop

### 2. Camera Controls

#### Mouse/Touch Rotation
- **Logic**: Mouse position normalized to [-1, 1] range drives model rotation on X/Y axes
- **Constraints**: Rotation limited to ±15° to prevent disorientation
- **Interpolation**: Smooth lerp (linear interpolation) with 5% factor for natural feel
- **Touch Support**: Touch gestures use same logic as mouse for consistent mobile UX
- **Idle Animation**: Gentle auto-rotation and float when no interaction

#### Scroll-driven Camera Dolly
- **Effect**: Model moves backward on Z-axis as user scrolls (0 → -2 units)
- **Scale Compensation**: Model scales up slightly (1.0 → 1.2) to maintain visual presence
- **Integration**: Uses Framer Motion's `useScroll` hook with target ref
- **Smooth Easing**: 3% interpolation factor prevents jarring transitions

### 3. Framer Motion Animations

#### Staggered Text Entrance
- **Container**: Parent animation with `staggerChildren: 0.15s`, `delayChildren: 0.3s`
- **Items**: Fade in with upward motion (y: 30 → 0), 0.8s duration, custom easing curve
- **Easing**: `[0.25, 0.46, 0.45, 0.94]` for smooth acceleration/deceleration

#### Button Hover States
- **Scale Animation**: 1.0 → 1.05 on hover, 0.95 on tap
- **Transition**: 0.2s with `easeOut` for responsive feel
- **Entrance**: Scale from 0.8 with `backOut` easing for playful bounce

#### Floating Scroll Cue
- **Indicator**: Animated dot inside rounded border with continuous bounce
- **Border Pulse**: Color cycles between gray and neon purple (2s loop)
- **Delay**: 2s entrance delay to avoid overwhelming initial load
- **Accessibility**: Proper ARIA labels and keyboard navigation

### 4. Background Effects

#### Animated Gradient
- **Base**: Linear gradient from dark-950 through dark-850 to dark-900
- **Overlay**: Radial gradient for vignette effect (improves text readability)

#### Particle Field
- **Rendering**: Single instanced mesh for all particles (efficient draw call)
- **Motion**: Circular drift in 3D space with sine/cosine waves
- **Colors**: Three neon colors matching theme palette (purple, lime, cyan)
- **Position**: Behind model (Z: -5 to -20) for depth parallax
- **Performance**: Reduced particle count on mobile (50 vs 100)

### 5. Responsive Design

#### Mobile Optimizations
- **Particle Count**: Reduced to 50 (from 100) on devices < 768px
- **Effects**: Automatic reduced quality via `autoAdjustPerformance` prop
- **Touch Controls**: Native touch gesture support (same as mouse)
- **Typography**: Responsive text sizes (5xl → 8xl based on viewport)
- **Layout**: Buttons stack vertically on small screens

#### Performance Modes
- **Desktop**: Full effects, 100 particles, anti-aliasing, shadows
- **Mobile**: Reduced effects, 50 particles, lower DPR, disabled shadows
- **Auto-detection**: Uses `useIsMobile` hook with 768px breakpoint

### 6. Accessibility

#### Keyboard Navigation
- **Buttons**: Full tab navigation with neon ring focus states
- **Scroll Cue**: Keyboard focusable with `tabIndex={0}`
- **ARIA Labels**: Descriptive labels for interactive elements

#### Semantic HTML
- **Structure**: Proper `<section>` with heading hierarchy
- **Roles**: ARIA roles for non-standard interactive elements
- **Focus Management**: Visible focus indicators on all interactive elements

## Component Architecture

### File Structure
```
/components/
├── HeroSection.tsx           # Main hero component with overlay content
├── three/
│   ├── Hero3DModel.tsx       # Product model with camera controls
│   ├── HeroBackground.tsx    # Instanced particle system
│   ├── CanvasContainer.tsx   # R3F Canvas wrapper (existing)
│   ├── LightingRig.tsx       # Lighting presets (existing)
│   └── index.ts              # Barrel exports
```

### Component Props

#### HeroSection
No props - fully self-contained section component.

#### Hero3DModel
```typescript
interface Hero3DModelProps {
  mousePosition?: { x: number; y: number };  // Normalized [-1, 1]
  scrollProgress?: number;                    // Scroll progress [0, 1]
  enableTouch?: boolean;                      // Touch gesture support
}
```

#### HeroBackground
```typescript
interface HeroBackgroundProps {
  particleCount?: number;    // Number of particles (default: 100)
  reduced?: boolean;         // Low-power mode toggle
}
```

## Usage

### Basic Integration
```tsx
import { HeroSection } from '@/components/HeroSection';

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        {/* Rest of page content */}
      </main>
      <Footer />
    </>
  );
}
```

### Custom Product Model
Replace placeholder in `Hero3DModel.tsx`:
```tsx
import { useGLTF } from '@react-three/drei';

export function Hero3DModel({ mousePosition, scrollProgress }) {
  const { scene } = useGLTF('/models/product.glb', '/draco/');
  const groupRef = useRef<Group>(null);

  useFrame((state, delta) => {
    // Camera control logic (same as placeholder)
    if (!groupRef.current) return;
    
    const targetRotation = {
      x: mousePosition.y * 0.15,
      y: mousePosition.x * 0.15,
    };
    
    groupRef.current.rotation.x += (targetRotation.x - groupRef.current.rotation.x) * 0.05;
    groupRef.current.rotation.y += (targetRotation.y - groupRef.current.rotation.y) * 0.05;
    
    const scrollZ = scrollProgress * -2;
    const scrollScale = 1 + scrollProgress * 0.2;
    
    groupRef.current.position.z += (scrollZ - groupRef.current.position.z) * 0.03;
    
    const currentScale = groupRef.current.scale.x;
    const newScale = currentScale + (scrollScale - currentScale) * 0.03;
    groupRef.current.scale.set(newScale, newScale, newScale);
  });

  return (
    <group ref={groupRef}>
      <primitive object={scene} />
    </group>
  );
}
```

## Camera Control Logic Explained

### Mouse/Touch Rotation
```typescript
// 1. Normalize mouse position to [-1, 1] range
const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
const y = ((e.clientY - rect.top) / rect.height) * 2 - 1;

// 2. Calculate target rotation (constrained to ±15°)
const targetRotation = {
  x: mousePosition.y * 0.15,  // Vertical mouse controls X-axis (pitch)
  y: mousePosition.x * 0.15,  // Horizontal mouse controls Y-axis (yaw)
};

// 3. Smooth interpolation (lerp) for natural feel
// Formula: current + (target - current) * factor
rotation.x += (targetRotation.x - rotation.x) * 0.05;  // 5% per frame = ~0.5s to target
rotation.y += (targetRotation.y - rotation.y) * 0.05;
```

**Why lerp?**
- Prevents instant jumps (jarring)
- Creates smooth easing (feels natural)
- Factor controls responsiveness: higher = faster, lower = more damping
- At 60fps, 0.05 factor = ~0.5s to reach target (smooth but responsive)

### Scroll-driven Dolly
```typescript
// 1. Framer Motion provides scroll progress [0, 1]
const { scrollYProgress } = useScroll({
  target: containerRef,
  offset: ['start start', 'end start'],  // From top to when section leaves top
});

// 2. Transform to 3D space
const scrollZ = scrollProgress * -2;        // Move back 2 units
const scrollScale = 1 + scrollProgress * 0.2;  // Scale up 20%

// 3. Smooth interpolation (prevents jarring on scroll)
position.z += (scrollZ - position.z) * 0.03;
scale.x += (scrollScale - scale.x) * 0.03;
```

**Why scale compensation?**
- Object appears smaller as it moves away (perspective)
- Scaling up maintains visual weight
- Creates depth without losing presence

## Performance Optimization

### Instanced Rendering
- **Problem**: 100 particle meshes = 100 draw calls (expensive)
- **Solution**: Single instanced mesh with 100 instances = 1 draw call
- **Impact**: 10-100x performance improvement

### Reduced Effects Mode
- **Triggers**: Mobile device detection, low battery, performance issues
- **Changes**: 
  - Particle count: 100 → 50
  - DPR: [1, 2] → [1, 1.5]
  - Anti-aliasing: disabled
  - Shadows: disabled

### Frame Rate Target
- **Target**: 60fps (16.67ms per frame)
- **Monitoring**: Use React DevTools Profiler
- **Optimization**: Keep `useFrame` logic under 8ms (leaves headroom for rendering)

## Common Issues & Solutions

### Issue: Model doesn't rotate smoothly
**Solution**: Increase lerp factor (0.05 → 0.08) for faster response, or decrease (0.05 → 0.03) for more damping.

### Issue: Scroll effect too subtle
**Solution**: Increase Z distance (scrollProgress * -2 → scrollProgress * -4) or scale factor (0.2 → 0.4).

### Issue: Performance drops on mobile
**Solution**: Further reduce particle count (50 → 25) or disable background entirely.

### Issue: Mouse rotation inverted
**Solution**: Flip signs in targetRotation calculation (multiply by -0.15 instead of 0.15).

### Issue: Text hard to read over 3D
**Solution**: Increase vignette overlay opacity or add text-shadow to typography.

## Browser Compatibility

### WebGL Requirements
- **Minimum**: WebGL 1.0
- **Recommended**: WebGL 2.0 for better performance
- **Fallback**: Provide static image for browsers without WebGL

### Tested Browsers
- ✅ Chrome/Edge 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Mobile Safari iOS 14+
- ✅ Chrome Android

## Future Enhancements

### Potential Improvements
1. **LOD System**: Multiple model detail levels based on distance/performance
2. **Post-processing**: Bloom effect for enhanced neon glow (via @react-three/postprocessing)
3. **HDRI Lighting**: Environment maps for photorealistic reflections
4. **Physics**: Interactive physics simulation with @react-three/cannon
5. **AR Mode**: WebXR integration for augmented reality preview
6. **Shader Effects**: Custom shaders for advanced visual effects

### Advanced Camera Controls
```typescript
// Parallax depth layers
const backgroundParallax = scrollProgress * -1;  // Slower
const modelParallax = scrollProgress * -2;       // Medium
const foregroundParallax = scrollProgress * -4;  // Faster

// Inertia/momentum
const velocity = (current - previous) * 0.1;
position.x += velocity * 0.5;  // Drift effect
```

## Credits

- **3D Engine**: React Three Fiber + Three.js
- **Animation**: Framer Motion
- **Styling**: Tailwind CSS v4
- **State**: Zustand
- **Typography**: Oswald + Inter (next/font)

## Support

For issues or questions:
1. Check browser console for WebGL errors
2. Verify GPU acceleration is enabled
3. Test on different devices/browsers
4. Review React DevTools Profiler for performance bottlenecks
5. Check Three.js version compatibility (@react-three/fiber + three)
