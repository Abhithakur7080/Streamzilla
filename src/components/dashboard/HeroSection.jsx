import React from "react";
import { Button } from "..";

const HeroSection = ({ username, setPopUp }) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 p-3">
      <div>
        <h1 className="sm:text-2xl text-xl text-white font-bold">
          Welcome Back, {username}
        </h1>
        <p className="text-xs font-light text-gray-300">
          Seamless Video Management, Elevated Results.
        </p>
      </div>
      <div>
        <Button
          className="bg-purple-900 text-white p-2 font-semibold"
          onClick={() =>
            setPopUp((prev) => ({ ...prev, uploadVideo: !prev.uploadVideo }))
          }
        >
          Upload Video
        </Button>
      </div>
    </div>
  );
};

export default HeroSection;
