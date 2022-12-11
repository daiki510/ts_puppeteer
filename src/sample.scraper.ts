import puppeteer from 'puppeteer-core';

(async () => {
  const browser = await puppeteer.launch({
    channel: 'chrome', //ここで指定することで既存のchromeを利用可能
    headless: true, //falseの場合はブラウザ上での動きを確認しながら実行可能
  });
  const page = await browser.newPage();
  await page.goto('https://www.google.co.jp/');
  await page.screenshot({ path: `tmp/sample.png` });
  await browser.close();
})();
