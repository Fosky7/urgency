import { useState } from 'react';
import { createFileRoute, Link } from '@tanstack/react-router';

export const Route = createFileRoute('/impact')({
  component: ImpactPage,
});

type Range = 'month' | 'all';

interface Totals {
  families: string;
  amount: string;
  bills: string;
}

const TOTALS: Record<Range, Totals> = {
  month: { families: 'Pledged to 12 families', amount: '$4,186.30', bills: '14 bills cleared' },
  all: { families: 'Pledged to 41 families', amount: '$13,902.75', bills: '47 bills cleared' },
};

interface Receipt {
  id: string;
  title: string;
  amount: string;
  date: string;
}

const RECEIPTS: readonly Receipt[] = [
  {
    id: 'r-1',
    title: 'Rent help for the Rivera family',
    amount: '$1,240.00',
    date: 'June 2, 2024',
  },
  {
    id: 'r-2',
    title: 'Insulin refill for Mr. Okafor',
    amount: '$318.45',
    date: 'May 27, 2024',
  },
  {
    id: 'r-3',
    title: 'Shut-off notice for the Nguyen household',
    amount: '$204.10',
    date: 'May 19, 2024',
  },
  {
    id: 'r-4',
    title: 'Two weeks of groceries for the Adeyemi family',
    amount: '$186.72',
    date: 'May 11, 2024',
  },
];

/** Pledge ledger: what the visitor funded, with running totals and receipts. */
export function ImpactPage() {
  const [range, setRange] = useState<Range>('all');
  const totals = TOTALS[range];

  return (
    <div className="impact">
      <header className="impact__header">
        <span className="eyebrow">Pledge ledger</span>
        <h1 className="page-title">Your impact</h1>
        <p className="page-lede">
          Every pledge you have made, matched to the exact bill it cleared. Nothing is
          pooled and nothing is rounded.
        </p>
      </header>

      <div className="tabs" role="tablist" aria-label="Impact range">
        <button
          type="button"
          role="tab"
          aria-selected={range === 'month'}
          className={range === 'month' ? 'tab tab--active' : 'tab'}
          onClick={() => setRange('month')}
        >
          This month
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={range === 'all'}
          className={range === 'all' ? 'tab tab--active' : 'tab'}
          onClick={() => setRange('all')}
        >
          All time
        </button>
      </div>

      <div className="impact-summary">
        <p className="impact-summary__total">{totals.families}</p>
        <p className="impact-summary__amount">{totals.amount}</p>
        <p className="impact-summary__bills">{totals.bills}</p>
      </div>

      <section className="section" aria-labelledby="receipts">
        <h2 id="receipts" className="section__title">
          Receipts
        </h2>
        <ul className="receipt-list">
          {RECEIPTS.map((receipt) => (
            <li key={receipt.id} className="receipt">
              <span className="receipt__title">{receipt.title}</span>
              <span className="receipt__date">{receipt.date}</span>
              <span className="receipt__amount">{receipt.amount}</span>
            </li>
          ))}
        </ul>
        <div className="hero__actions">
          <Link to="/feed" className="btn btn--primary">
            Open the feed
          </Link>
        </div>
      </section>
    </div>
  );
}

export default ImpactPage;
