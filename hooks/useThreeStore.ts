'use client';

import { create } from 'zustand';
import { Vector3 } from 'three';

/**
 * State interface for the Three.js store
 * Manages viewport dimensions, camera positions, and performance settings
 */
interface ThreeState {
  // Viewport dimensions
  viewport: {
    width: number;
    height: number;
    dpr: number; // Device pixel ratio
  };

  // Camera settings
  cameraPosition: [number, number, number];
  cameraTarget: [number, number, number];

  // Performance settings
  reducedEffects: boolean; // Toggle for low-power devices
  enableShadows: boolean;
  enablePostProcessing: boolean;

  // Actions
  setViewport: (width: number, height: number, dpr: number) => void;
  setCameraPosition: (position: [number, number, number]) => void;
  setCameraTarget: (target: [number, number, number]) => void;
  setReducedEffects: (reduced: boolean) => void;
  toggleShadows: () => void;
  togglePostProcessing: () => void;
}

/**
 * Zustand store for managing 3D scene state across components.
 * 
 * Usage:
 * ```tsx
 * const { cameraPosition, setCameraPosition, reducedEffects } = useThreeStore();
 * ```
 * 
 * This centralized state management allows for:
 * - Synchronized camera movements across different scene components
 * - Performance toggles that affect all 3D elements
 * - Responsive viewport handling for canvas resizing
 */
export const useThreeStore = create<ThreeState>((set) => ({
  // Default viewport
  viewport: {
    width: typeof window !== 'undefined' ? window.innerWidth : 1920,
    height: typeof window !== 'undefined' ? window.innerHeight : 1080,
    dpr: typeof window !== 'undefined' ? window.devicePixelRatio : 1,
  },

  // Default camera settings (positioned for typical scene view)
  cameraPosition: [0, 2, 5],
  cameraTarget: [0, 0, 0],

  // Default performance settings (full quality)
  reducedEffects: false,
  enableShadows: true,
  enablePostProcessing: true,

  // Actions
  setViewport: (width, height, dpr) =>
    set({ viewport: { width, height, dpr } }),

  setCameraPosition: (position) =>
    set({ cameraPosition: position }),

  setCameraTarget: (target) =>
    set({ cameraTarget: target }),

  setReducedEffects: (reduced) =>
    set({
      reducedEffects: reduced,
      enableShadows: !reduced,
      enablePostProcessing: !reduced,
    }),

  toggleShadows: () =>
    set((state) => ({ enableShadows: !state.enableShadows })),

  togglePostProcessing: () =>
    set((state) => ({ enablePostProcessing: !state.enablePostProcessing })),
}));
