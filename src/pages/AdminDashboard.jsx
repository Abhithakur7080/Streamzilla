import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteAvideo } from "../reducers/Slices/videoSlice";
import {
  getChannelStats,
  getChannelVideos,
} from "../reducers/Slices/dashboardSlice";
import {
  Container,
  DeleteConfirmation,
  HeroSection,
  Navbar,
  Spinner,
  StatsSection,
  VideoTable,
  EditVideo,
  UploadVideo,
} from "../components";

const AdminDashboard = () => {
  const username = useSelector((state) => state.auth.userData?.username);
  const dashboard = useSelector((state) => state.dashboard.channelStats);
  const videos = useSelector((state) => state.dashboard.channelVideos);
  const uploaded = useSelector((state) => state.video.uploaded);
  const publishToggled = useSelector((state) => state.video.publishToggled);
  const deleting = useSelector((state) => state.video.loading);

  const dispatch = useDispatch();
  const [videoDetails, setVideoDetails] = useState(null);
  const [popUp, setPopUp] = useState({
    uploadVideo: false,
    editVideo: false,
    deleteVideo: false,
  });
  const handleDeleteVideo = async () => {
    await dispatch(deleteAvideo(videoDetails?._id));
    setPopUp((prev) => ({
      ...prev,
      deleteVideo: !prev.deleteVideo,
    }));
  };
  useEffect(() => {
    dispatch(getChannelStats());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getChannelVideos());
  }, [dispatch, uploaded, publishToggled, deleting]);
  window.scrollTo(0, 0);
console.log(popUp)
  return (
    <>
      <Container>
        <div className="w-full h-[calc(100vh-100px)] relative  bg-green text-black space-y-5 z-10 px-1">
          {popUp.uploadVideo && <UploadVideo setUploadVideoPopup={setPopUp} />}
          {popUp.editVideo && (
            <EditVideo
            setEditVideoPop={setPopUp}
              title={videoDetails?.title}
              description={videoDetails?.description}
              videoId={videoDetails?._id}
              thumbnail={videoDetails?.thumbnail.url}
            />
          )}
          {popUp.deleteVideo && (
            <div className="w-full fixed top-52 flex justify-center z-20">
              <DeleteConfirmation
                video={true}
                onCancel={() =>
                  setPopUp((prev) => ({
                    ...prev,
                    deleteVideo: !prev.deleteVideo,
                  }))
                }
                onDelete={handleDeleteVideo}
              />
            </div>
          )}
          {deleting && (
            <div className="w-full fixed top-20 flex justify-center z-20">
              <div className="w-52 border border-slate-600 bg-white gap-2 p-3">
                <Spinner />
                <span className="text-md font-bold">Deleting video...</span>
              </div>
            </div>
          )}
          <HeroSection username={username} setPopUp={setPopUp} />
          <StatsSection dashboard={dashboard} />
          <VideoTable
            videos={videos}
            setPopUp={setPopUp}
            setVideoDetails={setVideoDetails}
          />
        </div>
      </Container>
    </>
  );
};

export default AdminDashboard;
