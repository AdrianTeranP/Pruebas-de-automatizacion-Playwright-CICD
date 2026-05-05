import { test, expect } from '@playwright/test';

test.describe('Logout - Sauce Demo', () => {

    test.beforeEach(async ({ page }) => {
        // Hacer login antes de cada test
        await page.goto('/');
        await page.fill('#user-name', 'standard_user');
        await page.fill('#password', 'secret_sauce');
        await page.click('#login-button');
        await expect(page).toHaveURL(/inventory/);
    });

    test('Logout exitoso', async ({ page }) => {
        // 1. Abrir el menú
        await page.click('#react-burger-menu-btn');

        // 2. Esperar que el menú se abra
        await page.waitForSelector('#logout_sidebar_link');

        // 3. Hacer clic en Logout
        await page.click('#logout_sidebar_link');

        // 4. Verificar que volvimos al login
        await expect(page).toHaveURL('/');
        await expect(page.locator('#login-button')).toBeVisible();
    });

});