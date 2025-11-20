# 3D Models Directory

This directory contains source 3D model files before compression.

## Directory Structure

```
/assets/models/          # Source models (GLTF, FBX, OBJ, BLEND)
/public/models/          # Compressed production-ready models
```

## Compression Workflow

### 1. Install gltfpack

```bash
npm install -g gltfpack
```

Or use npx:
```bash
npx gltfpack -i model.gltf -o ../public/models/model.glb -cc
```

### 2. Compress Your Models

**Basic Draco Compression:**
```bash
gltfpack -i your-model.gltf -o ../public/models/your-model.glb -cc
```

**With Texture Compression:**
```bash
gltfpack -i your-model.gltf -o ../public/models/your-model.glb -cc -tc
```

**Maximum Compression (with mesh simplification):**
```bash
gltfpack -i your-model.gltf -o ../public/models/your-model.glb -cc -tc -si 0.7
```

**High Quality Compression:**
```bash
gltfpack -i your-model.gltf -o ../public/models/your-model.glb -cc -vp 14 -vt 12 -vn 10
```

### 3. Compression Options

| Option | Description | Example |
|--------|-------------|---------|
| `-cc` | Compress geometry with Draco | Required |
| `-tc` | Compress textures with KTX2 | Recommended |
| `-si [0-1]` | Simplify mesh (1.0 = none, 0.5 = 50% reduction) | `-si 0.7` |
| `-vp [bits]` | Position quantization (10-16) | `-vp 14` |
| `-vt [bits]` | Texture coordinate quantization (8-16) | `-vt 12` |
| `-vn [bits]` | Normal quantization (8-16) | `-vn 10` |
| `-noq` | Disable quantization (highest quality) | Optional |

### 4. Validate Compressed Models

Use glTF Validator to check compressed models:
```bash
npx gltf-validator ../public/models/your-model.glb
```

Or use online tools:
- https://gltf.report/ (analysis and preview)
- https://gltf-viewer.donmccurdy.com/ (viewer)

## Alternative: Blender Export

If you have Blender installed, you can export with Draco compression directly:

1. File → Export → glTF 2.0 (.glb/.gltf)
2. In export options:
   - Format: glTF Binary (.glb)
   - Compression: Check "Draco mesh compression"
   - Compression level: 6-10 (higher = more compression)
3. Export to `/public/models/`

## Expected File Sizes

| Model Type | Original GLTF | Compressed GLB | Reduction |
|------------|---------------|----------------|-----------|
| Simple cube | 5 KB | 1 KB | 80% |
| Low-poly character | 500 KB | 50 KB | 90% |
| Medium-poly prop | 5 MB | 500 KB | 90% |
| High-poly scene | 50 MB | 5 MB | 90% |

## Sample Models

You can download free sample models from:

- **Sketchfab** (https://sketchfab.com/feed) - Filter by "Downloadable" and "CC License"
- **Google Poly Archive** (https://poly.pizza/)
- **Mixamo** (https://www.mixamo.com/) - Animated characters
- **Quaternius** (https://quaternius.com/) - Low-poly assets
- **Kenney Assets** (https://kenney.nl/assets) - Game-ready models

## Loading Models in Components

After compressing and placing models in `/public/models/`, load them in your components:

```tsx
import { useGLTF } from '@react-three/drei';

function MyModel() {
  const { scene } = useGLTF('/models/your-model.glb', '/draco/');
  return <primitive object={scene} />;
}

// Preload for better performance
useGLTF.preload('/models/your-model.glb', '/draco/');
```

## Tips

1. **Always compress before deploying** - Raw GLTF files can be 10-100x larger
2. **Test in browser** - Some compressions may introduce artifacts
3. **Balance quality and size** - Use `-si` carefully, start with 0.8-0.9
4. **Keep source files** - Store originals here for future re-compression
5. **Version control** - Consider using Git LFS for large model files
6. **Batch processing** - Create a script to compress multiple models:

```bash
#!/bin/bash
for file in *.gltf; do
  gltfpack -i "$file" -o "../public/models/${file%.gltf}.glb" -cc -tc
done
```

## Troubleshooting

**Model looks broken after compression:**
- Reduce simplification: `-si 0.9` or remove `-si` entirely
- Increase quantization bits: `-vp 14 -vt 12 -vn 10`
- Use `-noq` for no quantization (larger file)

**Compression takes too long:**
- Use `-c` instead of `-cc` for faster (but less) compression
- Simplify mesh first: `-si 0.5` (but test quality)

**Model doesn't load in browser:**
- Validate with gltf-validator
- Check that Draco decoder files exist in `/public/draco/`
- Verify model path is correct (relative to `/public/`)

---

For more information, see the main 3D Pipeline Documentation: `/3D_PIPELINE_DOCUMENTATION.md`
