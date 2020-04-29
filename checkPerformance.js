const puppeteer = require('puppeteer');
const minimist = require('minimist');

(async () => {
  const browser = await puppeteer.launch();
    const page = await browser.newPage();
        await page.tracing.start({ // not sure tracing is needed
        path: 'trace.json',
        categories: ['devtools.timeline']
    })
    
    const args = minimist(process.argv.splice(2));
    
    const website = args['website'];  
    await page.goto(website);
    await page.tracing.stop();
    await page.screenshot({ path: 'screenshot.png' });

  await browser.close();
})();

