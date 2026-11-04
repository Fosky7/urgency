import { test, expect } from '@playwright/test';

test.describe('@affected module 1 routing shell', () => {
  test('@affected home renders the brand and primary nav without throwing', async ({
    page,
  }) => {
    const pageErrors: string[] = [];
    page.on('pageerror', (error) => pageErrors.push(error.message));

    await page.goto('/');

    await expect(page.getByRole('link', { name: 'Swipe to Fund \u2014 home' })).toBeVisible();
    const nav = page.getByRole('navigation', { name: 'Main' });
    await expect(nav.getByRole('link', { name: 'Feed', exact: true })).toBeVisible();
    await expect(nav.getByRole('link', { name: 'Impact', exact: true })).toBeVisible();
    await expect(nav.getByRole('link', { name: 'Create', exact: true })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Build plan', exact: true })).toBeVisible();

    expect(pageErrors).toEqual([]);
  });

  test('@affected Build plan link opens /plan with every documented section', async ({
    page,
  }) => {
    const pageErrors: string[] = [];
    page.on('pageerror', (error) => pageErrors.push(error.message));

    await page.goto('/');
    await page.getByRole('link', { name: 'Build plan', exact: true }).first().click();

    await expect(page).toHaveURL(/\/plan$/);
    await expect(page.getByRole('heading', { name: 'Swipe interaction rules' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Data model' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Screens' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Pledge flow' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Build order' })).toBeVisible();

    expect(pageErrors).toEqual([]);
  });

  test('@affected nav links reach real Feed, Impact and Create pages', async ({ page }) => {
    const pageErrors: string[] = [];
    page.on('pageerror', (error) => pageErrors.push(error.message));

    await page.goto('/');
    const nav = page.getByRole('navigation', { name: 'Main' });

    await nav.getByRole('link', { name: 'Feed', exact: true }).click();
    await expect(page).toHaveURL(/\/feed$/);
    await expect(page.getByRole('heading', { name: /Swipe to Fund, one verified bill/ })).toBeVisible();

    await page.getByRole('navigation', { name: 'Main' }).getByRole('link', { name: 'Impact', exact: true }).click();
    await expect(page).toHaveURL(/\/impact$/);
    await expect(page.getByRole('heading', { name: 'Where your pledges went' })).toBeVisible();

    await page.getByRole('navigation', { name: 'Main' }).getByRole('link', { name: 'Create', exact: true }).click();
    await expect(page).toHaveURL(/\/create$/);
    await expect(page.getByRole('heading', { name: 'Put a verified bill in the deck' })).toBeVisible();

    expect(pageErrors).toEqual([]);
  });
});
