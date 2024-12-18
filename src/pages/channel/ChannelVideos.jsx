import React, { useEffect, useState } from "react";
import { NoVideoFound, VideoList } from "../../components";
import { useDispatch, useSelector } from "react-redux";
import { getAllVideos, makeVideosNull } from "../../reducers/Slices/videoSlice";
import { useSearchParams } from "react-router-dom";

const ChannelVideos = () => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.user?.profileData?._id);
  const videos = useSelector((state) => state.video?.videos?.docs);
  const loading = useSelector((state) => state.video?.loading);
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeButton, setActiveButton] = useState("button1");

  const sortType = searchParams.get("sortType") || "desc";
  const sortBy = searchParams.get("sortBy") || "createdAt";

  useEffect(() => {
    dispatch(getAllVideos({ userId, sortBy, sortType }));
    return () => dispatch(makeVideosNull());
  }, [dispatch, userId, searchParams]);
  useEffect(() => {
    setSearchParams({ sortBy, sortType });
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  const handleSort = (sortBy, sortType = "asc") => {
    setSearchParams({ sortBy, sortType });
  };
  return (
    <>
      {videos?.length === 0 && <NoVideoFound />}
      <div className="w-full p-2 text-black flex gap-4">
        <button
          onClick={() => {
            setActiveButton("button1");
            handleSort("createdAt", "desc");
          }}
          className={`group py-1 px-2 rounded-md ${
            activeButton === "button1" ? "bg-purple-900 text-white" : "bg-slate-50"
          }`}
        >
          Latest
        </button>
        <button
          onClick={() => {
            setActiveButton("button2");
            handleSort("views", "desc");
          }}
          className={`group py-1 px-2 rounded-md ${
            activeButton === "button2" ? "bg-purple-900 text-white" : "bg-slate-50"
          }`}
        >
          Popular
        </button>
        <button
          onClick={() => {
            setActiveButton("button3");
            handleSort("createdAt", "asc");
          }}
          className={`group py-1 px-2 rounded-md ${
            activeButton === "button3" ? "bg-purple-900 text-white" : "bg-slate-50"
          }`}
        >
          Oldest
        </button>
      </div>
      <div className="grid lg:grid-cols-3 sm:grid-cols-2 text-black h-72 overflow-y-auto">
        {videos?.map((video) => (
          <VideoList
            key={video._id}
            avatar={video.ownerDetails?.avatar.url}
            duration={video.duration}
            title={video.title}
            thumbnail={video.thumbnail?.url}
            createdAt={video.createdAt}
            views={video.views}
            channelName={video.ownerDetails.username}
            videoId={video._id}
          />
        ))}
      </div>
    </>
  );
};

export default ChannelVideos;
