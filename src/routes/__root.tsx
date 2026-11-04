import { createRootRoute, Link, Outlet } from '@tanstack/react-router';
import { Layout } from '@/components/Layout';

/**
 * Root route for Swipe to Fund.
 *
 * Every page renders inside the persistent `Layout`, which owns the site header:
 * the app name, the primary nav (Feed / Impact / Create) and the Build plan link.
 * Keeping the shell here means 404s and error states share the same chrome as
 * the happy path.
 */
export const Route = createRootRoute({
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootComponent() {
  return (
    <Layout>
      <Outlet />
    </Layout>
  );
}

function NotFoundComponent() {
  return (
    <Layout>
      <section className='status-page' aria-labelledby='not-found-title'>
        <span className='eyebrow'>404</span>
        <h1 id='not-found-title' className='page-title'>
          We couldn&rsquo;t find that page
        </h1>
        <p className='page-lede'>
          The link may be out of date. Head back to the swipe deck, or read the build
          plan to see what is shipping next.
        </p>
        <div className='hero__actions'>
          <Link to='/' className='btn btn--primary'>
            Back to home
          </Link>
          <Link to='/plan' className='btn btn--ghost'>
            Read the build plan
          </Link>
        </div>
      </section>
    </Layout>
  );
}

type RouteErrorProps = {
  error: unknown;
  reset?: () => void;
};

/**
 * Route-level error boundary. TanStack Router passes the thrown error and a
 * reset callback; both are surfaced so a failed render is recoverable instead of
 * showing a blank screen.
 */
function ErrorComponent({ error, reset }: RouteErrorProps) {
  const message =
    error instanceof Error && error.message
      ? error.message
      : 'An unexpected error interrupted this page.';

  return (
    <Layout>
      <section className='status-page' role='alert' aria-labelledby='route-error-title'>
        <span className='eyebrow'>Something went wrong</span>
        <h1 id='route-error-title' className='page-title'>
          This page couldn&rsquo;t load
        </h1>
        <p className='page-lede'>{message}</p>
        <div className='hero__actions'>
          {typeof reset === 'function' ? (
            <button type='button' className='btn btn--primary' onClick={reset}>
              Try again
            </button>
          ) : null}
          <Link to='/' className='btn btn--ghost'>
            Back to home
          </Link>
          <Link to='/plan' className='btn btn--ghost'>
            Read the build plan
          </Link>
        </div>
      </section>
    </Layout>
  );
}
