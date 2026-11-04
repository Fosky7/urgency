import { useState } from 'react';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/feed')({
  component: FeedPage,
});

interface Bill {
  id: string;
  title: string;
  amount: string;
  recipient: string;
  category: string;
  due: string;
  note: string;
  image: string;
}

const BILLS: readonly Bill[] = [
  {
    id: 'rivera-rent',
    title: 'Rent help for the Rivera family',
    amount: '$1,240.00',
    recipient: 'Rivera family · East Oakland, CA',
    category: 'Housing',
    due: 'Due June 14',
    note: 'Two shifts cut short after a school closure left the household exactly one month behind on rent.',
    image:
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'okafor-insulin',
    title: 'Insulin refill for Mr. Okafor',
    amount: '$318.45',
    recipient: 'Mr. Okafor · South Chicago, IL',
    category: 'Medical',
    due: 'Due June 9',
    note: 'The pharmacy hold expires in four days. The card matches the pharmacy invoice line for line.',
    image:
      'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'nguyen-utilities',
    title: 'Shut-off notice for the Nguyen household',
    amount: '$204.10',
    recipient: 'Nguyen household · Tacoma, WA',
    category: 'Utilities',
    due: 'Due June 7',
    note: 'The disconnect date is printed on the notice. Paying the balance keeps the power on through the summer.',
    image:
      'https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'adeyemi-groceries',
    title: 'Two weeks of groceries for the Adeyemi family',
    amount: '$186.72',
    recipient: 'Adeyemi family · Columbus, OH',
    category: 'Food',
    due: 'Due June 11',
    note: 'A verified pantry order with the receipt attached — no cash changes hands.',
    image:
      'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1200&q=80',
  },
];

/** The swipe deck. Module 1 ships the shell and the card content; gestures land in Module 2. */
export function FeedPage() {
  const [index, setIndex] = useState(0);
  const bill = BILLS[index % BILLS.length];

  return (
    <div className="deck-page">
      <header className="deck-page__header">
        <span className="eyebrow">Verified bills · {index + 1} of {BILLS.length}</span>
        <h1 className="page-title">The swipe deck</h1>
        <p className="page-lede">
          One bill per card, with the exact amount owed printed on it. Swipe right to
          pledge, swipe left to pass.
        </p>
      </header>

      <article className="bill-card" aria-labelledby={`bill-${bill.id}`}>
        <img className="bill-card__image" src={bill.image} alt="" loading="lazy" />
        <div className="bill-card__body">
          <p className="bill-card__meta">
            {bill.category} · {bill.due}
          </p>
          <h2 id={`bill-${bill.id}`} className="bill-card__title">
            {bill.title}
          </h2>
          <p className="bill-card__amount">{bill.amount}</p>
          <p className="bill-card__recipient">{bill.recipient}</p>
          <p className="bill-card__note">{bill.note}</p>
        </div>
      </article>

      <div className="deck-controls">
        <button
          type="button"
          className="btn btn--primary"
          onClick={() => setIndex((current) => current + 1)}
        >
          See next bill
        </button>
        <button type="button" className="btn btn--ghost" onClick={() => setIndex(0)}>
          Back to the first bill
        </button>
      </div>
    </div>
  );
}

export default FeedPage;
