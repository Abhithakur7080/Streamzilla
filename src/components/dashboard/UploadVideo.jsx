import React, { useState } from "react";
import { Button, Input2, UploadingVideo, GetImagePreview } from "../index";
import { icons } from "../../assets";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { publishAvideo } from "../../reducers/Slices/videoSlice";

const UploadVideo = ({ setUploadVideoPopup }) => {
  const [videoName, setVideoName] = useState("");
  const [videoSize, setVideoSize] = useState(0);
  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const uploading = useSelector((state) => state.video.uploading);
  const uploaded = useSelector((state) => state.video.uploaded);

  const publishVideo = async (data) => {
    setVideoSize(Math.floor(data.videoFile[0].size / (1024 * 1024)));
    await dispatch(publishAvideo(data));
  };

  if (uploading) {
    return (
      <>
        <UploadingVideo
          setUploadVideoPopup={setUploadVideoPopup}
          videoFileName={videoName}
          fileSize={videoSize}
        />
      </>
    );
  }
  if (uploaded) {
    return (
      <>
        <UploadingVideo
          setUploadVideoPopup={setUploadVideoPopup}
          videoFileName={videoName}
          fileSize={videoSize}
          uploaded={true}
        />
      </>
    );
  }

  return (
    <>
      <div className="fixed top-[4.35rem] left-0 w-full h-[calc(100vh-60px)] flex justify-center items-center bg-gray-500 bg-opacity-70 z-50">
        <div className="relative w-[95vw] sm:w-3/4 h-[75vh] sm:h-[75vh] mx-auto text-black border overflow-y-auto bg-white scale-up-center">
          <form onSubmit={handleSubmit(publishVideo)} className="space-y-5">
            <section className="h-12 sticky top-0 z-50 border-b w-full bg-gray-200 flex justify-between items-center px-3">
              <div className="flex gap-1 items-center cursor-pointer">
                <icons.IoCloseCircleOutline
                  size={25}
                  onClick={() => setUploadVideoPopup((prev) => !prev)}
                />
                <h3 className="font-semibold">Upload Video</h3>
              </div>
              <div>
                <Button
                  className="bg-[#ff0000] py-1 px-2 font-bold text-white"
                  type="submit"
                >
                  Save
                </Button>
              </div>
            </section>
            <section className="px-6 py-2">
              <div className="w-full border border-dotted border-gray-700 h-48 p-1 flex flex-col gap-3 justify-center items-center text-center overflow-y-auto">
                <div className="mt-4">
                  <h1 className="font-medium text-sm">
                    Drag and drop video file to upload
                  </h1>
                  <p className="font-light text-xs">
                    Your video will be private until you publish them.
                  </p>
                </div>
                <label
                  htmlFor="video-upload"
                  className="cursor-pointer bg-gray-300 font-bold text-sm py-2 px-4"
                >
                  Select File
                </label>
                <input
                  type="file"
                  id="video-upload"
                  accept="video/*"
                  className="hidden"
                  {...register("videoFile", {
                    required: "Video file is required",
                    onChange: (e) => setVideoName(e.target.files[0]?.name),
                  })}
                />
                <input
                  value={videoName}
                  className="sm:h-3/4 w-full text-center h-10 bg-transparent text-black outline-none"
                  readOnly
                />
                <span className="text-red-500 text-xs">
                  {errors.videoFile?.message}
                </span>
              </div>
              <div className="space-y-5 mt-2 grid lg:grid-cols-2 grid-cols-1 lg:gap-10 justify-start items-start">
                <div className="w-full">
                  <GetImagePreview
                    name={"thumbnail"}
                    control={control}
                    label={"Thumbnail *"}
                    className={"w-full h-56 border border-gray-500 object-contain"}
                    cameraIcon={true}
                    cameraSize={40}
                  />
                  <span className="text-red-500 text-xs">
                    {errors.thumbnail?.message}
                  </span>
                </div>
                <div>
                  <div className="w-full">
                    <Input2
                      type="text"
                      label="Title *"
                      className="mb-2"
                      {...register("title", {
                        required: "Title is required",
                      })}
                    />
                    <span className="text-red-500 text-xs">
                      {errors.title?.message}
                    </span>
                    <div>
                      <label htmlFor="description">Description *</label>
                      <textarea
                        name="description"
                        id="description"
                        rows="5"
                        className="focus:bg-gray-100 bg-white outline-none w-full border border-gray-500 mt-1 p1 resize-none overflow-y-auto"
                        {...register("description", {
                          required: "Description is required",
                        })}
                      ></textarea>
                      <span className="text-red-500 text-xs">
                        {errors.description?.message}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </form>
        </div>
      </div>
    </>
  );
};

export default UploadVideo;
