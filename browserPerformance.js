const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://www.bbc.co.uk/news');
//   await page.type('#password-input', 'nodeExample1!');
//   await page.click('#submit-button');
//   await page.click('#nav-menu-item-6837')
    
  await page.screenshot({ path: 'screenshot.png' });

  await browser.close();
})();

