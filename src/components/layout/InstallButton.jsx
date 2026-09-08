import React, { useCallback, useEffect, useState } from 'react';
import { ArrowDownTrayIcon } from '@heroicons/react/24/outline';
import Toast from './Toast';

const isIosDevice = () => /iphone|ipad|ipod/i.test(window.navigator.userAgent);

const isStandaloneDisplay = () =>
  window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true;

/**
 * InstallButton — always-visible header icon driving the PWA install flow (prompt, installed, or iOS fallback state).
 */
const InstallButton = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState(null);

  useEffect(() => {
    setIsInstalled(isStandaloneDisplay());

    const handleBeforeInstallPrompt = (event) => {
      event.preventDefault();
      setDeferredPrompt(event);
    };
    const handleAppInstalled = () => {
      setIsInstalled(true);
      setDeferredPrompt(null);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);
    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  useEffect(() => {
    if (!feedbackMessage) return undefined;
    const dismissTimer = setTimeout(() => setFeedbackMessage(null), 4000);
    return () => clearTimeout(dismissTimer);
  }, [feedbackMessage]);

  const handleClick = useCallback(async () => {
    if (isInstalled) {
      setFeedbackMessage('Already installed.');
      return;
    }

    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') setIsInstalled(true);
      setDeferredPrompt(null);
      return;
    }

    if (isIosDevice()) {
      setFeedbackMessage('Tap the Share icon, then "Add to Home Screen".');
      return;
    }

    setFeedbackMessage('Install is not supported in this browser.');
  }, [isInstalled, deferredPrompt]);

  return (
    <>
      <button onClick={handleClick} className="install-trigger" aria-label="Install app">
        <ArrowDownTrayIcon width={18} height={18} />
      </button>
      {feedbackMessage && (
        <Toast message={feedbackMessage} onDismiss={() => setFeedbackMessage(null)} />
      )}
    </>
  );
};

export default InstallButton;
