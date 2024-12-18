import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Input2, Button, Spinner, GetImagePreview } from "..";
import { icons } from "../../assets";
import { useDispatch, useSelector } from "react-redux";
import {
  updateUploadState,
  updateAvideo,
} from "../../reducers/Slices/videoSlice";

const EditVideo = ({
  videoId = "",
  title = "",
  description = "",
  setEditVideoPop = () => {},
  thumbnail,
}) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
    control,
    setValue,
  } = useForm();
  const dispatch = useDispatch();
  const uploading = useSelector((state) => state.video.uploading);
  const handleClosePopup = () => {
    setEditVideoPop((prev) => ({
      ...prev,
      uploadVideo: false,
      editVideo: false,
    }));
  };
  console.log(thumbnail)
  const updateVideo = async (data) => {
    await dispatch(updateAvideo({ videoId, data }));
    setEditVideoPop((prev) => ({
      ...prev,
      uploadVideo: false,
      editVideo: false,
    }));
    dispatch(updateUploadState());
  };

  useEffect(() => {
    setValue("title", title);
    setValue("description", description);
  }, [title, description, setValue]);

  const handleOutsideClick = (e) => {
    if (e.target.classList.contains("backdrop")) {
      handleClosePopup();
    }
  };

  if (uploading) {
    return (
      <>
        <div className="w-52 border border-slate-600 flex gap-2 p-3">
          <Spinner />
          <span className="text-md font-bold">Uploading video...</span>
        </div>
      </>
    );
  }
  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-900 bg-opacity-70 z-50 backdrop" onClick={handleOutsideClick}>
      <form
        onSubmit={handleSubmit(updateVideo)}
        className="space-y-2 h-[30rem] overflow-y-auto outline-none bg-white shadow-md scale-up-center"
      >
        <div className="sticky left-0 top-0 z-50 flex justify-between items-center bg-purple-600 text-white border-b border-slate-500 px-3 py-1">
          <div>
            <h2 className="font-bold">Edit Video</h2>
            <p className="text-xs mb-2">
              Share where you've worked on your profile.
            </p>
          </div>
          <icons.IoCloseCircleOutline
            size={25}
            onClick={handleClosePopup}
            className="cursor-pointer"
          />
        </div>
        <div className="px-4 py-2 grid lg:grid-cols-2 grid-cols-1 gap-5 z-40">
          <div>
            <GetImagePreview
              name={"thumbnail"}
              control={control}
              label={"Thumbnail"}
              cameraIcon
              cameraSize={30}
              className={"object-contain w-full min-w-8 h-72 min-h-32"}
              image={thumbnail}
            />
            <span className="text-red-600 text-xs">
              {errors.thumbnail?.message}
            </span>
          </div>
          <div>
            <Input2
              type="text"
              label="Title *"
              error={errors.title?.message}
              {...register("title", {
                required: "Title is required",
              })}
            />
            <span className="text-red-600 text-xs">
              {errors.title?.message}
            </span>
            <div className="mb-4">
              <label htmlFor="description">Description *</label>
              <textarea
                name="description"
                id="description"
                rows="4"
                className="focus:bg-neutral-200 text-sm overflow-y-auto bg-white outline-none border border-slate-600 w-full mt-1 p-1 resize-none"
                {...register("description", {
                  required: "Description is required",
                })}
              ></textarea>
              <span className="text-red-600 text-xs">
                {errors.description?.message}
              </span>
            </div>
            <div className="flex gap-3">
              <Button className="flex-1 border border-slate-600 p-2" onClick={handleClosePopup}>
                Cancel
              </Button>
              <Button
                className="flex-1 bg-purple-900 hover:bg-purple-700 p-2 font-bold text-white"
                onClick={handleClosePopup}
              >
                Update
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditVideo;
