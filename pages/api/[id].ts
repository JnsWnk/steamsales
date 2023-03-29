// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import puppeteer from 'puppeteer'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const url = `https://store.steampowered.com/wishlist/profiles/${req.query.id}/wishlistdata/?p=0`;

  const whishlist = await fetch(url).then((res) => res.json());
  const games = [];
  for (const game in whishlist) {
    if(whishlist[game].prerelease == 1) {
      continue;
    }
    const price = whishlist[game].subs[0].price / 100;
    const discount = whishlist[game].subs[0].discount_pct;
    const gm = {
      name: whishlist[game].name,
      price: price,
      discount: discount,
      discount_price: (1 - discount / 100) * price,
    }
    games.push(gm);
  }

  res.status(200).json(games);

/*
  for key, value in wishlistJson.items():
  name = value['name']
  if value['subs']:
      price = value['subs'][0]['price']/100
      discount_price = (1 - value['subs'][0]['discount_pct']/100) * price
      #games[name] = {}
      #games[name]['price'] = price
      #games[name]['discount_price'] = discount_price
      #if discount_price / price < 0.65:
      #    bigDiscountGames[name] = games[name]

      name  = ''.join(e for e in name if e.isalnum() or e.isspace()).strip().replace(' ', '-')

      driver.get(keyAddress.replace('<game>', name))
      
      prices = driver.find_elements(By.CLASS_NAME, 'x-offer-buy-btn-in-stock')
      
      try:
          element = prices[1].get_attribute("textContent")
          print("Got: ", name, ", Price: ", price, "key: ", element)  
          key_price = Decimal(element.strip(euro).replace(',','.'))
          #games[name]['keyPrice'] = key_price
          #games[name]['keyDiscount'] = 1 - key_price / price
          #if key_price / games[name]['price'] < 0.65:
          #    bigDiscountGames[name] = games[name]

  
      except:
          NOP
  */
}
