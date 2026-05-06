import { create } from 'zustand';
import { persist } from 'zustand/middleware';

/**
 * Global UI Store using Zustand.
 * Handles state that needs to be accessible across multiple components
 * such as mobile menu visibility, theme, and topic progress.
 */
const useStore = create(
  persist(
    (set) => ({
      // --- Sidebar State ---
      isSidebarOpen: true,

      // --- Progress Tracking State ---
      // Array of slugs for completed topics
      completedTopics: [],

      // --- Actions ---
      toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),

      closeSidebar: () => set({ isSidebarOpen: false }),

      openSidebar: () => set({ isSidebarOpen: true }),

      // Progress Actions
      toggleTopicCompletion: (slug) =>
        set((state) => ({
          completedTopics: state.completedTopics.includes(slug)
            ? state.completedTopics.filter((s) => s !== slug)
            : [...state.completedTopics, slug],
        })),
    }),
    {
      name: 'learn-react-platform-storage', // unique name for localStorage
      partialize: (state) => ({ 
        completedTopics: state.completedTopics,
        isSidebarOpen: state.isSidebarOpen 
      }), // persist progress and sidebar state
    },
  ),
);

export default useStore;
