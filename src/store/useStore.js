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

      // Slug of the most recently visited topic - powers the "Continue reading" app shortcut
      lastVisitedTopicSlug: null,

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

      setLastVisitedTopicSlug: (slug) => set({ lastVisitedTopicSlug: slug }),

      // --- Reading Mode State ---
      readingMode: { voiceURI: null, rate: 1, pitch: 1, readCodeBlocks: false },

      // Reading Mode Actions
      setReadingVoice: (voiceURI) =>
        set((state) => ({ readingMode: { ...state.readingMode, voiceURI } })),

      setReadingRate: (rate) => set((state) => ({ readingMode: { ...state.readingMode, rate } })),

      setReadingPitch: (pitch) =>
        set((state) => ({ readingMode: { ...state.readingMode, pitch } })),

      setReadCodeBlocks: (readCodeBlocks) =>
        set((state) => ({ readingMode: { ...state.readingMode, readCodeBlocks } })),
    }),
    {
      name: 'learn-react-platform-storage', // unique name for localStorage
      partialize: (state) => ({
        completedTopics: state.completedTopics,
        isSidebarOpen: state.isSidebarOpen,
        readingMode: state.readingMode,
        lastVisitedTopicSlug: state.lastVisitedTopicSlug,
      }), // persist progress, sidebar state, reading mode preferences, and last-visited topic
    },
  ),
);

export default useStore;
