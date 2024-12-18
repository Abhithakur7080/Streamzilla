import React from "react";
import { icons } from "../../assets";

const DeleteConfirmation = ({ onCancel, onDelete, comment, tweet, video }) => {
  const handleOutsideClick = (e) => {
    if (e.target.classList.contains("backdrop")) {
      onCancel();
    }
  };

  return (
    <div
      className="fixed top-0 left-0 w-full flex justify-center items-center"
      onClick={handleOutsideClick}
    >
      <div
        className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-70 backdrop"
      >
        <div className="text-center sm:p-5 border-purple-900 border rounded-xl bg-white scale-up-center">
          <div className="flex justify-center items-start p-3 flex-wrap gap-2">
            <icons.ImBin color="red" size={25} />
            <div className="flex flex-col flex-wrap items-start">
              <h1 className="font-bold text-xl mb-1">
                Delete{" "}
                {`${comment ? "Comment" : ""}${tweet ? "Tweet" : ""}${
                  video ? "Video" : ""
                }`}
              </h1>
              <p className="text-xs text-start font-semibold w-60">
                <span>
                  Are you sure you want to delete this{" "}
                  {`${comment ? "Comment" : ""}${tweet ? "Tweet" : ""}${
                    video ? "Video" : ""
                  }`}
                </span>
                <span>
                  Once it's deleted, you will not be able to recover it.
                </span>
              </p>
            </div>
          </div>
          <div className="font-normal flex gap-2 justify-center">
            <button
              onClick={onCancel}
              className="bg-gray-300 py-1 px-3 rounded-lg sm:text-lg text-sm hover:bg-gray-400 cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={onDelete}
              className="bg-red-600 py-1 px-3 rounded-lg sm:text-lg text-sm hover:bg-red-500 text-white cursor-pointer"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmation;
