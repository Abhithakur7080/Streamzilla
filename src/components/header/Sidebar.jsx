import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { userLogout } from "../../reducers/Slices/authSlice";
import { icons } from "../../assets";

const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const username = useSelector((state) => state.auth?.userData?.username);

  const sidebarTopItems = [
    {
      icon: <icons.RiHome6Line size={25} />,
      title: "Home",
      url: "/",
    },
    {
      icon: <icons.BiLike size={25} />,
      title: "Liked Videos",
      url: "/liked-videos",
    },
    {
      icon: <icons.BiHistory size={25} />,
      title: "History",
      url: "/history",
    },
    {
      icon: <icons.HiOutlineVideoCamera size={25} />,
      title: "My Content",
      url: `/channel/${username}`,
    },
    {
      icon: <icons.IoFolderOutline size={25} />,
      title: "Collections",
      url: "/collections",
    },
    {
      icon: <icons.TbUserCheck size={25} />,
      title: "Subscriptions",
      url: "/subscriptions",
    },
  ];

  const bottomBarItems = [
    {
      icon: <icons.RiHome6Line size={25} />,
      title: "Home",
      url: "/",
    },
    {
      icon: <icons.BiHistory size={25} />,
      title: "History",
      url: "/history",
    },
    {
      icon: <icons.IoFolderOutline size={25} />,
      title: "Collections",
      url: "/collections",
    },
    {
      icon: <icons.TbUserCheck size={25} />,
      title: "Subscriptions",
      url: "/subscriptions",
    },
  ];

  const logout = () => {
    dispatch(userLogout());
    navigate("/");
  };

  return (
    <>
      <div className="sm:block hidden">
        <div className="lg:w-56 md:w-44 w-16 sm:p-3 p-2 border-slate-600 border-r h-[calc(100vh-75px)] flex flex-col justify-between">
          <div className="flex flex-col gap-4 mt-5">
            {sidebarTopItems.map((item) => (
              <NavLink
                to={item.url}
                key={item.title}
                className={({ isActive }) =>
                  isActive ? "bg-[#ff0000] text-white" : ""
                }
              >
                <div className="flex items-center gap-2 justify-center sm:justify-start hover:bg-[#ff0000] hover:text-white cursor-pointer py-1 px-2 border border-gray-400">
                  {item.icon}
                  <span className="text-base hidden md:block">
                    {item.title}
                  </span>
                </div>
              </NavLink>
            ))}
          </div>
          <div className="space-y-4 mb-10">
            {username && (
              <div
                className="flex items-center gap-2 justify-center sm:justify-start hover:bg-[#ff0000] hover:text-white cursor-pointer py-1 px-2 border border-gray-400"
                onClick={() => logout()}
              >
                <icons.IoMdLogOut size={25} />
                <span className="text-base hidden md:block">Logout</span>
              </div>
            )}
            <div className="flex items-center gap-2 justify-center sm:justify-start hover:bg-[#ff0000] hover:text-white cursor-pointer py-1 px-2 border border-gray-400">
              <icons.CiSettings size={25} />
              <span className="text-base hidden md:block">Settings</span>
            </div>
          </div>
        </div>
      </div>
      <div className="border-t-2 h-16 sm:hidden z-20 p-1 w-full flex justify-around fixed bottom-0 ">
        {bottomBarItems.map((item) => (
          <NavLink
            to={item.url}
            key={item.title}
            className={({ isActive }) => (isActive ? "text-[#ff0000]" : "")}
          >
            <div className="flex flex-col items-center gap-1 cursor-pointer p-1">
              {item.icon}
              <span className="text-base">{item.title}</span>
            </div>
          </NavLink>
        ))}
      </div>
    </>
  );
};

export default Sidebar;
