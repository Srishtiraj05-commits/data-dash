const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  let totalSum = 0;

  // This loop automatically counts from 1 to 10 for you
  for (let i = 1; i <= 10; i++) {
    const url = https://sanand0.github.io/tdsdata/js_table/?seed=${i};
    console.log(Visiting: ${url});

    try {
      // 1. Go to the page and wait for the network to be quiet
      await page.goto(url, { waitUntil: 'networkidle', timeout: 60000 });

      // 2. Wait for the table to actually show up (since it's a JS table)
      await page.waitForSelector('table', { timeout: 10000 });

      // 3. Find all numbers in the table cells
      const numbers = await page.$$eval('td', cells => 
        cells.map(c => {
          // Clean the text: remove anything that isn't a digit, dot, or minus sign
          const cleaned = c.innerText.replace(/[^\d.-]/g, '');
          return parseFloat(cleaned);
        }).filter(n => !isNaN(n))
      );

      const pageSum = numbers.reduce((a, b) => a + b, 0);
      totalSum += pageSum;
      console.log(Seed ${i} Sum: ${pageSum});

    } catch (err) {
      console.log(Could not read Seed ${i}: ${err.message});
    }
  }

  console.log('--- FINAL SUBMISSION DATA ---');
  console.log('Email: 23f2003806@ds.study.iitm.ac.in');
  console.log('TOTAL_SUM:', totalSum);

  await browser.close();
})();
