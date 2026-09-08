import React, { useEffect, useRef, useState } from 'react';
import * as Accordion from '@radix-ui/react-accordion';
import { SIDEBAR_TOGGLE_EVENT } from '../../utils/sidebarToggleEvent';
import useSidebarNavigation from '../../Hooks/useSidebarNavigation';
import CollapsibleSidebar from './CollapsibleSidebar';

import {
    HomeIcon,
    Squares2X2Icon,
    AcademicCapIcon,
    BookOpenIcon,
    IdentificationIcon,
} from '@heroicons/react/24/outline';

const categoryIcons = {
    'interview-prep': AcademicCapIcon,
    'react': IdentificationIcon,
    'nextjs': BookOpenIcon,
};

const ChevronDownIcon = ({ className, style }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className={className}
        style={{ width: '1rem', height: '1rem', ...style }}
    >
        <path
            fillRule="evenodd"
            d="M12.53 16.28a.75.75 0 0 1-1.06 0l-7.5-7.5a.75.75 0 0 1 1.06-1.06L12 14.69l6.97-6.97a.75.75 0 1 1 1.06 1.06l-7.5 7.5Z"
            clipRule="evenodd"
        />
    </svg>
);

/**
 * Sidebar navigation component — Astro island (client:visible).
 *
 * Owns the sidebar's open/closed state locally (always starts closed;
 * listens for the header toggle button's SIDEBAR_TOGGLE_EVENT). Also acts
 * as the content provider for the CollapsibleSidebar shell and handles
 * navigation/active-link logic.
 *
 * @param {Object} props
 * @param {string} props.currentPath - Current URL pathname (from Astro.url.pathname)
 */
const Sidebar = ({ currentPath = '' }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const closeSidebar = () => setIsSidebarOpen(false);

    useEffect(() => {
        const toggle = () => setIsSidebarOpen((open) => !open);
        window.addEventListener(SIDEBAR_TOGGLE_EVENT, toggle);
        return () => window.removeEventListener(SIDEBAR_TOGGLE_EVENT, toggle);
    }, []);

    const sidebarRef = useRef(null);
    const dynamicNavigation = useSidebarNavigation();

    // Initialise with the server-provided path so the first paint is correct.
    const [pathname, setPathname] = useState(currentPath);

    useEffect(() => {
        setPathname(window.location.pathname);
    }, []);

    const navigation = dynamicNavigation;

    /**
     * Returns true when the given href matches the current pathname.
     *
     * @param {string} href
     * @returns {boolean}
     */
    const isActive = (href) => {
        if (href === '/') return pathname === '/';
        return pathname === href;
    };

    // Find the active category and subcategory to keep them open by default
    const activeCategory = navigation.find(cat =>
        cat.ungrouped.some(topic => isActive(topic.customPath || `/topic/${topic.slug}`)) ||
        cat.subcategories.some(sub => sub.topics.some(topic => isActive(topic.customPath || `/topic/${topic.slug}`)))
    )?.id;

    const activeSubcategory = navigation.find(cat => cat.id === activeCategory)
        ?.subcategories.find(sub => sub.topics.some(topic => isActive(topic.customPath || `/topic/${topic.slug}`)))
        ?.id;

    // Scroll to the active link after hydration
    useEffect(() => {
        const activeLink = sidebarRef.current?.querySelector('a.active');
        if (activeLink) {
            activeLink.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
    }, [pathname]);

    const renderTopicLink = (topic) => {
        const path = topic.customPath || `/topic/${topic.slug}`;
        return (
            <li key={topic.id}>
                <a
                    href={path}
                    onClick={closeSidebar}
                    className={isActive(path) ? 'active' : undefined}
                >
                    <span className="sidebar-link-label">{topic.title}</span>
                </a>
            </li>
        );
    };

    const renderCategory = (category) => {
        const Icon = categoryIcons[category.id] || Squares2X2Icon;
        return (
            <Accordion.Item value={category.id} key={category.id}>
                <Accordion.Trigger className="sidebar-accordion-trigger">
                    <div className="sidebar-category-header">
                        <Icon className="sidebar-category-icon" />
                        <span className="sidebar-category-label">{category.name}</span>
                    </div>
                    <ChevronDownIcon className="sidebar-accordion-chevron" />
                </Accordion.Trigger>
                <Accordion.Content className="sidebar-accordion-content">
                    {category.subcategories.length > 0 && (
                        <Accordion.Root
                            type="multiple"
                            className="sidebar-nested-accordion"
                            defaultValue={activeSubcategory ? [activeSubcategory] : []}
                        >
                            {category.subcategories.map((sub) => (
                                <Accordion.Item value={sub.id} key={sub.id}>
                                    <Accordion.Trigger className="sidebar-nested-accordion-trigger">
                                        <span className="sidebar-subcategory-label">{sub.name}</span>
                                        <ChevronDownIcon
                                            className="sidebar-nested-accordion-chevron"
                                            style={{ width: '0.75rem', height: '0.75rem' }}
                                        />
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
    };

    return (
        <CollapsibleSidebar isOpen={isSidebarOpen} onClose={closeSidebar}>
            <div ref={sidebarRef}>
                <div className="sidebar-header">
                    <span className="sidebar-header-label">Topics</span>
                </div>

                <nav className="sidebar-nav">
                    <ul>
                        <li className="sidebar-nav-home">
                            <a
                                href="/"
                                onClick={closeSidebar}
                                className={isActive('/') ? 'active' : undefined}
                            >
                                <HomeIcon className="sidebar-category-icon" />
                                <span className="sidebar-link-label">Home</span>
                            </a>
                        </li>
                    </ul>

                    <Accordion.Root
                        type="multiple"
                        defaultValue={activeCategory ? [activeCategory] : []}
                    >
                        {navigation.map(renderCategory)}
                    </Accordion.Root>
                </nav>
            </div>
        </CollapsibleSidebar>
    );
};

export default Sidebar;
