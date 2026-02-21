import { test, expect } from '@playwright/test';
import { waitForPageReady } from './helpers';

test.describe('User Authentication', () => {
  test.beforeEach(async ({ page }) => {
    // Clear user auth state
    await page.goto('/');
    await page.evaluate(() => {
      localStorage.removeItem('mv-users');
    });
    await page.reload();
    await waitForPageReady(page);
  });

  // SIGNUP TESTS
  test('signup page renders with all form fields', async ({ page }) => {
    await page.goto('signup');
    await waitForPageReady(page);

    // Use locator scoped to h1 to avoid matching header links
    await expect(page.locator('h1', { hasText: 'SIGN UP' })).toBeVisible();
    // Check all input fields are present
    await expect(page.getByPlaceholder('Username')).toBeVisible();
    await expect(page.getByPlaceholder('Email Address')).toBeVisible();
    await expect(page.getByPlaceholder('Password', { exact: true })).toBeVisible();
    await expect(page.getByPlaceholder('Confirm Password')).toBeVisible();
  });

  test('signup allows continuous typing in all fields', async ({ page }) => {
    await page.goto('signup');
    await waitForPageReady(page);

    const username = page.getByPlaceholder('Username');
    await username.click();
    await username.type('testuser123', { delay: 50 });
    await expect(username).toHaveValue('testuser123');

    const email = page.getByPlaceholder('Email Address');
    await email.click();
    await email.type('test@example.com', { delay: 30 });
    await expect(email).toHaveValue('test@example.com');
  });

  test('signup validates required fields', async ({ page }) => {
    await page.goto('signup');
    await waitForPageReady(page);

    // Click submit without filling anything
    await page.getByRole('button', { name: /sign up now/i }).click();
    await page.waitForTimeout(300);

    // Browser native validation prevents submission (required fields are empty).
    // The username field should be invalid and the page should remain on signup.
    const usernameInput = page.getByPlaceholder('Username');
    const isInvalid = await usernameInput.evaluate((el: HTMLInputElement) => !el.validity.valid);
    expect(isInvalid).toBe(true);
    expect(page.url()).toContain('/signup');
  });

  test('signup validates password match', async ({ page }) => {
    await page.goto('signup');
    await waitForPageReady(page);

    await page.getByPlaceholder('Username').fill('testuser');
    await page.getByPlaceholder('Email Address').fill('test@example.com');
    await page.getByPlaceholder('Password', { exact: true }).fill('password123');
    await page.getByPlaceholder('Confirm Password').fill('different');

    await page.getByRole('button', { name: /sign up now/i }).click();
    await page.waitForTimeout(300);

    const error = page.locator('.text-red-500');
    await expect(error).toBeVisible();
  });

  test('signup validates password length', async ({ page }) => {
    await page.goto('signup');
    await waitForPageReady(page);

    await page.getByPlaceholder('Username').fill('testuser');
    await page.getByPlaceholder('Email Address').fill('test@example.com');
    await page.getByPlaceholder('Password', { exact: true }).fill('12345');
    await page.getByPlaceholder('Confirm Password').fill('12345');

    await page.getByRole('button', { name: /sign up now/i }).click();
    await page.waitForTimeout(300);

    const error = page.locator('.text-red-500');
    await expect(error).toBeVisible();
  });

  test('successful signup creates account and redirects', async ({ page }) => {
    await page.goto('signup');
    await waitForPageReady(page);

    await page.getByPlaceholder('Username').fill('newuser');
    await page.getByPlaceholder('Email Address').fill('newuser@example.com');
    await page.getByPlaceholder('Password', { exact: true }).fill('password123');
    await page.getByPlaceholder('Confirm Password').fill('password123');

    await page.getByRole('button', { name: /sign up now/i }).click();

    // Should redirect to homepage after successful signup
    await page.waitForURL('**/en', { timeout: 10000 });
  });

  test('signup rejects duplicate email', async ({ page }) => {
    // First registration
    await page.goto('signup');
    await waitForPageReady(page);
    await page.getByPlaceholder('Username').fill('user1');
    await page.getByPlaceholder('Email Address').fill('duplicate@example.com');
    await page.getByPlaceholder('Password', { exact: true }).fill('password123');
    await page.getByPlaceholder('Confirm Password').fill('password123');
    await page.getByRole('button', { name: /sign up now/i }).click();

    // Wait for success message and redirect (1.5s delay + navigation)
    await page.waitForURL('**/en', { timeout: 15000 });

    // Clear user session so we can access signup again
    await page.evaluate(() => {
      const stored = localStorage.getItem('mv-users');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed.state) {
          parsed.state.currentUser = null;
          localStorage.setItem('mv-users', JSON.stringify(parsed));
        }
      }
    });

    // Second registration with same email
    await page.goto('signup');
    await waitForPageReady(page);
    await page.getByPlaceholder('Username').fill('user2');
    await page.getByPlaceholder('Email Address').fill('duplicate@example.com');
    await page.getByPlaceholder('Password', { exact: true }).fill('password123');
    await page.getByPlaceholder('Confirm Password').fill('password123');
    await page.getByRole('button', { name: /sign up now/i }).click();
    await page.waitForTimeout(500);

    const error = page.locator('.text-red-500');
    await expect(error).toBeVisible();
  });

  test('password show/hide toggle works on signup', async ({ page }) => {
    await page.goto('signup');
    await waitForPageReady(page);

    const passwordInput = page.getByPlaceholder('Password', { exact: true });
    await expect(passwordInput).toHaveAttribute('type', 'password');

    // Click SHOW button
    await page.getByText('SHOW').first().click();
    await expect(passwordInput).toHaveAttribute('type', 'text');

    // Click HIDE button
    await page.getByText('HIDE').first().click();
    await expect(passwordInput).toHaveAttribute('type', 'password');
  });

  // LOGIN TESTS
  test('login page renders with email and password fields', async ({ page }) => {
    await page.goto('login');
    await waitForPageReady(page);

    // Use locator scoped to h1 to avoid matching header links
    await expect(page.locator('h1', { hasText: 'LOGIN' })).toBeVisible();
    await expect(page.getByPlaceholder('sample@email.com')).toBeVisible();
    await expect(page.getByPlaceholder('Password')).toBeVisible();
  });

  test('login allows continuous typing', async ({ page }) => {
    await page.goto('login');
    await waitForPageReady(page);

    const email = page.getByPlaceholder('sample@email.com');
    await email.click();
    await email.type('user@example.com', { delay: 30 });
    await expect(email).toHaveValue('user@example.com');
  });

  test('login rejects empty fields', async ({ page }) => {
    await page.goto('login');
    await waitForPageReady(page);

    await page.getByRole('button', { name: /login now/i }).click();
    await page.waitForTimeout(300);

    // Login uses text-red-500 for errors
    const error = page.locator('.text-red-500');
    await expect(error).toBeVisible();
  });

  test('login rejects invalid credentials', async ({ page }) => {
    await page.goto('login');
    await waitForPageReady(page);

    await page.getByPlaceholder('sample@email.com').fill('wrong@example.com');
    await page.getByPlaceholder('Password').fill('wrongpassword');

    await page.getByRole('button', { name: /login now/i }).click();
    await page.waitForTimeout(300);

    const error = page.locator('.text-red-500');
    await expect(error).toBeVisible();
  });

  test('full signup then login flow works', async ({ page }) => {
    // Step 1: Register
    await page.goto('signup');
    await waitForPageReady(page);
    await page.getByPlaceholder('Username').fill('flowuser');
    await page.getByPlaceholder('Email Address').fill('flow@example.com');
    await page.getByPlaceholder('Password', { exact: true }).fill('flowpass123');
    await page.getByPlaceholder('Confirm Password').fill('flowpass123');
    await page.getByRole('button', { name: /sign up now/i }).click();
    await page.waitForURL('**/en', { timeout: 15000 });

    // Step 2: Logout by clearing current user (keep users list for login)
    await page.evaluate(() => {
      const stored = localStorage.getItem('mv-users');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed.state) {
          parsed.state.currentUser = null;
          localStorage.setItem('mv-users', JSON.stringify(parsed));
        }
      }
    });

    // Step 3: Navigate to login
    await page.goto('login');
    await waitForPageReady(page);
    await page.getByPlaceholder('sample@email.com').fill('flow@example.com');
    await page.getByPlaceholder('Password').fill('flowpass123');
    await page.getByRole('button', { name: /login now/i }).click();

    // Should redirect to homepage
    await page.waitForURL('**/en', { timeout: 15000 });
  });

  test('password show/hide toggle works on login', async ({ page }) => {
    await page.goto('login');
    await waitForPageReady(page);

    const passwordInput = page.getByPlaceholder('Password');
    await expect(passwordInput).toHaveAttribute('type', 'password');

    await page.getByText('SHOW').click();
    await expect(passwordInput).toHaveAttribute('type', 'text');

    await page.getByText('HIDE').click();
    await expect(passwordInput).toHaveAttribute('type', 'password');
  });

  test('login page has link to signup', async ({ page }) => {
    await page.goto('login');
    await waitForPageReady(page);

    // Desktop: check SIGN UP HERE link in left panel
    const signupLink = page.getByRole('link', { name: /sign up here/i }).first();
    await expect(signupLink).toBeVisible();
    await signupLink.click();
    await page.waitForURL('**/signup');
  });

  test('signup page has link to login', async ({ page }) => {
    await page.goto('signup');
    await waitForPageReady(page);

    // Desktop: check SIGN IN HERE link in right panel
    const loginLink = page.getByRole('link', { name: /sign in here/i }).first();
    await expect(loginLink).toBeVisible();
    await loginLink.click();
    await page.waitForURL('**/login');
  });
});
