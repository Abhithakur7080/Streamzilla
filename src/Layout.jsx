import React from "react";
import Sidebar from "./components/header/Sidebar";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <div className="sm:flex flex-none">
        <div className="bg-red-800">
          <Sidebar />
        </div>
        <div className="sm:flex-1 bg-blue-800">
            <Outlet/>
        </div>
      </div>
    </>
  );
};

export default Layout;
