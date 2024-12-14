import React from "react";
import { Logo, Button } from "..";
import { Link } from "react-router-dom";
import { icons } from "../../assets";

const LoginPopup = () => {
  return (
    <div className="w-full h-full min-h-[80vh] flex justify-center items-center bg-gray-500 opacity-75 z-50 m-auto">
      <div className="bg-white shadow-md border border-slate-300 p-8 text-black text-center scale-up-center">
        <div className="flex flex-col gap-2 items-center mb-10">
          <Logo size={30} />
        </div>
        <p className="flex justify-center items-center font-extrabold mb-2">
          <icons.CiLock size={50} />
        </p>
        <p className="text-lg font-medium mb-2">Login or Signup to continue</p>
        <Link to={"/login"}>
          <Button className="bg-[#ff0000] hover:bg-[#ff2000] w-full py-2 px-4 font-bold text-lg rounded text-white shadow-inner">
            Login
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default LoginPopup;
