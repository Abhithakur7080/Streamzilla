import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { timeAgo } from "../../utils/timeAgo";
import { Like, DeleteConfirmation, Edit } from "..";
import { icons } from "../../assets";
import {
  deleteAcomment,
  editAcomment,
} from "../../reducers/Slices/commentSlice";
import { deleteTweet, editTweet } from "../../reducers/Slices/tweetSlice";

const TweetList = ({
  tweetId,
  avatar,
  username,
  createdAt,
  content,
  likesCount = 0,
  isLiked,
}) => {
  const avatar2 = useSelector((state) => state.user?.profileData?.avatar.url);
  const authUsername = useSelector((state) => state.auth?.userData?.username);
  const dispatch = useDispatch();
  const [editState, setEditState] = useState({
    editing: false,
    editedContent: content,
    isOpen: false,
    delete: false,
  });
  const handleEditTweet = (editedContent) => {
    dispatch(editTweet({ tweetId, content: editedContent }));
    setEditState((prev) => ({
      ...prev,
      editing: false,
      isOpen: false,
      delete: false,
      editedContent,
    }));
  };
  const handleDeleteTweet = () => {
    dispatch(deleteTweet(tweetId));
    setEditState((prev) => ({
      ...prev,
      editing: false,
      isOpen: false,
      delete: false,
    }));
  };
  return (
    <>
      <div className="text-black w-full flex justify-start items-center sm:gap-5 gap-3 border-b border-slate-600 p-3 sm:p-5">
        <div className="w-10">
          <img
            src={avatar || avatar2}
            alt="w-8 h-8 object-cover rounded-full"
          />
        </div>
        <div className="w-full flex flex-col gap-1 relative">
          <div className="flex items-center gap-2">
            <h2 className="text-xs">{username}</h2>
            <span className="text-xs text-slate-400">{timeAgo(createdAt)}</span>
          </div>
          {editState.editing ? (
            <Edit
              initialContent={editState.editedContent}
              onCancel={() =>
                setEditState((prev) => ({
                  ...prev,
                  editing: false,
                  isOpen: false,
                }))
              }
              onSave={handleEditTweet}
            />
          ) : (
            editState.editedContent
          )}
            <Like
              isLiked={isLiked}
              likesCount={likesCount}
              tweetId={tweetId}
              size={20}
            />
          {authUsername === username && (
            <div className="w-5 h-5 absolute right-0 cursor-pointer">
              <icons.HiOutlineDotsVertical
                onClick={() =>
                  setEditState((prev) => ({ ...prev, isOpen: !prev.isOpen }))
                }
              />
            </div>
          )}
          {editState.isOpen && (
            <div className="border bg-gray-200 border-slate-400 absolute text-center right-5 rounded-md">
              <ul>
                <li
                  className="hover:bg-[#ff0000] hover:text-white px-5 cursor-pointer border-b border-slate-400"
                  onClick={() =>
                    setEditState((prev) => ({
                      ...prev,
                      editing: !prev.editing,
                      isOpen: false,
                    }))
                  }
                >
                  Edit
                </li>
                <li
                  className="hover:bg-[#ff0000] hover:text-white px-5 cursor-pointer"
                  onClick={() =>
                    setEditState((prev) => ({
                      ...prev,
                      delete: true,
                      isOpen: false,
                    }))
                  }
                >
                  Delete
                </li>
              </ul>
            </div>
          )}
          {editState.delete && (
            <DeleteConfirmation
              tweet={true}
              onCancel={() =>
                setEditState((prev) => ({ ...prev, delete: !prev.delete }))
              }
              onDelete={handleDeleteTweet}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default TweetList;
