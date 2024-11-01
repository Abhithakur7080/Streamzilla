import React, { useState } from "react";
import { timeAgo } from "../../utils/timeAgo";
import { useSelector, useDispatch } from "react-redux";
import { Like, DeleteConfirmation, Edit } from "..";
import { icons } from "../../assets";
import {
  deleteAcomment,
  editAcomment,
} from "../../reducers/Slices/commentSlice";

const CommentList = ({
  avatar,
  username,
  createdAt,
  content,
  commentId,
  isLiked,
  likesCount,
}) => {
  const avatar2 = useSelector((state) => state.auth?.userData?.avatar.url);
  const authUsername = useSelector((state) => state.auth?.userData?.username);
  const dispatch = useDispatch();

  const [editState, setEditState] = useState({
    editing: false,
    editedContent: content,
    isOpen: false,
    delete: false,
  });

  const handleEditComment = (editedContent) => {
    dispatch(editAcomment({ commentId, content: editedContent }));
    setEditState((prevState) => ({
      ...prevState,
      editing: false,
      editedContent,
      isOpen: false,
      delete: false,
    }));
  };

  const handleDeleteComment = () => {
    dispatch(deleteAcomment(commentId));
    setEditState((prevState) => ({
      ...prevState,
      delete: false,
    }));
  };
  return (
    <>
      <div className="text-black w-full flex justify-start items-center sm:gap-5 border-b border-slate-800 p-3 sm:p-5">
        <div className="w-12">
          <img
            src={avatar || avatar2}
            alt="avatar"
            className="w-10 h-10 object-cover rounded-full"
          />
        </div>
        <div className="w-full flex flex-col gap-1 relative">
          <div className="flex items-center gap-2">
            <h2 className="text-xs">{username}</h2>
            <span className="text-xs text-slate-800">{timeAgo(createdAt)}</span>
          </div>
          {authUsername === username && (
            <div className="absolute right-0">
              <div className="relative">
                <icons.HiOutlineDotsVertical
                  className="text-black cursor-pointer"
                  onClick={() =>
                    setEditState((prevState) => ({
                      ...prevState,
                      isOpen: !prevState.isOpen,
                    }))
                  }
                />
                {editState.isOpen && (
                  <div className="border bg-gray-400 text-lg border-slate-400 absolute text-center right-2 rounded-md">
                    <ul>
                      <li
                        className="hover:opacity-50 px-5 cursor-pointer border-b border-slate-400"
                        onClick={() =>
                          setEditState((prevState) => ({
                            ...prevState,
                            editing: !prevState.editing,
                            isOpen: false,
                          }))
                        }
                      >
                        Edit
                      </li>
                      <li
                        className="hover:opacity-50 px-5 cursor-pointer border-b border-slate-400"
                        onClick={() =>
                          setEditState((prevState) => ({
                            ...prevState,
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
              </div>
            </div>
          )}
          {editState.delete && (
            <DeleteConfirmation
              onCancel={() =>
                setEditState((prevState) => ({
                  ...prevState,
                  delete: false,
                  isOpen: false,
                }))
              }
              onDelete={handleDeleteComment}
              comment={true}
            />
          )}
          {editState.editing ? (
            <Edit
              initialContent={editState.editedContent}
              onCancel={() =>
                setEditState((prevState) => ({
                  ...prevState,
                  editing: false,
                  isOpen: false,
                }))
              }
              onSave={handleEditComment}
            />
          ) : (
            editState.editedContent
          )}
          <Like
            isLiked={isLiked}
            likesCount={likesCount}
            commentId={commentId}
            size={17}
          />
        </div>
      </div>
    </>
  );
};

export default CommentList;
