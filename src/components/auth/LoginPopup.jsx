import React from "react";
import { Logo, Button } from "../index";
import { Link } from "react-router-dom";

const LoginPopup = () => {
  return (
    <div className="fixed inset-0 flex justify-center items-center opacity-75 z-50 bg-img">
      <div className="bg-white border border-slate-200 p-8 text-black text-center">
        <div className="flex flex-col gap-2 items-center mb-10">
            <Logo size={30}/>
        </div>
        <p className="text-xl font-medium mb-2">Login or Signup to continue</p>
        <Link to={"/login"}>
            <Button className="bg-[#ff0000] w-full py-2 px-4 font-bold text-lg rounded text-white shadow-inner">Login</Button>
        </Link>
      </div>
    </div>
  );
};

export default LoginPopup;
