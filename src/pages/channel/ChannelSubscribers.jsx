import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserChannelSubscribers } from "../../reducers/Slices/subscriptionSlice";
import { Avatar, Button } from "../../components";
import { Link } from "react-router-dom";

const ChannelSubscribers = () => {
  const dispatch = useDispatch();
  const channelId = useSelector((state) => state.user?.profileData?._id);
  const subscribers = useSelector(
    (state) => state.subscription?.channelSubscribers
  );
  useEffect(() => {
    if (channelId) {
      dispatch(getUserChannelSubscribers(channelId));
    }
  }, [dispatch, channelId]);

  return (
    <>
      {subscribers?.map((subscriber) => (
        <Link
          to={`/profile/${subscriber?.subscriber?.username}`}
          key={subscriber?.subscriber?._id}
          className="flex border-b border-slate-900 px-3 py-1 justify-between items-center text-black"
        >
          <div className="flex items-center gap-3">
            <Avatar
              src={subscriber?.subscriber?.avatar.url}
              channelName={subscriber?.subscriber?.username}
            />
            <div>
              <h5 className="text-sm">{subscriber?.subscriber?.username}</h5>
              <span className="text-xs text-slate-900">
                {subscriber?.subscriber?.subscribersCount} Subscribers
              </span>
            </div>
          </div>
          <div>
            <Button className="bg-[#ff0000] hover:bg-[#ff1000] text-white text-xs py-1 px-2">
              {subscriber?.subscriber?.subscribedToSubscriber
                ? "Subscribed"
                : "Subscribe"}
            </Button>
          </div>
        </Link>
      ))}
    </>
  );
};

export default ChannelSubscribers;
