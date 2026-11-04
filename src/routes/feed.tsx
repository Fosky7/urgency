import { createFileRoute, Link } from '@tanstack/react-router';

export const Route = createFileRoute('/feed')({
  component: FeedPage,
});

interface QueuedBill {
  title: string;
  amount: string;
  household: string;
  category: string;
  note: string;
}

const QUEUE: readonly QueuedBill[] = [
  {
    title: 'Insulin refill',
    amount: '$214.36',
    household: 'Marcus T. \u00b7 South Sacramento, CA',
    category: 'Medical',
    note: 'Type 1 diabetes, three weeks without a refill after hours were cut mid-month. Pharmacy has the script on hold.',
  },
  {
    title: 'February rent',
    amount: '$1,180.00',
    household: 'Dana W. \u00b7 North Las Vegas, NV',
    category: 'Housing',
    note: 'Notice posted on the 3rd. Two shifts a week were cut in January and the arrears are exactly one month.',
  },
  {
    title: 'Electric shut-off notice',
    amount: '$187.42',
    household: 'Priya S. \u00b7 East San Jose, CA',
    category: 'Utilities',
    note: 'Disconnection is scheduled in nine days. Two children under five at home; the balance is the full overdue amount.',
  },
  {
    title: 'Grocery card top-up',
    amount: '$96.18',
    household: 'Yusuf A. \u00b7 Southwest Detroit, MI',
    category: 'Food',
    note: 'A two-week hospital stay drained the month. The case worker verified the pantry balance before the card was listed.',
  },
];

/**
 * The deck route: a real page at /feed. The draggable card interaction ships in
 * the next module; this page shows the queue that interaction will draw from so
 * the address is never a dead link.
 */
export function FeedPage() {
  return (
    <>
      <section className="hero">
        <div>
          <span className="eyebrow">The deck</span>
          <h1 className="hero__title">Feed</h1>
          <p className="hero__lede">
            Every card is one verified household bill with the exact amount owed
            printed on it. Swipe right to pledge it, swipe left to pass \u2014
            passing is always private and the recipient is never told.
          </p>
          <div className="hero__actions">
            <Link to="/plan" className="btn btn--primary">
              Read the swipe rules
            </Link>
            <Link to="/impact" className="btn btn--ghost">
              See your impact
            </Link>
          </div>
        </div>

        <div className="deck-preview">
          <div className="deck-stack">
            <article className="deck-card">
              <p className="deck-card__meta">Up next \u00b7 Verified \u00b7 Bill #4182</p>
              <h2 className="deck-card__title">{QUEUE[0].title}</h2>
              <p className="deck-card__amount">{QUEUE[0].amount}</p>
              <p className="deck-card__recipient">{QUEUE[0].household}</p>
              <p className="deck-card__note">{QUEUE[0].note}</p>
              <div className="deck-card__hint">
                <span>&larr; Pass</span>
                <span>Pledge &rarr;</span>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="queue-title">
        <h2 id="queue-title" className="section__title">
          Waiting in the deck
        </h2>
        <p className="section__lede">
          Four verified bills, four exact amounts. Each one leaves the deck for good
          once it is covered.
        </p>
        <div className="card-grid">
          {QUEUE.map((bill) => (
            <article key={bill.title} className="card">
              <span className="card__step">{bill.category}</span>
              <h3 className="card__title">
                {bill.title} \u2014 {bill.amount}
              </h3>
              <p className="card__body">{bill.household}</p>
              <p className="card__body">{bill.note}</p>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}

export default FeedPage;
