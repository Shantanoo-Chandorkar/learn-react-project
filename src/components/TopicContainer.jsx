import React, { lazy, Suspense, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import ErrorBoundary from './ErrorBoundary';
import MDXComponents from './mdx/MDXComponents';

/**
 * TopicContainer Component
 *
 * Dynamically loads and renders MDX content based on the URL slug.
 * Implements Lazy-Loading, Suspense, and Error Boundaries as per mandates.
 */
const TopicContainer = () => {
  const { slug } = useParams();

  // Memoize the lazy component to prevent re-creation on every render
  // unless the slug changes.
  const Content = useMemo(() => {
    return lazy(() =>
      import(`../content/${slug}.mdx`).catch((error) => {
        console.error(`Error loading MDX for slug "${slug}":`, error);
        // We throw the error so it can be caught by the ErrorBoundary
        throw new Error(`Topic "${slug}" not found or failed to load.`);
      }),
    );
  }, [slug]);

  return (
    <div className="topic-container">
      <ErrorBoundary key={slug}>
        <Suspense
          fallback={
            <div style={{ padding: '2rem', textAlign: 'center' }}>Loading topic content...</div>
          }
        >
          <div
            className="mdx-content-wrapper"
            style={{ maxWidth: '700px', margin: '0 auto', padding: '2rem' }}
          >
            <Content components={MDXComponents} />
          </div>
        </Suspense>
      </ErrorBoundary>
    </div>
  );
};

export default TopicContainer;
