import { createFileRoute, Link } from '@tanstack/react-router';

export const Route = createFileRoute('/impact')({
  component: ImpactPage,
});

function ImpactPage() {
  return (
    <div className="status-page">
      <span className="eyebrow">Impact</span>
      <h1 className="page-title">Your pledge ledger</h1>
      <p className="page-lede">
        This page will hold the running total of what you funded, the household behind each
        pledge, and a receipt for every cleared bill. It reads from the same pledge store
        that the deck writes to, so it updates the moment a swipe is confirmed.
      </p>
      <ul className="plan-list">
        <li>Running total pledged, formatted to the cent.</li>
        <li>Each cleared bill with the recipient, category and confirmation date.</li>
        <li>Refunds and undone pledges listed separately, never mixed into the total.</li>
        <li>Empty state for a brand-new account that links straight back to the deck.</li>
      </ul>
      <div className="hero__actions">
        <Link to="/plan" className="btn btn--primary">
          See the build plan
        </Link>
        <Link to="/feed" className="btn btn--ghost">
          Go to the feed
        </Link>
      </div>
    </div>
  );
}
