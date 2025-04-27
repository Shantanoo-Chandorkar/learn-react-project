import React from 'react';
import './style.css'; // Create a CSS file for styling if needed

const Header = () => {
  return (
    <header className="learn-react-project-header-outer">
      <div className="learn-react-project-header-link">
        <a href="https://react.dev" target="_blank" rel="noopener noreferrer">
          React Docs
        </a>
      </div>

      <h1 className="learn-react-project-header-title">
        Welcome to React Tutorial
      </h1>

      <div className="learn-react-project-header-link">
        <a href="https://github.com/Shantanoo-Chandorkar/learn-react-project" target="_blank" rel="noopener noreferrer">
          GitHub Repo
        </a>
      </div>
    </header>
  );
};

export default Header;
