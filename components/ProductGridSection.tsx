'use client';

import React, { useState, useCallback, useRef, useEffect } from 'react';
import { ProductCard } from './ProductCard';
import { Button } from './Button';
import { Container } from './Container';
import { Section } from './Section';
import { useIsMobile } from '@/hooks/useIsMobile';

interface Product {
  id: string;
  title: string;
  description: string;
  price: string;
  imageSrc: string;
  badge?: string;
  badgeColor?: 'purple' | 'lime' | 'cyan' | 'pink';
}

interface ProductGridSectionProps {
  title?: string;
  subtitle?: string;
  products: Product[];
  itemsPerPage?: number;
  className?: string;
}

export const ProductGridSection: React.FC<ProductGridSectionProps> = ({
  title = "Featured Products",
  subtitle = "Discover our collection of premium items",
  products,
  itemsPerPage = 8,
  className = '',
}) => {
  const [displayedProducts, setDisplayedProducts] = useState<Product[]>([]);
  const [currentIndex, setCurrentIndex] = useState(itemsPerPage);
  const [isLoading, setIsLoading] = useState(false);
  const isMobile = useIsMobile();
  const gridRef = useRef<HTMLDivElement>(null);

  // Initialize displayed products
  useEffect(() => {
    const initialProducts = products.slice(0, itemsPerPage);
    setDisplayedProducts(initialProducts);
  }, [products, itemsPerPage]);

  const handleLoadMore = useCallback(() => {
    if (isLoading || currentIndex >= products.length) return;

    setIsLoading(true);
    
    // Simulate loading delay for better UX
    setTimeout(() => {
      const nextProducts = products.slice(currentIndex, currentIndex + itemsPerPage);
      setDisplayedProducts(prev => [...prev, ...nextProducts]);
      setCurrentIndex(prev => prev + itemsPerPage);
      setIsLoading(false);
    }, 300);
  }, [currentIndex, itemsPerPage, isLoading, products]);

  const handleQuickView = useCallback((productId: string) => {
    // Placeholder for quick view functionality
    console.log(`Quick view requested for product: ${productId}`);
    // This could open a modal, navigate to product page, etc.
  }, []);

  const hasMoreProducts = currentIndex < products.length;
  const shouldShowLoadMore = hasMoreProducts && displayedProducts.length > 0;

  // Responsive grid classes
  const gridClasses = isMobile 
    ? "grid grid-cols-1 gap-6" 
    : "grid grid-cols-2 gap-8 lg:gap-10";

  return (
    <Section className={`py-16 lg:py-24 ${className}`}>
      <Container>
        {/* Section Header */}
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-white mb-4">
            {title}
          </h2>
          <p className="text-lg lg:text-xl text-gray-400 max-w-2xl mx-auto">
            {subtitle}
          </p>
        </div>

        {/* Product Grid */}
        <div ref={gridRef} className={gridClasses}>
          {displayedProducts.map((product, index) => (
            <div
              key={product.id}
              className="animate-fade-in"
              style={{
                animationDelay: `${index * 100}ms`,
                animationFillMode: 'both',
              }}
            >
              <ProductCard
                id={product.id}
                title={product.title}
                description={product.description}
                price={product.price}
                imageSrc={product.imageSrc}
                badge={product.badge}
                badgeColor={product.badgeColor}
                onQuickView={() => handleQuickView(product.id)}
              />
            </div>
          ))}
        </div>

        {/* Load More Button */}
        {shouldShowLoadMore && (
          <div className="flex justify-center mt-12 lg:mt-16">
            <Button
              variant="primary"
              size="lg"
              onClick={handleLoadMore}
              disabled={isLoading}
              className="min-w-[200px] group"
              aria-label="Load more products"
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <svg 
                    className="animate-spin h-5 w-5" 
                    xmlns="http://www.w3.org/2000/svg" 
                    fill="none" 
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <circle 
                      className="opacity-25" 
                      cx="12" 
                      cy="12" 
                      r="10" 
                      stroke="currentColor" 
                      strokeWidth="4"
                    />
                    <path 
                      className="opacity-75" 
                      fill="currentColor" 
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Loading...
                </span>
              ) : (
                <span className="flex items-center gap-2 group-hover:gap-3 transition-all duration-200">
                  Load More
                  <svg 
                    className="w-5 h-5 transition-transform duration-200 group-hover:translate-x-1" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M17 8l4 4m0 0l-4 4m4-4H3" 
                    />
                  </svg>
                </span>
              )}
            </Button>
          </div>
        )}

        {/* No products state */}
        {products.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">No products available at the moment.</p>
          </div>
        )}

        {/* All products loaded indicator */}
        {!hasMoreProducts && displayedProducts.length > 0 && (
          <div className="text-center mt-8">
            <p className="text-gray-500 text-sm">
              Showing all {displayedProducts.length} products
            </p>
          </div>
        )}
      </Container>

      {/* CSS for fade-in animation */}
      <style jsx>{`
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
      `}</style>
    </Section>
  );
};