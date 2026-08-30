import React from 'react';

/**
 * MDX component marking a self-test answer. Wraps a native <details> so the
 * existing click-to-reveal behavior is preserved, tagged with data-tts-role
 * so reading mode can announce "Answer" and read it as its own segment.
 */
const Answer = ({ children }) => (
    <details
        data-tts-role="answer"
        style={{
            marginBottom: '1.5rem',
            padding: '0.875rem 1rem',
            border: '1px solid #bfdbfe',
            borderRadius: '0.375rem',
            backgroundColor: '#f8fafc',
        }}
    >
        <summary style={{ cursor: 'pointer', fontWeight: 600, color: '#1e40af' }}>
            Answer
        </summary>
        <div style={{ marginTop: '0.75rem' }}>{children}</div>
    </details>
);

export default Answer;
