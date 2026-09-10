import React from 'react';

/**
 * CollapsibleSidebar Shell Component
 *
 * A reusable container for sidebar content. Purely presentational - open
 * state lives in the parent (Sidebar.jsx) and is passed down as props.
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children - The content to render inside the sidebar
 * @param {boolean} props.isOpen - Whether the sidebar is expanded
 * @param {() => void} props.onClose - Called when the mobile overlay is clicked
 */
const CollapsibleSidebar = ({ children, isOpen, onClose }) => {
    return (
        <>
            <aside className={`collapsible-sidebar ${isOpen ? 'is-open' : 'is-closed'}`}>
                <div className="sidebar-inner-content">
                    {children}
                </div>
            </aside>

            {/* Mobile overlay */}
            {isOpen && (
                <div className="mobile-overlay" onClick={onClose} />
            )}
        </>
    );
};

export default CollapsibleSidebar;
