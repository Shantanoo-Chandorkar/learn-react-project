// Header/Header.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './style.css';

const Header = () => {
  return (
    <header className="learn-react-project-header-outer">
      <div className='learn-react-project-header-link'>
        <a href='https://react.dev' target='_blank' rel='noopener noreferrer'>
          React Docs
        </a>
      </div>

      <div className='learn-react-project-header-title'>
        <Link to="/">
          Welcome to React Turorial
        </Link>
      </div>

      <div className='learn-react-project-header-link'>
        <a href='https://github.com/Shantanoo-Chandorkar/learn-react-project' target="_blank" rel="noopener noreferrer">
          Github Repo
        </a>
      </div>

      {/* {Link to the Internal React Router Section} */}
      <div className='learn-react-project-header-link'>
        <Link to="/react-router">React Router</Link>
      </div>
    </header>
  )
}

export default Header;