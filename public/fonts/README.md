# Custom Fonts

Custom font files for typography.

## Supported Formats

- **.woff2** - Modern, compressed format (recommended)
- **.woff** - Widely supported web format
- **.ttf** - TrueType format
- **.otf** - OpenType format

## Best Practices

### File Size
- Use WOFF2 format for optimal compression
- Subsetting: Include only necessary characters
- Variable fonts: Single file for multiple weights
- Keep total font weight under 300KB per typeface

### Organization
```
fonts/
├── inter/
│   ├── inter-regular.woff2
│   ├── inter-semibold.woff2
│   └── inter-bold.woff2
├── playfair/
│   ├── playfair-bold.woff2
│   └── playfair-italic.woff2
└── code/
    └── jetbrains-mono-regular.woff2
```

## Using Fonts

### CSS Font Face
```css
/* styles/globals.css */
@font-face {
  font-family: 'Inter';
  src: url('/fonts/inter/inter-regular.woff2') format('woff2');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'Inter';
  src: url('/fonts/inter/inter-semibold.woff2') format('woff2');
  font-weight: 600;
  font-style: normal;
  font-display: swap;
}
```

### Tailwind CSS Integration
```typescript
// tailwind.config.ts
import type { Config } from 'tailwindcss';

export default {
  theme: {
    fontFamily: {
      sans: ['Inter', 'system-ui', 'sans-serif'],
      display: ['Playfair Display', 'serif'],
      mono: ['JetBrains Mono', 'monospace'],
    },
  },
} satisfies Config;
```

### Next.js Font Optimization
Use `next/font` for automatic optimization:

```typescript
// app/layout.tsx
import { Inter, Playfair_Display } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });
const playfair = Playfair_Display({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
```

## Font Optimization Tips

1. **Subsetting**
   - Include only used characters
   - Reduces file size significantly
   - Use online tools: Fonttools, FontForge

2. **Variable Fonts**
   - Single file for multiple weights/widths
   - Reduces HTTP requests
   - Better dynamic typography

3. **Font Display**
   - Use `font-display: swap` for better performance
   - Prevents invisible text while loading
   - Allows fallback fonts

4. **Caching**
   - Set proper cache headers
   - Fonts can be cached for long periods

## Free Font Resources

### High-Quality Free Fonts
- **Google Fonts**: Optimized, free, open-source
- **Fontsource**: NPM package font distribution
- **Inter**: Modern sans-serif (Open Source)
- **Playfair Display**: Elegant serif display font
- **JetBrains Mono**: Monospace for code

### Font Pairing
- **Fontpair**: Curated Google Fonts pairings
- **Typewolf**: Font inspiration and pairings
- **FontFlamingo**: AI-powered font pairing

## Converting Fonts

### Tools
- **FontForge**: Open-source font editor
- **Transfonter**: Online WOFF2 converter
- **Google Font Subsetter**: Online subsetting tool

### Command Line
```bash
# Using fonttools
fonttools subset input.ttf --unicodes=0x0-0x7E --output-file=output.woff2

# Using cwebp (for subset generation)
python -m fontTools.ttLib.woff2 font.ttf
```

## Performance Metrics

Monitor font performance:

```typescript
// components/FontMetrics.tsx
useEffect(() => {
  const fonts = document.fonts;
  fonts.ready.then(() => {
    console.log('All fonts loaded');
  });
}, []);
```

Track with Web Vitals:
- Cumulative Layout Shift (CLS)
- First Input Delay (FID)
- Largest Contentful Paint (LCP)
