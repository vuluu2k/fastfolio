import puppeteer from 'puppeteer';
import { uploadImageFromBuffer } from '@/utils/cloudinary';

export const captureWebsiteScreen = async (url: string, public_id: string = 'screenshot.png') => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  try {
    // Increase timeout and add error handling
    await page.goto(url, {
      waitUntil: 'networkidle0',
      timeout: 60000, // 60 seconds timeout
    });
    await page.setViewport({ width: 1920, height: 1080 });
    await page.waitForNetworkIdle({ timeout: 30000 });

    const res = await page.screenshot({ fullPage: true });
    const title = await page.title();

    const meta_description = await page.$('meta[name="description"]');
    const description = meta_description
      ? await page.evaluate((el) => el.content || '', meta_description)
      : '';

    const buffer = Buffer.from(res);
    const uploadRes = await uploadImageFromBuffer(buffer, {
      folder: 'screenshots',
      public_id,
      quality: 'auto',
      format: 'png',
      overwrite: true,
    });

    await browser.close();
    return { uploadRes, title, description };
  } catch (error) {
    await browser.close();
    throw error;
  }
};
