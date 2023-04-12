import Head from "next/head";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import Link from "next/link";
import { useEffect, useState } from "react";
import GameList from "@/components/gamelist";
import { useRouter } from "next/router";

const inter = Inter({ subsets: ["latin"] });

export type Game = {
  name: string;
  key_price?: number;
  price: number;
  discount: number;
  discount_price: number;
  seller?: string;
  failed?: boolean;
};

export default function Home() {
  const [steamId, setSteamId] = useState("76561198087272034");
  const router = useRouter();

  const getSales = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push({
      pathname: "/sales",
      query: { id: steamId },
    });
  };

  return (
    <>
      <Head>
        <title>Steamsales</title>
        <meta name="description" content="Steamsales!" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <div className="container mx-auto px-4 py-16">
          <div className="flex flex-col items-center gap-2">
            <h1 className="text-5xl font-bold text-white">
              Welcome to the Steam Store
            </h1>
            <p className="text-gray-400 text-lg mt-4">
              Enter your Steam ID and find the best deals for all your games on
              your wishlist!
            </p>
            <div className="w-full max-w-lg mx-auto my-2">
              <form onSubmit={getSales}>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"></div>
                  <input
                    type="search"
                    id="search"
                    className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400 dark:focus:ring-transparent focus:outline-none focus:border-white"
                    placeholder="Steam ID ..."
                    required
                    value={steamId}
                    onChange={(e) => setSteamId(e.target.value)}
                  />
                  <button
                    type="submit"
                    className="text-white absolute right-2.5 bottom-2.5 bg-slate-800 hover:bg-white hover:text-slate-800 focus:ring-4 focus:outline-none focus:ring-black font-medium rounded-lg text-sm px-4 py-2"
                  >
                    Go
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
