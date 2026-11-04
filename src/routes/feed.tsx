import { createFileRoute, Link } from '@tanstack/react-router';

export const Route = createFileRoute('/feed')({
  component: FeedPage,
});

const DECK_RULES = [
  'Swipe right to pledge the exact amount shown on the card.',
  'Swipe left to pass — passing is always private.',
  'A card only leaves the deck once the pledge is confirmed, so an accidental swipe can be undone.',
  'Every card names the household, the category and the verified due date.',
  'The deck never repeats a bill you already funded or passed.',
];

function FeedPage() {
  return (
    <div className="status-page">
      <span className="eyebrow">Swipe feed</span>
      <h1 className="page-title">The deck arrives in the next build step</h1>
      <p className="page-lede">
        The routing shell, header and written plan are live now. The draggable bill cards
        ship in Module 2, built against interaction rules that are already locked in:
      </p>
      <ul className="plan-list">
        {DECK_RULES.map((rule) => (
          <li key={rule}>{rule}</li>
        ))}
      </ul>
      <div className="hero__actions">
        <Link to="/plan" className="btn btn--primary">
          See the full build plan
        </Link>
        <Link to="/" className="btn btn--ghost">
          Back to home
        </Link>
      </div>
    </div>
  );
}
