import React from 'react';

/**
 * MDX component marking a self-test question. Tagged with data-tts-role so
 * reading mode can announce "Question" and read it as its own segment.
 */
const Question = (props) => (
    <div
        data-tts-role="question"
        style={{
            marginTop: '1.5rem',
            marginBottom: '0.75rem',
            padding: '0.875rem 1rem',
            borderLeft: '4px solid var(--primary-color)',
            backgroundColor: 'var(--primary-tint)',
            borderRadius: '0 0.375rem 0.375rem 0',
        }}
        {...props}
    />
);

export default Question;
