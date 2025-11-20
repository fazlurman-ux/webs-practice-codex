'use client';

import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { Badge } from '@/components/Badge';
import { Container } from '@/components/Container';
import { Section } from '@/components/Section';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { PageWrapper } from '@/components/PageWrapper';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';

// Lazy load heavy components for better code splitting
const HeroSection = dynamic(
  () => import('@/components/HeroSection').then(mod => ({ default: mod.HeroSection })),
  { 
    ssr: false,
    loading: () => (
      <div className="relative w-full h-screen overflow-hidden bg-gradient-to-br from-dark-900 to-dark-800 flex items-center justify-center">
        <div className="animate-pulse text-neon-purple text-2xl">Loading Experience...</div>
      </div>
    )
  }
);

const TechnologySection = dynamic(
  () => import('@/components/TechnologySection').then(mod => ({ default: mod.TechnologySection })),
  { 
    loading: () => (
      <Section padding="lg">
        <Container maxWidth="2xl">
          <div className="animate-pulse text-center">
            <div className="h-12 bg-dark-700 rounded-lg mb-4 max-w-md mx-auto"></div>
            <div className="h-4 bg-dark-700 rounded max-w-2xl mx-auto"></div>
          </div>
        </Container>
      </Section>
    )
  }
);

const AboutSection = dynamic(
  () => import('@/components/AboutSection').then(mod => ({ default: mod.AboutSection })),
  { 
    loading: () => (
      <Section padding="lg" variant="dark">
        <Container maxWidth="2xl">
          <div className="animate-pulse">
            <div className="h-12 bg-dark-600 rounded-lg mb-4 max-w-md mx-auto"></div>
            <div className="h-4 bg-dark-600 rounded max-w-3xl mx-auto mb-2"></div>
            <div className="h-4 bg-dark-600 rounded max-w-2xl mx-auto"></div>
          </div>
        </Container>
      </Section>
    )
  }
);

const ProductGridSection = dynamic(
  () => import('@/components/ProductGridSection').then(mod => ({ default: mod.ProductGridSection })),
  { 
    loading: () => (
      <Section className="py-16 lg:py-24">
        <Container>
          <div className="text-center mb-12 lg:mb-16">
            <div className="h-12 bg-dark-700 rounded-lg mb-4 max-w-md mx-auto animate-pulse"></div>
            <div className="h-6 bg-dark-700 rounded max-w-2xl mx-auto animate-pulse"></div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 lg:gap-10">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="aspect-square bg-dark-800 rounded-xl mb-4"></div>
                <div className="h-6 bg-dark-700 rounded mb-2"></div>
                <div className="h-4 bg-dark-700 rounded w-3/4"></div>
              </div>
            ))}
          </div>
        </Container>
      </Section>
    )
  }
);

export default function Home() {
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

  return (
    <>
      <Navbar />
      <main className="bg-dark-950">
        {/* Hero Section with 3D - Critical for LCP */}
        <Suspense fallback={
          <div className="relative w-full h-screen overflow-hidden bg-gradient-to-br from-dark-900 to-dark-800 flex items-center justify-center">
            <div className="animate-pulse text-neon-purple text-2xl">Loading Experience...</div>
          </div>
        }>
          <HeroSection />
        </Suspense>
        
        {/* Technology Section with Interactive 3D Breakdown */}
        <Suspense fallback={
          <Section padding="lg">
            <Container maxWidth="2xl">
              <div className="animate-pulse text-center">
                <div className="h-12 bg-dark-700 rounded-lg mb-4 max-w-md mx-auto"></div>
                <div className="h-4 bg-dark-700 rounded max-w-2xl mx-auto"></div>
              </div>
            </Container>
          </Section>
        }>
          <TechnologySection />
        </Suspense>
        
        <Suspense fallback={
          <Section padding="lg" variant="dark">
            <Container maxWidth="2xl">
              <div className="animate-pulse">
                <div className="h-12 bg-dark-600 rounded-lg mb-4 max-w-md mx-auto"></div>
                <div className="h-4 bg-dark-600 rounded max-w-3xl mx-auto mb-2"></div>
                <div className="h-4 bg-dark-600 rounded max-w-2xl mx-auto"></div>
              </div>
            </Container>
          </Section>
        }>
          <AboutSection />
        </Suspense>

        <PageWrapper sectionSpacing="lg" scrollSnapping={false}>
          {/* Featured Products Section - Lazy loaded */}
          <Suspense fallback={
            <Section className="py-16 lg:py-24">
              <Container>
                <div className="text-center mb-12 lg:mb-16">
                  <div className="h-12 bg-dark-700 rounded-lg mb-4 max-w-md mx-auto animate-pulse"></div>
                  <div className="h-6 bg-dark-700 rounded max-w-2xl mx-auto animate-pulse"></div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 lg:gap-10">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="animate-pulse">
                      <div className="aspect-square bg-dark-800 rounded-xl mb-4"></div>
                      <div className="h-6 bg-dark-700 rounded mb-2"></div>
                      <div className="h-4 bg-dark-700 rounded w-3/4"></div>
                    </div>
                  ))}
                </div>
              </Container>
            </Section>
          }>
            <ProductGridSection
              title="Featured Products"
              subtitle="Discover our curated collection of premium athletic and lifestyle gear"
              products={featuredProducts}
              itemsPerPage={8}
            />
          </Suspense>
          {/* Features Section */}
          <Section padding="lg" variant="dark">
            <Container maxWidth="2xl">
              <h2 className="text-4xl font-bold mb-12 text-center">Features</h2>
              <div className="grid-auto">
                {[
                  {
                    title: 'Dark Theme',
                    desc: 'Premium dark aesthetic with carefully chosen shades',
                    color: 'purple',
                  },
                  {
                    title: 'Neon Accents',
                    desc: 'Electric purple, lime green, and cyan highlights',
                    color: 'lime',
                  },
                  {
                    title: '3D Depth',
                    desc: 'Professional depth shadows for visual hierarchy',
                    color: 'cyan',
                  },
                  {
                    title: 'Typography',
                    desc: 'Oswald condensed + Inter for modern aesthetic',
                    color: 'purple',
                  },
                  {
                    title: 'Glass Morphism',
                    desc: 'Modern frosted glass effects with backdrops',
                    color: 'lime',
                  },
                  {
                    title: 'Utilities',
                    desc: 'Pre-built classes for rapid component development',
                    color: 'cyan',
                  },
                ].map((feature, idx) => (
                  <Card
                    key={idx}
                    variant="neon"
                    className={`neon-border-${feature.color === 'lime' ? 'lime' : feature.color === 'cyan' ? 'cyan' : ''}`}
                  >
                    <Badge variant={feature.color as 'purple' | 'lime' | 'cyan'}>
                      {feature.title}
                    </Badge>
                    <h3 className="text-lg font-bold mt-4 mb-2">{feature.title}</h3>
                    <p className="text-dark-300">{feature.desc}</p>
                  </Card>
                ))}
              </div>
            </Container>
          </Section>

          {/* Colors Section */}
          <Section padding="lg">
            <Container maxWidth="2xl">
              <h2 className="text-4xl font-bold mb-12 text-center">Color Palette</h2>
              <div className="space-y-8">
                {/* Neon Colors */}
                <div>
                  <h3 className="text-xl font-bold mb-4 text-dark-100">Neon Accents</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="neon-border rounded-lg p-6 flex-center flex-col gap-2">
                      <div className="w-20 h-20 bg-gradient-neon-purple rounded-lg"></div>
                      <span className="neon-text-purple font-bold">Electric Purple</span>
                      <code className="text-xs text-dark-400">#e91e8c</code>
                    </div>
                    <div className="neon-border-lime rounded-lg p-6 flex-center flex-col gap-2">
                      <div className="w-20 h-20 bg-gradient-neon-lime rounded-lg"></div>
                      <span className="neon-text-lime font-bold">Lime Green</span>
                      <code className="text-xs text-dark-400">#39ff14</code>
                    </div>
                    <div className="neon-border-cyan rounded-lg p-6 flex-center flex-col gap-2">
                      <div className="w-20 h-20 rounded-lg" style={{ background: '#00d9ff' }}></div>
                      <span className="neon-text-cyan font-bold">Cyan</span>
                      <code className="text-xs text-dark-400">#00d9ff</code>
                    </div>
                  </div>
                </div>

                {/* Dark Backgrounds */}
                <div>
                  <h3 className="text-xl font-bold mb-4 text-dark-100">Dark Palette</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
                    {[
                      { name: 'Primary', color: 'bg-dark-900' },
                      { name: 'Secondary', color: 'bg-dark-800' },
                      { name: 'Tertiary', color: 'bg-dark-700' },
                      { name: 'Border', color: 'bg-dark-600' },
                      { name: 'Light', color: 'bg-dark-500' },
                    ].map((shade) => (
                      <div key={shade.name} className={`${shade.color} rounded-lg p-6 border border-dark-600`}>
                        <div className="text-xs text-dark-400">{shade.name}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Container>
          </Section>

          {/* Effects Section */}
          <Section padding="lg" variant="dark">
            <Container maxWidth="2xl">
              <h2 className="text-4xl font-bold mb-12 text-center">Effects & Animations</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Depth Effects */}
                <div className="space-y-4">
                  <h3 className="text-lg font-bold">3D Depth Effects</h3>
                  <Card variant="depth">Depth Small</Card>
                  <Card variant="depth">Depth Medium</Card>
                  <Card variant="depth">Depth Large</Card>
                </div>

                {/* Animations */}
                <div className="space-y-4">
                  <h3 className="text-lg font-bold">Animations</h3>
                  <div className="glass rounded-lg p-8 flex-center">
                    <div className="animate-pulse-neon text-3xl neon-text-purple">
                      Pulse Neon
                    </div>
                  </div>
                  <div className="glass rounded-lg p-8 flex-center">
                    <div className="animate-glow text-2xl neon-text-lime">
                      Glow Effect
                    </div>
                  </div>
                  <div className="glass rounded-lg p-8 flex-center">
                    <div className="animate-float text-2xl neon-text-cyan">
                      Float Animation
                    </div>
                  </div>
                </div>
              </div>
            </Container>
          </Section>

          {/* Button Variants */}
          <Section padding="lg">
            <Container maxWidth="2xl">
              <h2 className="text-4xl font-bold mb-12 text-center">Button Variants</h2>
              <div className="flex flex-wrap gap-4 justify-center">
                <Button variant="primary" size="md">
                  Primary
                </Button>
                <Button variant="secondary" size="md">
                  Secondary
                </Button>
                <Button variant="ghost" size="md">
                  Ghost
                </Button>
                <Button variant="neon" size="md">
                  Neon
                </Button>
              </div>
            </Container>
          </Section>

          {/* CTA Section */}
          <Section padding="xl" variant="gradient">
            <Container maxWidth="2xl">
              <div className="flex-center flex-col gap-8 text-center">
                <h2 className="text-4xl font-bold">Ready to Build?</h2>
                <p className="max-w-lg text-lg text-dark-200">
                  Start using these theme utilities and components in your projects. Everything is configured and ready to go.
                </p>
                <div className="flex gap-4 flex-wrap justify-center">
                  <Button variant="neon" size="lg">
                    View Documentation
                  </Button>
                  <Button variant="secondary" size="lg">
                    Browse Components
                  </Button>
                </div>
                <p className="text-sm text-dark-400 mt-8">
                  Tailwind CSS v4 • Next.js 16 • App Router • TypeScript
                </p>
              </div>
            </Container>
          </Section>
        </PageWrapper>
      </main>
      <Footer
        copyrightText="© 2024 Premium Dark Experience. All rights reserved."
      />
    </>
  );
}
