import { createDirectus, rest } from '@directus/sdk';

// Use the current origin if we're in the browser to prevent www vs non-www CORS issues
const getBaseUrl = () => {
  if (typeof window !== 'undefined') {
    // If the configured URL is absolute but on the same domain, replace its origin with the current window's origin
    const configuredUrl = import.meta.env.VITE_DIRECTUS_URL || 'https://rampsaayconsulting.xyz/rampsaayconsulting-cms';
    try {
      const url = new URL(configuredUrl);
      if (url.hostname.includes('rampsaayconsulting.xyz')) {
        return `${window.location.origin}${url.pathname}`;
      }
    } catch (e) {
      // Ignore invalid URL
    }
  }
  return import.meta.env.VITE_DIRECTUS_URL || 'https://rampsaayconsulting.xyz/rampsaayconsulting-cms';
};

export const DIRECTUS_URL = getBaseUrl();

export const directus = createDirectus(DIRECTUS_URL).with(rest());
