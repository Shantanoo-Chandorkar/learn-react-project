import React, { useCallback, useEffect, useState } from 'react';
import { ArrowDownTrayIcon } from '@heroicons/react/24/outline';
import useStore from '../../store/useStore';
import Toast from './Toast';

const isIosDevice = () => /iphone|ipad|ipod/i.test(window.navigator.userAgent);

const isStandaloneDisplay = () =>
  window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true;

/**
 * InstallButton - PWA install trigger; reads shared install state so every instance on a page agrees.
 *
 * @param {string|null} label Text rendered beside the icon; icon-only when omitted.
 * @param {string} className Class applied to the button, defaults to the header icon style.
 * @returns {JSX.Element} The install trigger, plus its toast when this instance was clicked.
 */
const InstallButton = ({ label = null, className = 'install-trigger' }) => {
  const installPromptEvent = useStore((state) => state.installPromptEvent);
  const isAppInstalled = useStore((state) => state.isAppInstalled);
  const wasInstallPromptDismissed = useStore((state) => state.wasInstallPromptDismissed);
  const setInstallPromptEvent = useStore((state) => state.setInstallPromptEvent);
  const setAppInstalled = useStore((state) => state.setAppInstalled);
  const markInstallPromptDismissed = useStore((state) => state.markInstallPromptDismissed);
  const [feedbackMessage, setFeedbackMessage] = useState(null);

  useEffect(() => {
    // Read in an effect: the server can't know display mode, so reading it during render fails hydration.
    if (isStandaloneDisplay()) setAppInstalled();

    const handleBeforeInstallPrompt = (event) => {
      event.preventDefault();
      setInstallPromptEvent(event);
    };
    const handleAppInstalled = () => setAppInstalled();

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);
    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, [setAppInstalled, setInstallPromptEvent]);

  useEffect(() => {
    if (!feedbackMessage) return undefined;
    const dismissTimer = setTimeout(() => setFeedbackMessage(null), 4000);
    return () => clearTimeout(dismissTimer);
  }, [feedbackMessage]);

  const handleClick = useCallback(async () => {
    if (isAppInstalled) {
      setFeedbackMessage('Already installed.');
      return;
    }

    if (installPromptEvent) {
      installPromptEvent.prompt();
      const { outcome } = await installPromptEvent.userChoice;
      if (outcome === 'accepted') {
        setAppInstalled();
        return;
      }
      markInstallPromptDismissed();
      return;
    }

    if (wasInstallPromptDismissed) {
      setFeedbackMessage('Install dismissed. Reload the page to try again.');
      return;
    }

    if (isIosDevice()) {
      setFeedbackMessage('Tap the Share icon, then "Add to Home Screen".');
      return;
    }

    setFeedbackMessage('Install is not supported in this browser.');
  }, [
    isAppInstalled,
    installPromptEvent,
    wasInstallPromptDismissed,
    setAppInstalled,
    markInstallPromptDismissed,
  ]);

  const isLabelled = label !== null;
  const buttonLabel = isAppInstalled && isLabelled ? 'Installed' : label;

  return (
    <>
      <button
        onClick={handleClick}
        className={className}
        disabled={isAppInstalled && isLabelled}
        aria-label={isLabelled ? undefined : 'Install app'}
      >
        <ArrowDownTrayIcon width={18} height={18} />
        {buttonLabel}
      </button>
      {feedbackMessage && (
        <Toast message={feedbackMessage} onDismiss={() => setFeedbackMessage(null)} />
      )}
    </>
  );
};

export default InstallButton;
