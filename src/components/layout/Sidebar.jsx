import React, { useEffect, useRef } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import * as Accordion from '@radix-ui/react-accordion';
import { CheckCircleIcon, ChevronDownIcon } from '@heroicons/react/24/solid';
import useStore from '../../store/useStore';
import useSidebarNavigation from '../../Hooks/useSidebarNavigation';

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
  const dynamicNavigation = useSidebarNavigation();

  // Combine dynamic topics with hardcoded "Other Resources"
  const navigation = [
    ...dynamicNavigation,
    {
      id: 'other-resources',
      name: 'Other Resources',
      subcategories: [],
      ungrouped: [
        {
          id: 'rr-demo',
          title: 'React Router Demo',
          slug: 'react-router',
          customPath: '/topic/react-router',
        },
        { id: 'rf', title: 'React Form', slug: 'react-form', customPath: '/react-form' },
        { id: 'mf', title: 'Multi-Page Form', slug: 'multi-form', customPath: '/multi-form' },
        {
          id: 'msf',
          title: 'Multi-Step Flow',
          slug: 'multi-step-flow',
          customPath: '/multi-step-flow',
        },
      ],
    },
  ];

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
    const path = topic.customPath || `/topic/${topic.slug}`;
    return (
      <li key={topic.id}>
        <NavLink to={path} onClick={onClose}>
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

  const renderCategory = (category) => (
    <Accordion.Item value={category.id} key={category.id}>
      <Accordion.Trigger className="sidebar-accordion-trigger">
        {category.name}
        <ChevronDownIcon className="sidebar-accordion-chevron" />
      </Accordion.Trigger>
      <Accordion.Content className="sidebar-accordion-content">
        {category.subcategories.length > 0 && (
          <Accordion.Root type="multiple" className="sidebar-nested-accordion">
            {category.subcategories.map((sub) => (
              <Accordion.Item value={sub.id} key={sub.id}>
                <Accordion.Trigger className="sidebar-nested-accordion-trigger">
                  {sub.name}
                  <ChevronDownIcon className="sidebar-nested-accordion-chevron" />
                </Accordion.Trigger>
                <Accordion.Content className="sidebar-nested-accordion-content">
                  <ul>{sub.topics.map(renderTopicLink)}</ul>
                </Accordion.Content>
              </Accordion.Item>
            ))}
          </Accordion.Root>
        )}
        {category.ungrouped.length > 0 && <ul>{category.ungrouped.map(renderTopicLink)}</ul>}
      </Accordion.Content>
    </Accordion.Item>
  );

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

        <Accordion.Root type="multiple">{navigation.map(renderCategory)}</Accordion.Root>
      </nav>
    </aside>
  );
};

export default Sidebar;
