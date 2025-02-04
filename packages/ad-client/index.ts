'use client';

// export * from './lib/analytics';
import { Analytics } from './lib/analytics';

const run = () => {
  console.log('running');
  const script = window.document.getElementById('ad-analytics');
  if (script) {
    const organizationId = script.getAttribute('data-org-id') || undefined;
    const endpoint = script.getAttribute('data-endpoint') || undefined;
    const debug = script.getAttribute('data-debug') === 'true';
    const analytics = new Analytics({
      organizationId,
      endpoint,
      debug,
      cacheTimeout: 24 * 60 * 60 * 1000,
    });
    window.Analytics = analytics;
    analytics.track({
      type: 'PAGE_VIEW',
      adId: 'page-view',
    });
  }
};

// if (typeof document === "undefined" || document.readyState !== 'loading') {
//   setTimeout(onReady, 0);
// } else {
//   document.addEventListener('DOMContentLoaded', onReady);
// }

// function onReady() {
//   console.log('ready');
//   run();
//   // insert stuff here to run after page load
// }

// wait for window and document to be ready
if (typeof window !== 'undefined' && typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', run);
  } else {
    run();
  }
}

// (() => {

// })
