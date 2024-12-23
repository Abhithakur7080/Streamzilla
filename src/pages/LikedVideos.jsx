import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getLikedVideos } from "../reducers/Slices/likeSlice";
import VideosSkeleton from "../skeletons/VideosSkeleton";
import { VideoList, NoVideoFound, Container } from "../components";
import { makeVideosNull } from "../reducers/Slices/videoSlice";

const LikedVideos = () => {
  const dispatch = useDispatch();
  const likedVideos = useSelector((state) => state.like?.likedVideos);
  const loading = useSelector((state) => state.like.loading);
  window.scrollTo(0, 0);
  useEffect(() => {
    dispatch(getLikedVideos());
    return () => dispatch(makeVideosNull());
  }, [dispatch]);
  if (loading) {
    return <VideosSkeleton />;
  }
  if (likedVideos?.length == 0) {
    return <NoVideoFound />;
  }
  return (
    <Container>
      <div className="grid max-h-screen overflow-y-auto lg:grid-cols-3 sm:grid-cols-2 text-black mb-20 sm:mb-0 p-3 scrollbar-active">
        {likedVideos?.map((video) => (
          <VideoList
            key={video.likedVideo._id}
            avatar={video.likedVideo.ownerDetails?.avatar?.url}
            duration={video.likedVideo.duration}
            title={video.likedVideo.title}
            thumbnail={video.likedVideo.thumbnail?.url}
            createdAt={video.likedVideo.createdAt}
            views={video.likedVideo.views}
            channelName={video.likedVideo.ownerDetails?.username}
            videoId={video.likedVideo._id}
          />
        ))}
      </div>
    </Container>
  );
};

export default LikedVideos;
