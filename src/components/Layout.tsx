import { useState } from 'react';
import type { CSSProperties, ReactNode } from 'react';
import { Link } from '@tanstack/react-router';

// The global stylesheet is imported here so the app shell always carries its
// design tokens, regardless of which entry file mounts the router.
import '@/styles.css';
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
 * Shell/header styles applied inline so the app chrome can never render
 * unstyled — the markup does not depend on any external stylesheet defining
 * the `app-shell` / `app-header` / `brand` class names below. The class names
 * are kept for semantics, querying and future theming.
 */
const shellStyle: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100vh',
  position: 'relative',
  background: '#f7f7fb',
  color: '#16161d',
  fontFamily:
    '"Inter", system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
};

const headerStyle: CSSProperties = {
  position: 'sticky',
  top: 0,
  zIndex: 50,
  background: 'rgba(255, 255, 255, 0.94)',
  borderBottom: '1px solid #e6e6ef',
};

const headerInnerStyle: CSSProperties = {
  maxWidth: 1120,
  margin: '0 auto',
  padding: '0.85rem 1.25rem',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: '1rem',
  flexWrap: 'wrap',
};

const brandStyle: CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: '0.6rem',
  textDecoration: 'none',
  color: 'inherit',
  fontWeight: 700,
  letterSpacing: '-0.01em',
};

const brandMarkStyle: CSSProperties = {
  display: 'grid',
  placeItems: 'center',
  width: '2rem',
  height: '2rem',
  borderRadius: '0.6rem',
  background: 'linear-gradient(135deg, #6366f1, #a855f7)',
  color: '#ffffff',
  fontSize: '1rem',
  lineHeight: 1,
};

const brandNameStyle: CSSProperties = {
  fontSize: '1.05rem',
};

const headerActionsStyle: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
  flexWrap: 'wrap',
};

const navStyle: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '0.25rem',
};

const navLinkStyle: CSSProperties = {
  display: 'inline-block',
  padding: '0.45rem 0.8rem',
  borderRadius: 999,
  fontSize: '0.9rem',
  fontWeight: 500,
  color: '#4b4b5a',
  textDecoration: 'none',
  background: 'transparent',
};

const navLinkActiveStyle: CSSProperties = {
  ...navLinkStyle,
  background: '#16161d',
  color: '#ffffff',
};

const planLinkStyle: CSSProperties = {
  ...navLinkStyle,
  border: '1px solid #d8d7ea',
};

const planLinkActiveStyle: CSSProperties = {
  ...planLinkStyle,
  background: '#16161d',
  color: '#ffffff',
};

const mainStyle: CSSProperties = {
  flex: '1 1 auto',
  width: '100%',
  maxWidth: 1120,
  margin: '0 auto',
  padding: '2rem 1.25rem 3rem',
  boxSizing: 'border-box',
};

const footerStyle: CSSProperties = {
  borderTop: '1px solid #e6e6ef',
  background: '#ffffff',
};

const footerInnerStyle: CSSProperties = {
  maxWidth: 1120,
  margin: '0 auto',
  padding: '1.25rem',
  display: 'flex',
  flexWrap: 'wrap',
  gap: '0.5rem 1rem',
  alignItems: 'center',
  justifyContent: 'space-between',
  fontSize: '0.8rem',
  color: '#6b6b7b',
};

const footerBrandStyle: CSSProperties = {
  fontWeight: 700,
  color: '#16161d',
};

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
  // The skip link stays out of the way until it receives keyboard focus, then
  // it slides into view as the first focusable element of the page.
  const [skipFocused, setSkipFocused] = useState(false);

  const skipLinkStyle: CSSProperties = {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 100,
    padding: '0.6rem 1rem',
    background: '#16161d',
    color: '#ffffff',
    borderRadius: '0 0 0.5rem 0',
    fontSize: '0.875rem',
    textDecoration: 'none',
    outline: '2px solid #a855f7',
    outlineOffset: 2,
    display: skipFocused ? 'block' : 'none',
  };

  return (
    <div className="app-shell" style={shellStyle}>
      <a
        className="skip-link"
        href="#main"
        style={skipLinkStyle}
        onFocus={() => setSkipFocused(true)}
        onBlur={() => setSkipFocused(false)}
      >
        Skip to content
      </a>

      <header className="app-header" style={headerStyle}>
        <div className="app-header__inner" style={headerInnerStyle}>
          <Link to="/" className="brand" style={brandStyle} aria-label="Swipe to Fund — home">
            <span className="brand__mark" style={brandMarkStyle} aria-hidden="true">
              &#8596;
            </span>
            <span className="brand__name" style={brandNameStyle}>
              Swipe to Fund
            </span>
          </Link>

          <div className="app-header__actions" style={headerActionsStyle}>
            <nav className="app-nav" style={navStyle} aria-label="Main">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className="nav-link"
                  style={navLinkStyle}
                  activeProps={{ className: 'nav-link nav-link--active', style: navLinkActiveStyle }}
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
              style={planLinkStyle}
              activeProps={{
                className: 'nav-link nav-link--plan nav-link--plan-active',
                style: planLinkActiveStyle,
              }}
            >
              Build plan
            </Link>
          </div>
        </div>
      </header>

      <main className="app-main" id="main" style={mainStyle}>
        {children}
      </main>

      <footer className="app-footer" style={footerStyle}>
        <div className="app-footer__inner" style={footerInnerStyle}>
          <span className="app-footer__brand" style={footerBrandStyle}>
            Swipe to Fund
          </span>
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
