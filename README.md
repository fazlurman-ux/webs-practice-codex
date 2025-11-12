# Premium Dark Theme - Tailwind CSS Setup

A modern Next.js project with a custom Tailwind CSS theme featuring dark backgrounds, neon accents, and 3D depth effects inspired by premium athletic brands like Nike.

## 🎨 Features

- **Dark Premium Aesthetic**: Carefully crafted dark background palette with black/charcoal shades
- **Neon Accent Colors**: Electric purple (#e91e8c), lime green (#39ff14), and cyan (#00d9ff)
- **3D Depth Effects**: Professional depth shadows and layering for visual hierarchy
- **Premium Typography**: Oswald (condensed headings) + Inter (body) + JetBrains Mono (code)
- **Glass Morphism**: Modern frosted glass effects with backdrop filters
- **Responsive Design**: Mobile-first design with breakpoints for all screen sizes
- **Custom Animations**: Pulse, glow, and float animations with neon effects
- **Pre-built Components**: Button, Card, Badge, Container, Section components
- **CSS Variables**: Fully customizable color and shadow system
- **Tailwind v4**: Latest Tailwind CSS with new @theme syntax

## 🚀 Quick Start

### Installation

```bash
npm install
# or
yarn install
```

### Development Server

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the demo.

### Build for Production

```bash
npm run build
npm start
```

## 📁 Project Structure

```
project/
├── app/
│   ├── layout.tsx           # Root layout with font imports
│   ├── page.tsx             # Demo page with theme showcase
│   ├── globals.css          # Global styles & CSS variables
│   └── favicon.ico
├── components/
│   ├── Button.tsx           # Button component (4 variants)
│   ├── Card.tsx             # Card component (4 variants)
│   ├── Badge.tsx            # Badge component (4 colors)
│   ├── Container.tsx        # Container component
│   ├── Section.tsx          # Section component (padding & variants)
│   └── index.ts             # Component exports
├── tailwind.config.ts       # Tailwind configuration with theme
├── postcss.config.mjs       # PostCSS configuration
├── THEME_DOCUMENTATION.md   # Comprehensive theme guide
└── README.md
```

## 🎯 Theme Configuration

### Color System

#### Dark Backgrounds
- `bg-dark-950` - Darkest (overlays)
- `bg-dark-900` - Very dark (primary)
- `bg-dark-800` - Dark (secondary)
- `bg-dark-700` - Medium dark
- etc.

#### Neon Accents
- **Purple**: `#e91e8c`, `#ff33a1`, `#b01470`
- **Lime**: `#39ff14`, `#6fff35`, `#2cc905`
- **Cyan**: `#00d9ff`
- **Additional**: Pink (`#ff006e`), Electric (`#ff0080`)

#### Text Colors
- `text-dark-50` - Light text
- `text-dark-300` - Medium text
- `text-dark-400` - Secondary text
- `text-dark-500` - Tertiary text

### Typography

#### Font Families
- **Headings**: Oswald (Nike-like condensed)
- **Body**: Inter (clean, readable)
- **Code**: JetBrains Mono

#### Font Scales
```
h1: 3.5rem (56px)
h2: 2.5rem (40px)
h3: 1.875rem (30px)
h4: 1.5rem (24px)
h5: 1.25rem (20px)
h6: 1rem (16px)
```

### Shadows & Depth

#### Standard Shadows
- `shadow-sm` to `shadow-2xl`

#### 3D Depth Effects
- `depth-sm`, `depth-md`, `depth-lg`, `depth-xl`

#### Neon Glows
- `shadow-neon-purple`, `shadow-neon-lime`, `shadow-neon-cyan`

## 🛠️ Using the Theme

### Basic Section

```tsx
import { Section, Container } from '@/components';

export default function MySection() {
  return (
    <Section padding="lg" variant="gradient">
      <Container maxWidth="2xl">
        <h2>Your Content</h2>
      </Container>
    </Section>
  );
}
```

### Neon Effects

```tsx
<h1 className="neon-text-purple">Glowing Text</h1>
<div className="neon-border rounded-lg">Neon Border</div>
<div className="glass-neon">Glass with Neon</div>
```

### Buttons

```tsx
import { Button } from '@/components';

<Button variant="neon" size="lg">Click Me</Button>
<Button variant="secondary" size="md">Secondary</Button>
<Button variant="ghost" size="sm">Ghost</Button>
```

### Cards

```tsx
import { Card } from '@/components';

<Card variant="neon">Card Content</Card>
<Card variant="glass">Glass Card</Card>
<Card variant="depth">Depth Card</Card>
```

### Animations

```tsx
<div className="animate-pulse-neon">Pulsing</div>
<div className="animate-glow">Glowing</div>
<div className="animate-float">Floating</div>
```

## 📖 Documentation

For comprehensive documentation on:
- All CSS variables
- Complete utility classes
- Component usage examples
- Customization guide
- Browser support

See **[THEME_DOCUMENTATION.md](./THEME_DOCUMENTATION.md)** for the complete guide.

## ✨ Utility Classes

### Layout
- `.container` - Responsive container
- `.section-padding` / `.section-padding-sm` / `.section-padding-lg` / `.section-padding-xl`
- `.flex-center` - Flex centered
- `.grid-auto` / `.grid-auto-sm` / `.grid-auto-lg`

### Effects
- `.glass` - Glass morphism
- `.glass-neon` - Glass with neon border
- `.neon-border` / `.neon-border-lime` / `.neon-border-cyan`
- `.neon-text-purple` / `.neon-text-lime` / `.neon-text-cyan`

### Backgrounds
- `.bg-gradient-dark` - Dark gradient
- `.bg-gradient-neon-purple` - Purple gradient
- `.bg-gradient-neon-lime` - Lime gradient

### Depth
- `.depth-sm` / `.depth-md` / `.depth-lg` / `.depth-xl`

### Text
- `.truncate-1` / `.truncate-2` / `.truncate-3`

### Transitions
- `.transition-fast` (75ms)
- `.transition-base` (150ms)
- `.transition-slow` (300ms)
- `.transition-slower` (500ms)

## 🎭 CSS Variables

All colors and effects are defined as CSS variables for easy customization:

```css
:root {
  --color-bg-primary: #1a1a1a;
  --color-neon-purple: #e91e8c;
  --color-neon-lime: #39ff14;
  --color-neon-cyan: #00d9ff;
  --shadow-neon-purple: /* glow effect */;
  --gradient-neon-purple: /* gradient */;
  /* ... and many more */
}
```

## 🔧 Customization

### Modify Colors
Edit `/app/globals.css` CSS variables or `/tailwind.config.ts` theme colors.

### Add New Components
Create new `.tsx` files in `/components/` directory following the existing patterns.

### Extend Theme
Modify `tailwind.config.ts` to add new theme values:

```typescript
theme: {
  extend: {
    colors: {
      'custom-color': '#hexcode',
    },
    // ... other extensions
  },
}
```

## 📱 Responsive Design

Breakpoints included:
- Mobile: base styles
- Tablet: `@media (min-width: 768px)`
- Desktop: `@media (min-width: 1024px)`
- Large: `@media (min-width: 1280px)`
- XL: `@media (min-width: 1536px)`

## 🔍 Form Elements

All form elements are pre-styled with dark theme:
- Dark background with borders
- Neon purple focus state
- Smooth transitions
- Proper contrast for accessibility

```tsx
<input type="text" placeholder="Enter text..." className="w-full" />
<textarea placeholder="Enter message..." className="w-full"></textarea>
<select className="w-full">
  <option>Option</option>
</select>
```

## 🎬 Animations

Three built-in animations:
1. **pulse-neon**: Opacity pulse effect
2. **glow**: Box-shadow glow effect
3. **float**: Y-axis float animation

Apply with: `.animate-pulse-neon`, `.animate-glow`, `.animate-float`

## ✅ Browser Support

- ✅ Chrome/Chromium (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)

Features used:
- CSS Variables
- Backdrop Filter
- CSS Grid & Flexbox
- CSS Animations
- CSS Gradients

## 📦 Dependencies

- **Next.js 16.0.2** - React framework
- **React 19.2.0** - UI library
- **Tailwind CSS 4** - Utility-first CSS
- **TypeScript** - Type safety
- **Oswald Font** - Google Font (headings)
- **Inter Font** - Google Font (body)
- **JetBrains Mono** - Google Font (code)

## 🚀 Deployment

### Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

### Other Platforms
```bash
npm run build
npm start
```

## 📝 Environment Variables

None required for basic setup. All configuration is in code.

## 🐛 Troubleshooting

### Fonts not loading
- Check browser DevTools Network tab
- Verify font names in `layout.tsx`
- Clear browser cache

### Colors not appearing
- Ensure `tailwind.config.ts` is in root
- Clear Tailwind cache: `rm -rf .next`
- Rebuild: `npm run build`

### Styles not applying
- Check class names spelling
- Use `@apply` in globals.css for custom utilities
- Verify CSS variables in browser DevTools

## 📞 Support

For Next.js help: [Next.js Docs](https://nextjs.org/docs)
For Tailwind help: [Tailwind Docs](https://tailwindcss.com/docs)
For fonts: [Google Fonts](https://fonts.google.com)

## 📄 License

This project is open source and available under the MIT License.

---

**Built with ❤️ using Next.js, React, and Tailwind CSS**
