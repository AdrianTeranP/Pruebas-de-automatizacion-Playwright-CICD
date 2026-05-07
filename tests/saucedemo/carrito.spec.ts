import { test, expect } from '@playwright/test';

test.describe('Carrito de compras - Sauce Demo', () => {

    test.beforeEach(async ({ page }) => {
        // Hacer login antes de cada test
        await page.goto('/');
        await page.fill('#user-name', 'standard_user');
        await page.fill('#password', 'secret_sauce');
        await page.click('#login-button');
        await expect(page).toHaveURL(/inventory/);
    });

    test('Agregar producto al carrito', async ({ page }) => {
        // 1. Agregar primer producto
        await page.click('#add-to-cart-sauce-labs-backpack');

        // 2. Verificar que el carrito tiene 1 producto
        await expect(page.locator('.shopping_cart_badge')).toHaveText('1');
    });

    test('Eliminar producto del carrito', async ({ page }) => {
        // 1. Agregar producto
        await page.click('#add-to-cart-sauce-labs-backpack');

        // 2. Eliminar producto
        await page.click('#remove-sauce-labs-backpack');

        // 3. Verificar que el carrito está vacío
        await expect(page.locator('.shopping_cart_badge')).not.toBeVisible();
    });

    test('Ir al carrito y verificar producto', async ({ page }) => {
        // 1. Agregar producto
        await page.click('#add-to-cart-sauce-labs-backpack');

        // 2. Ir al carrito
        await page.click('.shopping_cart_link');

        // 3. Verificar que estamos en el carrito
        await expect(page).toHaveURL(/cart/);

        // 4. Verificar que el producto está en el carrito
        await expect(page.locator('.inventory_item_name'))
            .toHaveText('Sauce Labs Backpack');
    });

});