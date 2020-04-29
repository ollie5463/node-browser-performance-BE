const puppeteer = require('puppeteer');
const minimist = require('minimist');
const express = require('express');

const app = express();

const runTraceAgainstWebsite = (async(website) => {
  const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.tracing.start({
        path: 'trace.json',
        categories: ['devtools.timeline']
    })
    await page.goto(website);
    await page.tracing.stop();

  await browser.close();
});

const runMetricAnalysisAgainstWebsite = (async (website) => {
    const browser = await puppeteer.launch(); 
    const page = await browser.newPage();
    await page.goto(website);
    const metrics = await page.metrics();

  await browser.close();
  return metrics;
});

(async () => {
  const args = minimist(process.argv.splice(2));
  const website = args['website'];
  runTraceAgainstWebsite(website);
  const metrics = await runMetricAnalysisAgainstWebsite(website);
  // Run node server
  app.listen(4000, () => {
    console.log('App listening on port 4000')
  });

  app.get('/getMetrics', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(200).send(metrics);
  });
  
})()