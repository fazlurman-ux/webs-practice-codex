# Production 3D Models

This directory contains compressed, production-ready 3D models.

## File Format

All models should be in **GLB** (binary glTF) format with **Draco compression** enabled.

## Naming Convention

Use descriptive, kebab-case names:
- ✅ `hero-character.glb`
- ✅ `product-model-v2.glb`
- ✅ `environment-scene.glb`
- ❌ `model1.glb`
- ❌ `MyModel.glb`

## Compression Requirements

All models in this directory must be compressed with gltfpack:

```bash
gltfpack -i source.gltf -o hero-character.glb -cc -tc
```

See `/assets/models/README.md` for detailed compression instructions.

## File Size Guidelines

| Model Type | Recommended Max Size |
|------------|---------------------|
| Hero model | 2 MB |
| Product model | 500 KB |
| Icon/small prop | 100 KB |
| Environment/scene | 5 MB |

## Loading Models

Load models using the `useGLTF` hook from Drei:

```tsx
import { useGLTF } from '@react-three/drei';

function MyModel() {
  // Important: Provide '/draco/' as second parameter for decompression
  const { scene } = useGLTF('/models/hero-character.glb', '/draco/');
  
  return <primitive object={scene} />;
}

// Preload for better performance
useGLTF.preload('/models/hero-character.glb', '/draco/');
```

## Testing Models

Before deploying, test models:

1. **Validate structure:**
   ```bash
   npx gltf-validator models/your-model.glb
   ```

2. **Preview in browser:**
   - Upload to https://gltf.report/
   - Or use https://gltf-viewer.donmccurdy.com/

3. **Check performance:**
   - Import into your scene
   - Open browser DevTools → Performance
   - Verify FPS stays above 60

## Model Checklist

Before adding a model to this directory:

- [ ] Compressed with Draco (gltfpack -cc)
- [ ] File size under recommended limits
- [ ] Validated with gltf-validator
- [ ] Tested in browser with target devices
- [ ] Materials/textures optimized
- [ ] UV maps properly unwrapped
- [ ] No unnecessary animations or cameras

## Troubleshooting

**Model doesn't load:**
- Verify file path: `/models/filename.glb` (relative to public/)
- Check Draco decoder exists: `/public/draco/draco_decoder.wasm`
- Ensure model is valid: Use gltf-validator

**Model looks broken:**
- Re-compress with higher quality: `gltfpack -i source.gltf -o model.glb -cc -vp 14`
- Reduce simplification: Remove `-si` flag
- Check materials in 3D software

**Performance issues:**
- Further compress: `gltfpack -i model.glb -o model-optimized.glb -cc -si 0.5`
- Reduce texture sizes
- Use LOD (Level of Detail) meshes

## Example Models

Sample placeholder models are available in this directory:

- `sample.glb` - Basic geometry demonstration (cube, sphere, cylinder)

Replace these with your actual production models.

---

For complete documentation, see: `/3D_PIPELINE_DOCUMENTATION.md`
