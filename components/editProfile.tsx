import ProfileData from "@/components/profiledata";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { toast } from "react-toastify";

export default function EditProfile() {
  const { data: session, status, update } = useSession();
  const [name, setName] = useState(session?.user.name ?? "");
  const [email, setEmail] = useState(session?.user.name ?? "");
  const [steamid, setSteamid] = useState(session?.user.name ?? "");
  const [changePassword, setChangePassword] = useState(false);
  const backend = process.env.NEXT_PUBLIC_BACKEND_URL;

  async function handleEditProfile() {
    try {
      const res = await fetch(`${backend}/updateUser`, {
        method: "POST",
        body: JSON.stringify({
          id: session?.user.id,
          name: name,
          email: email,
          steamid: steamid,
        }),
      });

      if (res.ok) {
        toast("Profile updated successfully!", {
          type: "success",
        });
        update();
      } else {
        throw new Error(`Failed to update profile: ${res.statusText}`);
      }
    } catch (error) {
      console.error(error);
      toast("An error occurred while updating your profile.", {
        type: "error",
      });
    }
  }

  async function handleSavePassword(event: any) {
    event.preventDefault();
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
      const res = await fetch(`${backend}/updatePassword`, {
        method: "POST",
        body: JSON.stringify({
          id: session?.user.id,
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
  );
}
