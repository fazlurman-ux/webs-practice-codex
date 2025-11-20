'use client';

import { ProductGridSection } from '@/components/ProductGridSection';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

// Sample product data for demonstration
const featuredProducts = [
  {
    id: 'prod-1',
    title: 'Neon Runner Pro',
    description: 'High-performance running shoes with advanced cushioning and responsive energy return.',
    price: '$189',
    imageSrc: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&h=800&fit=crop&crop=center',
    badge: 'New',
    badgeColor: 'lime' as const,
  },
  {
    id: 'prod-2',
    title: 'Urban Tech Jacket',
    description: 'Water-resistant smart jacket with integrated temperature control and LED accents.',
    price: '$299',
    imageSrc: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=800&h=800&fit=crop&crop=center',
    badge: 'Limited',
    badgeColor: 'purple' as const,
  },
  {
    id: 'prod-3',
    title: 'Cyber Sunglasses',
    description: 'Polarized lenses with anti-glare coating and UV protection in a futuristic frame.',
    price: '$149',
    imageSrc: 'https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?w=800&h=800&fit=crop&crop=center',
    badge: 'Sale',
    badgeColor: 'cyan' as const,
  },
  {
    id: 'prod-4',
    title: 'Digital Sport Watch',
    description: 'Multi-sport GPS watch with heart rate monitoring and advanced performance metrics.',
    price: '$349',
    imageSrc: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&h=800&fit=crop&crop=center',
  },
  {
    id: 'prod-5',
    title: 'Elite Fitness Gloves',
    description: 'Professional-grade training gloves with enhanced grip and wrist support.',
    price: '$79',
    imageSrc: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=800&fit=crop&crop=center',
    badge: 'Popular',
    badgeColor: 'pink' as const,
  },
  {
    id: 'prod-6',
    title: 'Tech Backpack Pro',
    description: 'Smart backpack with laptop compartment, USB charging, and anti-theft design.',
    price: '$129',
    imageSrc: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&h=800&fit=crop&crop=center',
  },
  {
    id: 'prod-7',
    title: 'Wireless Earbuds Elite',
    description: 'Premium noise-cancelling earbuds with spatial audio and 24-hour battery life.',
    price: '$249',
    imageSrc: 'https://images.unsplash.com/photo-1588423771073-b8903fbb85b5?w=800&h=800&fit=crop&crop=center',
    badge: 'New',
    badgeColor: 'lime' as const,
  },
  {
    id: 'prod-8',
    title: 'Performance Hydrator',
    description: 'Smart water bottle with temperature control and hydration tracking.',
    price: '$89',
    imageSrc: 'https://images.unsplash.com/photo-1579652976661-e71c6a4ee622?w=800&h=800&fit=crop&crop=center',
  },
  {
    id: 'prod-9',
    title: 'Recovery Massage Gun',
    description: 'Percussive therapy device with multiple attachments and adjustable intensity.',
    price: '$199',
    imageSrc: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&h=800&fit=crop&crop=center',
    badge: 'Hot',
    badgeColor: 'purple' as const,
  },
  {
    id: 'prod-10',
    title: 'Smart Yoga Mat',
    description: 'Interactive yoga mat with pose guidance and real-time feedback.',
    price: '$159',
    imageSrc: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=800&h=800&fit=crop&crop=center',
  },
];

export default function ProductGridDemo() {
  return (
    <>
      <Navbar />
      <main className="bg-dark-950 min-h-screen">
        <ProductGridSection
          title="Featured Products"
          subtitle="Discover our curated collection of premium athletic and lifestyle gear"
          products={featuredProducts}
          itemsPerPage={6}
        />
      </main>
      <Footer />
    </>
  );
}