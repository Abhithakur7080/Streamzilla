import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { togglePublishStatus } from "../../reducers/Slices/videoSlice";

const TogglePublish = ({ videoId, isPublished }) => {
  const [isChecked, setIsChecked] = useState(isPublished);
  const dispatch = useDispatch();

  const togglePublish = () => {
    dispatch(togglePublishStatus(videoId));
    setIsChecked((prev) => !prev);
  };
  return (
    <>
      <label className="relative inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          value={""}
          className="sr-only peer"
          checked={isChecked}
          onChange={togglePublish}
        />
        <div className="w-11 h-6 bg-gray-400 peer-focus:outline-none  rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-00 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#ff0000]"></div>
      </label>
    </>
  );
};

export default TogglePublish;
