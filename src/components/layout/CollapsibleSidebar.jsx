import React from 'react';
import useStore from '../../store/useStore';

const CloseIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" style={{ width: '1.25rem', height: '1.25rem' }}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
);

const OpenIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" style={{ width: '1.25rem', height: '1.25rem' }}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
    </svg>
);

/**
 * CollapsibleSidebar Shell Component
 * 
 * A reusable container for sidebar content that handles its own 
 * open/closed state and provides a toggle button on the right edge.
 * 
 * @param {Object} props
 * @param {React.ReactNode} props.children - The content to render inside the sidebar
 */
const CollapsibleSidebar = ({ children }) => {
    const { isSidebarOpen, closeSidebar } = useStore();

    return (
        <>
            <aside className={`collapsible-sidebar ${isSidebarOpen ? 'is-open' : 'is-closed'}`}>
                <div className="sidebar-inner-content">
                    {children}
                </div>
            </aside>

            {/* Mobile overlay */}
            {isSidebarOpen && (
                <div className="mobile-overlay" onClick={closeSidebar} />
            )}
        </>
    );
};

export default CollapsibleSidebar;
