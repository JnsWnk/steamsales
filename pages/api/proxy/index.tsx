import { NextApiRequest, NextApiResponse } from "next";

export default async function fetchProxyList(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const url = process.env.BACKEND_URL;
  const id = req.query.id;

  const eventSource = new EventSource(`${url}/gameDealsStream`);

  eventSource.addEventListener("gameResponse", (event) => {
    const response = JSON.parse(event.data);
    console.log("Received response from server:", response);
    // Do something with the response
  });

  eventSource.addEventListener("end", (event) => {
    console.log("Received end event from server:", event);
    // Notify the frontend that the list has finished processing
  });

  eventSource.addEventListener("error", (event) => {
    console.error("Received error event from server:", event);
    // Handle any errors that occur
  });

  eventSource.addEventListener("open", (event) => {
    console.log("SSE stream opened:", event);
    // Send the list of games to the server to start processing
    fetch(`${url}/getDeals${id}`).catch((error) => console.error(error));
  });
}
