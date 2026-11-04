import { test, expect } from '@playwright/test';

test.describe('Module 1: app shell @affected', () => {
  test('home header shows the app name and nav links @affected', async ({ page }) => {
    await page.goto('/');

    const header = page.locator('header.app-header');
    await expect(header).toBeVisible();
    await expect(header.locator('.brand__name')).toHaveText('Swipe to Fund');

    const nav = header.getByRole('navigation', { name: 'Main' });
    await expect(nav.getByRole('link', { name: 'Feed', exact: true })).toBeVisible();
    await expect(nav.getByRole('link', { name: 'Impact', exact: true })).toBeVisible();
    await expect(nav.getByRole('link', { name: 'Create', exact: true })).toBeVisible();
  });

  test('the Build plan link opens a page showing the swipe rules @affected', async ({
    page,
  }) => {
    await page.goto('/');

    await page.getByRole('link', { name: 'Build plan' }).click();

    await expect(page).toHaveURL(/\/plan$/);
    await expect(
      page.getByRole('heading', { name: 'Swipe interaction rules', exact: true }),
    ).toBeVisible();
    await expect(page.locator('header.app-header .brand__name')).toHaveText(
      'Swipe to Fund',
    );
  });

  test('the plan page lists every required section @affected', async ({ page }) => {
    await page.goto('/plan');

    for (const name of ['Data model', 'Screens', 'Pledge flow', 'Build order']) {
      await expect(page.getByRole('heading', { name, exact: true })).toBeVisible();
    }
  });

  test('the home page renders its hero, steps and stats at phone width @affected', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/');

    await expect(page.locator('header.app-header .brand__name')).toBeVisible();
    await expect(page.getByRole('heading', { name: /Swipe right/ })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'How it works' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'By the numbers' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Open the feed' })).toBeVisible();
    await expect(page.locator('.deck-card__amount')).toHaveText('$850.00');
  });
});
