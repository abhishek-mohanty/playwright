import { test, expect } from '@playwright/test';

const authFile = 'playwright/.auth/temp.json';

test('authenticate', async ({ page }) => {
    // Perform authentication steps. Replace these actions with your own.
    await page.goto('https://jarvis-master.corp.ackodev.com/');
    await page.goto('https://jarvis-master.corp.ackodev.com/#/');
    await page.goto('https://jarvis-master.corp.ackodev.com/#/claims');
    await page.goto('https://accounts.google.com/InteractiveLogin?continue=https://accounts.google.com/o/saml2/idp?from_login%3D1%26zt%3DChRkY2t2SUxNYXVBWFZBZWU4UHZTbhIfdzdlaEZzRDdzbVFaOEhuU1JuY2dubW8tVWFiRHJCZw%25E2%2588%2599AHkTZLMAAAAAZRLI5X86PrFIv9VJfSonG7zKRdrui2rl%26as%3DwEkI6lG5VURCr_h-25zggH40CD8YTmBNs-S6_bdA5EE&faa=1&followup=https://accounts.google.com/o/saml2/idp?from_login%3D1%26zt%3DChRkY2t2SUxNYXVBWFZBZWU4UHZTbhIfdzdlaEZzRDdzbVFaOEhuU1JuY2dubW8tVWFiRHJCZw%25E2%2588%2599AHkTZLMAAAAAZRLI5X86PrFIv9VJfSonG7zKRdrui2rl%26as%3DwEkI6lG5VURCr_h-25zggH40CD8YTmBNs-S6_bdA5EE&ltmpl=popup&oauth=1&passive=1209600&sarp=1&scc=1&ifkv=AYZoVhfL59CmokiQn6fxkynBlHF3YthdDS1pUUF5Y09-CldaOmSsI0GZ20_XoPtZvHhBvUnD6weF2A');
    await page.goto('https://accounts.google.com/InteractiveLogin?continue=https%3A%2F%2Faccounts.google.com%2Fo%2Fsaml2%2Fidp%3Ffrom_login%3D1%26zt%3DChRkY2t2SUxNYXVBWFZBZWU4UHZTbhIfdzdlaEZzRDdzbVFaOEhuU1JuY2dubW8tVWFiRHJCZw%25E2%2588%2599AHkTZLMAAAAAZRLI5X86PrFIv9VJfSonG7zKRdrui2rl%26as%3DwEkI6lG5VURCr_h-25zggH40CD8YTmBNs-S6_bdA5EE&faa=1&followup=https%3A%2F%2Faccounts.google.com%2Fo%2Fsaml2%2Fidp%3Ffrom_login%3D1%26zt%3DChRkY2t2SUxNYXVBWFZBZWU4UHZTbhIfdzdlaEZzRDdzbVFaOEhuU1JuY2dubW8tVWFiRHJCZw%25E2%2588%2599AHkTZLMAAAAAZRLI5X86PrFIv9VJfSonG7zKRdrui2rl%26as%3DwEkI6lG5VURCr_h-25zggH40CD8YTmBNs-S6_bdA5EE&ltmpl=popup&oauth=1&passive=1209600&sarp=1&scc=1&ifkv=AYZoVhfTgC2JoA1Lk2A2y36Z62jyJrnMLo7e_qMDlffhREwp1jFwyfzDJFLUCSo-UFkplCC-0Xs-ZQ&theme=glif');
    await page.goto('https://accounts.google.com/signin/v2/identifier?continue=https%3A%2F%2Faccounts.google.com%2Fo%2Fsaml2%2Fidp%3Ffrom_login%3D1%26zt%3DChRkY2t2SUxNYXVBWFZBZWU4UHZTbhIfdzdlaEZzRDdzbVFaOEhuU1JuY2dubW8tVWFiRHJCZw%25E2%2588%2599AHkTZLMAAAAAZRLI5X86PrFIv9VJfSonG7zKRdrui2rl%26as%3DwEkI6lG5VURCr_h-25zggH40CD8YTmBNs-S6_bdA5EE&faa=1&followup=https%3A%2F%2Faccounts.google.com%2Fo%2Fsaml2%2Fidp%3Ffrom_login%3D1%26zt%3DChRkY2t2SUxNYXVBWFZBZWU4UHZTbhIfdzdlaEZzRDdzbVFaOEhuU1JuY2dubW8tVWFiRHJCZw%25E2%2588%2599AHkTZLMAAAAAZRLI5X86PrFIv9VJfSonG7zKRdrui2rl%26as%3DwEkI6lG5VURCr_h-25zggH40CD8YTmBNs-S6_bdA5EE&ltmpl=popup&oauth=1&passive=1209600&sarp=1&scc=1&ifkv=AYZoVhfTgC2JoA1Lk2A2y36Z62jyJrnMLo7e_qMDlffhREwp1jFwyfzDJFLUCSo-UFkplCC-0Xs-ZQ&theme=glif&flowName=GlifWebSignIn&flowEntry=ServiceLogin');
    await page.getByLabel('Email or phone').click();
    await page.getByLabel('Email or phone').fill('test');
    await page.getByLabel('Email or phone').press('Shift+CapsLock');
    await page.getByLabel('Email or phone').fill('test_automation@acko.tech');
    await page.getByRole('button', { name: 'Next' }).click();
    await page.getByLabel('Enter your password').fill('Acko@123456789');
    await page.getByRole('button', { name: 'Next' }).click();
    // Wait until the page receives the cookies.
    //
    // Sometimes login flow sets cookies in the process of several redirects.
    // Wait for the final URL to ensure that the cookies are actually set.
    await page.waitForURL('https://jarvis-master.corp.ackodev.com/#/claims');
    // Alternatively, you can wait until the page reaches a state where all cookies are set.
    //await expect(page.getByRole('button', { name: 'View profile and more' })).toBeVisible();

    // End of authentication steps.

    await page.context().storageState({ path: authFile });
});