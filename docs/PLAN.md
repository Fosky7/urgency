# Swipe to Fund \u2014 build plan (v1)

Swipe to Fund turns a quick scroll into rent, groceries and medication for
households nearby. Every card in the deck is a single verified bill with a fixed
amount \u2014 never a general fund, never a guess.

## Swipe interaction rules

- Swipe right (or press the right arrow key) pledges the exact amount printed on
the card \u2014 never rounded, never upsold.
- Swipe left (or press the left arrow key) passes. Passing is private: the
recipient is never told a card was skipped.
- The drag threshold is 35% of card width, or a flick faster than 0.6 px/ms.
Below that the card springs back to center.
- The last action stays reversible for 3 seconds through the on-deck undo pill
before it is committed to the ledger.
- One action per bill per session \u2014 a bill you already funded or passed never
reappears in the deck.
- Keyboard parity: arrows mirror the gestures, `U` undoes, and `Enter` opens the
pledge confirmation sheet for the top card.

## Data model

| table | fields |
| --- | --- |
| `households` | `id` uuid pk, `display_name`, `city`, `story`, `avatar_url` |
| `bills` | `id` uuid pk, `household_id` fk, `title`, `amount_cents` int, `category`, `due_date`, `verified_at`, `status` |
| `pledges` | `id` uuid pk, `bill_id` fk, `amount_cents` int (must equal `bills.amount_cents`), `status` pending/confirmed/refunded/undone, `created_at` |
| `campaigns` | `id` uuid pk, `title`, `description`, `target_cents`, `pledged_cents`, `closes_at`, `created_by` |

Amounts are stored in integer cents so a pledge can never drift from the
verified bill.

## Screens

| route | purpose |
| --- | --- |
| `/` | Home \u2014 brand header, value proposition, entry points into the deck and this plan. |
| `/feed` | The swipe deck: draggable bill cards, undo pill, keyboard controls. |
| `/impact` | Pledge ledger \u2014 what you funded, running total, receipts. |
| `/create` | Create a bill campaign with a target amount and closing date. |
| `/plan` | This build plan, rendered in the app. |

## Pledge flow

1. A bill card enters the deck with the recipient, category, verified amount and
due date.
2. The user swipes right (or presses the right arrow key).
3. A confirmation sheet slides up showing the exact amount and the household that
receives it.
4. The user confirms. A `pledges` row is written with status `pending` and
persisted locally first, so a dropped connection never loses the pledge.
5. The card animates out of the deck, the undo pill appears for 3 seconds, and
the pledge flips to `confirmed` once synced.
6. The Impact page immediately reflects the new pledge and the updated running
total.

## Build order

1. App foundation, routing shell & written build plan \u2014 header, nav, global
stylesheet, `/plan`.
2. Swipe feed with draggable bill cards \u2014 pointer and touch dragging,
thresholds, spring-back.
3. Bill data model & seeded recipient stories \u2014 tables, RLS policies,
realistic seed data.
4. App state, pledge store & local storage persistence \u2014 optimistic pledges and
offline reconciliation.
5. Keyboard and on-screen deck controls \u2014 arrows, `U` to undo, `Enter` to
confirm, visible buttons.
6. Pledge confirmation with exact amount \u2014 confirmation sheet and receipt view.
7. Create a bill campaign \u2014 the `/create` form, validation and publishing.
