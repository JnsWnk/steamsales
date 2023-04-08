// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { Game } from '../';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const url = `https://store.steampowered.com/wishlist/profiles/${req.query.id}/wishlistdata/?p=0`;

  const whishlist = await fetch(url).then((res) => res.json());
  const games: {[id: string]: {}} = {};
  for (const game in whishlist) {
    if(whishlist[game].prerelease == 1) {
      continue;
    }
    const price = whishlist[game].subs[0].price / 100;
    const discount = whishlist[game].subs[0].discount_pct;
    const gm: Game = {
      name: whishlist[game].name,
      price: price,
      discount: discount,
      discount_price: (1 - discount / 100) * price,
    }
    games[game] = gm;
  }

  res.status(200).json(games);
}
