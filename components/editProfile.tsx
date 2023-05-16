import ProfileData from "@/components/profiledata";
import { getSession, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

type Props = {
  user: any;
};

export default function EditProfile() {
  const { data: session, status, update } = useSession();
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [steamid, setSteamid] = useState<string>("");

  const backend = process.env.NEXT_PUBLIC_BACKEND_URL;

  useEffect(() => {
    if (!session) return;
    setName(session.user.name);
    setEmail(session.user.email);
    setSteamid(session.user.steamid || "");
  }, [session]);

  function handleEditProfile() {
    update({
      name: name,
      email: email,
      steamid: steamid,
    });
  }

  async function handleSavePassword(event: any) {
    event.preventDefault();
    await getSession();
    console.log("Session ID: ", session);
    const oldPass = event.target[0].value;
    const newPass = event.target[1].value;
    if (oldPass === newPass) {
      toast("New password cannot be the same as the old password.", {
        type: "error",
      });
      return;
    }
    if (newPass.length < 8) {
      toast("New password must be at least 8 characters long.", {
        type: "error",
      });
      return;
    }
    try {
      const res = await fetch(`${backend}/user/updatePassword`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: session?.user.id,
          oldPassword: oldPass,
          newPassword: newPass,
        }),
      });
      if (res.ok) {
        toast("Password updated successfully!", {
          type: "success",
        });
      } else {
        throw new Error(`Failed to update profile: ${res.statusText}`);
      }
    } catch (error) {
      console.error(error);
      toast("An error occurred while updating your password.", {
        type: "error",
      });
    }
  }

  return (
    <div className="flex flex-col">
      <div className=" text-white flex flex-col ">
        <h1 className="text-5xl font-extrabold mb-4 ">Settings</h1>
        <div className="border p-2 rounded-md border-gray-500 w-1/2">
          <ProfileData
            onSubmit={handleEditProfile}
            input={name}
            setInput={setName}
            placeholder="Name"
            text="Change your display name"
          ></ProfileData>
          <ProfileData
            onSubmit={handleEditProfile}
            input={email}
            setInput={setEmail}
            placeholder="Email"
            type="email"
            text="Change your email address"
          ></ProfileData>
          <ProfileData
            onSubmit={handleEditProfile}
            input={steamid}
            setInput={setSteamid}
            placeholder="SteamId"
            type="number"
            text="Set your SteamID for this profile"
          ></ProfileData>

          <div className="flex">
            <form onSubmit={handleSavePassword}>
              <h2 className="font-bold text-2xl mb-1">Change Password</h2>
              <input
                type="password"
                placeholder="Old password"
                className="shadow appearance-none border rounded-l py-2 px-3 mr-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
        </div>
      </div>
    </div>
  );
}
