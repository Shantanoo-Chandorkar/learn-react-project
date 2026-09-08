import { useEffect, useState } from 'react';

/**
 * Tracks the browser's online/offline connectivity state.
 *
 * @returns {boolean} True when the browser reports a network connection.
 */
export const useOnlineStatus = () => {
  // Starts true to match SSR (no navigator server-side); real status syncs after mount.
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    setIsOnline(navigator.onLine);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return isOnline;
};

export default useOnlineStatus;
