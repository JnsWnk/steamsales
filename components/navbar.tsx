import Link from "next/link";

const Navbar = () => {
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
        <div>
          <Link
            href="/auth/login"
            className="inline-block text-xl px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-gray-900 hover:bg-white mt-4 lg:mt-0"
          >
            Login
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
