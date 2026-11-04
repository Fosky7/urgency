import { test, expect } from '@playwright/test';

test.describe('@affected Module 1 — layout shell', () => {
  test('home page renders a styled header with the app name and nav links', async ({ page }) => {
    await page.goto('/');

    const header = page.locator('header.app-header');
    await expect(header).toBeVisible();

    // Concrete styling assertion: the header must actually paint a background,
    // not just render unstyled markup.
    const headerBackground = await header.evaluate(
      (el) => getComputedStyle(el).backgroundColor,
    );
    expect(headerBackground).not.toBe('rgba(0, 0, 0, 0)');

    await expect(
      page.locator('header .brand .brand__name'),
    ).toHaveText('Swipe to Fund');

    const brandMark = page.locator('header .brand__mark');
    await expect(brandMark).toBeVisible();
    const markWidth = await brandMark.evaluate(
      (el) => (el as HTMLElement).getBoundingClientRect().width,
    );
    expect(markWidth).toBeGreaterThan(0);

    await expect(page.locator('header').getByRole('link', { name: 'Feed', exact: true })).toBeVisible();
    await expect(page.locator('header').getByRole('link', { name: 'Impact', exact: true })).toBeVisible();
    await expect(page.locator('header').getByRole('link', { name: 'Create', exact: true })).toBeVisible();

    // Brand and nav actions are laid out on one row (flex applied, not stacked defaults).
    const innerDisplay = await page
      .locator('.app-header__inner')
      .evaluate((el) => getComputedStyle(el).display);
    expect(innerDisplay).toBe('flex');
  });

  test('the skip link appears on keyboard focus and targets the main region', async ({ page }) => {
    await page.goto('/');

    await expect(page.locator('main#main')).toHaveCount(1);

    const skipLink = page.getByRole('link', { name: 'Skip to content' });
    await expect(skipLink).toHaveCount(1);

    await page.keyboard.press('Tab');
    await expect(skipLink).toBeVisible();
    await expect(skipLink).toHaveAttribute('href', '#main');
  });

  test('clicking Build plan opens the plan page with the required sections', async ({ page }) => {
    await page.goto('/');

    await page.getByRole('link', { name: 'Build plan', exact: true }).click();
    await page.waitForURL('**/plan');

    await expect(page.getByRole('heading', { name: /Swipe interaction rules/i })).toBeVisible();
    await expect(page.getByText('Swipe interaction rules').first()).toBeVisible();

    for (const section of ['Data model', 'Screens', 'Pledge flow', 'Build order']) {
      await expect(page.getByText(section, { exact: false }).first()).toBeVisible();
    }
  });
});
