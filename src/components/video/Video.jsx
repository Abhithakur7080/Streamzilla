import React from "react";

const Video = ({ src, poster }) => {
  return (
    <video
      controls
      src={src}
      poster={poster}
      autoPlay
      playsInline
      className="sm:h-[68vh] sm:max-w-4xl h-64 w-full object-contain px-3 py-5"
    ></video>
  );
};

export default Video;
