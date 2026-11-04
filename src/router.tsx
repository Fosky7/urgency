import { createRouter } from '@tanstack/react-router';

import { Route as rootRoute } from './routes/__root';
import { Route as indexRoute } from './routes/index';
import { Route as feedRoute } from './routes/feed';
import { Route as impactRoute } from './routes/impact';
import { Route as createRoute } from './routes/create';
import { Route as planRoute } from './routes/plan';

/**
 * Explicit route registration for Swipe to Fund.
 *
 * The tree is declared here instead of relying on a generated file so that a
 * route can never ship as a file on disk while still 404ing from the real
 * build (that is exactly what happened to `/feed`). Any new page must be
 * imported and added to `rootRoute.addChildren([...])` below.
 */
const routeTree = rootRoute.addChildren([
  indexRoute,
  feedRoute,
  impactRoute,
  createRoute,
  planRoute,
]);

export const router = createRouter({
  routeTree,
  defaultPreload: 'intent',
  scrollRestoration: true,
});

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export default router;
