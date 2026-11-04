import type { ReactNode } from 'react';
import { Link } from '@tanstack/react-router';

// The global stylesheet is imported here so the app shell always carries its
// design tokens, regardless of which entry file mounts the router.
import '@/styles.css';
// Shell styles (app-shell, app-header, brand, nav-link, ...) live in a real
// stylesheet next to this component so the header/nav are always defined.
import './layout.css';
// Shell/header/nav styles for the class names used below. Kept in a dedicated
// stylesheet so the header is always styled no matter which entry mounts it.
import '@/layout-shell.css';

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

/**
 * Styles for the application shell. They live next to the markup that uses
 * them so the shell can never render unstyled, even if a global stylesheet is
 * missing the corresponding rules.
 */
const APP_SHELL_CSS = `
.app-shell {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: #f7f7fb;
  color: #16161d;
  font-family: "Inter", system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
}

.skip-link {
  position: absolute;
  left: -9999px;
  top: 0;
  z-index: 100;
  padding: 0.6rem 1rem;
  background: #16161d;
  color: #ffffff;
  border-radius: 0 0 0.5rem 0;
  font-size: 0.875rem;
  text-decoration: none;
}
.skip-link:focus {
  left: 0;
  outline: 2px solid #a855f7;
  outline-offset: 2px;
}

.app-header {
  position: sticky;
  top: 0;
  z-index: 50;
  background: rgba(255, 255, 255, 0.94);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid #e6e6ef;
}

.app-header__inner {
  max-width: 1120px;
  margin: 0 auto;
  padding: 0.85rem 1.25rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  flex-wrap: wrap;
}

.brand {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  text-decoration: none;
  color: inherit;
  font-weight: 700;
  letter-spacing: -0.01em;
}
.brand:hover .brand__name {
  color: #6d28d9;
}

.brand__mark {
  display: grid;
  place-items: center;
  width: 2rem;
  height: 2rem;
  border-radius: 0.6rem;
  background: linear-gradient(135deg, #6366f1, #a855f7);
  color: #ffffff;
  font-size: 1rem;
  line-height: 1;
}

.brand__name {
  font-size: 1.05rem;
  transition: color 120ms ease;
}

.app-header__actions {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.app-nav {
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.nav-link {
  display: inline-block;
  padding: 0.45rem 0.8rem;
  border-radius: 999px;
  font-size: 0.9rem;
  font-weight: 500;
  color: #4b4b5a;
  text-decoration: none;
  transition: background 120ms ease, color 120ms ease;
}
.nav-link:hover {
  background: #efeefb;
  color: #16161d;
}
.nav-link--active,
.nav-link--plan-active {
  background: #16161d;
  color: #ffffff;
}
.nav-link--plan {
  border: 1px solid #d8d7ea;
}

.app-main {
  flex: 1 1 auto;
  width: 100%;
  max-width: 1120px;
  margin: 0 auto;
  padding: 2rem 1.25rem 3rem;
}

.app-footer {
  border-top: 1px solid #e6e6ef;
  background: #ffffff;
}
.app-footer__inner {
  max-width: 1120px;
  margin: 0 auto;
  padding: 1.25rem;
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem 1rem;
  align-items: center;
  justify-content: space-between;
  font-size: 0.8rem;
  color: #6b6b7b;
}
.app-footer__brand {
  font-weight: 700;
  color: #16161d;
}

@media (max-width: 640px) {
  .app-header__inner {
    padding: 0.7rem 1rem;
  }
  .app-main {
    padding: 1.5rem 1rem 2.5rem;
  }
}
`;

interface LayoutProps {
  children: ReactNode;
}

/**
 * Application chrome: sticky header (brand + primary nav + build-plan link),
 * the routed page body, and a footer. Every page renders inside this shell, so
 * the app name and the Feed / Impact / Create links are present on every route
 * — including `/` and `/plan`.
 */
export function Layout({ children }: LayoutProps) {
  return (
    <div className="app-shell">
      <style>{APP_SHELL_CSS}</style>

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
              activeProps={{ className: 'nav-link nav-link--plan nav-link--plan-active' }}
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
