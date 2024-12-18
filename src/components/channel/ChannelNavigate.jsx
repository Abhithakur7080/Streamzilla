import React from "react";
import { NavLink } from "react-router-dom";

const NavStyle = ({ isActive }) =>
  isActive ? "bg-purple-900 text-white w-1/4" : "";

const ChannelNavigate = ({ username, edit }) => {
  return edit ? (
    <>
      <section className="text-center w-full flex justify-evenly items-center border-b-2 border-slate-300 text-xs sm:text-base sm:mt-4 md:mt-0 mt-2">
        <NavLink to={`/edit/personalInfo`} className={NavStyle}>
          <p className="p-2 text-white">Personal Information</p>
        </NavLink>
        <NavLink to={`/edit/password`} className={NavStyle}>
          <p className="p-2 text-white">Change Password</p>
        </NavLink>
      </section>
    </>
  ) : (
    <>
      <section className="text-black text-center w-full flex justify-evenly items-center border-b-2 border-slate-300 text-xs sm:text-base sm:mt-4 md:mt-0 mt-2">
        <NavLink to={`/channel/${username}/videos`} className={NavStyle}>
          <p className="p-2 text-white">Videos</p>
        </NavLink>
        <NavLink to={`/channel/${username}/playlists`} className={NavStyle}>
          <p className="p-2 text-white">Playlists</p>
        </NavLink>
        <NavLink to={`/channel/${username}/tweets`} className={NavStyle}>
          <p className="p-2 text-white">Tweets</p>
        </NavLink>
        <NavLink to={`/channel/${username}/subscribers`} className={NavStyle}>
          <p className="p-2 text-white">Subscribed</p>
        </NavLink>
      </section>
    </>
  );
};

export default ChannelNavigate;
