import { test, expect } from '@playwright/test';

/**
 * Module 1 — app foundation, routing shell & written build plan.
 *
 * These tests drive the real rendered app (no mocks): they assert the shared
 * header, the navigation into `/plan`, and every required section of the
 * written build plan.
 */
test.describe('@affected module 1 — routing shell & build plan', () => {
  test('home page header shows the app name and primary nav links', async ({ page }) => {
    await page.goto('/');

    const header = page.getByRole('banner');
    await expect(header).toBeVisible();

    // App name.
    await expect(header.getByText('Swipe to Fund', { exact: true })).toBeVisible();

    // Primary nav links.
    const feed = header.getByRole('link', { name: 'Feed', exact: true });
    const impact = header.getByRole('link', { name: 'Impact', exact: true });
    const create = header.getByRole('link', { name: 'Create', exact: true });

    await expect(feed).toBeVisible();
    await expect(impact).toBeVisible();
    await expect(create).toBeVisible();

    await expect(feed).toHaveAttribute('href', '/feed');
    await expect(impact).toHaveAttribute('href', '/impact');
    await expect(create).toHaveAttribute('href', '/create');

    // Build plan entry point lives in the header too.
    await expect(
      header.getByRole('link', { name: 'Build plan', exact: true }),
    ).toHaveAttribute('href', '/plan');

    // The home page itself really rendered.
    await expect(
      page.getByRole('heading', { level: 1, name: 'Swipe right. Someone\u2019s bill gets paid.' }),
    ).toBeVisible();
  });

  test('clicking the "Build plan" nav link opens a page showing "Swipe interaction rules"', async ({
    page,
  }) => {
    await page.goto('/');

    await page
      .getByRole('banner')
      .getByRole('link', { name: 'Build plan', exact: true })
      .click();

    await expect(page).toHaveURL(/\/plan$/);
    await expect(
      page.getByRole('heading', { name: 'Swipe interaction rules', exact: true }),
    ).toBeVisible();

    // The rules themselves are real content, not an empty shell.
    await expect(
      page.getByText(/pledges the exact amount printed on the card/i),
    ).toBeVisible();
    await expect(page.getByText(/passing is private/i)).toBeVisible();
  });

  test('plan page renders the Data model, Screens, Pledge flow and Build order sections', async ({
    page,
  }) => {
    await page.goto('/plan');

    const requiredSections = ['Data model', 'Screens', 'Pledge flow', 'Build order'];
    for (const section of requiredSections) {
      await expect(
        page.getByRole('heading', { name: section, exact: true }),
      ).toBeVisible();
    }

    // Spot-check the section bodies for real content.
    await expect(page.getByText('households', { exact: true })).toBeVisible();
    await expect(page.getByText('/feed', { exact: true })).toBeVisible();
    await expect(
      page.getByText(/the user swipes right \(or presses the right arrow key\)/i),
    ).toBeVisible();
    await expect(page.getByText(/seven modules/i)).toBeVisible();
  });

  test('the app shell (brand + nav) persists on /plan', async ({ page }) => {
    await page.goto('/plan');

    const header = page.getByRole('banner');
    await expect(header.getByText('Swipe to Fund', { exact: true })).toBeVisible();
    await expect(header.getByRole('link', { name: 'Feed', exact: true })).toBeVisible();
    await expect(header.getByRole('link', { name: 'Impact', exact: true })).toBeVisible();
    await expect(header.getByRole('link', { name: 'Create', exact: true })).toBeVisible();

    // Brand link returns to the home route.
    await header.getByRole('link', { name: /home/i }).click();
    await expect(page).toHaveURL(/\/$/);
    await expect(
      page.getByRole('heading', { level: 1, name: 'Swipe right. Someone\u2019s bill gets paid.' }),
    ).toBeVisible();
  });
});
