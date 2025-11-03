import { test, expect } from '@playwright/test'

test('Edit property coordinates and verify map update', async ({ page }) => {
  
  await page.goto('http://localhost:5173/properties/location')
  await page.click('text=Voir détails')

  
  await page.fill('input[name="latitude"]', '5.348')
  await page.fill('input[name="longitude"]', '-4.027')

  
  await page.click('button[type="submit"]')

  
  const map = page.locator('[data-testid="map"]') 
  await expect(map).toBeVisible()
})

