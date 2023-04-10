"use client";

import { useState } from "react";

interface wishlist {
  [key: string]: {
    name: string;
    price: number;
    discount: number;
    discount_price: number;
  };
}

const Wishlist = () => {
  const [wishlist, setWishlist] = useState<wishlist>({});
  const [id, setId] = useState<string>("76561198087272034");

  const url = process.env.NEXT_PUBLIC_BACKEND_URL;

  async function enterId(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const wishlistData = await fetch(`${url}/getWishlist/${id}`);
    const wishlistJson = await wishlistData.json();
    console.log(wishlistJson);
    setWishlist(wishlistJson);
  }

  return (
    <div>
      <h1>Wishlist</h1>
      <form onSubmit={enterId}>
        <input type="text" value={id} onChange={(e) => setId(e.target.value)} />
        <button type="submit">Submit</button>
      </form>
      <div className="overflow-x-auto">
        <table className="mx-auto w-full whitespace-no-wrap bg-white border-collapse">
          <thead>
            <tr className="text-left font-bold">
              <th className="px-6 pt-6 pb-4">Name</th>
              <th className="px-6 pt-6 pb-4">Price</th>
              <th className="px-6 pt-6 pb-4">Discount</th>
              <th className="px-6 pt-6 pb-4">DiscountPrice</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {wishlist &&
              Object.keys(wishlist).map((game: string) => (
                <tr className="border-b border-gray-200 hover:bg-gray-100">
                  <td className="px-6 py-4 whitespace-no-wrap">
                    {wishlist[game].name}
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap">
                    {wishlist[game].price}
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap">
                    {wishlist[game].discount}
                  </td>

                  <td className="px-6 py-4 whitespace-no-wrap">
                    {wishlist[game].discount_price}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Wishlist;
