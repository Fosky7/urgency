import type { ReactNode } from 'react';
import { Link } from '@tanstack/react-router';

// The single global stylesheet is imported here so the app shell always carries
// its design tokens, regardless of which entry file mounts the router. The
// shell class names used below (`app-shell`, `app-header`, `brand`, ...) are all
// defined in `src/styles.css`.
import '@/styles.css';

/** Primary destinations rendered as top-level navigation links. */
type NavTarget = '/feed' | '/impact' | '/create';

interface NavItem {
  to: NavTarget;
  label: string;
}

const NAV_ITEMS: readonly NavItem[] = [
  { to: '/feed', label: 'Feed' },
  { to: '/impact', label: 'Impact' },
  { to: '/create', label: 'Create' },
];

interface LayoutProps {
  children: ReactNode;
}

/**
 * Application chrome: sticky header (brand + primary nav + build-plan link),
 * the routed page body, and a footer. Every page renders inside this shell, so
 * the app name and the Feed / Impact / Create links are present on every route
 * — including `/` and `/plan`.
 *
 * All shell styling lives in the global stylesheet (`.app-shell`,
 * `.app-header`, `.brand`, `.nav-link`, `.app-main`, ...). No inline styles are
 * used here: inline values would override the page-level and responsive rules
 * in `src/styles.css` and change the look of the pages rendered inside the
 * shell.
 */
export function Layout({ children }: LayoutProps) {
  return (
    <div className="app-shell">
      <a className="skip-link" href="#main">
        Skip to content
      </a>

      <header className="app-header">
        <div className="app-header__inner">
          <Link to="/" className="brand" aria-label="Swipe to Fund — home">
            <span className="brand__mark" aria-hidden="true">
              &#8596;
            </span>
            <span className="brand__name">Swipe to Fund</span>
          </Link>

          <div className="app-header__actions">
            <nav className="app-nav" aria-label="Main">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className="nav-link"
                  activeProps={{ className: 'nav-link nav-link--active' }}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* Kept outside the primary nav: the written build plan is
                reference material, not a browsing destination. */}
            <Link
              to="/plan"
              className="nav-link nav-link--plan"
              activeProps={{
                className: 'nav-link nav-link--plan nav-link--plan-active',
              }}
            >
              Build plan
            </Link>
          </div>
        </div>
      </header>

      <main className="app-main" id="main">
        {children}
      </main>

      <footer className="app-footer">
        <div className="app-footer__inner">
          <span className="app-footer__brand">Swipe to Fund</span>
          <span>
            Verified, one-time household bills &middot; Every swipe shows the exact
            amount before you pledge.
          </span>
        </div>
      </footer>
    </div>
  );
}

export default Layout;
