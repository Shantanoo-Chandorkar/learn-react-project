import React from 'react';
import ComponentRegistry from './ComponentRegistry';

const MDXComponents = {
  ...ComponentRegistry,
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
  code: (props) => (
    <code
      style={{
        backgroundColor: '#f3f4f6',
        padding: '0.2rem 0.4rem',
        borderRadius: '0.25rem',
        fontFamily: 'monospace',
      }}
      {...props}
    />
  ),
  pre: (props) => (
    <pre
      style={{
        backgroundColor: '#1f2937',
        color: '#f3f4f6',
        padding: '1rem',
        borderRadius: '0.5rem',
        overflowX: 'auto',
        marginBottom: '1.25rem',
      }}
      {...props}
    />
  ),
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
};

export default MDXComponents;
