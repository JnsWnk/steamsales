import { PropsWithChildren } from "react";
import Navbar from "./navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <div className="bg-gradient-to-b from-gray-800 to-gray-900 h-screen text-white">
        <ToastContainer />
        <Navbar />
        {children}
      </div>
    </>
  );
};
export default Layout;
