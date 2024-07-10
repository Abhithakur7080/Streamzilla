import React from "react";
import { icons } from "../../assets";

const StatsSection = ({ dashboard }) => {
  return (
    <>
      <section className="grid sm:grid-cols-4 grid-cols-2 justify-evenly items-center gap-2">
        <div className="border border-slate-800 sm:p-3 p-2">
          <icons.MdOutlineSlowMotionVideo size={30} className="text-[#ff0000] mb-2" />
          <p>Total Videos</p>
          <span className="font-bold text-2xl">{dashboard?.totalVideos}</span>
        </div>
        <div className="border border-slate-800 sm:p-3 p-2">
          <icons.FaRegEye size={30} className="text-[#ff0000] mb-2" />
          <p>Total Views</p>
          <span className="font-bold text-2xl">{dashboard?.totalViews}</span>
        </div>
        <div className="border border-slate-800 sm:p-3 p-2">
          <icons.RxAvatar size={30} className="text-[#ff0000] mb-2" />
          <p>Total subscribers</p>
          <span className="font-bold text-2xl">
            {dashboard?.totalSubscribers}
          </span>
        </div>
        <div className="border border-slate-800 sm:p-3 p-2">
          <icons.FaRegHeart size={30} className="text-[#ff0000] mb-2" />
          <p>Total likes</p>
          <span className="font-bold text-2xl">{dashboard?.totalLikes}</span>
        </div>
      </section>
    </>
  );
};

export default StatsSection;
