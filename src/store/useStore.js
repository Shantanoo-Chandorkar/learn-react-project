import { create } from 'zustand';

/**
 * Global UI Store using Zustand.
 * Handles state that needs to be accessible across multiple components
 * such as mobile menu visibility, theme, etc.
 */
const useStore = create((set) => ({
  // --- Mobile Menu State ---
  isMobileMenuOpen: false,

  // --- Actions ---
  toggleMobileMenu: () => set((state) => ({ isMobileMenuOpen: !state.isMobileMenuOpen })),

  closeMobileMenu: () => set({ isMobileMenuOpen: false }),

  openMobileMenu: () => set({ isMobileMenuOpen: true }),
}));

export default useStore;
