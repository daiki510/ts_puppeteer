import puppeteer from 'puppeteer-core';

type News = {
  title: string;
  url: string;
};

const topUrl = 'https://news.yahoo.co.jp/';
const selectors = {
  newsList: '#uamods-topics .sc-gykZtl li',
};

(async () => {
  const browser = await puppeteer.launch({
    channel: 'chrome', //ここで指定することで既存のchromeを利用可能
    headless: true, //falseの場合はブラウザ上での動きを確認しながら実行可能
  });
  const page = await browser.newPage();
  await page.goto(topUrl);
  page.waitForSelector(selectors.newsList, { visible: true });
  const targetList = await page.$$(selectors.newsList);
  const newsList: News[] = [];
  for (const news of targetList) {
    const title = (await news.$eval('a', (elm) => elm.textContent)) || '';
    const url = await news.$eval('a', (elm) => elm.href);
    newsList.push({ title, url });
  }
  console.log(newsList);
  // await page.screenshot({ path: `tmp/sample.png` });
  await browser.close();
})();
