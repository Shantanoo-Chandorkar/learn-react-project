import React, { useEffect, useRef, useState } from 'react';
import * as Accordion from '@radix-ui/react-accordion';
import * as Tooltip from '@radix-ui/react-tooltip';
import useStore from '../../store/useStore';
import useSidebarNavigation from '../../Hooks/useSidebarNavigation';
import CollapsibleSidebar from './CollapsibleSidebar';

import { 
    HomeIcon, 
    Squares2X2Icon, 
    AcademicCapIcon, 
    BookOpenIcon, 
    BeakerIcon, 
    IdentificationIcon,
    BriefcaseIcon
} from '@heroicons/react/24/outline';

const categoryIcons = {
    'hooks': BeakerIcon,
    'related-topics': Squares2X2Icon,
    'interview-prep': AcademicCapIcon,
    'react': IdentificationIcon,
    'nextjs': BookOpenIcon,
    'other-resources': BriefcaseIcon,
};

const CheckCircleIcon = ({ style, className }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        style={style}
        className={className}
    >
        <path
            fillRule="evenodd"
            d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.74-5.24Z"
            clipRule="evenodd"
        />
    </svg>
);

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
 * SidebarTooltip component
 * Wraps children with a portal-based tooltip that only triggers in Rail mode.
 */
const SidebarTooltip = ({ children, content }) => {
    const { isSidebarOpen } = useStore();
    
    // Only show tooltips when sidebar is closed (Rail mode)
    if (isSidebarOpen) return children;

    return (
        <Tooltip.Root delayDuration={100}>
            <Tooltip.Trigger asChild>
                {children}
            </Tooltip.Trigger>
            <Tooltip.Portal>
                <Tooltip.Content 
                    side="right" 
                    sideOffset={12} 
                    className="TooltipContent"
                >
                    {content}
                    <Tooltip.Arrow className="TooltipArrow" />
                </Tooltip.Content>
            </Tooltip.Portal>
        </Tooltip.Root>
    );
};

/**
 * Sidebar navigation component — Astro island (client:load).
 *
 * Now acts as the content provider for the CollapsibleSidebar shell.
 * Handles navigation logic, active state, and topic progress.
 *
 * @param {Object} props
 * @param {string} props.currentPath - Current URL pathname (from Astro.url.pathname)
 */
const Sidebar = ({ currentPath = '' }) => {
    const { closeSidebar, completedTopics } = useStore();
    const sidebarRef = useRef(null);
    const dynamicNavigation = useSidebarNavigation();

    // Initialise with the server-provided path so the first paint is correct.
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
        const isCompleted = completedTopics.includes(topic.slug);
        const path = topic.customPath || `/topic/${topic.slug}`;
        return (
            <li key={topic.id}>
                <a
                    href={path}
                    onClick={closeSidebar}
                    className={isActive(path) ? 'active' : undefined}
                >
                    <div
                        style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                    >
                        <span className="sidebar-link-label">{topic.title}</span>
                        {isCompleted && (
                            <CheckCircleIcon
                                style={{ width: '1rem', height: '1rem', color: '#10b981' }}
                                className="sidebar-link-status"
                            />
                        )}
                    </div>
                </a>
            </li>
        );
    };

    const renderCategory = (category) => {
        const Icon = categoryIcons[category.id] || Squares2X2Icon;
        return (
            <Accordion.Item value={category.id} key={category.id}>
                <SidebarTooltip content={category.name}>
                    <Accordion.Trigger className="sidebar-accordion-trigger">
                        <div className="sidebar-category-header">
                            <Icon className="sidebar-category-icon" />
                            <span className="sidebar-category-label">{category.name}</span>
                        </div>
                        <ChevronDownIcon className="sidebar-accordion-chevron" />
                    </Accordion.Trigger>
                </SidebarTooltip>
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
        <CollapsibleSidebar>
            <Tooltip.Provider>
                <div ref={sidebarRef}>
                    <div className="sidebar-header">
                        <span className="sidebar-header-label">Topics</span>
                    </div>

                    <nav className="sidebar-nav">
                        <ul>
                            <li className="sidebar-nav-home">
                                <SidebarTooltip content="Home">
                                    <a
                                        href="/"
                                        onClick={closeSidebar}
                                        className={isActive('/') ? 'active' : undefined}
                                    >
                                        <HomeIcon className="sidebar-category-icon" />
                                        <span className="sidebar-link-label">Home</span>
                                    </a>
                                </SidebarTooltip>
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
            </Tooltip.Provider>
        </CollapsibleSidebar>
    );
};

export default Sidebar;
