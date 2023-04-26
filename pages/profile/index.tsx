import ProfileData from "@/components/profiledata";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function Profile() {
  const { data: session, status, update } = useSession();
  const [name, setName] = useState(session?.user.name ?? "");
  const [email, setEmail] = useState(session?.user.name ?? "");
  const [steamid, setSteamid] = useState(session?.user.name ?? "");
  const [changePassword, setChangePassword] = useState(false);
  const [showEditProfile, setShowEditProfile] = useState(false);
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

  function handleSavePassword() {
    // TODO: Update user Steam ID in the backend
  }

  return (
    <div>
      <div className=" text-white flex flex-col items-center justify-center align-middle">
        <div className="flex items-baseline">
          <h1 className="text-4xl font-bold mb-8 mt-2">Your Profile</h1>
          <button
            className="m-2"
            onClick={() => {
              setShowEditProfile(!showEditProfile);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z"
              />
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          </button>
        </div>
        {showEditProfile && (
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
        )}
      </div>
      {showEditProfile && (
        <div className="left-1/4 fixed">
          <button
            className=" text-white p-1 rounded underline"
            onClick={() => {
              setChangePassword(!changePassword);
            }}
          >
            Change password
          </button>
          {changePassword && (
            <div className="flex">
              <form onSubmit={handleSavePassword}>
                <input
                  type="password"
                  placeholder="Old password"
                  className="shadow appearance-none border rounded-l py-2 px-3 mx-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
                <input
                  type="password"
                  placeholder="New password"
                  className="shadow appearance-none border py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
                <button
                  className="hover:bg-white hover:text-slate-900 border text-white rounded-r py-2 px-4 ml-1 focus:outline-none focus:shadow-outline"
                  type="submit"
                >
                  Update
                </button>
              </form>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

Profile.auth = true;
