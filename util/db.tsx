const url = process.env.NEXT_PUBLIC_BACKEND_URL;

export async function getUserById(id: string) {
  try {
    const res = await fetch(`${url}/getUserById`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: id,
      }),
    });
    const user = await res.json();
    return user;
  } catch (error) {
    console.error(error);
    return null;
  }
}
