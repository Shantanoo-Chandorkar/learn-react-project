import React from 'react';
import { Outlet } from 'react-router-dom';
import useStore from '../../store/useStore';
import Header from './Header';
import Sidebar from './Sidebar';
import ErrorBoundary from '../ErrorBoundary';
import './Layout.css';

/**
 * Main Layout Container Component
 *
 * This component handles the global UI state (Zustand) and orchestrates
 * the presentational Header and Sidebar components.
 * Mandate: Container/Presentational Pattern, Error Boundaries.
 */
const Layout = () => {
  const { isMobileMenuOpen, toggleMobileMenu, closeMobileMenu } = useStore();

  return (
    <div className={`layout-root ${isMobileMenuOpen ? 'mobile-menu-open' : ''}`}>
      <Header onMenuToggle={toggleMobileMenu} />

      <div className="layout-body">
        <Sidebar isOpen={isMobileMenuOpen} onClose={closeMobileMenu} />

        <main className="layout-content">
          <ErrorBoundary>
            <Outlet />
          </ErrorBoundary>
        </main>
      </div>

      {/* Overlay for mobile menu */}
      {isMobileMenuOpen && <div className="mobile-overlay" onClick={closeMobileMenu} />}
    </div>
  );
};

export default Layout;
