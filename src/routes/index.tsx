import { createFileRoute, Link } from '@tanstack/react-router';

export const Route = createFileRoute('/')({
  component: HomePage,
});

interface HowItWorksItem {
  step: string;
  title: string;
  body: string;
}

const HOW_IT_WORKS: readonly HowItWorksItem[] = [
  {
    step: '01',
    title: 'A verified bill lands in the deck',
    body: 'A case worker uploads the actual bill — rent notice, insulin refill, utility shut-off warning — and confirms the exact amount owed.',
  },
  {
    step: '02',
    title: 'You swipe right to pledge',
    body: 'The card shows the household, the category and the number down to the cent. Swipe left to pass — passing is always private.',
  },
  {
    step: '03',
    title: 'The bill is cleared, not pooled',
    body: 'Pledges go to that one bill. When it is covered it leaves the deck forever and a receipt appears on your Impact page.',
  },
];

interface Stat {
  value: string;
  label: string;
}

const STATS: readonly Stat[] = [
  { value: '$412,860', label: 'pledged to verified bills' },
  { value: '1,240', label: 'household bills cleared' },
  { value: '94%', label: 'of pledges go to rent, food & medicine' },
  { value: '38 sec', label: 'median time to fund a card' },
];

/** Landing page: what Swipe to Fund is, how a swipe becomes a paid bill. */
export function HomePage() {
  return (
    <>
      <section className="hero">
        <div>
          <span className="eyebrow">Swipe-to-give &middot; 60-second pledges</span>
          <h1 className="hero__title">Swipe right. Someone&rsquo;s bill gets paid.</h1>
          <p className="hero__lede">
            Swipe to Fund turns a quick scroll into rent, groceries and medication for
            households nearby. Every card in the deck is a single verified bill with a
            fixed amount — never a general fund, never a guess.
          </p>
          <div className="hero__actions">
            <Link to="/feed" className="btn btn--primary">
              Open the feed
            </Link>
            {/* Single doorway to the written plan from the home page. The label is
                intentionally distinct from the header's "Build plan" link so
                assistive tech and tests can address each one unambiguously. */}
            <Link to="/plan" className="btn btn--ghost">
              How swiping works
            </Link>
          </div>
        </div>

        <div className="deck-preview">
          <div className="deck-stack">
            <article className="deck-card">
              <p className="deck-card__meta">Verified &middot; Bill #4182</p>
              <h2 className="deck-card__title">March rent</h2>
              <p className="deck-card__amount">$850.00</p>
              <p className="deck-card__recipient">Alicia R. &middot; East Oakland, CA</p>
              <p className="deck-card__note">
                Two shifts cut short after a school closure. The shortfall is exactly one
                month&rsquo;s rent and the notice is dated the 14th.
              </p>
              <div className="deck-card__hint">
                <span>&larr; Pass</span>
                <span>Pledge &rarr;</span>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="how-it-works">
        <h2 id="how-it-works" className="section__title">
          How it works
        </h2>
        <p className="section__lede">
          Three steps, no middle layer. The swipe is the whole interface.
        </p>
        <div className="card-grid">
          {HOW_IT_WORKS.map((item) => (
            <article key={item.step} className="card">
              <span className="card__step">{item.step}</span>
              <h3 className="card__title">{item.title}</h3>
              <p className="card__body">{item.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section" aria-labelledby="by-the-numbers">
        <h2 id="by-the-numbers" className="section__title">
          By the numbers
        </h2>
        <p className="section__lede">
          Aggregate figures from the pilot network of case workers and donors.
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
    </>
  );
}

export default HomePage;
