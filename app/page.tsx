'use client';

import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { Badge } from '@/components/Badge';
import { Container } from '@/components/Container';
import { Section } from '@/components/Section';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { PageWrapper } from '@/components/PageWrapper';

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="bg-dark-950">
        <PageWrapper sectionSpacing="lg" scrollSnapping={false}>
          {/* Hero Section */}
          <Section padding="xl" variant="gradient">
            <Container maxWidth="2xl">
              <div className="flex-center flex-col gap-8 text-center">
                <h1 className="text-6xl font-bold neon-text-purple animate-pulse-neon">
                  Premium Dark Experience
                </h1>
                <p className="max-w-xl text-xl text-dark-100">
                  Tailwind CSS custom theme with dark backgrounds, neon accents, and 3D depth effects
                </p>
                <div className="flex gap-4 flex-wrap justify-center">
                  <Button variant="neon" size="lg">
                    Get Started
                  </Button>
                  <Button variant="secondary" size="lg">
                    Learn More
                  </Button>
                </div>
              </div>
            </Container>
          </Section>

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
