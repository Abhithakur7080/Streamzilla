import React, { useState } from "react";
import { icons } from "../../assets";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import {
  updateAvatar,
  updateCoverImage,
} from "../../reducers/Slices/authSlice";
import { GetImagePreview } from "../index";

const EditAvatar = ({ cover, preImage }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const upload = (data) => {
    setIsOpen(false);
    const formData = new FormData();
    formData.append(`${cover ? "coverImage" : "avatar"}`, data.avatar[0]);

    if (data) {
      if (cover) {
        dispatch(updateCoverImage(formData));
      } else {
        dispatch(updateAvatar(formData));
      }
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit(upload)} className="relative">
        <icons.MdOutlineCloudUpload
          className="hover:text-gray-800 text-black rounded-md bg-white opacity-80 hover:opacity-100 p-1 cursor-pointer"
          size={35}
          onClick={() => setIsOpen((prev) => !prev)}
        />
        {isOpen && (
          <div className="fixed z-50 top-0 left-0 h-full justify-center items-center bg-gray-600 bg-opacity-70">
            <div className="bg-white p-8 relative border shadow-lg w-full max-w-md">
              <button className="absolute top-5 left-5 text-black hover:text-gray-800">
                <icons.MdClose size={20} />
              </button>
              <h2 className="text-lg font-bold text-black mb-4">
                Change {cover ? "Cover" : "Profile"} Image
              </h2>
              <div className="flex flex-col items-center">
                <GetImagePreview
                  name={"avatar"}
                  control={control}
                  cameraIcon
                  cameraSize={30}
                  className={
                    "w-full h-full object-contain min-h-20 max-h-60 bg-gray-200"
                  }
                  image={preImage}
                />
                <button
                  className="bg-[#ff0000] text-white px-4 py-2 mt-4 w-full"
                  type="submit"
                >
                  Upload
                </button>
              </div>
              {errors.avatar && (
                <span className="text-red-500">{errors.avatar.message}</span>
              )}
            </div>
          </div>
        )}
      </form>
    </>
  );
};

export default EditAvatar;
