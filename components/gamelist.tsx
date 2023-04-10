"use client";

import { Game } from "@/pages";
import { useEffect, useState } from "react";

export default function GameList() {
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(false);
  const [id, setId] = useState("76561198087272034");

  const url = process.env.NEXT_PUBLIC_BACKEND_URL;

  const getDeals = () => {
    const eventSource = new EventSource(`${url}/getDeals/${id}`);
    eventSource.addEventListener("gameResponse", handleGameResponse);
    eventSource.addEventListener("end", handleEnd);
    setLoading(true);

    return () => {
      eventSource.removeEventListener("gameResponse", handleGameResponse);
      eventSource.removeEventListener("end", handleEnd);
      eventSource.close();
    };
  };

  function handleGameResponse(event: { data: string }) {
    const game = JSON.parse(event.data);
    console.log(`Received response for game ${game.id}: ${game.result}`);
    // Do something with the game response
    setGames((games) => [...games, game]);
  }

  function handleEnd() {
    console.log("Finished processing game list");
    // Notify the user that the game list has finished processing
    setLoading(false);
  }

  return (
    <div>
      <button onClick={getDeals}> Start </button>
      {games && (
        <div>
          <h1> Gamelist </h1>
          <div className="overflow-x-auto">
            <table className="mx-auto w-full whitespace-no-wrap bg-white border-collapse">
              <thead>
                <tr className="text-left font-bold">
                  <th className="px-6 pt-6 pb-4">Name</th>
                  <th className="px-6 pt-6 pb-4">Price</th>
                  <th className="px-6 pt-6 pb-4">Key</th>
                  <th className="px-6 pt-6 pb-4">Seller</th>
                </tr>
              </thead>
              <tbody className="text-gray-700">
                {games.map((game) => (
                  <tr
                    key={game.name}
                    className="border-b border-gray-200 hover:bg-gray-100"
                  >
                    <td className="px-6 py-4 whitespace-no-wrap">
                      {game.name}
                    </td>
                    <td className="px-6 py-4 whitespace-no-wrap">
                      {game.price}
                    </td>
                    <td className="px-6 py-4 whitespace-no-wrap">
                      {game.key_price}
                    </td>
                    <td className="px-6 py-4 whitespace-no-wrap">
                      {game.seller}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {loading && <p>Loading...</p>}
        </div>
      )}
    </div>
  );
}
