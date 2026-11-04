import { useState } from 'react';
import { createFileRoute, Link } from '@tanstack/react-router';

export const Route = createFileRoute('/create')({
  component: CreatePage,
});

const CATEGORIES = ['Housing', 'Food', 'Medical', 'Utilities', 'Childcare'] as const;

/**
 * Create a bill campaign. Module 1 ships the page and the form; publishing and
 * validation land in Module 7.
 */
export function CreatePage() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="plan">
      <span className="eyebrow">Create</span>
      <h1 className="page-title">Put a verified bill in the deck</h1>
      <p className="page-lede">
        A campaign is one bill with one exact amount. Donors see the number to the
        cent before they swipe.
      </p>

      <section className="plan-section" aria-labelledby="new-campaign">
        <h2 id="new-campaign" className="plan-section__title">
          New campaign
        </h2>
        <p className="plan-section__lede">
          Household details are written by the referring case worker and never shown
          publicly without consent.
        </p>

        <form
          className="card"
          onSubmit={(event) => {
            event.preventDefault();
            setSubmitted(true);
          }}
        >
          <label className="card__title" htmlFor="campaign-title">
            Bill title
          </label>
          <input
            id="campaign-title"
            name="title"
            type="text"
            required
            placeholder="March rent"
          />

          <label className="card__title" htmlFor="campaign-amount">
            Exact amount (USD)
          </label>
          <input
            id="campaign-amount"
            name="amount"
            type="number"
            min="1"
            step="0.01"
            required
            placeholder="850.00"
          />

          <label className="card__title" htmlFor="campaign-category">
            Category
          </label>
          <select id="campaign-category" name="category" defaultValue="Housing">
            {CATEGORIES.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>

          <label className="card__title" htmlFor="campaign-story">
            The story
          </label>
          <textarea
            id="campaign-story"
            name="story"
            rows={4}
            placeholder="Why this bill, in the household\u2019s own words."
          />

          <div className="hero__actions">
            <button type="submit" className="btn btn--primary">
              Publish campaign
            </button>
            <Link to="/feed" className="btn btn--ghost">
              Cancel
            </Link>
          </div>

          {submitted ? (
            <p role="status" className="card__body">
              Campaign received. It will appear in the deck once the bill is verified.
            </p>
          ) : null}
        </form>
      </section>
    </div>
  );
}

export default CreatePage;
