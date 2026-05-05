import React from 'react';

/**
 * MDXComponents — passed to <Content components={MDXComponents} /> in [slug].astro.
 *
 * Provides custom styling for prose elements rendered from MDX.
 * ComponentRegistry is no longer needed here: interactive React components
 * are now imported directly inside each MDX file with `client:load`.
 *
 * Code blocks (<pre> and <code>) are intentionally omitted — Shiki handles
 * syntax highlighting via the theme configured in astro.config.mjs.
 */
const MDXComponents = {
    h1: (props) => (
        <h1
            style={{
                color: '#2563eb',
                marginBottom: '1rem',
                borderBottom: '2px solid #e5e7eb',
                paddingBottom: '0.5rem',
            }}
            {...props}
        />
    ),
    h2: (props) => (
        <h2 style={{ color: '#1e40af', marginTop: '2rem', marginBottom: '1rem' }} {...props} />
    ),
    p: (props) => (
        <p
            style={{
                lineHeight: '1.75',
                marginBottom: '1.25rem',
                fontFamily: 'var(--font-serif)',
                fontSize: '1.1rem',
            }}
            {...props}
        />
    ),
    ul: (props) => (
        <ul
            style={{ listStyleType: 'disc', paddingLeft: '1.5rem', marginBottom: '1.25rem' }}
            {...props}
        />
    ),
    li: (props) => <li style={{ marginBottom: '0.5rem' }} {...props} />,
    blockquote: (props) => (
        <blockquote
            style={{
                borderLeft: '4px solid #2563eb',
                paddingLeft: '1rem',
                fontStyle: 'italic',
                color: '#4b5563',
                margin: '1.5rem 0',
            }}
            {...props}
        />
    ),
    table: (props) => (
        <div style={{ overflowX: 'auto', marginBottom: '1.25rem' }}>
            <table
                style={{
                    width: '100%',
                    borderCollapse: 'collapse',
                    fontSize: '1rem',
                    fontFamily: 'var(--font-serif)',
                }}
                {...props}
            />
        </div>
    ),
    thead: (props) => <thead style={{ backgroundColor: '#eff6ff' }} {...props} />,
    th: (props) => (
        <th
            style={{
                padding: '0.625rem 0.875rem',
                textAlign: 'left',
                fontWeight: '600',
                color: '#1e40af',
                borderBottom: '2px solid #bfdbfe',
                whiteSpace: 'nowrap',
            }}
            {...props}
        />
    ),
    td: (props) => (
        <td
            style={{
                padding: '0.625rem 0.875rem',
                borderBottom: '1px solid #e5e7eb',
                verticalAlign: 'top',
                lineHeight: '1.6',
            }}
            {...props}
        />
    ),
    // Table row hover is handled by CSS (.mdx-content-wrapper table tr:hover)
    // rather than event handlers so it works without React hydration.
    tr: (props) => <tr {...props} />,
};

export default MDXComponents;
