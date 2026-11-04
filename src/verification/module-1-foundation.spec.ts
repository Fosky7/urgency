import { test, expect } from '@playwright/test';

/**
 * Module 1 acceptance: the persistent routing shell and the written build plan.
 * These specs exercise the real UI at the configured baseURL.
 */
test.describe('@affected Module 1 — app shell and build plan', () => {
  test('header shows the app name and the primary nav on /', async ({ page }) => {
    await page.goto('/');

    const header = page.locator('header').first();
    await expect(header).toBeVisible();
    await expect(header.getByText('Swipe to Fund').first()).toBeVisible();

    await expect(header.getByRole('link', { name: /^feed$/i })).toBeVisible();
    await expect(header.getByRole('link', { name: /^impact$/i })).toBeVisible();
    await expect(header.getByRole('link', { name: /^create$/i })).toBeVisible();
  });

  test('the Build plan nav link opens /plan with the rules and plan sections', async ({
    page,
  }) => {
    await page.goto('/');

    const buildPlanLink = page
      .locator('header')
      .first()
      .getByRole('link', { name: /build plan/i });

    await expect(buildPlanLink).toBeVisible();
    await buildPlanLink.click();

    await expect(page).toHaveURL(/\/plan\/?$/);
    await expect(page.getByText('Swipe interaction rules', { exact: true }).first()).toBeVisible();
    await expect(page.getByText('Data model', { exact: true }).first()).toBeVisible();
    await expect(page.getByText('Screens', { exact: true }).first()).toBeVisible();
    await expect(page.getByText('Pledge flow', { exact: true }).first()).toBeVisible();
    await expect(page.getByText('Build order', { exact: true }).first()).toBeVisible();
  });

  test('/plan is directly addressable and renders the swipe rules', async ({ page }) => {
    await page.goto('/plan');

    await expect(page.getByText('Swipe interaction rules', { exact: true }).first()).toBeVisible();
    await expect(page.getByText('Data model', { exact: true }).first()).toBeVisible();
    await expect(page.getByText('Build order', { exact: true }).first()).toBeVisible();
  });
});
