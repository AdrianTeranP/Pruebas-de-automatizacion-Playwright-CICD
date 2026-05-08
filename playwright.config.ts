import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
    testDir: './tests',
    fullyParallel: true,
    forbidOnly: !!process.env.CI,
    retries: process.env.CI ? 2 : 0,
    workers: process.env.CI ? 1 : undefined,

    reporter: [
    ['html'],
    ['junit', { outputFile: 'test-results/junit.xml' }],
    ['line'],
],

    use: {
    trace: 'on',           // 🎬 Trace completo de cada test
    video: 'on',           // 🎥 Graba video de cada test
    screenshot: 'on',      // 📸 Captura automática en cada paso
    launchOptions: {
        slowMo: 1000,
    },
},

    projects: [

        // =============================
        // 🧪 SAUCE DEMO
        // =============================
        {
            name: 'saucedemo-chrome',
            testDir: './tests/saucedemo',
            use: {
                ...devices['Desktop Chrome'],
                baseURL: process.env.BASE_URL,
            },
        },
        {
            name: 'saucedemo-firefox',
            testDir: './tests/saucedemo',
            use: {
                ...devices['Desktop Firefox'],
                baseURL: process.env.BASE_URL,
            },
        },
        {
            name: 'saucedemo-safari',
            testDir: './tests/saucedemo',
            use: {
                ...devices['Desktop Safari'],
                baseURL: process.env.BASE_URL,
            },
        },
        {
            name: 'saucedemo-edge',
            testDir: './tests/saucedemo',
            use: {
                ...devices['Desktop Edge'],
                channel: 'msedge',
                baseURL: process.env.BASE_URL,
            },
        },

        // =============================
        // 🏢 MI EMPRESA
        // =============================
        {
            name: 'mi-empresa-chrome',
            testDir: './tests/mi-empresa',
            use: {
                ...devices['Desktop Chrome'],
                baseURL: process.env.EMPRESA_URL,
            },
        },
        {
            name: 'mi-empresa-firefox',
            testDir: './tests/mi-empresa',
            use: {
                ...devices['Desktop Firefox'],
                baseURL: process.env.EMPRESA_URL,
            },
        },
        {
            name: 'mi-empresa-safari',
            testDir: './tests/mi-empresa',
            use: {
                ...devices['Desktop Safari'],
                baseURL: process.env.EMPRESA_URL,
            },
        },
        {
            name: 'mi-empresa-edge',
            testDir: './tests/mi-empresa',
            use: {
                ...devices['Desktop Edge'],
                channel: 'msedge',
                baseURL: process.env.EMPRESA_URL,
            },
            
        },

    ],
});