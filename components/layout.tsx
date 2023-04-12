import { PropsWithChildren } from "react";
import Navbar from "./navbar";

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <div className="bg-gradient-to-b from-gray-800 to-gray-900 h-screen text-white">
        <Navbar />
        {children}
      </div>
    </>
  );
};
export default Layout;
