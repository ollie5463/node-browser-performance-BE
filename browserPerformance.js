const puppeteer = require('puppeteer');

(async () => { // maybe do some sort of logging in thing?
  const browser = await puppeteer.launch();
    const page = await browser.newPage();
        // await page.tracing.start({ // not sure tracing is needed
    //     path: 'trace.json',
    //     categories: ['devtools.timeline']
    // })
  await page.goto('https://www.bbc.co.uk/news');
//   await page.type('#password-input', 'nodeExample1!');
//   await page.click('#submit-button');
//   await page.click('#nav-menu-item-6837')
    // await page.tracing.stop();
    
  await page.screenshot({ path: 'screenshot.png' });

  await browser.close();
})();

