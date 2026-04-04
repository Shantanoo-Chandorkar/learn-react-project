import React from 'react';
import PropTypes from 'prop-types';
import useStore from '../store/useStore';

/**
 * ArticleFooter Component
 *
 * Provides progress tracking controls at the end of an article.
 * Mandate: Pure UI concern handled by global state.
 */
const ArticleFooter = ({ slug }) => {
  const { completedTopics, toggleTopicCompletion } = useStore();
  const isCompleted = completedTopics.includes(slug);

  return (
    <footer
      className="article-footer"
      style={{
        marginTop: '4rem',
        paddingTop: '2rem',
        borderTop: '1px solid #e2e8f0',
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <button
        onClick={() => toggleTopicCompletion(slug)}
        className={`completion-button ${isCompleted ? 'completed' : ''}`}
        style={{
          padding: '0.75rem 2rem',
          borderRadius: '2rem',
          border: '2px solid',
          borderColor: isCompleted ? '#10b981' : '#2563eb',
          backgroundColor: isCompleted ? '#10b981' : 'transparent',
          color: isCompleted ? 'white' : '#2563eb',
          fontWeight: '600',
          cursor: 'pointer',
          transition: 'all 0.2s ease',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
        }}
      >
        {isCompleted ? (
          <>
            <span>Completed</span>
            <span role="img" aria-label="checkmark">
              ✅
            </span>
          </>
        ) : (
          'Mark as Complete'
        )}
      </button>
    </footer>
  );
};

ArticleFooter.propTypes = {
  slug: PropTypes.string.isRequired,
};

export default ArticleFooter;
