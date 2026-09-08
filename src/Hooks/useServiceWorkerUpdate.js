import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * Registers the PWA service worker and exposes prompt-to-refresh state.
 *
 * @returns {{ needsRefresh: boolean, applyUpdate: () => void, dismiss: () => void }}
 */
export const useServiceWorkerUpdate = () => {
  const [needsRefresh, setNeedsRefresh] = useState(false);
  const updateSWRef = useRef(null);

  useEffect(() => {
    import('virtual:pwa-register')
      .then(({ registerSW }) => {
        updateSWRef.current = registerSW({
          immediate: true,
          onNeedRefresh() {
            setNeedsRefresh(true);
          },
        });
      })
      .catch((error) => console.warn('Service worker registration failed:', error));
  }, []);

  const applyUpdate = useCallback(() => {
    updateSWRef.current?.(true);
  }, []);

  const dismiss = useCallback(() => {
    setNeedsRefresh(false);
  }, []);

  return { needsRefresh, applyUpdate, dismiss };
};

export default useServiceWorkerUpdate;
