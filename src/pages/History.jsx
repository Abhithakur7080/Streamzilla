import React, { useEffect } from "react";
import { Container, NoVideoFound, VideoList } from "../components";
import { useDispatch, useSelector } from "react-redux";
import { getWatchHistory } from "../reducers/Slices/userSlice";
import VideosSkeleton from "../skeletons/VideosSkeleton";

const History = () => {
  const loading = useSelector((state) => state.user?.loading);
  const videos = useSelector((state) => state.user?.history);
  const dispatch = useDispatch();
  window.scrollTo(0, 0);
  useEffect(() => {
    dispatch(getWatchHistory());
  }, [dispatch]);
  if(loading){
    return <VideosSkeleton/>
  }
  if(videos?.length === 0){
    return <NoVideoFound/>
  }
  return <>
  <Container>

    <div className="grid max-h-screen mb-20 sm:m-0 overflow-y-auto lg:grid-cols-3 sm:grid-cols-2 text-black p-3">
      {videos.map((video) => (
        <VideoList
          key={video._id}
          avatar={video.owner?.avatar.url}
          duration={video.duration}
          title={video.title}
          thumbnail={video.thumbnail?.url}
          createdAt={video.createdAt}
          views={video.views}
          channelName={video.owner.username}
          videoId={video._id}
        />
      ))}

    </div>
  </Container>
  </>;
};

export default History;
