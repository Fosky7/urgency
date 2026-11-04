import { createFileRoute, Link } from '@tanstack/react-router';

export const Route = createFileRoute('/impact')({
  component: ImpactPage,
});

interface Stat {
  value: string;
  label: string;
}

const STATS: readonly Stat[] = [
  { value: '$1,279.57', label: 'pledged by you this year' },
  { value: '6', label: 'household bills cleared' },
  { value: '100%', label: 'of pledges matched to a single verified bill' },
];

interface Receipt {
  id: string;
  household: string;
  bill: string;
  amount: string;
  date: string;
}

const RECEIPTS: readonly Receipt[] = [
  {
    id: 'PL-1042',
    household: 'Alicia R. \u00b7 East Oakland, CA',
    bill: 'March rent',
    amount: '$850.00',
    date: 'Mar 14',
  },
  {
    id: 'PL-1037',
    household: 'Marcus T. \u00b7 North Richmond, CA',
    bill: 'Insulin refill',
    amount: '$186.40',
    date: 'Mar 09',
  },
  {
    id: 'PL-1029',
    household: 'The Okafor family \u00b7 West Fresno, CA',
    bill: 'Electric shut-off notice',
    amount: '$243.17',
    date: 'Feb 28',
  },
];

/** Pledge ledger: what has been funded, and the receipts that prove it. */
function ImpactPage() {
  return (
    <>
      <section className="section" aria-labelledby="impact-title">
        <span className="eyebrow">Impact</span>
        <h1 id="impact-title" className="page-title">
          Your pledge ledger
        </h1>
        <p className="page-lede">
          Every swipe that became a paid bill, with the exact amount that left your
          account and the receipt that closed it out.
        </p>

        <div className="stat-grid">
          {STATS.map((stat) => (
            <div key={stat.label} className="stat">
              <p className="stat__value">{stat.value}</p>
              <p className="stat__label">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section" aria-labelledby="impact-receipts">
        <h2 id="impact-receipts" className="section__title">
          Receipts
        </h2>
        <p className="section__lede">
          Amounts are never rounded \u2014 each one matches the verified bill to the cent.
        </p>
        <div className="card-grid">
          {RECEIPTS.map((receipt) => (
            <article key={receipt.id} className="card">
              <span className="card__step">{receipt.date}</span>
              <h3 className="card__title">{receipt.bill}</h3>
              <p className="card__body">{receipt.household}</p>
              <p className="card__body">
                <strong>{receipt.amount}</strong> pledged &middot; receipt {receipt.id}
              </p>
            </article>
          ))}
        </div>

        <div className="hero__actions">
          <Link to="/feed" className="btn btn--primary">
            Back to the deck
          </Link>
          <Link to="/create" className="btn btn--ghost">
            Create a campaign
          </Link>
        </div>
      </section>
    </>
  );
}
