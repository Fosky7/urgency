import { test, expect } from '@playwright/test';

test.describe('@affected Module 1 shell routing', () => {
  test('home shows the brand and the Feed / Impact / Create nav links', async ({ page }) => {
    await page.goto('/');

    await expect(page.locator('.brand__name')).toHaveText('Swipe to Fund');
    await expect(page.getByRole('link', { name: 'Feed', exact: true })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Impact', exact: true })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Create', exact: true })).toBeVisible();
  });

  test('the Build plan nav link opens the swipe interaction rules', async ({ page }) => {
    await page.goto('/');

    await page.getByRole('link', { name: 'Build plan', exact: true }).click();

    await expect(page).toHaveURL(/\/plan$/);
    await expect(page.getByRole('heading', { name: 'Swipe interaction rules' })).toBeVisible();
  });

  test('the plan page carries the four required sections', async ({ page }) => {
    await page.goto('/plan');

    await expect(page.getByRole('heading', { name: 'Data model' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Screens' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Pledge flow' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Build order' })).toBeVisible();
  });

  test('the header nav reaches every module page by clicking', async ({ page }) => {
    await page.goto('/');

    await page.getByRole('link', { name: 'Feed', exact: true }).click();
    await expect(page).toHaveURL(/\/feed$/);
    await expect(page.getByRole('heading', { name: 'The swipe deck' })).toBeVisible();

    await page.getByRole('link', { name: 'Impact', exact: true }).click();
    await expect(page).toHaveURL(/\/impact$/);
    await expect(page.getByRole('heading', { name: 'Your impact' })).toBeVisible();

    await page.getByRole('link', { name: 'Create', exact: true }).click();
    await expect(page).toHaveURL(/\/create$/);
    await expect(page.getByRole('heading', { name: 'Create a bill' })).toBeVisible();
  });

  test('the feed deck advances to the Rivera family bill', async ({ page }) => {
    await page.goto('/feed');

    await expect(
      page.getByRole('heading', { name: 'Rent help for the Rivera family' }),
    ).toBeVisible();

    await page.getByRole('button', { name: 'See next bill' }).click();
    await expect(
      page.getByRole('heading', { name: 'Insulin refill for Mr. Okafor' }),
    ).toBeVisible();
  });

  test('the impact month tab reports the family count', async ({ page }) => {
    await page.goto('/impact');

    await page.getByRole('tab', { name: 'This month' }).click();
    await expect(page.getByText('Pledged to 12 families')).toBeVisible();
  });

  test('the create form accepts a bill title', async ({ page }) => {
    await page.goto('/create');

    const title = page.getByLabel('Bill title');
    await title.fill('School lunch debt');
    await expect(title).toHaveValue('School lunch debt');
    await expect(page.getByText('Draft preview:')).toBeVisible();
  });

  test('the home hero title renders at weight 800 with the deck preview styled', async ({
    page,
  }) => {
    await page.goto('/');

    const heroTitle = page.locator('.hero').first().locator('.hero__title');
    await expect(heroTitle).toBeVisible();
    await expect(heroTitle).toHaveCSS('font-weight', '800');
    await expect(page.locator('.deck-card').first()).toBeVisible();
  });

  test('the shell classes are all styled by the global stylesheet', async ({ page }) => {
    await page.goto('/');

    const header = page.locator('.app-header').first();
    await expect(header).toBeVisible();
    const borderBottom = await header.evaluate(
      (el) => getComputedStyle(el as HTMLElement).borderBottomWidth,
    );
    expect(borderBottom).not.toBe('0px');
  });
});
