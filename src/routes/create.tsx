import { useState, type FormEvent } from 'react';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/create')({
  component: CreatePage,
});

/** Create a bill campaign: title, exact target and a closing date. */
export function CreatePage() {
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('housing');
  const [submitted, setSubmitted] = useState<string | null>(null);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!title.trim()) return;
    setSubmitted(title.trim());
  }

  return (
    <div className="create">
      <header className="create__header">
        <span className="eyebrow">New campaign</span>
        <h1 className="page-title">Create a bill</h1>
        <p className="page-lede">
          Post one verified bill with the exact amount owed. Every donor sees the number
          down to the cent before they pledge.
        </p>
      </header>

      <form className="form" onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="bill-title">Bill title</label>
          <input
            id="bill-title"
            name="billTitle"
            className="input"
            type="text"
            placeholder="School lunch debt"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
        </div>

        <div className="field">
          <label htmlFor="bill-amount">Exact amount owed</label>
          <input
            id="bill-amount"
            name="billAmount"
            className="input"
            type="text"
            inputMode="decimal"
            placeholder="248.90"
            value={amount}
            onChange={(event) => setAmount(event.target.value)}
          />
        </div>

        <div className="field">
          <label htmlFor="bill-category">Category</label>
          <select
            id="bill-category"
            name="billCategory"
            className="input"
            value={category}
            onChange={(event) => setCategory(event.target.value)}
          >
            <option value="housing">Housing</option>
            <option value="food">Food</option>
            <option value="medical">Medical</option>
            <option value="utilities">Utilities</option>
            <option value="childcare">Childcare</option>
          </select>
        </div>

        <div className="field">
          <label htmlFor="bill-note">Why this bill is urgent</label>
          <textarea
            id="bill-note"
            name="billNote"
            className="input input--textarea"
            rows={4}
            placeholder="The notice is dated the 14th and the balance is due before the end of the month."
          />
        </div>

        <div className="hero__actions">
          <button type="submit" className="btn btn--primary">
            Publish campaign
          </button>
        </div>
      </form>

      {title.trim() ? (
        <p className="create__preview" aria-live="polite">
          Draft preview: <strong>{title.trim()}</strong>
          {amount.trim() ? <> &middot; ${amount.trim()}</> : null}
        </p>
      ) : null}

      {submitted ? (
        <p className="create__notice" role="status">
          &ldquo;{submitted}&rdquo; is saved as a draft campaign and will publish once the
          bill is verified.
        </p>
      ) : null}
    </div>
  );
}

export default CreatePage;
