/**
 * One-line descriptions for each content category, keyed by category slug.
 * A category with no entry here still works everywhere else (routing,
 * counts) - it just shows an empty description until one is added.
 */
const categoryMeta = {
  'interview-prep': {
    description:
      'Closures, the event loop, and the questions that separate a memorized answer from real understanding.',
  },
  react: {
    description:
      'What Fiber actually does, why re-renders happen, and how the reconciler decides what to touch.',
  },
  nextjs: {
    description:
      'Rendering strategies, the App Router, and the caching layers that decide what your users actually see.',
  },
};

export default categoryMeta;
