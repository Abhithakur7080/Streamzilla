import React from "react";
import { IoLogoYoutube } from "react-icons/io";
import { Link } from "react-router-dom";

const Logo = ({ size = 30 }) => {
  return (
    <>
      <Link to={"/"} className="flex gap-2 items-center">
        <IoLogoYoutube size={size} color="#ff0000" />
        <span className="font-bold text-black font-roboto">YOUTUBE</span>
      </Link>
    </>
  );
};

export default Logo;
