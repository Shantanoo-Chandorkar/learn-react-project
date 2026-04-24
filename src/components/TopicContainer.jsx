import React, { lazy, Suspense, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import ErrorBoundary from './ErrorBoundary';
import MDXComponents from './mdx/MDXComponents';
import ArticleFooter from './ArticleFooter';
import topics from '../content/topics.json';
import { buildOgImageUrl } from '../utils/ogUrl';

/**
 * TopicContainer Component
 *
 * Dynamically loads and renders MDX content based on the URL slug.
 * Implements Lazy-Loading, Suspense, and Error Boundaries as per mandates.
 */
const TopicContainer = () => {
  const { slug } = useParams();

  // Look up topic metadata from the static JSON for OG tag generation.
  // Falls back gracefully if the slug doesn't match (e.g. during a 404 state).
  const topic = useMemo(() => topics.find((t) => t.slug === slug), [slug]);

  // Scroll content area to top on topic change
  React.useEffect(() => {
    const contentArea = document.querySelector('.layout-content');
    if (contentArea) {
      contentArea.scrollTo(0, 0);
    }
  }, [slug]);

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
      {topic && (
        <Helmet>
          <meta property="og:type" content="article" />
          <meta property="og:title" content={topic.title} />
          <meta property="og:url" content={`https://welcome-react-tutorial.netlify.app/topic/${topic.slug}`} />
          <meta property="og:image" content={buildOgImageUrl(topic)} />
          <meta property="og:image:width" content="1200" />
          <meta property="og:image:height" content="630" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:image" content={buildOgImageUrl(topic)} />
        </Helmet>
      )}
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
            <ArticleFooter slug={slug} />
          </div>
        </Suspense>
      </ErrorBoundary>
    </div>
  );
};

export default TopicContainer;
