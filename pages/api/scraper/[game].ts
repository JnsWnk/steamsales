// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import puppeteer from 'puppeteer'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const url = "https://www.allkeyshop.com/blog/buy-hogwarts-legacy-cd-key-compare-prices/";

  try {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto(url);

    const list = await page.evaluate(() => {
      return Array.from(document.querySelectorAll('#offers_table > div')).map((div) => ({
        name: div.querySelector('span.x-offer-merchant-name.offers-merchant-name')?.textContent,
        price: div.querySelector('span.x-offer-buy-btn-in-stock')?.textContent,
      }))
    });
    await browser.close();

    res.status(200).json(list);

  } catch {
    res.status(500);
  }

}
