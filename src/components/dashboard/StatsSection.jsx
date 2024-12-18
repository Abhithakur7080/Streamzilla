import React from "react";
import { icons } from "../../assets";

const StatsSection = ({ dashboard }) => {
  return (
    <>
      <section className="grid sm:grid-cols-4 grid-cols-2 justify-evenly items-center gap-2 p-3">
        <div className="border border-slate-300 sm:p-3 p-2">
          <icons.MdOutlineSlowMotionVideo size={30} className="text-purple-900 mb-2" />
          <p className="text-white">Total Videos</p>
          <span className="font-bold text-2xl text-white">{dashboard?.totalVideos}</span>
        </div>
        <div className="border border-slate-300 sm:p-3 p-2">
          <icons.FaRegEye size={30} className="text-purple-900 mb-2" />
          <p className="text-white">Total Views</p>
          <span className="font-bold text-2xl text-white">{dashboard?.totalViews}</span>
        </div>
        <div className="border border-slate-300 sm:p-3 p-2">
          <icons.RxAvatar size={30} className="text-purple-900 mb-2" />
          <p className="text-white">Total subscribers</p>
          <span className="font-bold text-2xl text-white">
            {dashboard?.totalSubscribers}
          </span>
        </div>
        <div className="border border-slate-300 sm:p-3 p-2">
          <icons.FaRegHeart size={30} className="text-purple-900 mb-2" />
          <p className="text-white">Total likes</p>
          <span className="font-bold text-2xl text-white">{dashboard?.totalLikes}</span>
        </div>
      </section>
    </>
  );
};

export default StatsSection;
