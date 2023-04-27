import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import Button from "./button";
import LinkButton from "./linkButton";

const Navbar = () => {
  const { data: session } = useSession();
  return (
    <nav className="flex items-center justify-between flex-wrap bg-gray-900 px-20 py-5">
      <div className="flex items-center flex-shrink-0 text-white mr-6">
        <Link href="/" className="font-bold text-3xl tracking-tight">
          Steamsales
        </Link>
      </div>
      <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
        <div className="text-xl lg:flex-grow">
          <Link
            href="/sales"
            className="block mt-4 lg:inline-block lg:mt-0 text-gray-500 hover:text-white mr-4"
          >
            Sales
          </Link>
          <Link
            href="/wishlist"
            className="block mt-4 lg:inline-block lg:mt-0 text-gray-500 hover:text-white mr-4"
          >
            Wishlist
          </Link>
        </div>
        {session ? (
          <div className="flex items-center mx-3 space-x-3">
            <LinkButton href="/profile" text="Profile" />
            <Button text="Sign Out" onClick={() => signOut()} />
          </div>
        ) : (
          <div>
            <LinkButton href="/auth/register" text="Login" />
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
