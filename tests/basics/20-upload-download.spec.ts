import { test, expect } from '@playwright/test';
import fs from 'fs';

test.describe('File Upload & Download', () => {
  test.beforeEach(async({ page }) => {
    await page.goto('https://www.techglobal-training.com/frontend/file-download');
  });

  test('File Download', async ({ page }) => {

    const [download] = await Promise.all([
      page.waitForEvent('download'),
      page.locator('#file_download').click()//download file
    ]);

    const downloadPath = 'downloads/' + download.suggestedFilename();
    await download.saveAs(downloadPath);// save what ever is downloade in a controled path or file
    
    expect(fs.existsSync(downloadPath)).toBeTruthy();//check if this path is exist
  });

  test('File Upload', async ({ page }) => {
    await page.locator('#file_upload').setInputFiles('test-files/sample.txt');
    await page.locator('#file_submit').click();

    await expect(page.locator('#result')).toContainText('sample.txt');
  });
});