import { createFileRoute, Link } from '@tanstack/react-router';

export const Route = createFileRoute('/create')({
  component: CreatePage,
});

interface Requirement {
  step: string;
  title: string;
  body: string;
}

const REQUIREMENTS: readonly Requirement[] = [
  {
    step: '01',
    title: 'Name the bill, not the cause',
    body: 'A campaign is one bill or one tight bundle \u2014 March rent, an insulin refill, a shut-off notice. Bundles stay under $1,500 so a donor can clear one in a single swipe.',
  },
  {
    step: '02',
    title: 'Attach the verified amount',
    body: 'Upload the notice or invoice and enter the amount owed to the cent. The case worker who verified it signs off before the campaign enters the deck.',
  },
  {
    step: '03',
    title: 'Set a closing date',
    body: 'Campaigns close at the bill due date. Anything pledged past the target is refunded automatically \u2014 a bill can never be over-funded.',
  },
  {
    step: '04',
    title: 'Write the household story',
    body: 'Two or three sentences in the household\u2019s own words, reviewed by their case worker. No photos of people; the bill is the evidence.',
  },
];

/** Campaign intake route: what a postable bill campaign needs. */
export function CreatePage() {
  return (
    <>
      <section className="hero">
        <div>
          <span className="eyebrow">For case workers</span>
          <h1 className="hero__title">Create</h1>
          <p className="hero__lede">
            Post a verified household bill so it can be cleared one swipe at a time.
            Every campaign carries the exact amount, the due date, and the name of the
            person who verified it.
          </p>
          <div className="hero__actions">
            <Link to="/feed" className="btn btn--primary">
              Preview the deck
            </Link>
            <Link to="/impact" className="btn btn--ghost">
              See a pledge ledger
            </Link>
          </div>
        </div>

        <div className="deck-preview">
          <div className="deck-stack">
            <article className="deck-card">
              <p className="deck-card__meta">Sample campaign \u00b7 Verified by R. Okafor, LCSW</p>
              <h2 className="deck-card__title">March rent</h2>
              <p className="deck-card__amount">$850.00</p>
              <p className="deck-card__recipient">Alicia R. \u00b7 East Oakland, CA</p>
              <p className="deck-card__note">
                Two shifts cut short after a school closure. Closes on the 14th, the
                date on the rent notice.
              </p>
              <div className="deck-card__hint">
                <span>Housing</span>
                <span>Closes Mar 14</span>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="requirements-title">
        <h2 id="requirements-title" className="section__title">
          What a campaign needs
        </h2>
        <p className="section__lede">
          Four fields, reviewed before publishing. Nothing enters the deck until the
          amount is verified.
        </p>
        <div className="card-grid">
          {REQUIREMENTS.map((item) => (
            <article key={item.step} className="card">
              <span className="card__step">{item.step}</span>
              <h3 className="card__title">{item.title}</h3>
              <p className="card__body">{item.body}</p>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}

export default CreatePage;
