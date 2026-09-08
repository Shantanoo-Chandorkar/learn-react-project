import React, { useEffect, useState } from 'react';
import useStore from '../../store/useStore';
import { SIDEBAR_TOGGLE_EVENT } from '../../utils/sidebarToggleEvent';
import '../../Header/style.css';
import SearchModal from './SearchModal';
import ReadingModeControls from './ReadingModeControls';
import InstallButton from './InstallButton';
import OfflineBanner from './OfflineBanner';
import Toast from './Toast';
import useServiceWorkerUpdate from '../../Hooks/useServiceWorkerUpdate';

/**
 * Presentational Header Component — Astro island (client:load).
 *
 * Manages its own local search-modal state and the Ctrl+K shortcut.
 * Gets the mobile-menu toggle action directly from the Zustand store
 * instead of receiving it as a prop from a React parent layout.
 * Uses plain <a> tags for navigation — no react-router-dom in Astro.
 */
const SidebarIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
    <line x1="9" x2="9" y1="3" y2="21" />
  </svg>
);

const Header = () => {
  const { setLastVisitedTopicSlug } = useStore();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { needsRefresh, applyUpdate, dismiss } = useServiceWorkerUpdate();

  // Powers the "Continue reading" app shortcut, which needs the last-visited slug.
  useEffect(() => {
    const topicMatch = window.location.pathname.match(/^\/topic\/([^/]+)/);
    if (topicMatch) setLastVisitedTopicSlug(topicMatch[1]);
  }, [setLastVisitedTopicSlug]);

  // /?search=1 is the "Search" app shortcut's target URL (astro.config.mjs manifest.shortcuts).
  useEffect(() => {
    if (new URLSearchParams(window.location.search).get('search') === '1') {
      setIsSearchOpen(true);
      window.history.replaceState(null, '', window.location.pathname);
    }
  }, []);

  return (
    <header className="learn-react-project-header-outer">
      <div className="header-left-section">
        <button
          className="sidebar-toggle-trigger"
          onClick={() => window.dispatchEvent(new CustomEvent(SIDEBAR_TOGGLE_EVENT))}
          aria-label="Toggle sidebar"
        >
          <SidebarIcon />
        </button>
      </div>

      <div className="learn-react-project-header-title">
        <a href="/">EscapeTheSurface</a>
      </div>

      <div className="header-right-section">
        <ReadingModeControls />
        <InstallButton />
        <button onClick={() => setIsSearchOpen(true)} className="header-search-trigger">
          <span>Search...</span>
          <kbd>⌘K</kbd>
        </button>
      </div>

      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
      <OfflineBanner />
      {needsRefresh && (
        <Toast
          message="New content available."
          actionLabel="Refresh"
          onAction={applyUpdate}
          onDismiss={dismiss}
        />
      )}
    </header>
  );
};

export default Header;
