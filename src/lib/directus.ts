import { createDirectus, rest } from '@directus/sdk';

export const DIRECTUS_URL = import.meta.env.VITE_DIRECTUS_URL || 'https://rampsaayconsulting.xyz/rampsaayconsulting-cms';

export const directus = createDirectus(DIRECTUS_URL).with(rest());
