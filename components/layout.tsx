import { PropsWithChildren } from "react";
import Navbar from "./navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <div className="bg-gradient-to-b from-gray-800 to-gray-900 text-white flex-grow">
          <ToastContainer />
          <Navbar />
          {children}
        </div>
      </div>
    </>
  );
};
export default Layout;
