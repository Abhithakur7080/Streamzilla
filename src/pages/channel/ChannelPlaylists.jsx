import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  createAplaylist,
  getUserPlaylists,
} from "../../reducers/Slices/playlistSlice";
import { Button, Input } from "../../components";
import { set, useForm } from "react-hook-form";
import { icons } from "../../assets";
import { timeAgo } from "../../utils/timeAgo";
import { Link } from "react-router-dom";

const ChannelPlaylists = () => {
  const dispatch = useDispatch();
  const playlists = useSelector((state) => state.playlist?.playlists);
  const authId = useSelector((state) => state.auth?.userData?._id);
  const userId = useSelector((state) => state.user?.profileData?._id);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [openCreatePlaylist, setOpenCreatePlaylist] = useState(false);
  useEffect(() => {
    if (userId) {
      dispatch(getUserPlaylists(userId));
    }
  }, [dispatch, userId]);
  const createPlaylist = (data) => {
    dispatch(createAplaylist(data));
    setOpenCreatePlaylist((prev) => !prev);
  };
  return (
    <div className="w-full relative text-black sm:px-5 px-0">
      {playlists?.length === 0 && (
        <div className="w-full h-full flex justify-center items-center">
          <h1>No Playlists Found</h1>
        </div>
      )}
      {authId === userId && (
        <div className="w-full flex justify-center mt-5">
          <Button
            onClick={() => setOpenCreatePlaylist((prev) => !prev)}
            className="bg-[#ff0000] text-white py-1 px-3 rounded-lg hover:bg-[#ff1000] cursor-pointer"
          >
            Create Playlist
          </Button>
        </div>
      )}
      {openCreatePlaylist && (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-500 bg-opacity-70 z-50">
          <div className="relative w-full max-w-sm border bg-white">
            <form
              className="w-full space-y-5 p-4"
              onSubmit={handleSubmit(createPlaylist)}
            >
              <h2 className="text-2xl font-bold text-center">
                Create Playlist
              </h2>
              <icons.IoCloseCircleOutline
                size={30}
                className="absolute -top-2 right-4 cursor-pointer"
                onClick={() => setOpenCreatePlaylist((prev) => !prev)}
              />
              <Input
                label="Name"
                placeholder="Enter Playlist Name"
                {...register("name", { required: "Name is required" })}
              />
              {errors.name && (
                <span className="text-red-500 text-sm">
                  {errors.name.message}
                </span>
              )}
              <Input
                label="Description"
                placeholder="Enter the description of the playlist"
                {...register("description", {
                  required: "Description is required",
                })}
              />
              {errors.description && (
                <span className="text-red-500 text-sm">
                  {errors.description.message}
                </span>
              )}
              <Button
                type="submit"
                className="bg-[#ff0000] text-white p-2 w-full hover:bg-[#ff1000] cursor-pointer"
              >
                Create Playlist
              </Button>
            </form>
          </div>
        </div>
      )}
      <div className="grid xl:grid-cols-3 md:grid-cols-2 p-2 grid-cols-1 w-full mt-5">
        {playlists?.map((playlist) => (
          <Link
            to={`/playlists/${playlist._id}`}
            key={playlist._id}
            className="relative h-[15rem] w-full border border-slate-900"
          >
            <div className="absolute flex justify-between bottom-0 border-t py-1 px-2 w-full backdrop-contrast-75">
              <div className="flex flex-col gap-1">
                <h1 className="text-lg">Playlist</h1>
                <div className="text-xs text-slate-500">
                  {playlist.totalViews} Views &nbsp;
                  {timeAgo(playlist.updatedAt)}
                </div>
              </div>
              <p>{playlist.totalVideos} Videos</p>
            </div>
            <div className="py-1 px-2">
              <p className="text-sm font-bold">{playlist.name}</p>
              <p className="text-xs w-full h-4 overflow-hidden">
                {playlist.description}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ChannelPlaylists;
