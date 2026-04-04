import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../../Header/style.css'; // Reuse existing styles for now
import SearchModal from './SearchModal';

/**
 * Presentational Header Component
 *
 * This component handles its own local search state and Ctrl+K shortcut.
 * Mandate: Container/Presentational Pattern, Pure Components.
 *
 * @param {Object} props
 * @param {Function} props.onMenuToggle - Action to toggle mobile menu
 */
const Header = ({ onMenuToggle }) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Ctrl+K Global Shortcut
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <header className="learn-react-project-header-outer">
      <div className="mobile-menu-button-container">
        <button
          className="mobile-menu-button"
          onClick={onMenuToggle}
          aria-label="Toggle mobile menu"
        >
          {/* Menu Icon Hamburger */}
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
        </button>
      </div>

      <div className="learn-react-project-header-link" style={{ display: 'flex', gap: '1rem' }}>
        <button
          onClick={() => setIsSearchOpen(true)}
          style={{
            background: '#3f4451',
            border: 'none',
            color: '#9ca3af',
            padding: '0.5rem 1rem',
            borderRadius: '0.5rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            fontSize: '0.9rem',
          }}
        >
          <span>Search...</span>
          <kbd
            style={{
              background: '#282c34',
              padding: '2px 4px',
              borderRadius: '4px',
              fontSize: '0.7rem',
            }}
          >
            ⌘K
          </kbd>
        </button>
      </div>

      <div className="learn-react-project-header-title">
        <Link to="/">Learn React Platform</Link>
      </div>

      <div className="learn-react-project-header-link">
        <a href="https://react.dev" target="_blank" rel="noopener noreferrer">
          React Docs
        </a>
      </div>

      <div className="learn-react-project-header-link">
        <Link to="/topic/react-router">React Router</Link>
      </div>

      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </header>
  );
};

export default Header;
