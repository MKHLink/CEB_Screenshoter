const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Navigate to the login page
  await page.goto('https://idp.bootcampspot.com/ui/?requestId=a754904e-4a40-415a-8f87-7d53ee21db27');

  // Enter your username and password
  await page.type('#emailAddress', 'your-username');
  await page.type('#passwordLabel', 'your-password');

  // Click the login button
  await page.click('#loginSubmit');

  // Wait for the page to load after logging in
  await page.waitForNavigation();

  // Navigate to the initial page with the first button
  await page.goto('https://courses.bootcampspot.com/courses/1991/pages/1-dot-1-1-introduction?module_item_id=700942');

  let continueLooping = true;
  let counter = 0;

  const saveLocation = 'something';

  while (continueLooping) {

    let fileName = 'screenshot.png'+counter;
    let filePath = `${saveLocation}/${fileName}`;
    // Take a screenshot of the page
    await page.screenshot({ path: filePath });

    // Click the button
    try {
      await page.click('span.module-sequence-footer-button--next a');

      // Wait for the page to load after clicking the button
      await page.waitForNavigation();

      // Wait for the next button to appear, with a timeout of 5 seconds
      await page.waitForSelector('span.module-sequence-footer-button--next', { timeout: 5000 });

      // If the next button does not appear within 5 seconds, we have reached the end of the sequence
    } catch (error) {
      console.log('End of sequence reached.');
      continueLooping = false;
    }

    counter++;
  }

  // Close the browser
  await browser.close();
})();