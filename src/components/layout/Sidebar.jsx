import React, { useEffect, useRef, useState } from 'react';
import * as Accordion from '@radix-ui/react-accordion';
import { CheckCircleIcon, ChevronDownIcon } from '@heroicons/react/24/solid';
import useStore from '../../store/useStore';
import useSidebarNavigation from '../../Hooks/useSidebarNavigation';

/**
 * Sidebar navigation component — Astro island (client:load).
 *
 * Self-contained: reads mobile-menu state and completed-topics from the
 * Zustand store directly. Receives `currentPath` from the Astro layout
 * so the initial server render can mark the correct link as active
 * without waiting for client-side hydration.
 *
 * Uses plain <a> tags for navigation — no react-router-dom in Astro.
 * Active-link detection uses string comparison against window.location.pathname
 * (updated on mount) rather than the router's useLocation.
 *
 * The mobile overlay is rendered inside this component so the Astro
 * layout shell stays purely static.
 *
 * @param {Object} props
 * @param {string} props.currentPath - Current URL pathname (from Astro.url.pathname)
 */
const Sidebar = ({ currentPath = '' }) => {
    const { isMobileMenuOpen, closeMobileMenu, completedTopics } = useStore();
    const sidebarRef = useRef(null);
    const dynamicNavigation = useSidebarNavigation();

    // Initialise with the server-provided path so the first paint is correct.
    // The effect below syncs with window.location in case client-side navigation
    // ever happens (e.g. view transitions added in the future).
    const [pathname, setPathname] = useState(currentPath);

    useEffect(() => {
        setPathname(window.location.pathname);
    }, []);

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
                {
                    id: 'mf',
                    title: 'Multi-Page Form',
                    slug: 'multi-form',
                    customPath: '/multi-form',
                },
                {
                    id: 'msf',
                    title: 'Multi-Step Flow',
                    slug: 'multi-step-flow',
                    customPath: '/multi-step-flow',
                },
            ],
        },
    ];

    // Scroll to the active link after hydration
    useEffect(() => {
        const activeLink = sidebarRef.current?.querySelector('a.active');
        if (activeLink) {
            activeLink.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
    }, [pathname]);

    /**
     * Returns true when the given href matches the current pathname.
     * Exact match for "/" to avoid marking every link as active.
     *
     * @param {string} href
     * @returns {boolean}
     */
    const isActive = (href) => {
        if (href === '/') return pathname === '/';
        return pathname === href;
    };

    const renderTopicLink = (topic) => {
        const isCompleted = completedTopics.includes(topic.slug);
        const path = topic.customPath || `/topic/${topic.slug}`;
        return (
            <li key={topic.id}>
                <a
                    href={path}
                    onClick={closeMobileMenu}
                    className={isActive(path) ? 'active' : undefined}
                >
                    <div
                        style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                    >
                        <span>{topic.title}</span>
                        {isCompleted && (
                            <CheckCircleIcon
                                style={{ width: '1rem', height: '1rem', color: '#10b981' }}
                            />
                        )}
                    </div>
                </a>
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
                {category.ungrouped.length > 0 && (
                    <ul>{category.ungrouped.map(renderTopicLink)}</ul>
                )}
            </Accordion.Content>
        </Accordion.Item>
    );

    return (
        <>
            <aside className={`sidebar-container ${isMobileMenuOpen ? 'is-open' : ''}`} ref={sidebarRef}>
                <div className="sidebar-header">
                    <h2>Topics</h2>
                    <button
                        className="close-sidebar"
                        onClick={closeMobileMenu}
                        aria-label="Close sidebar"
                    >
                        &times;
                    </button>
                </div>

                <nav className="sidebar-nav">
                    <ul>
                        <li className="sidebar-nav-home">
                            <a
                                href="/"
                                onClick={closeMobileMenu}
                                className={isActive('/') ? 'active' : undefined}
                            >
                                Home
                            </a>
                        </li>
                    </ul>

                    <Accordion.Root type="multiple">{navigation.map(renderCategory)}</Accordion.Root>
                </nav>
            </aside>

            {/* Mobile overlay — rendered here so the static Astro layout stays clean */}
            {isMobileMenuOpen && (
                <div className="mobile-overlay" onClick={closeMobileMenu} />
            )}
        </>
    );
};

export default Sidebar;
