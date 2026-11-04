import { createFileRoute, Link } from '@tanstack/react-router';

export const Route = createFileRoute('/impact')({
  component: ImpactPage,
});

interface Pledge {
  id: string;
  title: string;
  household: string;
  amount: string;
  status: string;
  when: string;
}

const PLEDGES: readonly Pledge[] = [
  {
    id: 'PL-1042',
    title: 'March rent',
    household: 'Alicia R. \u00b7 East Oakland, CA',
    amount: '$850.00',
    status: 'Confirmed',
    when: 'Pledged 2 days ago',
  },
  {
    id: 'PL-1039',
    title: 'Insulin refill',
    household: 'Marcus T. \u00b7 Toledo, OH',
    amount: '$214.37',
    status: 'Confirmed',
    when: 'Pledged 6 days ago',
  },
  {
    id: 'PL-1031',
    title: 'School lunch balance',
    household: 'The Delgado family \u00b7 Fresno, CA',
    amount: '$96.50',
    status: 'Cleared',
    when: 'Pledged 3 weeks ago',
  },
];

const STATS = [
  { value: '$1,160.87', label: 'pledged this year' },
  { value: '3', label: 'household bills cleared' },
  { value: '100%', label: 'went to the exact verified bill' },
] as const;

/** Pledge ledger: what you funded and the running total. */
export function ImpactPage() {
  return (
    <div className="plan">
      <span className="eyebrow">Impact</span>
      <h1 className="page-title">Where your pledges went</h1>
      <p className="page-lede">
        Every row below is a bill that left the deck because it was covered. Amounts
        are the exact verified totals \u2014 nothing is pooled and nothing is rounded.
      </p>

      <section className="section" aria-labelledby="impact-numbers">
        <h2 id="impact-numbers" className="section__title">
          Running total
        </h2>
        <div className="stat-grid">
          {STATS.map((stat) => (
            <div key={stat.label} className="stat">
              <p className="stat__value">{stat.value}</p>
              <p className="stat__label">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section" aria-labelledby="impact-ledger">
        <h2 id="impact-ledger" className="section__title">
          Pledge ledger
        </h2>
        <p className="section__lede">Receipts for every bill you funded.</p>
        <div className="card-grid">
          {PLEDGES.map((pledge) => (
            <article key={pledge.id} className="card">
              <span className="card__step">{pledge.status}</span>
              <h3 className="card__title">{pledge.title}</h3>
              <p className="stat__value">{pledge.amount}</p>
              <p className="card__body">{pledge.household}</p>
              <p className="deck-card__meta">
                {pledge.id} &middot; {pledge.when}
              </p>
            </article>
          ))}
        </div>
      </section>

      <div className="hero__actions">
        <Link to="/feed" className="btn btn--primary">
          Back to the feed
        </Link>
        <Link to="/plan" className="btn btn--ghost">
          Read the build plan
        </Link>
      </div>
    </div>
  );
}

export default ImpactPage;
