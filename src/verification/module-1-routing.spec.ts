import { test, expect } from '@playwright/test';

test.describe('@affected Module 1 routing shell', () => {
  test('@affected home header shows the app name and Feed / Impact / Create nav', async ({
    page,
  }) => {
    await page.goto('/');

    await expect(page.getByRole('link', { name: /Swipe to Fund/ }).first()).toBeVisible();

    const nav = page.getByRole('navigation', { name: 'Main' });
    await expect(nav.getByRole('link', { name: 'Feed', exact: true })).toBeVisible();
    await expect(nav.getByRole('link', { name: 'Impact', exact: true })).toBeVisible();
    await expect(nav.getByRole('link', { name: 'Create', exact: true })).toBeVisible();
  });

  test('@affected Build plan link opens /plan with the swipe rules and the four sections', async ({
    page,
  }) => {
    await page.goto('/');

    await page.getByRole('link', { name: 'Build plan' }).click();
    await expect(page).toHaveURL(/\/plan$/);

    await expect(
      page.getByRole('heading', { name: 'Swipe interaction rules' }),
    ).toBeVisible();

    for (const title of ['Data model', 'Screens', 'Pledge flow', 'Build order']) {
      await expect(page.getByRole('heading', { name: title, exact: true })).toBeVisible();
    }
  });

  test('@affected /feed renders the deck page instead of a 404', async ({ page }) => {
    const response = await page.goto('/feed');
    expect(response?.status() ?? 200).toBeLessThan(400);

    await expect(page.getByRole('heading', { name: 'The swipe deck' })).toBeVisible();
    await expect(
      page.getByRole('navigation', { name: 'Main' }).getByRole('link', { name: 'Impact', exact: true }),
    ).toBeVisible();
    await expect(page.getByText(/find that page/)).toHaveCount(0);
  });
});
