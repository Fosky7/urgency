import { createFileRoute, Link } from '@tanstack/react-router';

export const Route = createFileRoute('/impact')({
  component: ImpactPage,
});

interface Stat {
  value: string;
  label: string;
}

const TOTALS: readonly Stat[] = [
  { value: '$1,284.00', label: 'pledged this year' },
  { value: '7', label: 'household bills cleared' },
  { value: '100%', label: 'of pledges went to the exact bill' },
  { value: '0', label: 'households told you skipped them' },
];

interface PledgeRecord {
  date: string;
  bill: string;
  amount: string;
  household: string;
  status: string;
}

const LEDGER: readonly PledgeRecord[] = [
  {
    date: 'Mar 14',
    bill: 'March rent',
    amount: '$850.00',
    household: 'Alicia R. \u00b7 East Oakland, CA',
    status: 'Cleared \u2014 receipt on file',
  },
  {
    date: 'Mar 2',
    bill: 'Insulin refill',
    amount: '$214.36',
    household: 'Marcus T. \u00b7 South Sacramento, CA',
    status: 'Cleared \u2014 pharmacy confirmed',
  },
  {
    date: 'Feb 21',
    bill: 'Electric shut-off notice',
    amount: '$187.42',
    household: 'Priya S. \u00b7 East San Jose, CA',
    status: 'Cleared \u2014 disconnection cancelled',
  },
  {
    date: 'Feb 8',
    bill: 'Grocery card top-up',
    amount: '$32.22',
    household: 'Yusuf A. \u00b7 Southwest Detroit, MI',
    status: 'Refunded \u2014 bill over-funded',
  },
];

/** The pledge ledger: what you funded, and the running total. */
export function ImpactPage() {
  return (
    <>
      <section className="hero">
        <div>
          <span className="eyebrow">Your ledger</span>
          <h1 className="hero__title">Impact</h1>
          <p className="hero__lede">
            Every pledge you made, the exact bill it paid, and the receipt that came
            back. Nothing here is a general fund \u2014 the amount on the card is the
            amount that left your account.
          </p>
          <div className="hero__actions">
            <Link to="/feed" className="btn btn--primary">
              Back to the feed
            </Link>
            <Link to="/create" className="btn btn--ghost">
              Create a campaign
            </Link>
          </div>
        </div>

        <div className="stat-grid">
          {TOTALS.map((stat) => (
            <div key={stat.label} className="stat">
              <p className="stat__value">{stat.value}</p>
              <p className="stat__label">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section" aria-labelledby="ledger-title">
        <h2 id="ledger-title" className="section__title">
          Pledge ledger
        </h2>
        <p className="section__lede">
          Newest first. Undo stays available for three seconds after a swipe, after
          that the pledge is committed.
        </p>
        <div className="card-grid">
          {LEDGER.map((pledge) => (
            <article key={`${pledge.date}-${pledge.bill}`} className="card">
              <span className="card__step">{pledge.date}</span>
              <h3 className="card__title">
                {pledge.bill} \u2014 {pledge.amount}
              </h3>
              <p className="card__body">{pledge.household}</p>
              <p className="card__body">{pledge.status}</p>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}

export default ImpactPage;
