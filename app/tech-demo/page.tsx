'use client';

import { TechnologySection } from '@/components/TechnologySection';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { PageWrapper } from '@/components/PageWrapper';

/**
 * Technology Demo Page: Showcases the interactive TechnologySection component.
 * 
 * This page demonstrates:
 * - Tab-based navigation between technology features
 * - 3D scene synchronization with Valtio state management
 * - Smooth camera transitions and lighting changes  
 * - Responsive design with mobile fallbacks
 * - Performance optimizations for different device capabilities
 */
export default function TechnologyDemoPage() {
  return (
    <>
      <Navbar />
      <main>
        <PageWrapper sectionSpacing="lg">
          <TechnologySection />
        </PageWrapper>
      </main>
      <Footer />
    </>
  );
}