import { test, expect } from '@playwright/test';

test.describe('@affected Module 1 — routing shell', () => {
  test('home page header shows the brand and the primary nav', async ({ page }) => {
    await page.goto('/');

    await expect(page.getByRole('link', { name: /Swipe to Fund/i }).first()).toBeVisible();

    const nav = page.getByRole('navigation', { name: 'Main' });
    await expect(nav.getByRole('link', { name: 'Feed', exact: true })).toBeVisible();
    await expect(nav.getByRole('link', { name: 'Impact', exact: true })).toBeVisible();
    await expect(nav.getByRole('link', { name: 'Create', exact: true })).toBeVisible();
  });

  test('the Build plan link on / opens the plan page', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('link', { name: 'Build plan', exact: true }).click();

    await expect(page).toHaveURL(/\/plan$/);
    await expect(page.getByRole('heading', { name: 'Swipe interaction rules' })).toBeVisible();
  });

  test('/plan shows the four required sections', async ({ page }) => {
    await page.goto('/plan');

    await expect(page.getByRole('heading', { name: 'Swipe interaction rules' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Data model', exact: true })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Screens', exact: true })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Pledge flow', exact: true })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Build order', exact: true })).toBeVisible();
  });

  test('the Feed nav link opens a real /feed page', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('navigation', { name: 'Main' }).getByRole('link', { name: 'Feed', exact: true }).click();

    await expect(page).toHaveURL(/\/feed$/);
    await expect(page.getByRole('heading', { name: 'Feed', level: 1 })).toBeVisible();
  });

  test('the Impact nav link opens a real /impact page', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('navigation', { name: 'Main' }).getByRole('link', { name: 'Impact', exact: true }).click();

    await expect(page).toHaveURL(/\/impact$/);
    await expect(page.getByRole('heading', { name: 'Impact', level: 1 })).toBeVisible();
  });

  test('the Create nav link opens a real /create page', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('navigation', { name: 'Main' }).getByRole('link', { name: 'Create', exact: true }).click();

    await expect(page).toHaveURL(/\/create$/);
    await expect(page.getByRole('heading', { name: 'Create', level: 1 })).toBeVisible();
  });

  test('every header destination loads the same shell without a 404', async ({ page }) => {
    for (const path of ['/', '/feed', '/impact', '/create', '/plan']) {
      await page.goto(path);
      await expect(page.getByRole('link', { name: /Swipe to Fund/i }).first()).toBeVisible();
      await expect(page.getByText(/We couldn.t find that page/i)).toHaveCount(0);
    }
  });
});
