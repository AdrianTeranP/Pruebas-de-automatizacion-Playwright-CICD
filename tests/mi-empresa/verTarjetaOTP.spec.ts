import { test, expect } from '@playwright/test';

test.describe('Ver Tarjeta - Flujo OTP', () => {

    test('Ver detalle de tarjeta con validación OTP', async ({ page }) => {
        test.setTimeout(300000);

        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        const screenshotsDir = `screenshots/verTarjetaOTP/${timestamp}`;
        console.log(`📸 Capturas en: ${screenshotsDir}`);

        // ===== 1. LOGIN =====
        await page.goto('login/');
        await page.waitForLoadState('networkidle');
        await page.waitForTimeout(1500);

        await expect(page.getByText('INGRESAR A TU CUENTA')).toBeVisible({ timeout: 20000 });

        await page.screenshot({ path: `${screenshotsDir}/01-login.png`, fullPage: true });
        console.log('📸 Captura: Login');

        const rutField = page.getByRole('textbox', { name: 'RUT' });
        await rutField.click();
        await rutField.pressSequentially('363449859', { delay: 80 });
        await rutField.press('Tab');
        await page.waitForTimeout(500);

        const claveField = page.getByRole('textbox', { name: 'CLAVE' });
        await claveField.click();
        await claveField.pressSequentially('Polar123', { delay: 80 });
        await claveField.press('Tab');
        await page.waitForTimeout(500);

        const btnIngresar = page.getByRole('button', { name: 'INGRESAR' });
        await expect(btnIngresar).toBeEnabled({ timeout: 10000 });
        await btnIngresar.click();

        // ===== 2. HOME =====
        await page.waitForLoadState('networkidle');
        await page.waitForTimeout(3000);

        await page.screenshot({ path: `${screenshotsDir}/02-home.png`, fullPage: true });
        console.log('📸 Captura: Home');

        // ===== 3. CERRAR MODAL =====
        const btnCerrarModal = page.getByRole('button', { name: 'close Close' });
        try {
            await btnCerrarModal.waitFor({ state: 'visible', timeout: 10000 });
            await btnCerrarModal.click();
            console.log('✅ Modal cerrado');
            await page.waitForTimeout(1000);
        } catch (e) {
            console.log('ℹ️ No apareció modal');
        }

        // ===== 4. NAVEGAR A TARJETA DIGITAL =====
        await page.getByRole('button', { name: 'Mis Productos' }).click();
        await page.waitForTimeout(1000);

        await page.screenshot({ path: `${screenshotsDir}/03-menu-lateral.png`, fullPage: true });
        console.log('📸 Captura: Menú lateral');

        await page.getByRole('link', { name: 'Tarjeta Digital' }).click();
        await page.waitForLoadState('networkidle');
        await page.waitForTimeout(2000);

        await page.screenshot({ path: `${screenshotsDir}/04-tarjeta-antes-otp.png`, fullPage: true });
        console.log('📸 Captura: Tarjeta antes del OTP');

        // ===== 5. CLIC EN MOSTRAR DATOS =====
        const btnMostrarDatos = page.getByRole('button', { name: 'MOSTRAR DATOS' });
        await expect(btnMostrarDatos).toBeVisible({ timeout: 10000 });
        await btnMostrarDatos.click();

        // ===== 6. POPUP OTP =====
        await expect(page.getByText('VALIDACIÓN', { exact: true })).toBeVisible({ timeout: 20000 });

        await page.screenshot({ path: `${screenshotsDir}/05-popup-otp.png`, fullPage: true });
        console.log('📸 Captura: Popup OTP');

        // ===== 7. ESPERAR VALIDACIÓN MANUAL =====
        console.log('📨 Popup OTP detectado');
        console.log('⏰ Tienes 90 segundos para ingresar el OTP y hacer clic en VALIDAR...');

        await page.getByText('VALIDACIÓN', { exact: true })
            .waitFor({ state: 'hidden', timeout: 90000 });

        console.log('✅ OTP validado correctamente');
        await page.waitForTimeout(3000);

        // ===== 8. CAPTURA TARJETA CON DATOS =====
        await page.screenshot({ path: `${screenshotsDir}/06-tarjeta-con-datos.png`, fullPage: true });
        console.log('📸 Captura: Tarjeta con datos');

        // ===== 9. MANTENER VISIBLE 2 MINUTOS =====
        console.log('⏱️ Mostrando tarjeta por 2 minutos...');
        await page.waitForTimeout(5000);

        console.log(`✅ Test finalizado. Capturas en: ${screenshotsDir}`);
    });

});