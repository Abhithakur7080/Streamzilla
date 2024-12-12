import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserTweets } from "../../reducers/Slices/tweetSlice";
import { TweetAndComment, TweetList } from "../../components";

const ChannelTweets = () => {
  const dispatch = useDispatch();
  const authId = useSelector((state) => state.auth?.userData?._id);
  const userId = useSelector((state) => state.user?.profileData?._id);
  const tweets = useSelector((state) => state.tweet?.tweets);
  useEffect(() => {
    if (userId) {
      dispatch(getUserTweets(userId));
    }
  }, [authId, userId, dispatch]);
  console.log(tweets)
  return (
    <>
      {authId === userId && <TweetAndComment tweet={true} />}
      {tweets?.length === 0 && (
        <div className="w-full min-h-10 flex justify-center items-center">
          <h1>No Tweet Found</h1>
        </div>
      )}
      {tweets?.length > 0 &&
        tweets?.map((tweet) => (
          <TweetList
            key={tweet._id}
            avatar={tweet?.ownerDetails?.avatar?.url}
            content={tweet?.content}
            createdAt={tweet?.createdAt}
            likesCount={tweet?.likesCount}
            tweetId={tweet?._id}
            username={tweet?.ownerDetails?.username}
            isLiked={tweets?.isLiked}
          />
        ))}
    </>
  );
};

export default ChannelTweets;
