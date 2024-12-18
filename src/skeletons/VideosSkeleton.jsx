import React from "react";

const VideoCard = () => {
  return (
    <div className={"bg-white-500 w-11/12 m-5 h-60 relative"}>
      <div className="animate-pulse w-11/12 h-44 bg-gray-500 absolute left-1 top-1"></div>
      <div className="absolute bottom-1 h-12 w-full">
        <div className="absolute bottom-1 w-8 h-8 animate-pulse bg-gray-500 rounded-full space-y-2"></div>
        <div className="mt-3">
          <div className="animate-pulse w-3/4 h-3 ml-10 bg-gray-500 rounded-sm mt-1"></div>
          <div className="animate-pulse w-3/4 h-3 ml-10 bg-gray-500 rounded-sm mt-1"></div>
        </div>
      </div>
    </div>
  );
};

const VideosSkeleton = () => {
  return (
    <div className="w-full grid xl:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-5 align-middle min-h-[calc(100vh-100px)] bg-gray-900">
      <VideoCard />
      <VideoCard />
      <VideoCard />
      <VideoCard />
      <VideoCard />
      <VideoCard />
    </div>
  );
};

export default VideosSkeleton;
