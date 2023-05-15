import GameTable from "@/components/gametable";
import Searchbar from "@/components/searchbar";
import { useEffect, useState } from "react";
import { Game } from "@/types/types";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

const Wishlist = () => {
  const [wishlist, setWishlist] = useState<Game[]>([]);
  const router = useRouter();
  const { id } = router.query;
  const { data: session, status, update } = useSession();

  const url = process.env.NEXT_PUBLIC_BACKEND_URL;

  useEffect(() => {
    async function fetchSales() {
      try {
        const data = await fetch(`${url}/wishlist/getWishlist?id=${id}`);
        const json = await data.json();
        setWishlist(json);
      } catch (error) {
        toast.error("Could not get wishlist for this id.");
      }
    }
    if (id) {
      fetchSales();
    } else {
      if (session?.user.steamid) {
        router.push({
          pathname: "/wishlist",
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
      <h1 className="text-5xl mb-2 font-bold text-white">
        Check out your Steam wishlist!
      </h1>
      <Searchbar onSubmit={onSubmit} placeholder="Steam ID..." />
      <GameTable data={wishlist} />
    </div>
  );
};

export default Wishlist;
