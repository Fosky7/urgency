import { test, expect } from '@playwright/test';

test.describe('Module 1 shell styling @affected', () => {
  test('home renders the hero and deck preview with applied styles', async ({ page }) => {
    await page.goto('/');

    await expect(page.getByText('Swipe to Fund').first()).toBeVisible();

    const hero = page.locator('.hero').first();
    await expect(hero).toBeVisible();
    await expect(hero.locator('.hero__title')).toHaveCSS('font-weight', '800');

    const card = page.locator('.deck-card').first();
    await expect(card).toBeVisible();
    // A defined stylesheet gives the card a rounded radius and a box shadow.
    const radius = await card.evaluate((el) => getComputedStyle(el).borderTopLeftRadius);
    expect(radius).not.toBe('0px');
    const shadow = await card.evaluate((el) => getComputedStyle(el).boxShadow);
    expect(shadow).not.toBe('none');
  });

  test('build plan page renders styled sections', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('link', { name: /build plan/i }).click();
    await expect(page).toHaveURL(/\/plan$/);

    await expect(page.getByRole('heading', { name: 'Swipe interaction rules' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Data model' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Screens' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Pledge flow' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Build order' })).toBeVisible();

    const sections = page.locator('.plan-section');
    expect(await sections.count()).toBeGreaterThanOrEqual(5);

    const grid = page.locator('.spec-grid').first();
    await expect(grid).toBeVisible();
    expect(await grid.evaluate((el) => getComputedStyle(el).display)).toBe('grid');

    const spec = page.locator('.spec').first();
    const specRadius = await spec.evaluate((el) => getComputedStyle(el).borderTopLeftRadius);
    expect(specRadius).not.toBe('0px');
  });
});
