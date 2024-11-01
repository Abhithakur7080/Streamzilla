import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { icons } from "../../assets";
import {
  toogleCommentLike,
  toogleTweetLike,
  toogleVideoLike,
} from "../../reducers/Slices/likeSlice";

const Like = ({
  isLiked,
  likesCount = 0,
  tweetId,
  commentId,
  videoId,
  size,
}) => {
  const dispatch = useDispatch();
  const [localIsLiked, setLocalIsLiked] = useState(isLiked);
  const [localLikesCount, setLocalLikesCount] = useState(likesCount);

  const handleLikeToggle = () => {
    if (localIsLiked) {
      setLocalLikesCount((prev) => prev - 1);
    } else {
      setLocalLikesCount((prev) => prev + 1);
    }
    setLocalIsLiked((prev) => !prev);
    if (tweetId) {
      dispatch(toogleTweetLike(tweetId));
    }
    if (commentId) {
      dispatch(toogleCommentLike(commentId));
    }
    if (videoId) {
      dispatch(toogleVideoLike(videoId));
    }
  };

  useEffect(() => {
    setLocalIsLiked(isLiked);
    setLocalLikesCount(likesCount);
  }, [dispatch, likesCount]);

  return (
    <>
      <div className="flex items-center gap-1">
        <icons.BiSolidLike
          size={size}
          onClick={handleLikeToggle}
          className={`cursor-pointer ${localIsLiked ? "text-[#ff0000]" : "text-white"}`}
        />
        <span className="text-xs mr-3">{localLikesCount}</span>
        <icons.BiSolidDislike size={size} className="text-white" />
      </div>
    </>
  );
};

export default Like;
