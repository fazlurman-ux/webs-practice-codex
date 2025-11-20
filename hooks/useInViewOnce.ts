import { useEffect, useRef, useState } from 'react';

interface UseInViewOptions {
  root?: Element | null;
  rootMargin?: string;
  threshold?: number | number[];
  freezeOnceVisible?: boolean;
}

export function useInViewOnce<T extends HTMLElement>({
  root = null,
  rootMargin = '0px',
  threshold = 0.25,
  freezeOnceVisible = true,
}: UseInViewOptions = {}) {
  const [hasIntersected, setHasIntersected] = useState(false);
  const targetRef = useRef<T | null>(null);

  useEffect(() => {
    const node = targetRef.current;
    if (!node || (freezeOnceVisible && hasIntersected)) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setHasIntersected(true);
            if (freezeOnceVisible) {
              observer.disconnect();
            }
          }
        });
      },
      { root, rootMargin, threshold }
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, [root, rootMargin, threshold, freezeOnceVisible, hasIntersected]);

  return { ref: targetRef, hasIntersected };
}
