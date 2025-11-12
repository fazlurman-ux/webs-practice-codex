# Tailwind Theme Documentation

## Overview

This project uses a custom Tailwind CSS theme with a dark premium aesthetic and neon accent colors, inspired by modern athletic brands like Nike. The theme includes:

- **Dark Background Palette**: Multiple shades of black and charcoal
- **Neon Accent Colors**: Electric purple, lime green, and cyan for vibrant highlights
- **3D Depth Effects**: Custom shadows and depth layering
- **Premium Typography**: Oswald (condensed) for headings + Inter for body text
- **Glass Morphism**: Modern frosted glass effects
- **Utility Classes**: Pre-built components for rapid development

---

## Theme Configuration

### Color Palette

#### Dark Backgrounds
```css
--color-bg-primary: #1a1a1a;      /* Main background */
--color-bg-secondary: #242424;    /* Secondary surfaces */
--color-bg-tertiary: #2e2e2e;     /* Tertiary surfaces */
--color-bg-overlay: rgba(15, 15, 15, 0.8);
```

#### Neon Accents
```css
--color-neon-purple: #e91e8c;      /* Primary neon */
--color-neon-purple-light: #ff33a1;
--color-neon-purple-dark: #b01470;
--color-neon-lime: #39ff14;        /* Secondary neon */
--color-neon-lime-light: #6fff35;
--color-neon-lime-dark: #2cc905;
--color-neon-cyan: #00d9ff;        /* Tertiary neon */
--color-neon-pink: #ff006e;
--color-neon-electric: #ff0080;
```

#### Text Colors
```css
--color-text-primary: #f5f5f5;     /* Main text */
--color-text-secondary: #b0b0b0;   /* Secondary text */
--color-text-tertiary: #808080;    /* Tertiary text */
--color-text-inverse: #0a0a0a;     /* For dark overlays */
```

### Typography

#### Font Families
- **Oswald**: Headings and condensed text (Nike-like aesthetic)
- **Inter**: Body text and UI elements
- **JetBrains Mono**: Code and monospace text

#### Font Variables
```css
--font-oswald: Used for h1-h6 and bold text
--font-inter: Default body font
--font-mono: Code blocks and monospace
```

#### Heading Sizes
```
h1: 3.5rem (56px) - Hero titles
h2: 2.5rem (40px) - Section titles
h3: 1.875rem (30px) - Subsection titles
h4: 1.5rem (24px) - Small titles
h5: 1.25rem (20px) - Minor titles
h6: 1rem (16px) - Smallest headings
```

---

## Shadow & Depth System

### Standard Shadows
```css
--shadow-sm: Subtle elevation
--shadow-md: Medium depth
--shadow-lg: Pronounced depth
--shadow-xl: Strong elevation
--shadow-2xl: Maximum elevation
```

### 3D Depth Effects
```css
--shadow-depth-sm: Light 3D effect
--shadow-depth-md: Medium 3D effect with inset highlight
--shadow-depth-lg: Strong 3D effect with inset highlight
--shadow-depth-xl: Maximum 3D effect with inset highlight
```

### Neon Glow Effects
```css
--shadow-neon-purple: Purple glow
--shadow-neon-lime: Lime green glow
--shadow-neon-cyan: Cyan glow
```

---

## Gradient Definitions

```css
--gradient-dark-premium: Vertical dark gradient
--gradient-neon-purple: Purple to light purple diagonal
--gradient-neon-lime: Lime to light lime diagonal
--gradient-glow-purple: Radial purple glow
--gradient-glow-lime: Radial lime glow
```

---

## Utility Classes

### Container & Layout
```html
<!-- Responsive container with smart padding -->
<div class="container">
  <!-- Content -->
</div>

<!-- Section padding variations -->
<section class="section-padding">...</section>
<section class="section-padding-sm">...</section>
<section class="section-padding-lg">...</section>
<section class="section-padding-xl">...</section>

<!-- Flex center -->
<div class="flex-center">
  <!-- Centered content -->
</div>

<!-- Auto-responsive grid -->
<div class="grid-auto">
  <!-- Auto 250px columns -->
</div>
<div class="grid-auto-sm">
  <!-- Auto 200px columns -->
</div>
<div class="grid-auto-lg">
  <!-- Auto 300px columns -->
</div>
```

### Neon Effects
```html
<!-- Neon borders -->
<div class="neon-border">...</div>
<div class="neon-border-lime">...</div>
<div class="neon-border-cyan">...</div>

<!-- Neon glowing text -->
<h1 class="neon-text-purple">Title</h1>
<p class="neon-text-lime">Lime text</p>
<span class="neon-text-cyan">Cyan text</span>
```

### Glass Morphism
```html
<!-- Standard glass effect -->
<div class="glass">
  <!-- Semi-transparent blurred backdrop -->
</div>

<!-- Glass with neon border -->
<div class="glass-neon">
  <!-- Neon-accented glass -->
</div>
```

### Gradient Backgrounds
```html
<div class="bg-gradient-dark"><!-- Dark gradient --></div>
<div class="bg-gradient-neon-purple"><!-- Purple gradient --></div>
<div class="bg-gradient-neon-lime"><!-- Lime gradient --></div>
```

### 3D Depth Effects
```html
<div class="depth-sm"><!-- Light 3D --></div>
<div class="depth-md"><!-- Medium 3D --></div>
<div class="depth-lg"><!-- Strong 3D --></div>
<div class="depth-xl"><!-- Maximum 3D --></div>
```

### Text Truncation
```html
<p class="truncate-1">Single line ellipsis</p>
<p class="truncate-2">Two lines max</p>
<p class="truncate-3">Three lines max</p>
```

### Transitions
```html
<button class="transition-fast">Fast (75ms)</button>
<button class="transition-base">Base (150ms)</button>
<button class="transition-slow">Slow (300ms)</button>
<button class="transition-slower">Slower (500ms)</button>
```

### Animations
```html
<div class="animate-pulse-neon">Pulse effect</div>
<div class="animate-glow">Glow effect</div>
<div class="animate-float">Float effect</div>
```

---

## Usage Examples

### Hero Section
```tsx
export default function Hero() {
  return (
    <section className="section-padding-xl bg-gradient-dark">
      <div className="container flex-center">
        <h1 className="neon-text-purple text-center">
          Premium Experience
        </h1>
      </div>
    </section>
  );
}
```

### Feature Card
```tsx
export default function FeatureCard() {
  return (
    <div className="glass neon-border rounded-lg p-6 transition-base hover:depth-lg">
      <h3 className="neon-text-lime mb-4">Feature</h3>
      <p className="text-gray-400">Description here</p>
    </div>
  );
}
```

### Button with Neon Effect
```tsx
export default function Button() {
  return (
    <button className="px-6 py-3 bg-gradient-neon-purple rounded-lg neon-border transition-base hover:shadow-neon-purple">
      Click Me
    </button>
  );
}
```

### Grid Layout
```tsx
export default function Gallery() {
  return (
    <div className="container my-12">
      <div className="grid-auto">
        {/* Items auto-arrange */}
      </div>
    </div>
  );
}
```

### Section with Heading
```tsx
export default function Section() {
  return (
    <section className="section-padding">
      <div className="container">
        <h2 className="mb-8">Section Title</h2>
        <p>Content goes here</p>
      </div>
    </section>
  );
}
```

---

## CSS Variables in Use

### Accessing Variables in Custom CSS
```css
.custom-element {
  background: var(--color-bg-secondary);
  color: var(--color-text-primary);
  border: 1px solid var(--color-border-primary);
  box-shadow: var(--shadow-neon-purple);
  transition: all var(--transition-base) ease;
}
```

### Using in Tailwind Classes
```html
<!-- Direct color references -->
<div class="bg-dark-900 text-dark-50">

<!-- With opacity -->
<div class="bg-neon-purple/50">

<!-- With gradients -->
<div class="bg-gradient-neon-purple">
```

---

## Tailwind Config Extensions

The custom `tailwind.config.ts` extends the default theme with:

- **9 neon accent color variants** per color (purple, lime, cyan, pink, electric)
- **Dark color palette** with 10 shades
- **Custom spacing scale** (0-96)
- **3D depth shadows** (4 variations)
- **Neon glow shadows** (3 variations)
- **Gradient backgrounds** (5 variations)
- **Custom animations** (pulse-neon, glow, float)
- **Extended font family options** (sans, mono)
- **Responsive border radius** scale

---

## Scrollbar Styling

The theme includes custom scrollbar styling for modern browsers:

```css
/* Webkit browsers (Chrome, Safari, Edge) */
::-webkit-scrollbar {
  width: 10px;
  background: var(--color-bg-secondary);
}

::-webkit-scrollbar-thumb {
  background: var(--color-neon-purple);
  border-radius: 5px;
}

/* Firefox */
scrollbar-color: var(--color-neon-purple) var(--color-bg-secondary);
scrollbar-width: thin;
```

---

## Form Styling

All form elements (`input`, `textarea`, `select`) are automatically styled with:

- Dark background (`--color-bg-secondary`)
- Subtle borders (`--color-border-primary`)
- Neon focus state with glow
- Smooth transitions (150ms)
- Proper placeholder contrast

```tsx
<input 
  type="text" 
  placeholder="Enter text..." 
  className="w-full"
/>
```

---

## Responsive Design

The theme includes breakpoints for responsive design:

```css
/* Container responsive padding */
@media (max-width: 768px) {
  h1 { font-size: 2.5rem; }
  h2 { font-size: 2rem; }
  h3 { font-size: 1.5rem; }
  .section-padding { padding: 2rem 0; }
}
```

---

## Dark Mode

The theme is locked to dark mode with:

```css
html {
  color-scheme: dark;
}

body {
  background: var(--color-bg-primary);
  color: var(--color-text-primary);
}
```

---

## Selection Styling

Text selection uses neon purple with inverse text color:

```css
::selection {
  background-color: var(--color-neon-purple);
  color: var(--color-text-inverse);
}
```

---

## Performance Notes

1. **Fonts**: Using `display: "swap"` for font loading
2. **Transitions**: Use `transition-*` utilities to enable GPU acceleration
3. **Animations**: CSS animations are performant (no JavaScript)
4. **Gradients**: Pre-defined gradients use CSS (no runtime calculation)

---

## Browser Support

- **Modern browsers** (Chrome, Firefox, Safari, Edge) ✅
- **Tailwind CSS v4** with new @theme syntax ✅
- **Next.js 16** App Router ✅
- **React 19** ✅

---

## Customization

To customize the theme, modify `/tailwind.config.ts` and `/app/globals.css`:

```typescript
// tailwind.config.ts
colors: {
  "custom-color": "#hexcode",
  // Add your colors
}

// globals.css
:root {
  --color-custom: #hexcode;
  // Add CSS variables
}
```

---

## Production Checklist

- ✅ Dark theme properly configured
- ✅ Fonts loaded with `next/font`
- ✅ CSS variables in sync with Tailwind
- ✅ Scrollbars styled consistently
- ✅ Form elements accessible
- ✅ Animations performant
- ✅ Responsive design tested
- ✅ Neon glow effects working
- ✅ 3D depth effects rendering
- ✅ Glass morphism compatible

---

## Need Help?

Refer to the following for more information:

- [Tailwind CSS Documentation](https://tailwindcss.com)
- [Next.js Font Optimization](https://nextjs.org/docs/app/building-your-application/optimizing/fonts)
- [CSS Variables Guide](https://developer.mozilla.org/en-US/docs/Web/CSS/--*)
- [CSS Shadows Reference](https://developer.mozilla.org/en-US/docs/Web/CSS/box-shadow)
