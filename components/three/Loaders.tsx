'use client';

import { Html, useProgress } from '@react-three/drei';

/**
 * Loading progress indicator for 3D assets.
 * Displays a centered loading bar with percentage inside the Canvas.
 * 
 * Uses Drei's useProgress hook to track asset loading:
 * - progress: Percentage loaded (0-100)
 * - active: Whether assets are currently loading
 * - item: Current item being loaded
 * - loaded: Number of items loaded
 * - total: Total number of items to load
 */
export function Loader() {
  const { progress, active } = useProgress();

  if (!active) return null;

  return (
    <Html center>
      <div className="flex flex-col items-center justify-center gap-4 min-w-[300px]">
        {/* Loading text */}
        <div className="text-neon-purple text-lg font-heading uppercase tracking-wider">
          Loading 3D Assets
        </div>

        {/* Progress bar container */}
        <div className="w-full h-2 bg-charcoal-800 rounded-full overflow-hidden border border-charcoal-700">
          {/* Progress bar fill */}
          <div
            className="h-full bg-gradient-to-r from-neon-purple to-neon-cyan transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Progress percentage */}
        <div className="text-charcoal-300 text-sm font-mono">
          {progress.toFixed(0)}%
        </div>
      </div>
    </Html>
  );
}

/**
 * Simple fallback loader for Suspense boundaries outside the Canvas.
 * Used for lazy-loaded 3D modules before they're ready.
 */
export function FallbackLoader() {
  return (
    <div className="flex items-center justify-center w-full h-full min-h-[400px] bg-charcoal-900/50">
      <div className="flex flex-col items-center gap-4">
        {/* Animated spinner */}
        <div className="w-16 h-16 border-4 border-charcoal-700 border-t-neon-purple rounded-full animate-spin" />

        {/* Loading text */}
        <p className="text-charcoal-300 text-sm font-mono uppercase tracking-wider">
          Initializing 3D...
        </p>
      </div>
    </div>
  );
}

/**
 * Error boundary fallback for 3D content loading failures.
 * Displays user-friendly error message with retry option.
 */
export function LoaderError({ error, reset }: { error?: Error; reset?: () => void }) {
  return (
    <div className="flex items-center justify-center w-full h-full min-h-[400px] bg-charcoal-900/50">
      <div className="flex flex-col items-center gap-4 max-w-md p-6">
        {/* Error icon */}
        <div className="w-16 h-16 rounded-full bg-red-500/10 border-2 border-red-500 flex items-center justify-center">
          <span className="text-3xl text-red-500">⚠</span>
        </div>

        {/* Error message */}
        <h3 className="text-xl font-heading text-charcoal-100 text-center">
          Failed to Load 3D Content
        </h3>
        
        {error && (
          <p className="text-sm text-charcoal-400 text-center font-mono">
            {error.message}
          </p>
        )}

        {/* Retry button */}
        {reset && (
          <button
            onClick={reset}
            className="px-6 py-2 bg-neon-purple/20 hover:bg-neon-purple/30 border border-neon-purple rounded-lg text-neon-purple font-heading uppercase tracking-wider transition-all duration-200"
          >
            Retry
          </button>
        )}
      </div>
    </div>
  );
}
