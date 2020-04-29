const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => { // remember to check what puppeteer actually is
  const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto('https://www.bbc.co.uk/news');
    
    const stories = await page.$$eval('.gs-c-promo-heading__title', arr => arr.map(item => item.outerText));
    
    fs.writeFile('newsStories.txt', stories.toString(), (err) => {
      if (err) return console.error(err);
    });
  
    stories.forEach(el => {
      console.log('-------', el, '-------');
    });

  await browser.close();
})();
