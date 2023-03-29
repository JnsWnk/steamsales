import Head from 'next/head'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import Link from 'next/link'
import { useState } from 'react'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  const [inputValue, setInputValue] = useState("");
  const [responseData, setResponseData] = useState(null);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if(e.target[0].value) {
      const response = await fetch(`/api/${e.target[0].value}`);
      const whishlist = await response.json();
      setResponseData(whishlist);

      for (const game of whishlist) {
        const response = await fetch(`/api/scraper/${game.name}`);
        const data = await response.json();
        // get price from data and update game in responseData
        
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
          <input type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
        <button type="submit">Submit</button>
      </form>

      {responseData && (
        <div>
          <h2>Response data:</h2>
          <pre>{JSON.stringify(responseData, null, 2)}</pre>
        </div>
      )}
    </div>

        <Link href="/list">this page!</Link>

        <div className={styles.grid}>
            <h1 className={inter.className}>
              Read <Link href="/posts/first-post">this page!</Link>
            </h1>
        </div>
      </main>
    </>
  )
}
