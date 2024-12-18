import React from "react";
import { icons } from "../../assets";
import { Link } from "react-router-dom";

const Logo = ({
  size = 30,
  iconColor = "#581c87",
  textColor = "purple-900",
}) => {
  return (
    <>
      <Link to={"/"} className="flex gap-2 items-center select-none">
        <icons.IoLogoPlaystation size={size} color={iconColor} />
        <span
          className={`font-extrabold text-${textColor} font-roboto tracking-widest`}
        >
          Streamzilla
        </span>
      </Link>
    </>
  );
};

export default Logo;
