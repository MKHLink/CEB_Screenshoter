const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
  const browser = await puppeteer.launch({headless: false});
  const page = await browser.newPage();

  // Navigates to the page
  await page.goto('https://idp.bootcampspot.com/ui/?requestId=a754904e-4a40-415a-8f87-7d53ee21db27');

//  If required to log in, selects the fields via thei id and then input credentials next to them
  await page.type('#emailAddress', '');
  await page.type('#passwordLabel', '');

//   // Click the login button
  await page.click('#loginSubmit');

  await page.waitForNavigation();

// After logging in, if required to go to a spcific page, paste link here, otherwise remove
  await page.goto('');

  let continueLooping = true;
  let counter = 0;

  // put save location as relative pathing
  const saveLocation = '';

  while (continueLooping) {

    let fileName = 'screenshot'+counter+'.pdf';
    let filePath = `${saveLocation}/${fileName}`;

    // Take a screenshot of the page and save it at the location as a pdf
    await page.pdf({ path: filePath, format: 'A4', printBackground
  : true});

    //This logic clicks the next button on the page, selected by ID followed by the a element
    try {
      await page.click('span.module-sequence-footer-button--next a');

      await page.waitForNavigation();

      await page.waitForSelector('span.module-sequence-footer-button--next', { timeout: 5000 });

      // If the next button does not appear within 5 seconds, we have reached the end of the sequence
    } catch (error) {
      console.log('End of sequence reached.');
      continueLooping = false;
    }

    // incrementing counter so screenshots have unique names
    counter++;
  }

  await browser.close();
})();