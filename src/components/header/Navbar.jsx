import React, { useState } from "react";
import { Search, Button, Logo, SearchForSmallScreen } from "..";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userLogout } from "../../reducers/Slices/authSlice";
import { icons } from "../../assets";

const Navbar = () => {
  const [toggleMenu, setToggleMenu] = useState(false);
  const [openSearch, setOpenSearch] = useState(false);
  const authStatus = useSelector((state) => state.auth?.status);
  const username = useSelector((state) => state.auth?.userData?.username);
  const profileImg = useSelector((state) => state.auth?.userData?.avatar.url);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logout = async () => {
    dispatch(userLogout());
    navigate("/");
  };
  const sidePanelItems = [
    {
      icon: <icons.BiLike size={25} />,
      title: "Liked Videos",
      url: "/liked-videos",
    },
    {
      icon: <icons.HiOutlineVideoCamera size={25} />,
      title: "My Content",
      url: `/channel/${username}`,
    },
  ];
  return (
    <div className="w-full bg-[#ff0000] flex justify-between items-center p-4 sm:gap-5 shadow-md sticky top-0 z-50">
      {/* logo */}
      <div className="flex items-center justify-center gap-2 cursor-pointer">
        <Logo iconColor="#fff" textColor="white" />
      </div>
      {/* search */}
      <div className="w-full sm:w-1/3 hidden sm:block">
        <Search />
      </div>
      {/* search icon for small screen */}
      <div className="text-white w-full inline-flex justify-end sm:hidden pr-4">
        <icons.CiSearch
          size={30}
          fontWeight={"bold"}
          color="white"
          onClick={() => setOpenSearch((prev) => !prev)}
        />
        {/* search bar for small screen */}
        {openSearch && (
          <SearchForSmallScreen
            openSearch={openSearch}
            setOpenSearch={setOpenSearch}
          />
        )}
      </div>
      {/* check if authenticated then image else login & sign button */}
      {authStatus ? (
        <div className="rounded-full overflow-hidden sm:block hidden">
          <img
            src={profileImg}
            alt="profileImg"
            className="w-10 h-10 object-cover"
          />
        </div>
      ) : (
        <div className="space-x-2 sm:flex hidden items-center">
          <Link to={"/login"}>
            <Button className="bg-white border border-slate-500 hover:border-white hover:bg-[#ff0000]  hover:text-white sm:px-4 sm:py-2 p-2">
              Login
            </Button>
          </Link>
          <Link to={"/signup"}>
            <Button className="bg-white border border-slate-500 hover:border-white hover:bg-[#ff0000] hover:text-white sm:px-4 sm:py-2 p-2">
              Signup
            </Button>
          </Link>
        </div>
      )}
      {/* hamburger for small screen icon */}
      <div className="sm:hidden block">
        <div className="text-white">
          <icons.SlMenu size={24} onClick={() => setToggleMenu((prev) => !prev)} />
        </div>
      </div>
      {/* sidebar for smaller screen */}
      {toggleMenu && (
        <div className="fixed right-0 top-0 text-white flex flex-col border-l h-screen w-[70%] bg-white sm:hidden shadow-lg outline-none slide-left">
          <div className="w-full border-b h-20 flex items-center mb-2 justify-between px-3">
            <div className="flex items-center gap-2">
              <Logo />
            </div>
            <icons.IoCloseCircleOutline
              size={35}
              onClick={() => setToggleMenu((prev) => !prev)}
              color="#111"
              className="cursor-pointer"
            />
          </div>
          <div className="flex flex-col justify-between h-full py-5 px-3">
            <div className="flex flex-col gap-5">
              {sidePanelItems.map((item) => (
                <NavLink
                  to={item.url}
                  key={item.title}
                  onClick={() => setToggleMenu((prev) => !prev)}
                  style={({ isActive }) =>
                    isActive
                      ? { backgroundColor: "#ff0000", color: "#fff" }
                      : undefined
                  }
                  className={`flex items-center border border-slate-500 gap-5 px-3 py-1 hover:bg-[#ff0000] text-black hover:text-white`}
                >
                  <div>{item.icon}</div>
                  <span className="text-lg">{item.title}</span>
                </NavLink>
              ))}
            </div>
            {!authStatus ? (
              <div className="flex flex-col space-y-5 mb-3">
                <Link to={"/login"}>
                  <Button className="w-full bg-[#ff0000] border hover:bg-white hover:text-black border-slate-500 py-1 px-3">
                    Login
                  </Button>
                </Link>
                <Link to={"/signup"}>
                  <Button className="w-full bg-[#ff0000] border hover:bg-white hover:text-black border-slate-500 py-1 px-3">
                    Signup
                  </Button>
                </Link>
              </div>
            ) : (
              <div
                className="flex gap-2 justify-start items-start py-1 px-2 border border-slate-600 text-black cursor-pointer hover:bg-[#ff0000] hover:text-white"
                onClick={() => logout()}
              >
                <icons.IoMdLogOut size={25} />
                <span className="text-base">Logout</span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
