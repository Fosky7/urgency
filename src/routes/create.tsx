import { createFileRoute, Link } from '@tanstack/react-router';

export const Route = createFileRoute('/create')({
  component: CreatePage,
});

interface CreateStep {
  step: string;
  title: string;
  body: string;
}

const CREATE_STEPS: readonly CreateStep[] = [
  {
    step: '01',
    title: 'Name the bill',
    body: 'Upload the notice or invoice and give the campaign a plain-language title, e.g. \u201cMarch rent for Alicia R.\u201d',
  },
  {
    step: '02',
    title: 'Set the exact target',
    body: 'Enter the verified amount in dollars and cents. The target can never exceed the bill itself.',
  },
  {
    step: '03',
    title: 'Publish and close',
    body: 'Pick a closing date. When the target is met the campaign leaves the deck and a receipt is issued to every pledger.',
  },
];

/** Entry point for creating a bill campaign (the form ships in Module 7). */
function CreatePage() {
  return (
    <>
      <section className="section" aria-labelledby="create-title">
        <span className="eyebrow">Create</span>
        <h1 id="create-title" className="page-title">
          Create a bill campaign
        </h1>
        <p className="page-lede">
          Case workers and community partners publish one verified bill at a time.
          Donors see the household, the category and the amount down to the cent
          before they swipe.
        </p>

        <div className="card-grid">
          {CREATE_STEPS.map((item) => (
            <article key={item.step} className="card">
              <span className="card__step">{item.step}</span>
              <h2 className="card__title">{item.title}</h2>
              <p className="card__body">{item.body}</p>
            </article>
          ))}
        </div>

        <div className="hero__actions">
          <Link to="/feed" className="btn btn--primary">
            Open the feed
          </Link>
          <Link to="/plan" className="btn btn--ghost">
            Read the build plan
          </Link>
        </div>
      </section>
    </>
  );
}
