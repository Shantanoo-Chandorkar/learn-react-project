import React, { useEffect, useRef } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import * as Accordion from '@radix-ui/react-accordion';
import topics from '../../content/topics.json';
import { CheckCircleIcon, ChevronDownIcon } from '@heroicons/react/24/solid';
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
  const interviewPrep = topics.filter((t) => t.category === 'interview-prep');

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
          <li className="sidebar-nav-home">
            <NavLink to="/" end onClick={onClose}>
              Home
            </NavLink>
          </li>
        </ul>

        <Accordion.Root type="multiple">
          <Accordion.Item value="hooks">
            <Accordion.Trigger className="sidebar-accordion-trigger">
              Hooks
              <ChevronDownIcon className="sidebar-accordion-chevron" />
            </Accordion.Trigger>
            <Accordion.Content className="sidebar-accordion-content">
              <ul>{hooks.map(renderTopicLink)}</ul>
            </Accordion.Content>
          </Accordion.Item>

          <Accordion.Item value="related-topics">
            <Accordion.Trigger className="sidebar-accordion-trigger">
              Related Topics
              <ChevronDownIcon className="sidebar-accordion-chevron" />
            </Accordion.Trigger>
            <Accordion.Content className="sidebar-accordion-content">
              <ul>{relatedTopics.map(renderTopicLink)}</ul>
            </Accordion.Content>
          </Accordion.Item>

          <Accordion.Item value="interview-prep">
            <Accordion.Trigger className="sidebar-accordion-trigger">
              Interview Prep
              <ChevronDownIcon className="sidebar-accordion-chevron" />
            </Accordion.Trigger>
            <Accordion.Content className="sidebar-accordion-content">
              <ul>{interviewPrep.map(renderTopicLink)}</ul>
            </Accordion.Content>
          </Accordion.Item>

          <Accordion.Item value="other-resources">
            <Accordion.Trigger className="sidebar-accordion-trigger">
              Other Resources
              <ChevronDownIcon className="sidebar-accordion-chevron" />
            </Accordion.Trigger>
            <Accordion.Content className="sidebar-accordion-content">
              <ul>
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
            </Accordion.Content>
          </Accordion.Item>
        </Accordion.Root>
      </nav>
    </aside>
  );
};

export default Sidebar;
