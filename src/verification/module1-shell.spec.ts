import { test, expect } from '@playwright/test';

test.describe('@affected Module 1 shell & written build plan', () => {
  test('home shows brand, nav links and a styled hero', async ({ page }) => {
    await page.goto('/');

    await expect(page.getByText('Swipe to Fund').first()).toBeVisible();
    await expect(page.getByRole('link', { name: 'Feed', exact: true }).first()).toBeVisible();
    await expect(page.getByRole('link', { name: 'Impact', exact: true }).first()).toBeVisible();
    await expect(page.getByRole('link', { name: 'Create', exact: true }).first()).toBeVisible();

    // The previously undefined hero classes must now actually render styled.
    const heroTitle = page.locator('.hero__title').first();
    await expect(heroTitle).toBeVisible();
    const titleFontSize = await heroTitle.evaluate((el) =>
      parseFloat(getComputedStyle(el).fontSize),
    );
    expect(titleFontSize).toBeGreaterThan(24);

    const hero = page.locator('.hero').first();
    const heroBackground = await hero.evaluate(
      (el) => getComputedStyle(el).backgroundImage,
    );
    expect(heroBackground).not.toBe('none');
  });

  test('Build plan nav link opens /plan with the swipe interaction rules', async ({ page }) => {
    await page.goto('/');

    await page.getByRole('link', { name: /build plan/i }).first().click();
    await page.waitForURL(/\/plan$/);

    await expect(
      page.getByRole('heading', { name: 'Swipe interaction rules' }),
    ).toBeVisible();
  });

  test('/plan renders the four required sections, styled', async ({ page }) => {
    await page.goto('/plan');

    for (const section of ['Data model', 'Screens', 'Pledge flow', 'Build order']) {
      await expect(
        page.getByRole('heading', { name: section, exact: true }),
      ).toBeVisible();
    }

    await expect(
      page.getByRole('heading', { name: 'Swipe interaction rules' }),
    ).toBeVisible();

    const sectionTitle = page.locator('.plan-section__title').first();
    await expect(sectionTitle).toBeVisible();
    const headingFontSize = await sectionTitle.evaluate((el) =>
      parseFloat(getComputedStyle(el).fontSize),
    );
    expect(headingFontSize).toBeGreaterThan(16);

    const section = page.locator('.plan-section').first();
    const sectionBackground = await section.evaluate(
      (el) => getComputedStyle(el).backgroundColor,
    );
    expect(sectionBackground).not.toBe('rgba(0, 0, 0, 0)');

    const specGridDisplay = await page
      .locator('.spec-grid')
      .first()
      .evaluate((el) => getComputedStyle(el).display);
    expect(specGridDisplay).toBe('grid');

    const specNameColor = await page
      .locator('.spec__name')
      .first()
      .evaluate((el) => getComputedStyle(el).color);
    expect(specNameColor).not.toBe('rgb(0, 0, 0)');
  });
});
