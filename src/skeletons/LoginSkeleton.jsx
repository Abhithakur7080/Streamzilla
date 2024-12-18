import React from "react";
import { Logo } from "../components";

const LoginSkeleton = ({status = ""}) => {
  const loginSkeletonStyle =
    "animate-pulse bg-slate-400 h-10 w-full rounded mb-2 outline-none";
  return (
    <div className="flex justify-center items-center w-full h-screen bg-gray-900">
      <div className="md:border-2 border-slate-200 mt-10 h-screen md:h-[28.5rem] w-96 text-center text-neutral-700 font-bold text-xl p-5 space-y-8 md:border-purple-900 bg-gray-50 shadow-lg">
      <div className="flex flex-col gap-2 items-center mt-5">
            <Logo size={30}/>
        </div>
        <h1>{status}</h1>
        <input className={loginSkeletonStyle} readOnly />
        <input className={loginSkeletonStyle} readOnly />
        <input className={loginSkeletonStyle} readOnly />
        <input className={`${loginSkeletonStyle} w-1/2`} readOnly />
      </div>
    </div>
  );
};

export default LoginSkeleton;
