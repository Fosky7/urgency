import { createFileRoute, Link } from '@tanstack/react-router';

export const Route = createFileRoute('/plan')({
  component: PlanPage,
});

const SWIPE_RULES = [
  'Swipe right (or press the right arrow key) pledges the exact amount printed on the card — never rounded, never upsold.',
  'Swipe left (or press the left arrow key) passes. Passing is private: the recipient is never told a card was skipped.',
  'The drag threshold is 35% of card width, or a flick faster than 0.6 px/ms. Below that the card springs back to center.',
  'The last action stays reversible for 3 seconds through the on-deck undo pill before it is committed to the ledger.',
  'One action per bill per session — a bill you already funded or passed never reappears in the deck.',
  'Keyboard parity: arrows mirror the gestures, U undoes, and Enter opens the pledge confirmation sheet for the top card.',
] as const;

interface DataModelTable {
  name: string;
  fields: readonly string[];
}

const DATA_MODEL: readonly DataModelTable[] = [
  {
    name: 'households',
    fields: [
      'id — uuid, primary key',
      'display_name — text',
      'city — text',
      'story — text, written by the case worker',
      'avatar_url — text, https image',
    ],
  },
  {
    name: 'bills',
    fields: [
      'household_id — fk → households.id',
      'title — text',
      'amount_cents — integer, exact verified amount',
      'category — housing | food | medical | utilities | childcare',
      'due_date, verified_at, status',
    ],
  },
  {
    name: 'pledges',
    fields: [
      'bill_id — fk → bills.id',
      'amount_cents — integer, must equal bills.amount_cents',
      'status — pending | confirmed | refunded | undone',
      'created_at — timestamptz',
    ],
  },
  {
    name: 'campaigns',
    fields: [
      'title, description — text',
      'target_cents, pledged_cents — integer',
      'closes_at — timestamptz',
      'created_by — uuid → auth user',
    ],
  },
];

interface ScreenSpec {
  path: string;
  description: string;
}

const SCREENS: readonly ScreenSpec[] = [
  { path: '/', description: 'Home — brand header, value proposition, entry points into the deck and this plan.' },
  { path: '/feed', description: 'The swipe deck: draggable bill cards, undo pill, keyboard controls.' },
  { path: '/impact', description: 'Pledge ledger — what you funded, running total, receipts.' },
  { path: '/create', description: 'Create a bill campaign with a target amount and closing date.' },
  { path: '/plan', description: 'This build plan, rendered in the app.' },
];

const PLEDGE_FLOW = [
  'A bill card enters the deck with the recipient, category, verified amount and due date.',
  'The user swipes right (or presses the right arrow key).',
  'A confirmation sheet slides up showing the exact amount and the household that receives it.',
  'The user confirms. A pledges row is written with status pending and persisted locally first, so a dropped connection never loses the pledge.',
  'The card animates out of the deck, the undo pill appears for 3 seconds, and the pledge flips to confirmed once synced.',
  'The Impact page immediately reflects the new pledge and the updated running total.',
];

const BUILD_ORDER = [
  'App foundation, routing shell & written build plan — header, nav, global stylesheet, /plan.',
  'Swipe feed with draggable bill cards — pointer and touch dragging, thresholds, spring-back.',
  'Bill data model & seeded recipient stories — tables, RLS policies, realistic seed data.',
  'App state, pledge store & local storage persistence — optimistic pledges and offline reconciliation.',
  'Keyboard and on-screen deck controls — arrows, U to undo, Enter to confirm, visible buttons.',
  'Pledge confirmation with exact amount — confirmation sheet and receipt view.',
  'Create a bill campaign — the /create form, validation and publishing.',
];

/**
 * The written build plan, rendered as a real route so the plan that ships in the
 * repository (`docs/PLAN.md`) and the plan a visitor reads in the app can never
 * drift apart.
 */
function PlanPage() {
  return (
    <div className="plan">
      <span className="eyebrow">Build plan</span>
      <h1 className="page-title">How Swipe to Fund gets built</h1>
      <p className="page-lede">
        Five sections, shipped in order. The same plan lives in <code>docs/PLAN.md</code>{' '}
        so the repository and the app never drift apart.
      </p>

      <section className="plan-section" aria-labelledby="swipe-interaction-rules">
        <h2 id="swipe-interaction-rules" className="plan-section__title">
          Swipe interaction rules
        </h2>
        <p className="plan-section__lede">
          The swipe is the entire product surface, so the rules are fixed before any
          card is drawn.
        </p>
        <ul className="plan-list">
          {SWIPE_RULES.map((rule) => (
            <li key={rule}>{rule}</li>
          ))}
        </ul>
      </section>

      <section className="plan-section" aria-labelledby="data-model">
        <h2 id="data-model" className="plan-section__title">
          Data model
        </h2>
        <p className="plan-section__lede">
          Four tables. Amounts are stored in integer cents so a pledge can never drift
          from the verified bill.
        </p>
        <div className="spec-grid">
          {DATA_MODEL.map((table) => (
            <article key={table.name} className="spec">
              <p className="spec__name">{table.name}</p>
              <ul className="spec__fields">
                {table.fields.map((field) => (
                  <li key={field}>
                    <code>{field}</code>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="plan-section" aria-labelledby="screens">
        <h2 id="screens" className="plan-section__title">
          Screens
        </h2>
        <p className="plan-section__lede">
          Five routes, each reachable from the header in a single click.
        </p>
        <div className="route-table">
          {SCREENS.map((screen) => (
            <div key={screen.path} className="route-row">
              <span className="route-row__path">{screen.path}</span>
              <span className="route-row__desc">{screen.description}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="plan-section" aria-labelledby="pledge-flow">
        <h2 id="pledge-flow" className="plan-section__title">
          Pledge flow
        </h2>
        <p className="plan-section__lede">
          From deck to receipt in six steps, with the exact amount visible at every one.
        </p>
        <ol className="plan-list plan-list--numbered">
          {PLEDGE_FLOW.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
      </section>

      <section className="plan-section" aria-labelledby="build-order">
        <h2 id="build-order" className="plan-section__title">
          Build order
        </h2>
        <p className="plan-section__lede">
          Seven modules. Module 1 — the shell you are reading this in — is already
          deployed.
        </p>
        <ol className="plan-list plan-list--numbered">
          {BUILD_ORDER.map((module) => (
            <li key={module}>{module}</li>
          ))}
        </ol>
        <div className="hero__actions">
          <Link to="/feed" className="btn btn--primary">
            Open the feed
          </Link>
          <Link to="/" className="btn btn--ghost">
            Back to home
          </Link>
        </div>
      </section>
    </div>
  );
}
