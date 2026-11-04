import { test, expect } from '@playwright/test';

test.describe('@affected Module 1 — shell, home and build plan', () => {
  test('home page renders styled with brand, nav and deck preview', async ({ page }) => {
    await page.goto('/');

    // App name in the header.
    await expect(
      page.getByRole('link', { name: /Swipe to Fund/i }).first(),
    ).toBeVisible();

    // Primary nav + build plan link.
    await expect(page.getByRole('link', { name: 'Feed', exact: true })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Impact', exact: true })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Create', exact: true })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Build plan', exact: true })).toBeVisible();

    // Hero + deck preview are actually styled (stylesheet applied, not unstyled).
    const heroTitle = page.locator('.hero__title');
    await expect(heroTitle).toBeVisible();
    await expect(heroTitle).toContainText('Swipe right');

    const heroStyles = await heroTitle.evaluate((el) => {
      const cs = getComputedStyle(el);
      return {
        fontSize: parseFloat(cs.fontSize),
        fontWeight: cs.fontWeight,
        color: cs.color,
      };
    });
    expect(heroStyles.fontSize).toBeGreaterThan(28);
    expect(Number(heroStyles.fontWeight)).toBeGreaterThanOrEqual(600);
    expect(heroStyles.color).not.toBe('rgba(0, 0, 0, 0)');

    await expect(page.locator('.deck-card').first()).toBeVisible();
    await expect(page.locator('.deck-card__amount').first()).toHaveText('$850.00');
  });

  test('Build plan nav link opens the plan page with swipe interaction rules', async ({
    page,
  }) => {
    await page.goto('/');
    await page.getByRole('link', { name: 'Build plan', exact: true }).click();

    await expect(page).toHaveURL(/\/plan$/);
    await expect(
      page.getByRole('heading', { name: 'Swipe interaction rules' }),
    ).toBeVisible();
  });

  test('plan page shows every required section heading, styled', async ({ page }) => {
    await page.goto('/plan');

    for (const heading of [
      'Swipe interaction rules',
      'Data model',
      'Screens',
      'Pledge flow',
      'Build order',
    ]) {
      const h = page.getByRole('heading', { name: heading, exact: true });
      await expect(h).toBeVisible();
      const fontSize = await h.evaluate((el) => parseFloat(getComputedStyle(el).fontSize));
      expect(fontSize).toBeGreaterThan(18);
    }

    // Plan-specific class names are defined by the stylesheet.
    const specName = page.locator('.spec__name').first();
    await expect(specName).toBeVisible();
    const specColor = await specName.evaluate((el) => getComputedStyle(el).color);
    expect(specColor).not.toBe('rgb(0, 0, 0)');

    await expect(page.locator('.spec')).toHaveCount(4);
  });

  test('Feed nav link opens the feed page (its own heading, not the home hero)', async ({
    page,
  }) => {
    await page.goto('/');
    await page.getByRole('link', { name: 'Feed', exact: true }).click();

    await expect(page).toHaveURL(/\/feed$/);
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  });

  test('home page still renders at phone width', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/');

    await expect(
      page.getByRole('link', { name: /Swipe to Fund/i }).first(),
    ).toBeVisible();
    await expect(page.getByRole('link', { name: 'Build plan', exact: true })).toBeVisible();
    await expect(page.locator('.hero__title')).toBeVisible();
    await expect(page.locator('.deck-card__amount').first()).toHaveText('$850.00');
  });
});
