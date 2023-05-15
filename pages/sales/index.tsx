import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import GameTable from "@/components/gametable";
import { useEventSource } from "@/components/eventprovider";
import Searchbar from "@/components/searchbar";
import { Game } from "@/types/types";
import { toast } from "react-toastify";
import { useSession } from "next-auth/react";

export default function Sales() {
  const router = useRouter();
  const { id } = router.query;
  const [data, setData] = useState<Game[]>([]);
  const [loading, setLoading] = useState(false);
  const { data: session, status, update } = useSession();

  const url = process.env.NEXT_PUBLIC_BACKEND_URL;

  useEffect(() => {
    async function fetchSales() {
      setLoading(true);
      try {
        const data = await fetch(`${url}/keys/getKeysForWishlist?id=${id}`);
        const json = await data.json();
        setData(json);
      } catch (error) {
        toast.error("Could not get sales for this id.");
      } finally {
        setLoading(false);
      }
    }
    if (id) {
      fetchSales();
    } else {
      if (session?.user.steamid) {
        router.push({
          pathname: "/sales",
          query: { id: session?.user.steamid },
        });
      }
    }
  }, [id]);

  const onSubmit = (value: string) => {
    router.push({
      pathname: "/sales",
      query: { id: value },
    });
  };

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-5xl font-bold text-white">
        Check your Steam wishlist for sales!
      </h1>
      <p className="text-gray-400 text-lg mt-4">
        Find the cheapest Keys for your games!
      </p>
      <p className="text-gray-400 text-sm mt-1 w-1/4 text-center">
        Note: Because this is only a demo project and i dont have any proxies, i
        can only fetch the keys for 4 new games and it may take a few seconds.
      </p>
      <Searchbar onSubmit={onSubmit} placeholder="Steam ID..." />
      {loading ? <p>Loading ...</p> : <GameTable data={data} />}
    </div>
  );
}
