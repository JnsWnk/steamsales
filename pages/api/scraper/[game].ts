import type { NextApiRequest, NextApiResponse } from "next";
let chrome = {};
let puppeteer: any;
if (process.env.AWS_LAMBDA_FUNCTION_VERSION) {
  chrome = require("chrome-aws-lambda");
  puppeteer = require("puppeteer-core");
} else {
  puppeteer = require("puppeteer");
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    query: { game },
  } = req;
  if (!game) {
    res.status(400).json({ error: "No game specified" });
    return;
  }
  const gameString = (game as string)
    .replace(/[^a-z0-9 ]/gi, "")
    .trim()
    .replace(/\s+/g, "-");
  const url = `https://www.allkeyshop.com/blog/buy-${gameString}-cd-key-compare-prices/`;

  try {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto(url);

    const list = await page.evaluate(() => {
      return Array.from(document.querySelectorAll("#offers_table > div")).map(
        (div) => ({
          name: div.querySelector(
            "span.x-offer-merchant-name.offers-merchant-name"
          )?.textContent,
          price: div.querySelector("span.x-offer-buy-btn-in-stock")
            ?.textContent,
        })
      );
    });
    await browser.close();
    console.log(url, list);

    res.status(200).json(list);
  } catch {
    res.status(500);
  }
}
