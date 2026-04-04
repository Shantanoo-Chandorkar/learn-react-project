import React, { useState, useEffect, useRef, useMemo } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import Fuse from 'fuse.js';
import topics from '../../content/topics.json';

/**
 * SearchModal Component
 *
 * Spotlight-style search interface using fuse.js for indexing.
 * Supports Ctrl+K shortcut and keyboard navigation.
 */
const SearchModal = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  // Initialize Fuse.js
  const fuse = useMemo(() => {
    return new Fuse(topics, {
      keys: ['title', 'category'],
      threshold: 0.3,
    });
  }, []);

  // Update results when query changes
  useEffect(() => {
    if (query.trim() === '') {
      setResults([]);
    } else {
      setResults(fuse.search(query).map((r) => r.item));
    }
    setSelectedIndex(0);
  }, [query, fuse]);

  // Handle keyboard navigation
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
        if (results[selectedIndex]) {
          navigate(`/topic/${results[selectedIndex].slug}`);
          onClose();
        }
      } else if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, results, selectedIndex, navigate, onClose]);

  // Focus input when modal opens
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
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
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
          backgroundColor: 'white',
          borderRadius: '1rem',
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
          display: 'flex',
          flexDirection: 'column',
          maxHeight: '70vh',
          overflow: 'hidden',
        }}
      >
        <div style={{ padding: '1.5rem', borderBottom: '1px solid #e2e8f0' }}>
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
              border: '2px solid #3b82f6',
              borderRadius: '0.5rem',
              outline: 'none',
            }}
          />
        </div>

        <div style={{ flex: 1, overflowY: 'auto', padding: '1rem' }}>
          {query.trim() === '' ? (
            <p style={{ textAlign: 'center', color: '#64748b' }}>Type to search for topics...</p>
          ) : results.length === 0 ? (
            <p style={{ textAlign: 'center', color: '#64748b' }}>No results found for "{query}"</p>
          ) : (
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {results.map((topic, index) => (
                <li
                  key={topic.id}
                  onClick={() => {
                    navigate(`/topic/${topic.slug}`);
                    onClose();
                  }}
                  style={{
                    padding: '1rem',
                    borderRadius: '0.5rem',
                    cursor: 'pointer',
                    backgroundColor: index === selectedIndex ? '#eff6ff' : 'transparent',
                    borderLeft:
                      index === selectedIndex ? '4px solid #3b82f6' : '4px solid transparent',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.25rem',
                  }}
                >
                  <span style={{ fontWeight: '600', color: '#1e293b' }}>{topic.title}</span>
                  <span
                    style={{ fontSize: '0.8rem', color: '#64748b', textTransform: 'uppercase' }}
                  >
                    {topic.category}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div
          style={{
            padding: '1rem',
            backgroundColor: '#f8fafc',
            borderTop: '1px solid #e2e8f0',
            display: 'flex',
            justifyContent: 'space-between',
            fontSize: '0.8rem',
            color: '#64748b',
          }}
        >
          <span>
            <kbd style={{ padding: '2px 4px', border: '1px solid #cbd5e1', borderRadius: '4px' }}>
              ↵
            </kbd>{' '}
            select
          </span>
          <span>
            <kbd style={{ padding: '2px 4px', border: '1px solid #cbd5e1', borderRadius: '4px' }}>
              ↑↓
            </kbd>{' '}
            navigate
          </span>
          <span>
            <kbd style={{ padding: '2px 4px', border: '1px solid #cbd5e1', borderRadius: '4px' }}>
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
