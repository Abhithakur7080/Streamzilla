import React from "react";
import { Outlet } from "react-router-dom";
import { Navbar } from "./components";
import Sidebar from "./components/header/Sidebar";

const Layout = () => {
  return (
    <>
      <Navbar />
      <div className="sm:flex flex-none">
        <div className="">
          <Sidebar />
        </div>
        <div className="sm:flex-1">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Layout;
