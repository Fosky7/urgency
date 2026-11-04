import { test, expect } from '@playwright/test';

test.describe('Module 1 — app shell, header and build plan', () => {
  test('home page renders a styled header with brand and nav links', { tag: '@affected' }, async ({
    page,
  }) => {
    await page.goto('/');

    // App name is present in the header.
    const brand = page.locator('.app-header .brand');
    await expect(brand).toBeVisible();
    await expect(page.locator('.app-header .brand__name')).toHaveText('Swipe to Fund');

    // Primary nav links are present in the header.
    const nav = page.locator('.app-header .app-nav');
    await expect(nav.getByRole('link', { name: 'Feed', exact: true })).toBeVisible();
    await expect(nav.getByRole('link', { name: 'Impact', exact: true })).toBeVisible();
    await expect(nav.getByRole('link', { name: 'Create', exact: true })).toBeVisible();

    // The header is actually styled (this was the reported bug: unstyled shell).
    const header = page.locator('.app-header');
    const headerStyles = await header.evaluate((el) => {
      const cs = window.getComputedStyle(el);
      return { position: cs.position, borderBottomWidth: cs.borderBottomWidth };
    });
    expect(headerStyles.position).toBe('sticky');
    expect(headerStyles.borderBottomWidth).not.toBe('0px');

    const inner = page.locator('.app-header__inner');
    expect(await inner.evaluate((el) => window.getComputedStyle(el).display)).toBe('flex');

    const mark = page.locator('.brand__mark');
    await expect(mark).toBeVisible();
    const markStyles = await mark.evaluate((el) => {
      const cs = window.getComputedStyle(el);
      return { width: cs.width, color: cs.color };
    });
    expect(markStyles.width).not.toBe('0px');
    expect(markStyles.color).toBe('rgb(255, 255, 255)');
  });

  test('skip link becomes visible when focused', { tag: '@affected' }, async ({ page }) => {
    await page.goto('/');

    const skipLink = page.locator('.skip-link');
    await expect(skipLink).toHaveText(/Skip to content/i);

    await skipLink.focus();
    await expect(skipLink).toBeVisible();
    const left = await skipLink.evaluate((el) => window.getComputedStyle(el).left);
    expect(left === '0px' || parseFloat(left) >= 0).toBeTruthy();
  });

  test('Build plan nav link opens the plan page with required sections', { tag: '@affected' }, async ({
    page,
  }) => {
    await page.goto('/');

    await page.locator('.app-header').getByRole('link', { name: 'Build plan' }).click();

    await expect(page).toHaveURL(/\/plan$/);
    await expect(page.getByText('Swipe interaction rules')).toBeVisible();
    await expect(page.getByText('Data model', { exact: false }).first()).toBeVisible();
    await expect(page.getByText('Screens', { exact: false }).first()).toBeVisible();
    await expect(page.getByText('Pledge flow', { exact: false }).first()).toBeVisible();
    await expect(page.getByText('Build order', { exact: false }).first()).toBeVisible();

    // The shell (brand + nav) is still styled on the plan route.
    await expect(page.locator('.app-header .brand__name')).toHaveText('Swipe to Fund');
    expect(
      await page.locator('.app-header').evaluate((el) => window.getComputedStyle(el).position),
    ).toBe('sticky');
  });
});
