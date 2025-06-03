import { chromium, test } from "@playwright/test";

test('Setting a page', async() => {
  const browser =  await chromium.launch();
  const contex = await browser.newContext();
  const page =  await contex.newPage();

  await page.goto('https://www.techglobal-training.com/');

  const newPage =  await contex.newPage();
 await newPage.goto('https://playwright.dev/docs/intro')

 await newPage.waitForTimeout(2000)
})


test('Visisting a page', async({ page }) => {
    await  page.goto('https://www.techglobal-training.com/');

})

/*
Go to https://www.wikipedia.org/
Search for "Playwright"
Validate the url contains "Playwright"
Validate the title contains "Playwright"
Validate the main heading is "Playwright"
*/