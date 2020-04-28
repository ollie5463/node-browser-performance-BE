const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => { // remember to check what puppeteer actually is
  const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.tracing.start({
        path: 'trace.json',
        categories: ['devtools.timeline']
    })
    await page.goto('https://www.bbc.co.uk/news'); // make this a variable passed in at run time
    
    const stories = await page.$$eval('.gs-c-promo-heading__title', arr => arr.map(item => item.outerText));
    await page.tracing.stop();
    fs.writeFile('newsStories.txt', stories, (err) => {
      if (err) return console.error(err);
    });
    console.log(stories);
    
    // await page.screenshot({ path: 'example.png', fullPage: true });

  await browser.close();
})();

