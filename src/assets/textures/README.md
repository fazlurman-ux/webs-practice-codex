# Textures

Texture files for 3D models and materials.

## Supported Formats

- **.jpg/jpeg** - Compressed format, good for color maps
- **.png** - Lossless format, supports transparency
- **.webp** - Modern compressed format (recommended)
- **.basis** - GPU-compressed texture format (for real-time rendering)

## Texture Maps

### Common Texture Types

1. **Color/Diffuse Map**
   - RGB color information
   - Most important for visual appearance
   - Often the largest texture

2. **Normal Map**
   - Blue-channel encoded surface details
   - Simulates high-poly geometry on low-poly models
   - Typically PNG format to preserve quality

3. **Roughness Map**
   - Grayscale map controlling surface roughness
   - Black = reflective, White = matte

4. **Metallic Map**
   - Grayscale map for metallic properties
   - Black = non-metal, White = metal

5. **Ambient Occlusion (AO) Map**
   - Grayscale map for shadow details
   - Adds depth to crevices and corners

6. **Height/Displacement Map**
   - Grayscale map for geometric displacement
   - Creates surface relief

## Best Practices

### File Size & Format

- Use power-of-two dimensions: 512x512, 1024x1024, 2048x2048
- Prefer WebP for color maps (50% smaller than JPEG)
- Use PNG for normal maps to avoid compression artifacts
- Keep total texture budget under 20MB per scene

### Organization

```
textures/
├── characters/
│   ├── character1_color.webp
│   ├── character1_normal.png
│   ├── character1_roughness.webp
│   └── character1_metallic.webp
├── environments/
│   ├── floor_color.webp
│   └── floor_normal.png
└── materials/
    ├── wood_color.webp
    ├── wood_normal.png
    └── metal_roughness.webp
```

### Quality Guidelines

- Color maps: Compress at 85-90% quality
- Normal maps: Use lossless PNG
- Data maps (roughness/metallic): PNG or highly compressed
- Always save source textures at highest quality

## Using Textures in React Three Fiber

```typescript
import { useTexture } from '@react-three/drei';

function Material() {
  const textures = useTexture({
    map: '/textures/color.webp',
    normalMap: '/textures/normal.png',
    roughnessMap: '/textures/roughness.webp',
    metalnessMap: '/textures/metallic.webp',
  });

  return (
    <mesh>
      <meshStandardMaterial {...textures} />
    </mesh>
  );
}
```

### Preloading Textures

Preload textures for smooth loading:

```typescript
useTexture.preload('/textures/color.webp');
useTexture.preload('/textures/normal.png');
```

## Texture Optimization Tips

1. **Resolution Appropriate for Use**
   - Distant objects: 512x512 or 1024x1024
   - Close objects: 2048x2048 or higher
   - UI overlays: Match screen resolution

2. **Compression**
   - Use WebP for color maps
   - Use PNG for normal maps
   - Consider BASIS for mobile

3. **Mipmapping**
   - Enables automatic downscaling
   - Improves performance at distance
   - Increases memory by 33%

4. **Texture Atlasing**
   - Combine multiple textures into one
   - Reduces draw calls
   - Use UVs to select regions

## Tools for Texture Creation

### Texture Painting

- **Substance Painter**: Industry-standard
- **Clip Studio Paint**: Good for hand-painted textures
- **Procreate Dreams**: iPad alternative
- **Krita**: Free open-source option

### Procedural Generation

- **Substance Designer**: Procedural texture creation
- **Blender Shader Editor**: Free alternative
- **Materialize**: GPU-based texture generator

### Photo-Based Textures

- **Texturing.XYZ**: High-quality CC0 textures
- **Poly Haven**: Free textures and HDRIs
- **Ambient CG**: CC0 materials database
- **CC0 Textures**: Large free texture library

### Format Conversion

- **ImageMagick**: Command-line image processing
- **IrfanView**: Batch format conversion
- **GIMP**: Free image editing with export options
