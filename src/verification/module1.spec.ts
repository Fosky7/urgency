import { test, expect } from '@playwright/test';

/**
 * Module 1 — app foundation, routing shell & written build plan.
 *
 * These specs exercise the real shell: the header rendered by
 * `src/components/Layout.tsx`, the home route (`/`) and the plan route
 * (`/plan`). No mocks, no storage stubs — only what the browser renders.
 */

const PRIMARY_NAV = ['Feed', 'Impact', 'Create'] as const;
const PLAN_SECTIONS = ['Data model', 'Screens', 'Pledge flow', 'Build order'] as const;

test.describe('@affected Module 1 — app shell', () => {
  test('home page header shows the app name and the primary nav links', async ({ page }) => {
    await page.goto('/');

    const header = page.getByRole('banner');
    await expect(header).toBeVisible();

    // App name in the header.
    await expect(header.getByRole('link', { name: /Swipe to Fund/i })).toBeVisible();

    // Primary navigation: Feed / Impact / Create.
    const nav = header.getByRole('navigation', { name: 'Main' });
    await expect(nav).toBeVisible();
    for (const label of PRIMARY_NAV) {
      await expect(nav.getByRole('link', { name: label, exact: true })).toBeVisible();
    }

    // The build-plan link lives in the shell next to the primary nav.
    await expect(header.getByRole('link', { name: 'Build plan', exact: true })).toBeVisible();
  });

  test('clicking "Build plan" on / opens the plan page showing "Swipe interaction rules"', async ({
    page,
  }) => {
    await page.goto('/');

    await page.getByRole('banner').getByRole('link', { name: 'Build plan', exact: true }).click();

    await expect(page).toHaveURL(/\/plan\/?$/);

    // The plan route renders, and the swipe rules section is present.
    await expect(
      page.getByRole('heading', { name: 'Swipe interaction rules', level: 2 }),
    ).toBeVisible();
    await expect(
      page.getByText('The swipe is the entire product surface', { exact: false }),
    ).toBeVisible();

    // At least one concrete interaction rule is rendered as list content.
    await expect(
      page.getByText('Swipe left (or press the left arrow key) passes.', { exact: false }),
    ).toBeVisible();
  });

  test('/plan shows the Data model, Screens, Pledge flow and Build order sections', async ({
    page,
  }) => {
    await page.goto('/plan');

    await expect(
      page.getByRole('heading', { name: 'How Swipe to Fund gets built', level: 1 }),
    ).toBeVisible();

    for (const section of PLAN_SECTIONS) {
      const heading = page.getByRole('heading', { name: section, level: 2 });
      await expect(heading).toBeVisible();
      // Each section heading labels its own region.
      await expect(page.locator(`section[aria-labelledby]`).filter({ has: heading })).toHaveCount(
        1,
      );
    }

    // Spot-check real content inside the data model and build order sections.
    await expect(page.getByText('amount_cents — integer, exact verified amount')).toBeVisible();
    await expect(
      page.getByText('App foundation, routing shell & written build plan', { exact: false }),
    ).toBeVisible();
  });

  test('the shell (brand + nav links) is present on /plan as well', async ({ page }) => {
    await page.goto('/plan');

    const header = page.getByRole('banner');
    await expect(header.getByRole('link', { name: /Swipe to Fund/i })).toBeVisible();

    const nav = header.getByRole('navigation', { name: 'Main' });
    for (const label of PRIMARY_NAV) {
      await expect(nav.getByRole('link', { name: label, exact: true })).toBeVisible();
    }
  });
});
