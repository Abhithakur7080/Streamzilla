import React from "react";
import { Logo, Button } from "..";
import { Link } from "react-router-dom";
import { icons } from "../../assets";

const LoginPopup = () => {
  return (
    <div className="w-full h-full min-h-[80vh] flex justify-center items-center bg-gray-900 opacity-90 z-50 m-auto">
      <div className="bg-gray-50 border border-slate-300 p-8 text-black text-center scale-up-center shadow-md">
        <div className="flex flex-col gap-2 items-center mb-10">
          <Logo size={30} />
        </div>
        <p className="flex justify-center items-center font-extrabold mb-2">
          <icons.CiLock size={50} />
        </p>
        <p className="text-lg font-medium mb-2">Login or Signup to continue</p>
        <Link to={"/login"}>
          <Button className="bg-purple-900 border-2 hover:bg-purple-700 w-full py-2 px-4 font-bold text-lg text-white shadow-inner">
            Login
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default LoginPopup;
