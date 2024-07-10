import React from "react";
import { icons } from "../../assets";
import { useDispatch } from "react-redux";
import { Spinner, Button } from "../index";
import { updateUploadState } from "../../reducers/Slices/videoSlice";

const UploadingVideo = ({
  videoFileName,
  fileSize,
  setUploadVideoPopup,
  uploaded,
}) => {
  const dispatch = useDispatch();
  const handleCancelAndFinish = () => {
    setUploadVideoPopup((prev) => ({
      ...prev,
      uploadVideo: false,
    }));
    dispatch(updateUploadState());
  };
  return (
    <>
      <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-500 bg-opacity-70 z-50">
        <div className="w-96 p-3 text-black border outline-none rounded-lg space-y-5 border-slate-700 bg-white">
          <div className="flex items-start justify-between">
            <div>
              {uploaded ? (
                <h1 className="text-lg font-bold">Uploaded Video</h1>
              ) : (
                <h1 className="text-lg font-bold">Uploading Video...</h1>
              )}
              <span className="text-xs text-slate-400">
                Track your video uploading process.
              </span>
            </div>
            <icons.IoCloseCircleOutline
              size={25}
              className="cursor-pointer"
              onClick={handleCancelAndFinish}
            />
          </div>
          <div className="border flex justify-start items-center p-1">
            <div className="mr-2">
              <icons.PiFilmReelFill size={25} className="text-[#ff0000]" />
            </div>
            <div>
              <h1 className="text-sm font-semibold">{videoFileName}</h1>
              <p className="text-xs">{fileSize} Mb</p>
              <div className="flex gap-2 items-center mt-2">
                {uploaded ? (
                  <>
                    <span className="text-xs flex items-center">
                      <icons.TiTick size={25} className="text-[#ff0000]" />
                      Uploaded Successfully
                    </span>
                  </>
                ) : (
                  <>
                    <Spinner />
                    <span className="text-xs">Loading...</span>
                  </>
                )}
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              className="border border-slate-500 flex-1 p-2"
              onClick={handleCancelAndFinish}
            >
              Cancel
            </Button>
            <Button
              className="bg-[#ff0000] text-white flex-1 p-2"
              onClick={handleCancelAndFinish}
            >
              Finish
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default UploadingVideo;
