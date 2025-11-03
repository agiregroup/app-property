import { test, expect } from '@playwright/test'

test('Add Property Flow', async ({ page }) => {
  await page.goto('http://localhost:5173/properties/location')
  await page.click('text=Ajouter')
  await page.fill('input[name="nom"]', 'Ocean View Apartment')
  await page.fill('input[name="proprietaire"]', 'John Doe')
  await page.fill('input[name="prix"]', '2400')
  await page.fill('input[name="latitude"]', '5.348')
  await page.fill('input[name="longitude"]', '-4.027')
  await page.selectOption('select[name="type"]', 'location')
  await page.selectOption('select[name="status"]', 'loué')
  await page.click('button[type="submit"]')
  await expect(page.locator('text=Ocean View Apartment')).toBeVisible()
})
