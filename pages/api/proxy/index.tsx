// @ts-ignore
import chrome from "chrome-aws-lambda";
import { NextApiRequest, NextApiResponse } from "next";
// @ts-ignore
import puppeteer from "puppeteer-core";

let proxyList: { ip: string; port: string }[] = [];

async function getBrowserInstance() {
  const options = process.env.AWS_REGION
    ? {
        args: chrome.args,
        executablePath: await chrome.executablePath,
        headless: chrome.headless,
      }
    : {
        args: [],
        executablePath:
          "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
      };
  const browser = await puppeteer.launch(options);
  return browser;
}

export default async function fetchProxyList(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const browser = await getBrowserInstance();
    const page = await browser.newPage();
    await page.goto("https://www.sslproxies.org/");

    proxyList = await page.evaluate(() => {
      const proxies: { ip: string; port: string }[] = [];
      let count = 0;
      document.querySelectorAll("tbody tr").forEach((row) => {
        console.log(row);
        if (count >= 10) {
          return;
        }
        const ipElement = row.querySelector("td:nth-child(1)");
        const portElement = row.querySelector("td:nth-child(2)");
        if (ipElement?.textContent && portElement?.textContent) {
          const ip = ipElement.textContent.trim();
          const port = portElement.textContent.trim();
          const proxy = { ip, port };
          proxies.push(proxy);
          count++;
        }
      });
      return proxies;
    });

    await browser.close();
    console.log(proxyList);
    res.status(200).json(proxyList);
  } catch {
    res.status(500);
  }
}

/*
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


async function fetchWithProxy(url: string) {
  let proxyIndex = 0;
  let response;

  while (!response && proxyIndex < proxies.length) {
    const proxy = proxies[proxyIndex];
    const config = {
      proxy: {
        host: proxy.host,
        port: proxy.port,
        httpsAgent: new HttpsProxyAgent(`http://${proxy.host}:${proxy.port}`),
      },
    };
    try {
      response = await axios.get(url, config);
      console.log(`Request successful using proxy ${proxy.host}:${proxy.port}`);
      return response.data;
    } catch (error: any) {
      console.log(
        `Request failed using proxy ${proxy.host}:${proxy.port}: ${error.message}`
      );
      proxyIndex++;
    }
  }

  throw new Error("All proxies failed");
}

module.exports = {
  fetchWithProxy,
};
*/
