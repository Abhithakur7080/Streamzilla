import React from "react";
import { icons } from "../../assets";

const NoVideoFound = ({ text }) => {
  return (
    <div className="flex flex-col pb-20 items-center justify-center text-black h-screen">
      <icons.FaPlayCircle size={50} className="text-[#ff0000]" />
      <p className="mt-4 text-lg">There are no videos available here.</p>
      <p>{text && text}</p>
    </div>
  );
};

export default NoVideoFound;
