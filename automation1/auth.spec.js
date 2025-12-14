import { test, expect } from '@playwright/test';

const BASE_URL = 'http://localhost:3000';

/* 1. Successful registration */
test('Successful registration', async ({ page }) => {
  await page.goto(`${BASE_URL}/register`);
  await page.fill('#name', 'Rahul Sharma');
  const uniqueEmail = `rahul_${Date.now()}@example.com`;
  await page.fill('#email', uniqueEmail);
  await page.fill('#password', 'Test@12345678');
  await page.fill('#confirmPassword', 'Test@12345678');
  await page.click('#register');
  await expect(page).toHaveURL(`${BASE_URL}/login`);
});

/* 2. Registration with duplicate email */
test('Registration with duplicate email', async ({ page }) => {
  await page.goto(`${BASE_URL}/register`);
  await page.fill('#name', 'Rahul Sharma');
  await page.fill('#email', 'rahul@gmail.com');
  await page.fill('#password', 'Test@12345678');
  await page.fill('#confirmPassword', 'Test@12345678');
  await page.click('#register');
  await expect(page.locator('text=Email already exists')).toBeVisible();
});

/* 3. Successful login */
test('Successful login', async ({ page }) => {
  await page.goto(`${BASE_URL}/login`);
  await page.fill('#email', 'rahul@gmail.com');
  await page.fill('#password', 'Test@12345678');
  await page.click('#login');
  await expect(page).toHaveURL(`${BASE_URL}/dashboard`);
});

/* 4. Login with invalid password */
test('Login with invalid password', async ({ page }) => {
  await page.goto(`${BASE_URL}/login`);
  await page.fill('#email', 'rahul@gmail.com');
  await page.fill('#password', 'WrongPassword');
  await page.click('#login');
  // Expect to remain on the login page after failed login
  await expect(page).toHaveURL(/login/);
});

/* 5. Access dashboard without login */
test('Access dashboard without login', async ({ page }) => {
  await page.goto(`${BASE_URL}/dashboard`);
  await expect(page).toHaveURL(/login/);
});
