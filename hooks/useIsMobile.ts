'use client';

import { useEffect, useState } from 'react';

/**
 * Hook to detect if the current device is mobile based on viewport width.
 * Useful for enabling performance optimizations on low-power devices.
 * 
 * @param breakpoint - The width threshold for mobile detection (default: 768px)
 * @returns boolean indicating if the device is mobile
 */
export function useIsMobile(breakpoint: number = 768): boolean {
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    // Initial check
    const checkMobile = () => {
      setIsMobile(window.innerWidth < breakpoint);
    };

    // Check on mount
    checkMobile();

    // Update on resize
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, [breakpoint]);

  return isMobile;
}
