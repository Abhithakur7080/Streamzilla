import React from "react";
import { Button } from "..";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { createTweet } from "../../reducers/Slices/tweetSlice";
import { createAcomment } from "../../reducers/Slices/commentSlice";

const TweetAndComment = ({ tweet, comment, videoId }) => {
  const { register, handleSubmit, setValue } = useForm();
  const dispatch = useDispatch();
  const sentContent = (data) => {
    if (data) {
      if (tweet) {
        dispatch(createTweet(data));
      } else if (comment) {
        dispatch(createAcomment({ content: data.content, videoId }));
      }
      setValue("content", "");
    }
  };
  return (
    <>
      <form
        onSubmit={handleSubmit(sentContent)}
        className="sm:p-5 p-3 sm:max-w-4xl w-full relative"
      >
        <textarea
          placeholder={`${tweet ? "Write a tweet..." : "Add a Comment..."}`}
          className="p-2 text-sm pr-16 focus:border-black text-black border border-slate-700 bg-slate-100 outline-none w-full resize-none placeholder:text-black"
          {...register("content", {required: true})}
          rows={4}
        />
        <Button type="submit" className="bg-[#ff0000] px-2 py-1 text-white hover:scale-110 transition-all ease-in absolute sm:bottom-10 sm:right-8 right-6 bottom-8 text-xs sm:text-base">Send</Button>
      </form>
    </>
  );
};

export default TweetAndComment;
