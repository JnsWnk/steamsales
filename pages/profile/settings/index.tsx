import EditProfile from "@/components/editProfile";
import ProfileSidebar from "@/components/profilesidebar";
import { getSession, useSession } from "next-auth/react";

export default function Profile() {
  return (
    <div className="flex">
      <ProfileSidebar />
      <div className="flex-1 p-10">
        <EditProfile />
      </div>
    </div>
  );
}

Profile.auth = true;
