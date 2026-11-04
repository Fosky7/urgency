import { createFileRoute, Link } from '@tanstack/react-router';

export const Route = createFileRoute('/feed')({
  component: FeedPage,
});

interface BillCard {
  id: string;
  category: string;
  title: string;
  amount: string;
  household: string;
  story: string;
  due: string;
}

const BILLS: readonly BillCard[] = [
  {
    id: '4182',
    category: 'Housing',
    title: 'March rent',
    amount: '$850.00',
    household: 'Alicia R. \u00b7 East Oakland, CA',
    story:
      'Two shifts cut short after a school closure. The shortfall is exactly one month\u2019s rent and the notice is dated the 14th.',
    due: 'Due in 4 days',
  },
  {
    id: '4207',
    category: 'Medical',
    title: 'Insulin refill',
    amount: '$214.37',
    household: 'Marcus T. \u00b7 Toledo, OH',
    story:
      'Type 1 diabetes, uninsured between jobs. The pharmacy quote is the exact cash price for a 30-day supply.',
    due: 'Due tomorrow',
  },
  {
    id: '4231',
    category: 'Utilities',
    title: 'Shut-off notice',
    amount: '$138.02',
    household: 'The Okafor family \u00b7 Houston, TX',
    story:
      'A July bill spiked after the AC ran through a heat wave with an infant at home. Balance is one month behind.',
    due: 'Due in 9 days',
  },
] as const;

/**
 * The swipe deck. Module 1 ships the page and the card markup; the draggable
 * gestures, pledge store and keyboard controls arrive in later modules.
 */
export function FeedPage() {
  return (
    <div className="plan">
      <span className="eyebrow">Feed</span>
      <h1 className="page-title">Swipe to Fund, one verified bill at a time</h1>
      <p className="page-lede">
        Every card below is a single verified household bill with a fixed amount.
        Swipe right to pledge that exact number, swipe left to pass \u2014 passing is
        always private.
      </p>

      <section className="section" aria-labelledby="deck-preview-title">
        <h2 id="deck-preview-title" className="section__title">
          Today&rsquo;s deck
        </h2>
        <p className="section__lede">
          Three bills waiting on a decision. Amounts are stored in cents and never
          rounded.
        </p>
        <div className="card-grid">
          {BILLS.map((bill) => (
            <article key={bill.id} className="card">
              <span className="card__step">{bill.category}</span>
              <h3 className="card__title">{bill.title}</h3>
              <p className="stat__value">{bill.amount}</p>
              <p className="card__body">{bill.household}</p>
              <p className="card__body">{bill.story}</p>
              <p className="deck-card__meta">
                Verified &middot; Bill #{bill.id} &middot; {bill.due}
              </p>
            </article>
          ))}
        </div>
      </section>

      <div className="hero__actions">
        <Link to="/impact" className="btn btn--primary">
          See your impact
        </Link>
        <Link to="/plan" className="btn btn--ghost">
          Read the build plan
        </Link>
      </div>
    </div>
  );
}

export default FeedPage;
