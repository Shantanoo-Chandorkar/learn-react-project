import React, { useEffect, useRef } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import topics from '../../content/topics.json';
import { CheckCircleIcon } from '@heroicons/react/24/solid';
import useStore from '../../store/useStore';

/**
 * Presentational Sidebar Component
 *
 * This component handles navigation links using the static topics definition.
 * Mandate: Container/Presentational Pattern, Pure Components.
 *
 * @param {Object} props
 * @param {boolean} props.isOpen - Whether the sidebar is open on mobile
 * @param {Function} props.onClose - Action to close the sidebar
 */
const Sidebar = ({ isOpen, onClose }) => {
  const location = useLocation();
  const sidebarRef = useRef(null);
  const { completedTopics } = useStore();

  const hooks = topics.filter((t) => t.category === 'hooks');
  const relatedTopics = topics.filter((t) => t.category === 'related-topics');

  // Auto-scroll to active link on mount and location change
  useEffect(() => {
    const activeLink = sidebarRef.current?.querySelector('a.active');
    if (activeLink) {
      activeLink.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
      });
    }
  }, [location.pathname]);

  const renderTopicLink = (topic) => {
    const isCompleted = completedTopics.includes(topic.slug);
    return (
      <li key={topic.id}>
        <NavLink to={`/topic/${topic.slug}`} onClick={onClose}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span>{topic.title}</span>
            {isCompleted && (
              <CheckCircleIcon style={{ width: '1rem', height: '1rem', color: '#10b981' }} />
            )}
          </div>
        </NavLink>
      </li>
    );
  };

  return (
    <aside className={`sidebar-container ${isOpen ? 'is-open' : ''}`} ref={sidebarRef}>
      <div className="sidebar-header">
        <h2>Topics</h2>
        <button className="close-sidebar" onClick={onClose} aria-label="Close sidebar">
          &times;
        </button>
      </div>

      <nav className="sidebar-nav">
        <ul>
          <li>
            <NavLink to="/" end onClick={onClose}>
              Home
            </NavLink>
          </li>

          <li className="sidebar-section-header">Hooks</li>
          {hooks.map(renderTopicLink)}

          <li className="sidebar-section-header">Related Topics</li>
          {relatedTopics.map(renderTopicLink)}

          <li className="sidebar-divider">Other Resources</li>
          <li>
            <NavLink to="/topic/react-router" onClick={onClose}>
              React Router Demo
            </NavLink>
          </li>
          <li>
            <NavLink to="/react-form" onClick={onClose}>
              React Form
            </NavLink>
          </li>
          <li>
            <NavLink to="/multi-form" onClick={onClose}>
              Multi-Page Form
            </NavLink>
          </li>
          <li>
            <NavLink to="/multi-step-flow" onClick={onClose}>
              Multi-Step Flow
            </NavLink>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
