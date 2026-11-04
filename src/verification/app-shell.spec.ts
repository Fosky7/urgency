import { test, expect } from '@playwright/test';

test.describe('@affected app shell', () => {
  test('@affected home page shows brand and primary nav links', async ({ page }) => {
    await page.goto('/');

    const header = page.locator('.app-header');
    await expect(header).toBeVisible();
    await expect(page.locator('.brand__name')).toHaveText('Swipe to Fund');

    await expect(page.getByRole('navigation', { name: 'Main' }).getByRole('link', { name: 'Feed', exact: true })).toBeVisible();
    await expect(page.getByRole('navigation', { name: 'Main' }).getByRole('link', { name: 'Impact', exact: true })).toBeVisible();
    await expect(page.getByRole('navigation', { name: 'Main' }).getByRole('link', { name: 'Create', exact: true })).toBeVisible();
  });

  test('@affected shell classes are styled (header is not unstyled)', async ({ page }) => {
    await page.goto('/');

    const header = page.locator('.app-header');
    await expect(header).toBeVisible();

    // A defined stylesheet gives the sticky header a real position value.
    await expect(header).toHaveCSS('position', 'sticky');

    const navLink = page
      .getByRole('navigation', { name: 'Main' })
      .getByRole('link', { name: 'Feed', exact: true });
    await expect(navLink).toHaveCSS('border-top-left-radius', '999px');
  });

  test('@affected Build plan link opens the plan page with swipe interaction rules', async ({ page }) => {
    await page.goto('/');

    await page.getByRole('link', { name: 'Build plan', exact: true }).click();

    await expect(page).toHaveURL(/\/plan$/);
    await expect(page.getByText('Swipe interaction rules', { exact: false }).first()).toBeVisible();
  });

  test('@affected plan page shows all required build plan sections', async ({ page }) => {
    await page.goto('/plan');

    await expect(page.getByText('Swipe interaction rules', { exact: false }).first()).toBeVisible();
    await expect(page.getByText('Data model', { exact: false }).first()).toBeVisible();
    await expect(page.getByText('Screens', { exact: false }).first()).toBeVisible();
    await expect(page.getByText('Pledge flow', { exact: false }).first()).toBeVisible();
    await expect(page.getByText('Build order', { exact: false }).first()).toBeVisible();
  });
});
