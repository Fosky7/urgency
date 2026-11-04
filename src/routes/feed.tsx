import { createFileRoute, Link } from '@tanstack/react-router';

export const Route = createFileRoute('/feed')({
  component: FeedPage,
});

interface BillCard {
  id: string;
  title: string;
  amount: string;
  recipient: string;
  meta: string;
  note: string;
}

const BILLS: readonly BillCard[] = [
  {
    id: '4182',
    title: 'March rent',
    amount: '$850.00',
    recipient: 'Alicia R. \u00b7 East Oakland, CA',
    meta: 'Verified \u00b7 Bill #4182 \u00b7 Housing',
    note: 'Two shifts cut short after a school closure. The shortfall is exactly one month\u2019s rent and the notice is dated the 14th.',
  },
  {
    id: '4190',
    title: 'Insulin refill',
    amount: '$186.40',
    recipient: 'Marcus T. \u00b7 North Richmond, CA',
    meta: 'Verified \u00b7 Bill #4190 \u00b7 Medical',
    note: 'Pharmacy receipt attached. The co-pay doubled this month after a plan change and the script runs out on Friday.',
  },
  {
    id: '4205',
    title: 'Electric shut-off notice',
    amount: '$243.17',
    recipient: 'The Okafor family \u00b7 West Fresno, CA',
    meta: 'Verified \u00b7 Bill #4205 \u00b7 Utilities',
    note: 'Final notice from the utility. Amount includes the late fee; the family has four children under twelve.',
  },
];

/**
 * The deck landing page served at `/feed`.
 *
 * Each card below is one verified bill with a fixed, exact amount \u2014 the same
 * shape the swipe deck will drive in the next module.
 */
function FeedPage() {
  return (
    <>
      <section className="section" aria-labelledby="feed-title">
        <span className="eyebrow">Deck</span>
        <h1 id="feed-title" className="page-title">
          The swipe deck
        </h1>
        <p className="page-lede">
          Every card is a single verified household bill with a fixed amount. Swipe
          right to pledge the exact number printed on the card, swipe left to pass
          privately. Nothing is pooled and nothing is rounded.
        </p>

        <div className="deck-preview">
          <div className="deck-stack">
            {BILLS.map((bill) => (
              <article key={bill.id} className="deck-card">
                <p className="deck-card__meta">{bill.meta}</p>
                <h2 className="deck-card__title">{bill.title}</h2>
                <p className="deck-card__amount">{bill.amount}</p>
                <p className="deck-card__recipient">{bill.recipient}</p>
                <p className="deck-card__note">{bill.note}</p>
                <div className="deck-card__hint">
                  <span>&larr; Pass</span>
                  <span>Pledge &rarr;</span>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="hero__actions">
          <Link to="/impact" className="btn btn--primary">
            See the impact ledger
          </Link>
          <Link to="/plan" className="btn btn--ghost">
            Read the build plan
          </Link>
        </div>
      </section>
    </>
  );
}
