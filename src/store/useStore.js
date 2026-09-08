import { create } from 'zustand';
import { persist } from 'zustand/middleware';

/**
 * Global UI Store using Zustand.
 * Handles state that needs to be accessible across multiple components:
 * reading-mode preferences and the last-visited topic.
 */
const useStore = create(
  persist(
    (set) => ({
      // Slug of the most recently visited topic - powers the "Continue reading" app shortcut
      lastVisitedTopicSlug: null,

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
        readingMode: state.readingMode,
        lastVisitedTopicSlug: state.lastVisitedTopicSlug,
      }),
    },
  ),
);

export default useStore;
