import { Game } from "@/pages";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

const EventSourceContext = createContext<Game[]>([]);

export function useEventSource() {
  return useContext(EventSourceContext);
}

type Props = {
  children: ReactNode;
};

export function EventSourceProvider({ children }: Props) {
  const [eventSourceData, setEventSourceData] = useState<Game[]>([]);

  useEffect(() => {
    const eventSource = new EventSource(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/eventStream`
    );

    eventSource.addEventListener("gameResponse", handleGameResponse);
    eventSource.addEventListener("end", handleEnd);

    return () => {
      eventSource.close();
    };
  }, []);

  function handleGameResponse(event: { data: string }) {
    const game = JSON.parse(event.data);
    console.log(`Received response for game ${game.id}: ${game.result}`);
    // Do something with the game response
    setEventSourceData((games) => [...games, game]);
  }

  function handleEnd() {
    console.log("Finished processing game list");
    // Notify the user that the game list has finished processing
  }

  return (
    <EventSourceContext.Provider value={eventSourceData}>
      {children}
    </EventSourceContext.Provider>
  );
}
