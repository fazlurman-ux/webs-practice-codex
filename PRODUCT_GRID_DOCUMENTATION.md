# Product Grid Components Documentation

## Overview

The Product Grid system consists of two main components:

1. **ProductCard** - Individual product card with 3D hover effects and lazy loading
2. **ProductGridSection** - Responsive grid container with load more functionality

## ProductCard Component

### Features

- **3D Hover Effects**: Pseudo-3D transforms on hover/focus with perspective
- **Lazy Loading**: Images load only when card becomes visible (Intersection Observer)
- **Accessibility**: Full keyboard navigation, ARIA labels, semantic HTML
- **Responsive**: Adapts to different screen sizes
- **Interactive States**: Hover, focus, and loading states

### Props

```typescript
interface ProductCardProps {
  id: string;                    // Unique identifier
  title: string;                 // Product name
  description: string;           // Product description
  price: string;                 // Product price
  imageSrc: string;              // Image URL
  badge?: string;                // Optional badge text
  badgeColor?: 'purple' | 'lime' | 'cyan' | 'pink';  // Badge color
  onQuickView?: () => void;      // Quick view callback
  className?: string;            // Additional CSS classes
}
```

### Usage Example

```tsx
<ProductCard
  id="prod-1"
  title="Neon Runner Pro"
  description="High-performance running shoes with advanced cushioning"
  price="$189"
  imageSrc="/images/product.jpg"
  badge="New"
  badgeColor="lime"
  onQuickView={() => console.log('Quick view')}
/>
```

### Accessibility Features

- Semantic `<article>` element with proper ARIA attributes
- Keyboard focus management
- Screen reader support with `aria-labelledby` and `aria-describedby`
- High contrast design for better visibility

### 3D Effect Implementation

The 3D effect uses CSS transforms with perspective:

```css
transform: perspective(1000px) rotateY(5deg) rotateX(-5deg) scale(1.05);
transform-style: preserve-3d;
transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
```

### Lazy Loading

Uses Intersection Observer API to detect when the card enters viewport:

```typescript
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        setShouldLoad(true);
        observer.unobserve(entry.target);
      }
    });
  },
  { rootMargin: '50px', threshold: 0.1 }
);
```

## ProductGridSection Component

### Features

- **Responsive Grid**: 2x2 on desktop, single column on mobile
- **Load More**: Progressive loading with customizable items per page
- **Animations**: Staggered fade-in animations for new items
- **Performance**: Optimized rendering with proper key management
- **Accessibility**: Semantic structure and keyboard navigation

### Props

```typescript
interface ProductGridSectionProps {
  title?: string;                // Section title
  subtitle?: string;             // Section subtitle
  products: Product[];            // Array of product data
  itemsPerPage?: number;          // Items per load (default: 8)
  className?: string;            // Additional CSS classes
}
```

### Product Data Structure

```typescript
interface Product {
  id: string;
  title: string;
  description: string;
  price: string;
  imageSrc: string;
  badge?: string;
  badgeColor?: 'purple' | 'lime' | 'cyan' | 'pink';
}
```

### Usage Example

```tsx
<ProductGridSection
  title="Featured Products"
  subtitle="Discover our collection"
  products={featuredProducts}
  itemsPerPage={6}
/>
```

### Responsive Behavior

- **Mobile (≤768px)**: Single column grid
- **Desktop (>768px)**: 2-column grid with larger gaps

### Load More Functionality

- Progressive loading with customizable batch size
- Loading state with spinner animation
- Smooth scroll to new content
- "Showing all X products" indicator when complete

### Animation System

Staggered fade-in animation using CSS:

```css
@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fade-in 0.6s ease-out;
}
```

## Performance Optimizations

### Image Optimization

1. **Lazy Loading**: Images load only when needed
2. **Progressive Enhancement**: Loading skeleton during image load
3. **Proper Sizing**: Consistent aspect ratios prevent layout shift
4. **WebP Support**: Can be easily added for better compression

### Animation Performance

1. **GPU Acceleration**: Uses `transform` and `opacity` for 60fps animations
2. **Reduced Motion**: Respects user's motion preferences
3. **Debounced Events**: Throttled mouse/touch events
4. **CSS Variables**: Efficient styling updates

### Bundle Size

1. **Tree Shaking**: Only used components are included
2. **Dynamic Imports**: 3D components can be loaded on demand
3. **Minimal Dependencies**: Relies on existing component library

## Accessibility Checklist

### WCAG 2.1 AA Compliance

✅ **Keyboard Navigation**
- All interactive elements accessible via Tab
- Visible focus indicators
- Logical tab order

✅ **Screen Reader Support**
- Semantic HTML structure
- ARIA labels and descriptions
- Alternative text for images

✅ **Visual Accessibility**
- High contrast ratios
- Clear typography
- Resizable text

✅ **Motor Accessibility**
- Large click targets (minimum 44px)
- Sufficient spacing between interactive elements
- No time-based interactions

### Testing Recommendations

1. **Keyboard Navigation**: Tab through all elements
2. **Screen Reader**: Test with NVDA, VoiceOver, or JAWS
3. **Color Contrast**: Use browser dev tools or contrast checker
4. **Mobile Accessibility**: Test with VoiceOver (iOS) and TalkBack (Android)

## Browser Support

### Modern Browsers (Recommended)
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

### Fallback Support

- **Intersection Observer**: Polyfill available for older browsers
- **CSS Grid**: Flexbox fallback implemented
- **CSS Transforms**: Graceful degradation for older browsers

## Customization

### Theme Integration

The components use the existing dark theme system:

```css
/* Colors */
--color-neon-purple: #e91e8c;
--color-neon-lime: #39ff14;
--color-neon-cyan: #00d9ff;
--color-neon-pink: #ff006e;

/* Shadows */
--shadow-depth-sm: 0 2px 4px 0 rgb(0 0 0 / 0.2);
--shadow-neon-purple: 0 0 10px rgb(233 30 140 / 0.8);
```

### Custom Variants

Extend with additional badge colors or card variants:

```typescript
// Add new badge colors
badgeColor?: 'purple' | 'lime' | 'cyan' | 'pink' | 'orange' | 'blue';

// Add new card variants
variant?: 'default' | 'featured' | 'compact' | 'detailed';
```

## Integration Examples

### E-commerce Integration

```tsx
// API Integration
const [products, setProducts] = useState<Product[]>([]);

useEffect(() => {
  fetchProducts().then(setProducts);
}, []);

return (
  <ProductGridSection
    products={products}
    onQuickView={(id) => openProductModal(id)}
  />
);
```

### CMS Integration

```tsx
// Headless CMS Integration
const { data } = useSWR('/api/products', fetcher);

return (
  <ProductGridSection
    products={data?.products || []}
    itemsPerPage={12}
  />
);
```

## Troubleshooting

### Common Issues

1. **Images Not Loading**: Check image URLs and CORS headers
2. **3D Effects Not Working**: Verify CSS `transform-style: preserve-3d`
3. **Lazy Loading Issues**: Ensure Intersection Observer is supported
4. **Animation Performance**: Check for layout thrashing in dev tools

### Debug Tools

- Chrome DevTools Performance tab
- Lighthouse accessibility audit
- React DevTools component inspector
- Network tab for lazy loading verification

## Future Enhancements

### Planned Features

1. **3D Model Integration**: Mini R3F scenes for products
2. **Advanced Filtering**: Category, price range, and search
3. **Wishlist Support**: Save favorite products
4. **Compare Products**: Side-by-side product comparison
5. **Virtual Try-On**: AR integration for selected products

### Performance Improvements

1. **WebP Image Format**: Better compression with fallbacks
2. **Service Worker**: Offline support and caching
3. **Code Splitting**: Separate bundles for product grid
4. **Image CDNs**: Optimized image delivery

## Conclusion

The Product Grid system provides a robust, accessible, and performant foundation for e-commerce product displays. It integrates seamlessly with the existing dark theme and component library while maintaining high standards for user experience and accessibility.

The modular design allows for easy customization and extension, making it suitable for various use cases from simple product showcases to complex e-commerce platforms.