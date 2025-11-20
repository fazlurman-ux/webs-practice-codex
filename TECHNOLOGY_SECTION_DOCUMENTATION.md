# TechnologySection Documentation

## Overview

The `TechnologySection` component provides an interactive breakdown of product features using synchronized tabs, 3D visualization, and smooth transitions. It leverages Valtio for state management and React Three Fiber for 3D rendering.

## Features

- **Interactive Tab Navigation**: Switch between different technology features (Materials, Comfort, Performance)
- **3D Scene Synchronization**: Camera positions, lighting, and animations sync with active feature
- **Smooth Transitions**: Framer Motion + R3F useSpring for natural animations
- **Performance Optimization**: Mobile fallbacks and reduced motion support
- **Scroll-based Zoom**: Optional enhancement with graceful degradation
- **Responsive Design**: Adapts from desktop 3D experience to mobile static imagery

## State Management

The component uses Valtio for centralized state management:

```typescript
// State structure
{
  activeFeatureId: string,           // Current active feature
  features: TechFeature[],           // Available features
  cameraTransitioning: boolean,      // Transition state for UI feedback
  currentCameraPosition: [x, y, z],  // Synchronized camera position
  currentLightingPreset: string,     // Active lighting mode
  reducedMotion: boolean,            // Performance preference
  enable3D: boolean                  // 3D capability flag
}
```

## Usage

### Basic Implementation

```tsx
import { TechnologySection } from '@/components/TechnologySection';

export default function ProductPage() {
  return (
    <>
      <Navbar />
      <main>
        <TechnologySection />
      </main>
      <Footer />
    </>
  );
}
```

### Custom Features

```tsx
// Define custom features with 3D properties
const customFeatures: TechFeature[] = [
  {
    id: 'feature-1',
    name: 'Feature Name',
    description: 'Brief description',
    detailedDescription: 'Full detailed description...',
    cameraPosition: [2, 1.5, 3],      // Camera position for this feature
    cameraTarget: [0, 0, 0],          // Camera look-at target
    lightingPreset: 'focused',        // Lighting mode
    highlightColor: '#e91e8c',        // Feature accent color
    transitionDuration: 1200,         // Animation duration (ms)
    zoomLevel: 1.2,                   // Feature-specific zoom
  },
  // ... more features
];

// Set custom features in the store
useTechStore.setFeatures(customFeatures);
```

## 3D Integration

### Camera Transitions

Camera positions and targets are synchronized with the active feature:

```typescript
// Feature configuration
{
  cameraPosition: [x, y, z],  // Camera world position
  cameraTarget: [x, y, z],    // Camera look-at point
  zoomLevel: 1.5,             // Additional zoom multiplier
}
```

### Lighting Presets

Four lighting presets are available:

- `standard`: Three-point lighting with shadows
- `neon`: Stylized neon-colored lights
- `minimal`: Performance-optimized single light
- `focused`: Dramatic spotlight effect

### Component Visibility

Different 3D components are shown based on the active feature:

```typescript
// Feature-specific component rendering
const showMaterials = activeFeatureId === 'materials';
const showComfort = activeFeatureId === 'comfort';
const showPerformance = activeFeatureId === 'performance';
```

## Performance Optimization

### Mobile Fallbacks

- Automatic detection via `useIsMobile` hook
- 3D disabled on mobile devices
- Static imagery with feature icons
- Reduced animations for accessibility

### Reduced Motion Support

```typescript
// Respect user preferences
useTechStore.setReducedMotion(true);
// Automatically disables 3D transitions
```

### Scroll-based Zoom

Optional enhancement with Framer Motion:

```typescript
const { scrollYProgress } = useScroll({
  target: threeContainerRef,
  offset: ['start end', 'end start'],
});

const zoomLevel = useTransform(scrollYProgress, [0, 1], [1, 1.3]);
```

## Animation System

### Framer Motion Variants

```typescript
const contentVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};
```

### R3F Spring Animations

```typescript
const [springProps, api] = useSpring(() => ({
  position: [0, 0, 0],
  rotation: [0, 0, 0],
  scale: 1,
  config: { mass: 1, tension: 170, friction: 26 },
}));
```

## Feature Annotations

3D annotations provide contextual information:

```typescript
const annotations = {
  materials: [
    { position: [1.2, 0.5, 0], text: 'Carbon Fiber' },
    { position: [0, -1.5, 0], text: 'Titanium Alloy' },
  ],
  // ... other features
};
```

## Accessibility

- Full keyboard navigation for tabs
- ARIA labels for interactive elements
- Semantic HTML structure
- Reduced motion support
- Focus management
- Screen reader friendly content

## Browser Compatibility

- **Desktop**: Full 3D experience with WebGL
- **Mobile**: Fallback to static imagery
- **Reduced Performance**: Automatic optimization
- **No WebGL**: Graceful degradation to 2D

## Styling

Uses Tailwind CSS with custom theme variables:

```css
/* Theme integration */
.bg-black/20                    /* Semi-transparent backgrounds */
.border-neon-purple/20         /* Accent borders */
.text-neon-cyan                /* Accent text colors */
```

## Error Handling

```typescript
// Store error management
useTechStore.setError('Failed to load 3D model');
useTechStore.clearError();
```

## Demo Pages

- `app/tech-demo/page.tsx`: Standalone demo
- `app/page.tsx`: Integrated in homepage

## Dependencies

```json
{
  "valtio": "^5.0.8",
  "@react-spring/three": "^9.7.3",
  "@react-three/fiber": "^9.4.0",
  "@react-three/drei": "^10.7.6",
  "framer-motion": "^12.23.24"
}
```

## Troubleshooting

### Common Issues

1. **3D not rendering on mobile**: Expected behavior - shows fallback imagery
2. **Jerky animations**: Check device performance and enable reduced motion
3. **State not updating**: Ensure Valtio store is properly initialized
4. **Camera transitions not working**: Verify cameraPosition and cameraTarget are set

### Debug Tips

```typescript
// Monitor state changes
console.log(useSnapshot(useTechStore));

// Check 3D capability
console.log('3D enabled:', techSnap.enable3D);
console.log('Mobile:', isMobile);
```

## Future Enhancements

- Model hotspots with click interactions
- Gesture-based camera controls
- Feature comparison mode
- Export/share functionality
- VR/AR support integration