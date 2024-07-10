import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NoVideoFound, VideoList } from "../components";
import VideosSkeleton from "../skeletons/VideosSkeleton";
import { useParams, useSearchParams } from "react-router-dom";
import { getAllVideos, makeVideosNull } from "../reducers/Slices/videoSlice";
import { icons } from "../assets";

const SearchVideos = () => {
  const loading = useSelector((state) => state.video?.loading);
  const videos = useSelector((state) => state.video?.videos);
  const dispatch = useDispatch();
  const { query } = useParams();
  const [filterOpen, setFilterOpen] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const sortType = searchParams.get("sortType");
    const sortBy = searchParams.get("sortBy");
    dispatch(
      getAllVideos({
        query,
        sortBy,
        sortType,
        userId: "",
        page: "",
        limit: "",
      })
    );
    setFilterOpen(false);
    return () => dispatch(makeVideosNull());
  }, [dispatch, query, searchParams]);

  const handleSortParams = (newSortBy, newSortType = "asc") => {
    setSearchParams({
      sortBy: newSortBy,
      sortType: newSortType,
    });
  };

  if (videos?.totalDocs === 0) {
    return <NoVideoFound text={"Try searching something else"} />;
  }

  if (loading) {
    return <VideosSkeleton />;
  }
  return (
    <>
      <div
        className="w-full h-10 flex items-center font-bold justify-end cursor-pointer px-8 group"
        onClick={() => setFilterOpen((prev) => !prev)}
      >
        <span className="group-hover:text-gray-600">Filters</span>
        <icons.FaFilter
          size={20}
          className="text-gray-800 group-hover:text-gray-600"
        />
      </div>
      <div className="w-full">
        {filterOpen && (
          <div className="w-full absolute bg-transparent">
            <div className="max-w-sm border border-slate-800 bg-gray-100 rounded fixed mx-auto z-50 inset-x-0 h-96 p-5">
              <h1 className="font-semibold text-lg">Search filters</h1>
              <icons.IoCloseCircleOutline
                size={25}
                className="absolute right-5 top-5 cursor-pointer"
                onClick={() => setFilterOpen((prev) => !prev)}
              />
              <table className="mt-4 w-full">
                <thead>
                  <tr className="w-full text-start bg-[#ff0000] text-white">
                    <th className={"w-5"}></th>
                    <th>Sort by</th>
                    <th>Sort type</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="text-slate-800 cursor-pointer border-t border-gray-800">
                    <td rowSpan={2} className={"w-5"}>
                      <icons.GrAnnounce className="text-[#ff0000]" />
                    </td>
                    <td rowSpan={2}>Upload date</td>
                    <td
                      onClick={() => handleSortParams("createdAt", "desc")}
                      className="hover:bg-[#ff2000] hover:text-white"
                    >
                      Latest
                    </td>
                  </tr>
                  <tr className="text-slate-800 cursor-pointer">
                    <td
                      onClick={() => handleSortParams("createdAt", "asc")}
                      className="hover:bg-[#ff2000] hover:text-white"
                    >
                      Oldest
                    </td>
                  </tr>
                  <tr className="text-slate-800 cursor-pointer border-t border-gray-800">
                    <td rowSpan={2} className={"w-5"}>
                      <icons.TbEyeUp className="text-[#ff0000]" />
                    </td>
                    <td rowSpan={2}>View count</td>
                    <td
                      onClick={() => handleSortParams("views", "asc")}
                      className="hover:bg-[#ff2000] hover:text-white"
                    >
                      Low to High
                    </td>
                  </tr>
                  <tr className="text-slate-800 cursor-pointer">
                    <td
                      onClick={() => handleSortParams("views", "desc")}
                      className="hover:bg-[#ff2000] hover:text-white"
                    >
                      High to Low
                    </td>
                  </tr>
                  <tr className="text-slate-800 cursor-pointer border-t border-gray-800">
                    <td rowSpan={2} className={"w-5"}>
                      <icons.PiClockCountdownFill className="text-[#ff0000]" />
                    </td>
                    <td rowSpan={2}>Duration</td>
                    <td
                      onClick={() => handleSortParams("duration", "asc")}
                      className="hover:bg-[#ff2000] hover:text-white"
                    >
                      Low to High
                    </td>
                  </tr>
                  <tr className="text-slate-800 cursor-pointer">
                    <td
                      onClick={() => handleSortParams("duration", "desc")}
                      className="hover:bg-[#ff2000] hover:text-white"
                    >
                      High to Low
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}
        <div className="grid h-[calc(100vh - 100px)] xl:grid-cols-3 sm:grid-cols-2 grid-cols-1 overflow-y-auto">
          {videos &&
            videos?.docs.map((video) => (
              <VideoList
                key={video?._id}
                thumbnail={video?.thumbnail?.url}
                duration={video?.duration}
                title={video?.title}
                views={video?.views}
                avatar={video?.ownerDetails?.avatar?.url}
                channelName={video?.ownerDetails?.username}
                createdAt={video?.createdAt}
                videoId={video?._id}
              />
            ))}
        </div>
      </div>
    </>
  );
};

export default SearchVideos;
