import { createRoute, createRouter } from '@tanstack/react-router';

import { Route as rootRoute } from '@/routes/__root';
import { HomePage } from '@/routes/index';
import { PlanPage } from '@/routes/plan';
import { FeedPage } from '@/routes/feed';
import { ImpactPage } from '@/routes/impact';
import { CreatePage } from '@/routes/create';

/**
 * Explicit route tree for Swipe to Fund.
 *
 * The tree is declared here instead of relying on a generated
 * `routeTree.gen.ts` so that every address the header links to (`/`, `/plan`,
 * `/feed`, `/impact`, `/create`) is registered at build time and can never
 * answer 404 while the home page loads.
 */
const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: HomePage,
});

const planRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/plan',
  component: PlanPage,
});

const feedRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/feed',
  component: FeedPage,
});

const impactRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/impact',
  component: ImpactPage,
});

const createPageRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/create',
  component: CreatePage,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  planRoute,
  feedRoute,
  impactRoute,
  createPageRoute,
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
