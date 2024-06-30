import React from "react";
import { IoLogoYoutube } from "react-icons/io";
import { Link } from "react-router-dom";

const Logo = ({
  size = 30,
  iconColor = "#ff0000",
  textColor = "black",
}) => {
  return (
    <>
      <Link to={"/"} className="flex gap-2 items-center">
        <IoLogoYoutube size={size} color={iconColor} />
        <span
          className={`font-extrabold text-${textColor} font-roboto tracking-widest`}
        >
          Youtube
        </span>
      </Link>
    </>
  );
};

export default Logo;
