'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { Badge } from './Badge';
import { Button } from './Button';

interface ProductCardProps {
  id: string;
  title: string;
  description: string;
  price: string;
  imageSrc: string;
  badge?: string;
  badgeColor?: 'purple' | 'lime' | 'cyan' | 'pink';
  onQuickView?: () => void;
  className?: string;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  id,
  title,
  description,
  price,
  imageSrc,
  badge,
  badgeColor = 'purple',
  onQuickView,
  className = '',
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [shouldLoad, setShouldLoad] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  // Intersection Observer for lazy loading
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            setShouldLoad(true);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        rootMargin: '50px', // Start loading 50px before visible
        threshold: 0.1,
      }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, []);

  const handleImageLoad = () => {
    setIsLoaded(true);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const isActive = isHovered || isFocused;

  return (
    <article
      ref={cardRef}
      className={`group relative bg-dark-800 border border-dark-700 rounded-xl overflow-hidden transition-all duration-300 hover:border-neon-purple focus-within:border-neon-purple ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: isActive ? 'perspective(1000px) rotateY(5deg) rotateX(-5deg) scale(1.05)' : 'perspective(1000px) rotateY(0deg) rotateX(0deg) scale(1)',
        transformStyle: 'preserve-3d',
        transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        boxShadow: isActive 
          ? '0 25px 50px -12px rgba(233, 30, 140, 0.25), 0 0 30px rgba(233, 30, 140, 0.1)' 
          : '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)',
      }}
      tabIndex={0}
      onFocus={handleFocus}
      onBlur={handleBlur}
      role="article"
      aria-labelledby={`product-${id}-title`}
      aria-describedby={`product-${id}-description`}
    >
      {/* Product Image */}
      <div className="relative aspect-square overflow-hidden bg-dark-900">
        {shouldLoad && (
          <Image
            src={imageSrc}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className={`object-cover transition-all duration-500 ${isActive ? 'scale-110' : 'scale-100'} ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
            onLoad={handleImageLoad}
            loading="lazy"
            quality={85}
            priority={false}
          />
        )}
        
        {/* Loading skeleton */}
        {!isLoaded && (
          <div className="absolute inset-0 bg-gradient-to-br from-dark-800 to-dark-900 animate-pulse" />
        )}

        {/* Badge */}
        {badge && (
          <div className="absolute top-4 left-4 z-10">
            <Badge variant={badgeColor}>
              {badge}
            </Badge>
          </div>
        )}

        {/* Quick View Overlay */}
        <div 
          className={`absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent transition-opacity duration-300 ${isActive ? 'opacity-100' : 'opacity-0'}`}
          style={{
            transform: 'translateZ(20px)',
          }}
        >
          <div className="absolute bottom-4 left-4 right-4">
            <Button
              variant="neon"
              size="sm"
              className="w-full"
              onClick={onQuickView}
              aria-label={`Quick view ${title}`}
            >
              Quick View
            </Button>
          </div>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-6" style={{ transform: 'translateZ(10px)' }}>
        <div className="flex items-start justify-between mb-2">
          <h3 
            id={`product-${id}-title`}
            className="text-lg font-bold text-white group-hover:text-neon-purple transition-colors duration-200"
          >
            {title}
          </h3>
          <span className="text-xl font-bold text-neon-lime">
            {price}
          </span>
        </div>
        
        <p 
          id={`product-${id}-description`}
          className="text-sm text-gray-400 line-clamp-2 mb-4"
        >
          {description}
        </p>

        <Button
          variant="secondary"
          size="sm"
          className="w-full group-hover:bg-neon-purple group-hover:border-neon-purple transition-all duration-200"
          aria-label={`Add ${title} to cart`}
        >
          Add to Cart
        </Button>
      </div>

      {/* Decorative corner accent */}
      <div 
        className={`absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-transparent to-neon-purple/20 transition-opacity duration-300 ${isActive ? 'opacity-100' : 'opacity-0'}`}
        style={{
          clipPath: 'polygon(100% 0, 0 0, 100% 100%)',
        }}
      />
    </article>
  );
};