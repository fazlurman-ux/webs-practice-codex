'use client';

import { proxy } from 'valtio';

/**
 * Technology feature interface for the breakdown section
 */
export interface TechFeature {
  id: string;
  name: string;
  description: string;
  detailedDescription: string;
  icon?: string;
  // 3D scene properties
  cameraPosition?: [number, number, number];
  cameraTarget?: [number, number, number];
  lightingPreset?: 'standard' | 'neon' | 'minimal' | 'focused';
  highlightColor?: string;
  // Animation properties
  transitionDuration?: number;
  zoomLevel?: number;
}

/**
 * Valtio store for managing TechnologySection state.
 * 
 * Synchronizes UI tabs/hotspots with 3D scene camera, lighting, and annotations.
 * Provides smooth transitions and fallback states for reduced performance devices.
 */
export const useTechStore = proxy({
  // Current active feature
  activeFeatureId: 'materials' as string,
  
  // Available features (populated by component)
  features: [] as TechFeature[],
  
  // UI state
  isLoading: false,
  hasError: false,
  errorMessage: '',
  
  // 3D scene state
  cameraTransitioning: false,
  currentCameraPosition: [0, 0, 0] as [number, number, number],
  currentCameraTarget: [0, 0, 0] as [number, number, number],
  currentLightingPreset: 'standard' as 'standard' | 'neon' | 'minimal' | 'focused',
  
  // Performance settings
  reducedMotion: false,
  enable3D: true,
  
  // Actions
  setActiveFeature: (featureId: string) => {
    const feature = useTechStore.features.find(f => f.id === featureId);
    if (feature) {
      useTechStore.activeFeatureId = featureId;
      useTechStore.cameraTransitioning = true;
      
      // Update 3D scene settings based on feature
      if (feature.cameraPosition) {
        useTechStore.currentCameraPosition = feature.cameraPosition;
      }
      if (feature.cameraTarget) {
        useTechStore.currentCameraTarget = feature.cameraTarget;
      }
      if (feature.lightingPreset) {
        useTechStore.currentLightingPreset = feature.lightingPreset;
      }
      
      // Reset transitioning flag after animation
      setTimeout(() => {
        useTechStore.cameraTransitioning = false;
      }, feature.transitionDuration || 1000);
    }
  },
  
  setFeatures: (features: TechFeature[]) => {
    useTechStore.features = features;
    // Set initial camera position from first feature
    if (features.length > 0 && features[0].cameraPosition) {
      useTechStore.currentCameraPosition = features[0].cameraPosition;
      useTechStore.currentCameraTarget = features[0].cameraTarget || [0, 0, 0];
    }
  },
  
  setReducedMotion: (reduced: boolean) => {
    useTechStore.reducedMotion = reduced;
    // Disable 3D transitions for reduced motion preference
    if (reduced) {
      useTechStore.enable3D = false;
    }
  },
  
  setError: (error: string) => {
    useTechStore.hasError = true;
    useTechStore.errorMessage = error;
    useTechStore.isLoading = false;
  },
  
  clearError: () => {
    useTechStore.hasError = false;
    useTechStore.errorMessage = '';
  },
  
  // Get current active feature
  getActiveFeature: () => {
    return useTechStore.features.find(f => f.id === useTechStore.activeFeatureId);
  },
});

/**
 * Hook to subscribe to tech store changes
 * Usage: const snap = useSnapshot(techStore);
 */
import { useSnapshot } from 'valtio';
export { useSnapshot };