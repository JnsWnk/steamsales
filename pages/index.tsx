import Head from "next/head";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import Link from "next/link";
import { useEffect, useState } from "react";

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
  const [inputValue, setInputValue] = useState("");
  const [responseData, setResponseData] = useState<{ [id: string]: Game }>({});

  useEffect(() => {
    fetch("api/proxy");
  }, []);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (e.target[0].value) {
      const response = await fetch(`/api/${e.target[0].value}`);
      const wishlist = await response.json();
      setResponseData(wishlist);

      for (const id in wishlist) {
        let game: Game = wishlist[id];
        const response = await fetch(`/api/scraper/${wishlist[id].name}`);
        if (response.ok) {
          const data = await response.json();
          if (data[0]) {
            game = {
              ...game,
              key_price: data[0].price,
              seller: data[0].name,
            };
          } else {
            game = {
              ...game,
              failed: true,
            };
          }
        } else {
          game = {
            ...game,
            failed: true,
          };
        }
        setResponseData((prevState) => ({
          ...prevState,
          [id]: game,
        }));
      }
    }
  };

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Steamsales!" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div className={styles.description}>
          <h1> Welcome to Steamsales! </h1>
        </div>

        <div>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <button type="submit">Submit</button>
          </form>

          {responseData && (
            <div>
              <h2>Response data:</h2>
              <pre>{JSON.stringify(responseData, null, 2)}</pre>
            </div>
          )}
        </div>

        <button
          onClick={(e) => {
            setInputValue("76561198087272034");
          }}
        >
          {" "}
          Get my list!{" "}
        </button>

        <div className={styles.grid}>
          <h1 className={inter.className}>
            Read <Link href="/posts/first-post">this page!</Link>
          </h1>
        </div>
      </main>
    </>
  );
}
