import GameTable from "@/components/gametable";
import Searchbar from "@/components/searchbar";
import { useEffect, useState } from "react";
import { Game } from "@/types/types";
import { useSession } from "next-auth/react";

const Wishlist = () => {
  const [wishlist, setWishlist] = useState<Game[]>([]);
  const { data: session, status, update } = useSession();

  const url = process.env.NEXT_PUBLIC_BACKEND_URL;

  useEffect(() => {
    const fetchWishlist = async () => {
      const data = await fetch(`${url}/getWishlist/${session?.user?.steamid}`);
      const json = await data.json();
      setWishlist(json);
    };
    if (session?.user.steamid) {
      fetchWishlist();
    }
  }, [session]);

  const onSubmit = async (value: string) => {
    const data = await fetch(`${url}/getWishlist/${value}`);
    const json = await data.json();
    setWishlist(json);
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
