import { test, expect } from '@playwright/test';

test.describe('Module 1 page styles @affected', () => {
  test('landing page renders hero and deck preview with applied styles @affected', async ({ page }) => {
    await page.goto('/');

    const title = page.getByRole('heading', { level: 1 });
    await expect(title).toBeVisible();
    await expect(title).toContainText('Swipe right');

    const heroBox = await page.locator('.hero').boundingBox();
    expect(heroBox).not.toBeNull();
    expect(heroBox!.height).toBeGreaterThan(120);

    await expect(page.locator('.deck-preview .deck-card')).toBeVisible();
    await expect(page.locator('.deck-card__title')).toContainText('March rent');

    const titleSize = await title.evaluate((el) => parseFloat(getComputedStyle(el).fontSize));
    expect(titleSize).toBeGreaterThan(24);
  });

  test('Build plan link opens /plan with styled sections @affected', async ({ page }) => {
    await page.goto('/');

    await page.getByRole('link', { name: /build plan/i }).first().click();
    await expect(page).toHaveURL(/\/plan$/);

    await expect(page.getByText('Swipe interaction rules').first()).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Data model' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Screens' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Pledge flow' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Build order' })).toBeVisible();

    const sectionTitle = page.getByRole('heading', { name: 'Data model' });
    const size = await sectionTitle.evaluate((el) => parseFloat(getComputedStyle(el).fontSize));
    expect(size).toBeGreaterThan(16);
  });
});
