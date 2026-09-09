import { useEffect, useState } from 'react';

const STALLED_NAVIGATION_TIMEOUT_MS = 8000;

/**
 * Tracks whether an internal-link navigation is in flight, for a loading indicator on this MPA site.
 *
 * @returns {boolean} True while a navigation is in flight; resets on completion, cancel, or timeout.
 */
export const useNavigationLoading = () => {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let stalledNavigationTimeout = null;

    const clearStalledNavigationTimeout = () => {
      if (stalledNavigationTimeout) {
        clearTimeout(stalledNavigationTimeout);
        stalledNavigationTimeout = null;
      }
    };

    const isSamePageHashLink = (link) =>
      link.pathname === window.location.pathname &&
      link.search === window.location.search &&
      link.hash !== '';

    const handleClick = (event) => {
      if (event.defaultPrevented) return;
      if (event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

      const link = event.target.closest('a[href]');
      if (!link) return;
      if (link.target && link.target !== '_self') return;
      if (link.hasAttribute('download')) return;
      if (link.origin !== window.location.origin) return;
      if (isSamePageHashLink(link)) return;

      setIsLoading(true);
      clearStalledNavigationTimeout();
      stalledNavigationTimeout = setTimeout(() => setIsLoading(false), STALLED_NAVIGATION_TIMEOUT_MS);
    };

    // Fires on bfcache back/forward restores, and on the origin page if a navigation is cancelled.
    const handlePageShow = () => {
      clearStalledNavigationTimeout();
      setIsLoading(false);
    };

    document.addEventListener('click', handleClick);
    window.addEventListener('pageshow', handlePageShow);

    return () => {
      document.removeEventListener('click', handleClick);
      window.removeEventListener('pageshow', handlePageShow);
      clearStalledNavigationTimeout();
    };
  }, []);

  return isLoading;
};

export default useNavigationLoading;
