# Swipe to Fund — Build Plan

> Module 1 (app foundation, routing shell and written build plan).
> This document is the source of truth for the interaction rules and the order in
> which the remaining modules ship.

## Product summary

Swipe to Fund is a swipe-first giving feed. Supporters browse vetted campaigns,
swipe right to pledge, swipe left to pass, and review the impact of every pledge
in one place.

The shell is deliberately small:

- `/` renders the Feed.
- `/impact` renders the Impact dashboard.
- `/create` renders campaign creation.
- `/plan` renders this document so reviewers can inspect the shipped rules.

Every route shares one persistent header containing the app name,
**Swipe to Fund**, the primary links **Feed**, **Impact**, **Create**, and the
**Build plan** link.

## Swipe interaction rules

1. The Feed presents exactly one campaign card at a time. The next card is
   preloaded underneath so a completed swipe never leaves a blank deck.
2. Dragging the card horizontally moves it with the pointer. Releasing past the
   decision threshold (35% of the card width, or a fast flick) commits the swipe.
3. **Swipe right** records a pledge intent for the campaign. **Swipe left**
   records a pass. Neither action charges the supporter; the pledge is confirmed
   in the pledge flow.
4. Releasing before the threshold snaps the card back to centre and records
   nothing.
5. Committed swipes animate off-screen, then the next card is promoted. An undo
   affordance stays available for five seconds and reverses the recorded action.
6. Keyboard parity is required: `ArrowRight` pledges, `ArrowLeft` passes,
   `Escape` dismisses an open pledge sheet, and `Tab` cycles the visible actions.
7. The card exposes `role='group'` with an accessible label, and every gesture
   has a visible button equivalent. Swipe state is announced through an
   `aria-live` region.
8. Swiping is blocked while a pledge is submitting so a double gesture cannot
   create duplicate records.

## Data model

| Entity | Key fields | Notes |
| --- | --- | --- |
| `profiles` | `id`, `display_name`, `avatar_url`, `total_pledged` | Mirrors `auth.users`. |
| `campaigns` | `id`, `owner_id`, `title`, `summary`, `category`, `goal_amount`, `raised_amount`, `cover_url`, `status` | `status` is `draft`, `active`, `funded` or `archived`. |
| `pledges` | `id`, `campaign_id`, `supporter_id`, `amount`, `status`, `created_at` | `status` is `intent`, `confirmed` or `cancelled`. |
| `swipes` | `id`, `campaign_id`, `supporter_id`, `direction`, `created_at` | Unique on `(campaign_id, supporter_id)` so a card is decided once. |
| `impact_events` | `id`, `pledge_id`, `campaign_id`, `amount`, `occurred_at` | Append-only ledger that powers `/impact`. |

Access rules: campaign owners may edit their own campaigns; supporters may read
active campaigns and their own pledges/swipes; aggregate counts are exposed
through views rather than raw table access. No service-role key is ever shipped
to the client.

## Screens

- **Feed (`/`)** — swipe deck, campaign summary, pledge sheet, undo toast.
- **Impact (`/impact`)** — totals pledged, campaigns supported, recent impact
  events, and a per-category breakdown.
- **Create (`/create`)** — campaign draft form with validation and a preview of
  the card as it will appear in the Feed.
- **Build plan (`/plan`)** — this document, including the swipe rules and the
  build order.
- **Not found / error** — rendered inside the same shell with links back to the
  Feed and the Build plan.

## Pledge flow

1. A right swipe on the Feed records a pledge `intent` for the campaign.
2. The pledge sheet opens with the campaign title and a suggested amount.
3. The supporter chooses an amount and confirms. The amount is validated against
   the campaign minimum and the supporter's remaining budget.
4. On confirm, the pledge moves to `confirmed` in a single transaction, the
   campaign `raised_amount` is incremented, and an `impact_event` is appended.
5. The card animates away and the Feed advances. A success toast links to
   `/impact`.
6. If confirmation fails, the pledge stays an `intent`, the card remains, and the
   error is announced through the live region with a retry action.
7. Cancelling the sheet records a `cancelled` pledge (or removes the intent) and
   returns the card to the deck without charging anything.

## Build order

1. **Module 1 — Foundation (this step).** Vite + React + TypeScript shell,
   TanStack Router root route, persistent header, shared stylesheet, 404/error
   states, and this written plan. Acceptance: the header shows **Swipe to Fund**
   with **Feed**, **Impact**, **Create** and **Build plan**; `/plan` shows
   **Swipe interaction rules** plus the **Data model**, **Screens**,
   **Pledge flow** and **Build order** sections.
2. **Module 2 — Feed and swipe deck.** Campaign query, card stack, pointer and
   keyboard gestures, undo.
3. **Module 3 — Pledge flow.** Pledge sheet, validation, confirmation transaction,
   impact ledger write.
4. **Module 4 — Impact dashboard.** Aggregates, per-category breakdown, empty
   states.
5. **Module 5 — Create campaign.** Draft form, preview, owner-only edit rules.
6. **Module 6 — Hardening.** Playwright coverage for every flow, accessibility
   audit, performance budget, and production deployment checks.
