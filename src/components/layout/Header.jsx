import React, { useState, useEffect } from 'react';
import useStore from '../../store/useStore';
import '../../Header/style.css';
import SearchModal from './SearchModal';

/**
 * Presentational Header Component — Astro island (client:load).
 *
 * Manages its own local search-modal state and the Ctrl+K shortcut.
 * Gets the mobile-menu toggle action directly from the Zustand store
 * instead of receiving it as a prop from a React parent layout.
 * Uses plain <a> tags for navigation — no react-router-dom in Astro.
 */
const Header = () => {
    const { toggleMobileMenu } = useStore();
    const [isSearchOpen, setIsSearchOpen] = useState(false);

    // Ctrl+K / Cmd+K global shortcut
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
                    onClick={toggleMobileMenu}
                    aria-label="Toggle mobile menu"
                >
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
                        color: '#ffffff',
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
                <a href="/">Learn React Platform</a>
            </div>

            <div className="learn-react-project-header-link">
                <a href="https://react.dev" target="_blank" rel="noopener noreferrer">
                    React Docs
                </a>
            </div>

            <div className="learn-react-project-header-link">
                <a href="/topic/react-router">React Router</a>
            </div>

            <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
        </header>
    );
};

export default Header;
