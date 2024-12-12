import React, { useEffect } from "react";
import { ChannelHeader, ChannelNavigate } from "../../components";
import { useDispatch, useSelector } from "react-redux";
import { getUserChannelProfile } from "../../reducers/Slices/userSlice";
import { useParams, Outlet } from "react-router-dom";

const Channel = () => {
  const dispatch = useDispatch();
  const { username } = useParams();
  const channel = useSelector((state) => state.user?.profileData);
  useEffect(() => {
    dispatch(getUserChannelProfile(username));
  }, [dispatch, username]);
  window.scrollTo(0, 0);
  return (
    <>
      {channel && (
        <>
          <ChannelHeader
            username={username}
            coverImage={channel?.coverImage?.url}
            avatar={channel?.avatar.url}
            fullName={channel?.fullName}
            subscribersCount={channel?.subscribersCount}
            subscribedCount={channel?.channelsSubscribedToCount}
            isSubscribed={channel?.isSubscribed}
            channelId={channel?._id}
          />
        </>
      )}
      <ChannelNavigate username={username}/>
      <div className="overflow-y-auto h-[calc(100%-20rem)]">
        <Outlet />
      </div>
    </>
  );
};

export default Channel;
