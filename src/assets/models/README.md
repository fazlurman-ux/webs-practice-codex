# 3D Models

3D model files for use with Three.js and React Three Fiber.

## Supported Formats

- **.glb** - Binary glTF format (recommended, optimized)
- **.gltf** - Textual glTF format
- **.fbx** - Autodesk FBX format (requires loader)
- **.obj** - Wavefront OBJ format (requires loader)

## Best Practices

### File Size

- Keep models under 5MB for web use
- Use .glb format for better compression
- Consider LOD (Level of Detail) for complex models

### Organization

```
models/
├── characters/
│   ├── character1.glb
│   └── character2.glb
├── environments/
│   ├── room.glb
│   └── landscape.glb
└── props/
    ├── table.glb
    └── chair.glb
```

### Loading Models

```typescript
// components/Scene.tsx
import { useGLTF } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';

function Model() {
  const { scene } = useGLTF('/models/example.glb');
  return <primitive object={scene} />;
}

export function Scene() {
  return (
    <Canvas>
      <ambientLight intensity={0.5} />
      <Model />
    </Canvas>
  );
}
```

### Preloading Models

Preload models for better performance:

```typescript
useGLTF.preload('/models/example.glb');
```

### Model Optimization

Tips for optimizing models:

1. **Reduce Polygons**: Use decimation in Blender
2. **Bake Textures**: Combine multiple textures into one
3. **Remove Unused**: Delete unused materials and geometry
4. **Compression**: Use DRACO compression for .glb files
5. **LOD Models**: Create simplified versions for distance

## Texture Optimization

- Ensure textures are power-of-two sizes (1024x1024, 2048x2048)
- Use compressed formats (.webp, .basis)
- Keep texture file sizes under 2MB each
- Use texture atlasing for multiple textures

## Tools

### Model Creation & Editing

- **Blender**: Free, open-source 3D modeling software
- **Spline**: Browser-based 3D design tool
- **Nomad Sculpt**: Mobile 3D sculpting app

### Model Optimization

- **glTF Transform**: Optimize glTF/glb files
- **Draco**: Compress 3D geometry
- **Meshopt**: Additional compression codec

### Format Conversion

- **Babylon.js Sandbox**: Browser-based model viewer and converter
- **Blender**: Export to different formats
- **assimp**: Asset import library with command-line tool

## Loading and Using

```typescript
// Using React Three Fiber
import { useGLTF, useAnimations } from '@react-three/drei';

export function Character() {
  const { scene, animations } = useGLTF('/models/character.glb');
  const { actions } = useAnimations(animations, scene);

  useEffect(() => {
    actions.walk?.play();
  }, [actions]);

  return <primitive object={scene} />;
}
```

## Performance Considerations

- Use Suspense for loading states
- Implement model pooling for repeated models
- Use frustum culling for off-screen models
- Consider using LOD (Level of Detail) for complex scenes
- Profile with React DevTools Profiler
