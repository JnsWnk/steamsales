import Button from "@/components/button";
import Paragraph from "@/components/paragraph";
import ProfileSidebar from "@/components/profilesidebar";
import { useSession } from "next-auth/react";

export default function Profile() {
  const { data: session, status, update } = useSession();

  function handleEmailRequest() {}

  return (
    <div className="flex">
      <ProfileSidebar />
      <div className="flex-1 p-10">
        <h1 className="font-extrabold text-5xl mb-2"> Profile </h1>
        <div className="border border-slate-500 p-4 rounded-lg w-1/2">
          <Paragraph
            text={
              "Get a list with the best keys for your Steamwishlist per Email!"
            }
          />
          <Button text={"Get Keys"} onClick={handleEmailRequest} />
        </div>
      </div>
    </div>
  );
}

Profile.auth = true;
