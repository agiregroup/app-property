import { test, expect } from '@playwright/test'

test('Login Flow', async ({ page }) => {
  await page.goto('http://localhost:5173/login')
  await page.fill('input[name="email"]', 'admin@example.com')
  await page.fill('input[name="password"]', 'password')
  await page.click('button[type="submit"]')
  await expect(page).toHaveURL(/.*\/properties/)
})
