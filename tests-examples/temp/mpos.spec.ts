import { test, expect } from '@playwright/test'
import clipboard from 'clipboardy';

function generateRandomNumberString(length) {
    const characters = '0123456789';
    return Array.from({ length }, () => characters.charAt(Math.floor(Math.random() * characters.length))).join('');
}

test.use({ storageState: 'playwright/.auth/mpos.json' })

test.describe("Policy Issuance", () => {

    test('issuance', async ({ page, browser }) => {
        let personName = "John Doe"
        await page.goto('https://pos.ackodev.com/');
        await page.getByText('Create new plan').click();
        await page.locator('#dropdown').click();
        await page.getByText('Oppo Reno10 Pro+ 5G (12GB RAM+256GB Storage)').click();
        await page.getByRole('button', { name: 'Select' }).click();
        await page.getByRole('textbox').first().click();
        await page.getByRole('textbox').first().fill(generateRandomNumberString(15));
        await page.getByRole('textbox').nth(1).click();
        await page.getByRole('textbox').nth(1).fill('6386125120');
        await page.locator('.sc-fnwBNb').click();
        await page.getByRole('button', { name: 'Continue' }).click();

        const fileChooserPromise = page.waitForEvent('filechooser');
        await page.getByText('Upload file').first().click();
        const fileChooser = await fileChooserPromise;
        await fileChooser.setFiles('resources/uploadsample.txt');

        const fileChooserPromise2 = page.waitForEvent('filechooser');
        await page.getByText('Upload file').nth(1).click();
        const fileChooser2 = await fileChooserPromise2;
        await fileChooser2.setFiles('resources/uploadsample2.txt');

        await page.getByRole('button', { name: 'Continue' }).click();
        await page.locator('.sc-bOCYYb > span > img').click();
        //await page.waitForTimeout(30000)
        let url = await clipboard.read();
        page.context().storageState()
        const userContext = await browser.newContext({ storageState: 'playwright/.auth/auth.json' });
        const userPage = await userContext.newPage();
        await userPage.goto(url)
        await userPage.getByRole('textbox').first().click();
        await userPage.getByRole('textbox').first().fill(personName);
        await userPage.getByRole('button', { name: 'Pay online' }).click();
        await userPage.frameLocator('iframe[name="HyperServices"]').getByText('Netbanking').click();
        await userPage.frameLocator('iframe[name="HyperServices"]').getByText('HDFC', { exact: true }).click();
        await userPage.getByRole('button', { name: 'Success' }).click();
        await userPage.waitForURL('https://www.ackodev.com/mpos/partner/thankyou')
        //await userPage.waitForLoadState('networkidle')
        await userPage.goto('https://www.ackodev.com/myaccount')
        //await userPage.getByText('Oppo Reno10 Pro+ 5G/Applications/Visual Studio Code.app/Contents/Resources/app/out/vs/code/electron-sandbox/workbench/workbench.html (12GB RAM+256GB Storage)').first().click();
        await userPage.getByText('Oppo Reno10 Pro+ 5G (12GB RAM+256GB Storage)').first().click();
    });
})