import { test, expect } from '@playwright/test';

test.describe('Login - Mi Empresa', () => {

    test('Login exitoso, llega al Home y cierra modal', async ({ page }) => {
        test.setTimeout(120000);

        // 1. Abrir la página de login
        await page.goto('login/');
        await page.waitForLoadState('networkidle');
        await page.waitForTimeout(3000);

        await expect(page.getByText('INGRESAR A TU CUENTA')).toBeVisible({ timeout: 30000 });

        // 2. Ingresar RUT
        const rutField = page.getByRole('textbox', { name: 'RUT' });
        await rutField.click();
        await rutField.pressSequentially('4525802-25', { delay: 150 });
        await rutField.press('Tab');
        await page.waitForTimeout(1000);

        // 3. Ingresar Clave
        const claveField = page.getByRole('textbox', { name: 'CLAVE' });
        await claveField.click();
        await claveField.pressSequentially('polar123', { delay: 150 });
        await claveField.press('Tab');
        await page.waitForTimeout(1000);

        // 4. Clic en INGRESAR
        const btnIngresar = page.getByRole('button', { name: 'INGRESAR' });
        await expect(btnIngresar).toBeEnabled({ timeout: 10000 });
        await btnIngresar.click();

        // 5. Esperar que cargue el Home
        await page.waitForLoadState('networkidle');
        await page.waitForTimeout(5000);

        // 6. Verificar que llegamos al Home
        await expect(page.getByText('¡Hola ANA!')).toBeVisible({ timeout: 30000 });

        // 7. Cerrar el modal de promoción
        const btnCerrarModal = page.getByRole('button', { name: 'close Close' });
        await expect(btnCerrarModal).toBeVisible({ timeout: 15000 });
        await btnCerrarModal.click();

        // 8. Verificar que el modal se cerró
        await expect(btnCerrarModal).not.toBeVisible({ timeout: 5000 });
    });

});