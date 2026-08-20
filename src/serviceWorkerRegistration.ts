// Utility to register and manage Service Worker for offline asset caching

export function registerServiceWorker(onSuccess?: () => void, onUpdate?: () => void): void {
  if (typeof window === 'undefined' || !('serviceWorker' in navigator)) {
    return;
  }

  window.addEventListener('load', () => {
    const swUrl = '/sw.js';

    navigator.serviceWorker
      .register(swUrl)
      .then((registration) => {
        registration.onupdatefound = () => {
          const installingWorker = registration.installing;
          if (installingWorker == null) {
            return;
          }

          installingWorker.onstatechange = () => {
            if (installingWorker.state === 'installed') {
              if (navigator.serviceWorker.controller) {
                // New content is available and will be used when all tabs for this page are closed
                if (onUpdate) onUpdate();
              } else {
                // Content is cached for offline use
                if (onSuccess) onSuccess();
              }
            }
          };
        };
      })
      .catch((error) => {
        // Silently log or handle in iframe sandboxes where SW registration may be restricted
        console.info('[SW] Service worker registration info:', error?.message || error);
      });
  });
}

export function unregisterServiceWorker(): void {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready
      .then((registration) => {
        registration.unregister();
      })
      .catch((error) => {
        console.error(error.message);
      });
  }
}
