import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import GameTable from "@/components/gametable";
import { useEventSource } from "@/components/eventprovider";
import Searchbar from "@/components/searchbar";
import { Game } from "@/types/types";

export default function Sales() {
  const router = useRouter();
  const { id } = router.query;
  const [data, setData] = useState<Game[]>([]);
  const eventSourceData = useEventSource();

  const url = process.env.NEXT_PUBLIC_BACKEND_URL;

  useEffect(() => {
    console.log("useEffect" + id);
    if (id) {
      fetch(`${url}/getDeals/${id}`);
    }
  }, [id]);

  useEffect(() => {
    if (eventSourceData) {
      setData(eventSourceData);
    }
  }, [eventSourceData]);

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
      <Searchbar onSubmit={onSubmit} placeholder="Steam ID..." />
      <GameTable data={data} />
    </div>
  );
}