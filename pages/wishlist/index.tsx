import GameTable from "@/components/gametable";
import Searchbar from "@/components/searchbar";
import { useEffect, useState } from "react";
import { Game } from "@/types/types";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";

const Wishlist = () => {
  const [wishlist, setWishlist] = useState<Game[]>([]);
  const { data: session, status, update } = useSession();

  const url = process.env.NEXT_PUBLIC_BACKEND_URL;

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const data = await fetch(
          `${url}/wishlist/getWishlist?id=${session?.user?.steamid}`
        );
        const json = await data.json();
        setWishlist(json);
      } catch (error) {
        toast.error("Could not get wishlist for this id.");
      }
      if (session?.user.steamid) {
        console.log(session?.user.steamid);
        fetchWishlist();
      }
    };
  }, [session]);

  const onSubmit = async (value: string) => {
    try {
      const data = await fetch(`${url}/wishlist/getWishlist?id=${value}`);
      const json = await data.json();
      setWishlist(json);
    } catch (error) {
      toast.error("Could not get wishlist for this id.");
    }
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
