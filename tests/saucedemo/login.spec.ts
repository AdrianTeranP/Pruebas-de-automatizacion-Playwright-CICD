import { test, expect } from '@playwright/test';

test.describe('Login Sauce Demo', () => {

    test('Login exitoso con credenciales correctas', async ({ page }) => {
        // 1. Abrir la página
        await page.goto('/');

        // 2. Ingresar usuario
        await page.fill('#user-name', 'standard_user');

        // 3. Ingresar contraseña
        await page.fill('#password', 'secret_sauce');

        // 4. Hacer clic en Login
        await page.click('#login-button');

        // 5. Verificar que entramos correctamente
        await expect(page).toHaveURL(/inventory/);
        await expect(page.locator('.title')).toHaveText('Products');
    });

    test('Login fallido con credenciales incorrectas', async ({ page }) => {
        // 1. Abrir la página
        await page.goto('/');

        // 2. Ingresar credenciales incorrectas
        await page.fill('#user-name', 'usuario_malo');
        await page.fill('#password', 'clave_mala');

        // 3. Hacer clic en Login
        await page.click('#login-button');

        // 4. Verificar mensaje de error
        await expect(page.locator('[data-test="error"]'))
            .toContainText('Username and password do not match');
    });

});