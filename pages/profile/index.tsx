import ProfileData from "@/components/profiledata";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function Profile() {
  const { data: session, status, update } = useSession();
  const [name, setName] = useState(session?.user.name ?? "");
  const [email, setEmail] = useState(session?.user.name ?? "");
  const [steamid, setSteamid] = useState(session?.user.name ?? "");
  const backend = process.env.NEXT_PUBLIC_BACKEND_URL;

  function handleSaveName() {
    // TODO: Update user name in the backend
    fetch(`${backend}/updateUser`, {
      method: "POST",
      body: JSON.stringify({
        id: session?.user.id,
        name: name,
        email: email,
        steamid: steamid,
      }),
    });
  }

  function handleSaveEmail() {
    // TODO: Update user email in the backend
  }

  function handleSaveSteamId() {
    // TODO: Update user Steam ID in the backend
  }

  return (
    <div className=" text-white flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-8">Your Profile</h1>
      <div className="w-1/2 flex justify-between">
        <ProfileData
          onSubmit={handleSaveName}
          input={name}
          setInput={setName}
          placeholder="Name"
        ></ProfileData>
        <ProfileData
          onSubmit={handleSaveEmail}
          input={email}
          setInput={setEmail}
          placeholder="Email"
          type="email"
        ></ProfileData>
        <ProfileData
          onSubmit={handleSaveSteamId}
          input={steamid}
          setInput={setSteamid}
          placeholder="SteamId"
          type="number"
        ></ProfileData>
      </div>
    </div>
  );
}

Profile.auth = true;
