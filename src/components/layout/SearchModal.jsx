import React, { useState, useEffect, useRef, useMemo } from 'react';
import PropTypes from 'prop-types';
import Fuse from 'fuse.js';
import topics from '../../data/topics.json';

/**
 * SearchModal Component — used inside the Header React island.
 *
 * Spotlight-style search interface using fuse.js for fuzzy indexing.
 * Supports Ctrl+K shortcut and keyboard navigation.
 */
const SearchModal = ({ isOpen, onClose }) => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const inputRef = useRef(null);
    const resultRefs = useRef([]);

    const fuse = useMemo(
        () => new Fuse(topics, { keys: ['title', 'category'], threshold: 0.3 }),
        [],
    );

    useEffect(() => {
        if (query.trim() === '') {
            setResults([]);
        } else {
            setResults(fuse.search(query).map((r) => r.item));
        }
        setSelectedIndex(0);
    }, [query, fuse]);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (!isOpen) return;

            if (e.key === 'ArrowDown') {
                e.preventDefault();
                setSelectedIndex((prev) => (prev + 1) % Math.max(results.length, 1));
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                setSelectedIndex((prev) => (prev - 1 + results.length) % Math.max(results.length, 1));
            } else if (e.key === 'Enter') {
                // .click() reuses the mouse path so the nav progress bar's click-detection fires too
                resultRefs.current[selectedIndex]?.click();
            } else if (e.key === 'Escape') {
                onClose();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, results, selectedIndex, onClose]);

    useEffect(() => {
        if (isOpen) {
            setTimeout(() => inputRef.current?.focus(), 50);
        } else {
            setQuery('');
        }
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div
            className="search-modal-backdrop"
            onClick={onClose}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'var(--overlay-color)',
                backdropFilter: 'blur(4px)',
                zIndex: 2001,
                display: 'flex',
                justifyContent: 'center',
                paddingTop: '10vh',
            }}
        >
            <div
                className="search-modal-content"
                onClick={(e) => e.stopPropagation()}
                style={{
                    width: '90%',
                    maxWidth: '600px',
                    backgroundColor: 'var(--surface-1)',
                    borderRadius: '1rem',
                    boxShadow: '0 20px 25px -5px var(--shadow-color)',
                    display: 'flex',
                    flexDirection: 'column',
                    maxHeight: '70vh',
                    overflow: 'hidden',
                }}
            >
                <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--border-color)' }}>
                    <input
                        ref={inputRef}
                        type="text"
                        placeholder="Search topics (useState, useEffect...)"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        style={{
                            width: '100%',
                            padding: '0.75rem 1rem',
                            fontSize: '1.1rem',
                            border: '2px solid var(--primary-color)',
                            borderRadius: '0.5rem',
                            outline: 'none',
                        }}
                    />
                </div>

                <div style={{ flex: 1, overflowY: 'auto', padding: '1rem' }}>
                    {query.trim() === '' ? (
                        <p style={{ textAlign: 'center', color: 'var(--secondary-color)' }}>
                            Type to search for topics...
                        </p>
                    ) : results.length === 0 ? (
                        <p style={{ textAlign: 'center', color: 'var(--secondary-color)' }}>
                            No results found for "{query}"
                        </p>
                    ) : (
                        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                            {results.map((topic, index) => (
                                <li key={topic.id}>
                                    <a
                                        href={`/topic/${topic.slug}`}
                                        onClick={onClose}
                                        ref={(element) => {
                                            resultRefs.current[index] = element;
                                        }}
                                        style={{
                                            padding: '1rem',
                                            borderRadius: '0.5rem',
                                            cursor: 'pointer',
                                            textDecoration: 'none',
                                            backgroundColor:
                                                index === selectedIndex ? 'var(--primary-tint)' : 'transparent',
                                            borderLeft:
                                                index === selectedIndex
                                                    ? '4px solid var(--primary-color)'
                                                    : '4px solid transparent',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            gap: '0.25rem',
                                        }}
                                    >
                                        <span style={{ fontWeight: '600', color: 'var(--text-color)' }}>
                                            {topic.title}
                                        </span>
                                        <span
                                            style={{
                                                fontSize: '0.8rem',
                                                color: 'var(--secondary-color)',
                                                textTransform: 'uppercase',
                                            }}
                                        >
                                            {topic.category}
                                        </span>
                                    </a>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                <div
                    style={{
                        padding: '1rem',
                        backgroundColor: 'var(--surface-2)',
                        borderTop: '1px solid var(--border-color)',
                        display: 'flex',
                        justifyContent: 'space-between',
                        fontSize: '0.8rem',
                        color: 'var(--secondary-color)',
                    }}
                >
                    <span>
                        <kbd
                            style={{
                                padding: '2px 4px',
                                border: '1px solid var(--border-color)',
                                borderRadius: '4px',
                            }}
                        >
                            ↵
                        </kbd>{' '}
                        select
                    </span>
                    <span>
                        <kbd
                            style={{
                                padding: '2px 4px',
                                border: '1px solid var(--border-color)',
                                borderRadius: '4px',
                            }}
                        >
                            ↑↓
                        </kbd>{' '}
                        navigate
                    </span>
                    <span>
                        <kbd
                            style={{
                                padding: '2px 4px',
                                border: '1px solid var(--border-color)',
                                borderRadius: '4px',
                            }}
                        >
                            esc
                        </kbd>{' '}
                        close
                    </span>
                </div>
            </div>
        </div>
    );
};

SearchModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
};

export default SearchModal;
