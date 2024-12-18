import React from "react";
import { TogglePublish } from "..";
import { icons } from "../../assets";

const VideoTable = ({ videos, setPopUp, setVideoDetails }) => {
  return (
    <>
      <section className="mx-auto w-full overflow-x-auto bg-gray-900">
        <table className="min-w-full border-slate-500">
          <thead>
            <tr className="text-white">
              <th className="py-2 px-4 border-b border-slate-300">
                Toggle Publish
              </th>
              <th className="py-2 px-4 border-b border-slate-300">Status</th>
              <th className="py-2 px-4 border-b border-slate-300">Uploaded</th>
              <th className="py-2 px-4 border-b border-slate-300">Rating</th>
              <th className="py-2 px-4 border-b border-slate-300">
                Date Uploaded
              </th>
              <th className="py-2 px-4 border-b border-slate-300"></th>
            </tr>
          </thead>
          <tbody className="text-center">
            {videos?.map((video) => (
              <tr key={video?._id}>
                <td className="py-2 px-4 border-b border-slate-500">
                  <TogglePublish
                    isPublished={video?.isPublished}
                    videoId={video?._id}
                  />
                </td>
                <td className="py-2 px-4 border-b border-slate-500">
                  {video?.isPublished ? (
                    <span className="text-green-500 py-1 px-2 border-green-500 rounded-full">
                      Published
                    </span>
                  ) : (
                    <span className="text-orange-500 py-1 px-2 border-orange-500 rounded-full">
                      UnPublished
                    </span>
                  )}
                </td>
                <td className="py-2 px-4 border-b border-slate-300 text-white">
                  {video?.title}
                </td>
                <td className="border-b border-slate-500">
                  <span className="border rounded-lg outline-none px-2 bg-green-200 text-green-600">
                    {video?.likesCount} likes
                  </span>
                </td>
                <td className="py-2 px-4 border-b border-slate-500 text-white">
                  {video?.createdAt?.day}/{video?.createdAt?.month}/
                  {video?.createdAt?.year}
                </td>
                <td className="py-2 px-4 border-b border-slate-500">
                  <span className="flex gap-3 justify-start">
                    <icons.ImBin
                      size={20}
                      className="cursor-pointer text-red-700 hover:text-white"
                      onClick={() => {
                        setPopUp((prev) => ({
                          ...prev,
                          deleteVideo: !prev.deleteVideo,
                        }));
                        setVideoDetails(video);
                      }}
                    />
                    <icons.GrEdit
                      size={20}
                      className="cursor-pointer text-blue-500 hover:text-white"
                      onClick={() => {
                        setPopUp((prev) => ({
                          ...prev,
                          editVideo: !prev.editVideo,
                        }));
                        setVideoDetails(video);
                      }}
                    />
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </>
  );
};

export default VideoTable;
