import React from "react";
import { NavLink } from "react-router-dom";

const NavStyle = ({ isActive }) =>
  isActive ? "bg-white text-[#ff0000] border-[#ff0000]" : "";

const ChannelNavigate = ({ username, edit }) => {
  return edit ? (
    <>
      <section className="text-black text-center w-full flex justify-evenly items-center border-b-2 border-slate-300 text-xs sm:text-base sm:mt-4 md:mt-0 mt-2">
        <NavLink to={`/edit/personalInfo`} className={NavStyle}>
          <p className="p-2">Personal Information</p>
        </NavLink>
        <NavLink to={`/edit/password`} className={NavStyle}>
          <p className="p-2">Change Password</p>
        </NavLink>
      </section>
    </>
  ) : (
    <>
      <section className="text-black text-center w-full flex justify-evenly items-center border-b-2 border-slate-300 text-xs sm:text-base sm:mt-4 md:mt-0 mt-2">
        <NavLink to={`/channel/${username}/videos`} className={NavStyle}>
          <p className="p-2">Videos</p>
        </NavLink>
        <NavLink to={`/channel/${username}/playlists`} className={NavStyle}>
          <p className="p-2">Playlists</p>
        </NavLink>
        <NavLink to={`/channel/${username}/tweets`} className={NavStyle}>
          <p className="p-2">Tweets</p>
        </NavLink>
        <NavLink to={`/channel/${username}/subscribers`} className={NavStyle}>
          <p className="p-2">Subscribed</p>
        </NavLink>
      </section>
    </>
  );
};

export default ChannelNavigate;
