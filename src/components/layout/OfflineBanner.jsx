import React from 'react';
import Toast from './Toast';
import useOnlineStatus from '../../Hooks/useOnlineStatus';

/**
 * OfflineBanner - shows a toast while offline; only previously-cached pages actually work offline.
 */
const OfflineBanner = () => {
  const isOnline = useOnlineStatus();

  if (isOnline) return null;

  return <Toast message="You're offline, showing cached content." />;
};

export default OfflineBanner;
