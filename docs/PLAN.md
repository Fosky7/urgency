# Swipe to Fund — Build Plan (v1)

The same plan that renders at `/plan`. Keep the two in sync.

## Swipe interaction rules

1. Swipe right (or press the right arrow key) pledges the exact amount printed on the card — never rounded, never upsold.
2. Swipe left (or press the left arrow key) passes. Passing is private: the recipient is never told a card was skipped.
3. The drag threshold is 35% of card width, or a flick faster than 0.6 px/ms. Below that the card springs back to center.
4. The last action stays reversible for 3 seconds through the on-deck undo pill before it is committed to the ledger.
5. One action per bill per session — a bill you already funded or passed never reappears in the deck.
6. Keyboard parity: arrows mirror the gestures, U undoes, and Enter opens the pledge confirmation sheet for the top card.

## Data model

| Table | Fields |
| --- | --- |
| `households` | `id` uuid PK, `display_name`, `city`, `story`, `avatar_url` |
| `bills` | `household_id` fk, `title`, `amount_cents` integer, `category`, `due_date`, `verified_at`, `status` |
| `pledges` | `bill_id` fk, `amount_cents` integer, `status` pending \| confirmed \| refunded \| undone, `created_at` |
| `campaigns` | `title`, `description`, `target_cents`, `pledged_cents`, `closes_at`, `created_by` |

Amounts are stored in integer cents so a pledge can never drift from the verified bill.

## Screens

| Route | Purpose |
| --- | --- |
| `/` | Home — brand header, value proposition, entry points into the deck and this plan. |
| `/feed` | The swipe deck: draggable bill cards, undo pill, keyboard controls. |
| `/impact` | Pledge ledger — what you funded, running total, receipts. |
| `/create` | Create a bill campaign with a target amount and closing date. |
| `/plan` | This build plan, rendered in the app. |

## Pledge flow

1. A bill card enters the deck with the recipient, category, verified amount and due date.
2. The user swipes right (or presses the right arrow key).
3. A confirmation sheet slides up showing the exact amount and the household that receives it.
4. The user confirms. A `pledges` row is written with status `pending` and persisted locally first, so a dropped connection never loses the pledge.
5. The card animates out of the deck, the undo pill appears for 3 seconds, and the pledge flips to `confirmed` once synced.
6. The Impact page immediately reflects the new pledge and the updated running total.

## Build order

1. App foundation, routing shell & written build plan — header, nav, global stylesheet, `/plan`.
2. Swipe feed with draggable bill cards — pointer and touch dragging, thresholds, spring-back.
3. Bill data model & seeded recipient stories — tables, RLS policies, realistic seed data.
4. App state, pledge store & local storage persistence — optimistic pledges and offline reconciliation.
5. Keyboard and on-screen deck controls — arrows, U to undo, Enter to confirm, visible buttons.
6. Pledge confirmation with exact amount — confirmation sheet and receipt view.
7. Create a bill campaign — the `/create` form, validation and publishing.
