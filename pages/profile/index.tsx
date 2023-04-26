import EditProfile from "@/components/editProfile";
import { useSession } from "next-auth/react";

export default function Profile() {
  const { data: session, status, update } = useSession();

  return (
    <div>
      <EditProfile />
      <div className="flex justify-center">
        <div className="flex justify-center flex-col align-middle items-center">
          <p className="text-white font-extrabold text-3xl mt-4">
            Dont want to wait ? Get a list of keys per email!
          </p>
          <button className="flex border font-bold rounded p-2 text-xl items-center m-2">
            Get Keys per Email
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
                d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

Profile.auth = true;
