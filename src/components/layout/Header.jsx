import React from 'react';
import { Link } from 'react-router-dom';
import '../../Header/style.css'; // Reuse existing styles for now

/**
 * Presentational Header Component
 *
 * This component is pure and only relies on props for behavior.
 * Mandate: Container/Presentational Pattern, Pure Components.
 *
 * @param {Object} props
 * @param {Function} props.onMenuToggle - Action to toggle mobile menu
 */
const Header = ({ onMenuToggle }) => {
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

      <div className="learn-react-project-header-link">
        <a href="https://react.dev" target="_blank" rel="noopener noreferrer">
          React Docs
        </a>
      </div>

      <div className="learn-react-project-header-title">
        <Link to="/">Learn React Platform</Link>
      </div>

      <div className="learn-react-project-header-link">
        <a
          href="https://github.com/Shantanoo-Chandorkar/learn-react-project"
          target="_blank"
          rel="noopener noreferrer"
        >
          Github
        </a>
      </div>

      <div className="learn-react-project-header-link">
        <Link to="/react-router">React Router</Link>
      </div>
    </header>
  );
};

export default Header;
