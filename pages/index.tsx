import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import Searchbar from "@/components/searchbar";

export default function Home() {
  const router = useRouter();

  const getSales = (id: string) => {
    router.push({
      pathname: "/sales",
      query: { id: id },
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
            <Searchbar onSubmit={getSales} placeholder="Steam ID..." />
            <p className="text-gray-400 text-lg mt-4">
              <Link
                href="/sales?id=76561198087272034"
                className="hover:text-white"
              >
                {" "}
                Or check out my list here!
              </Link>
            </p>
            <div className="w-1/3 mt-4 text-slate-300 text-center">
              <h2 className="text-white font-bold text-2xl mb-2">
                {" "}
                This Project
              </h2>
              <p>
                This is only a demo project that i did for fun as a proof of
                concept. This project is running for free and without paid proxy
                servers, it not viable to run such a service. It's fully open
                source and funcional, but it will only fetch 4 new keys per
                request and it may take a few seconds. Check out the
                <Link
                  href="/about"
                  className="underline text-slate-500 hover:text-white"
                >
                  {" "}
                  About{" "}
                </Link>{" "}
                page for more info and the GitHub.{" "}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
