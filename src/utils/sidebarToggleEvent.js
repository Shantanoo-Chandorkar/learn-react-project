/**
 * CustomEvent name Header.jsx dispatches and Sidebar.jsx listens for.
 * They're separate Astro islands with no shared React tree, so a plain
 * window event is how the toggle button reaches the sidebar panel.
 */
export const SIDEBAR_TOGGLE_EVENT = 'sidebar:toggle';
