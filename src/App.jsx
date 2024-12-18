import React, { useEffect } from "react";
import Layout from "./Layout";
import "animate.css/animate.min.css";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { AuthLayout, EditPersonalInfo, ChangePassword } from "./components";
import { Route, Routes } from "react-router-dom";
import { getCurrentUser } from "./reducers/Slices/authSlice";
import { ToastContainer, cssTransition } from "react-toastify";
import {
  AdminDashboard,
  Channel,
  ChannelPlaylists,
  ChannelSubscribers,
  ChannelTweets,
  ChannelVideos,
  EditChannel,
  History,
  Homepage,
  LikedVideos,
  Login,
  SearchVideos,
  Signup,
  Subscriptions,
  TermsAndConditions,
  VideoDetails,
} from "./pages";

const bounce = cssTransition({
  enter: "animate__animated animate__bounceIn",
  exit: "animate__animated animate__bounceOut",
});

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCurrentUser());
  }, [dispatch]);
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route
            index
            element={
              <AuthLayout authentication={false}>
                <Homepage />
              </AuthLayout>
            }
          />

          <Route
            path="channel/:username"
            element={
              <AuthLayout authentication>
                <Channel />
              </AuthLayout>
            }
          >
            <Route
              path="videos"
              element={
                <AuthLayout authentication>
                  <ChannelVideos />
                </AuthLayout>
              }
            />
            <Route
              path="playlists"
              element={
                <AuthLayout authentication>
                  <ChannelPlaylists />
                </AuthLayout>
              }
            />
            <Route
              path="subscribers"
              element={
                <AuthLayout authentication={false}>
                  <ChannelSubscribers />
                </AuthLayout>
              }
            />
            <Route
              path="tweets"
              element={
                <AuthLayout authentication>
                  <ChannelTweets />
                </AuthLayout>
              }
            />
          </Route>

          <Route
            path="/search/:query"
            element={
              <AuthLayout authentication={false}>
                <SearchVideos />
              </AuthLayout>
            }
          />

          <Route
            path="/history"
            element={
              <AuthLayout authentication>
                <History />
              </AuthLayout>
            }
          />

          <Route
            path="/liked-videos"
            element={
              <AuthLayout authentication>
                <LikedVideos />
              </AuthLayout>
            }
          />

          <Route
            path="/subscriptions"
            element={
              <AuthLayout authentication>
                <Subscriptions />
              </AuthLayout>
            }
          />
          <Route
            path="/collections"
            element={
              <AuthLayout authentication>
                <AdminDashboard />
              </AuthLayout>
            }
          />
          <Route
            path="/edit"
            element={
              <AuthLayout authentication>
                <EditChannel />
              </AuthLayout>
            }
          >
            <Route
              path="personalInfo"
              element={
                <AuthLayout authentication>
                  <EditPersonalInfo />
                </AuthLayout>
              }
            />
            <Route
              path="password"
              element={
                <AuthLayout authentication>
                  <ChangePassword />
                </AuthLayout>
              }
            />
          </Route>
        </Route>

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route
          path="/watch/:videoId"
          element={
            <AuthLayout authentication>
              <VideoDetails />
            </AuthLayout>
          }
        />
        <Route
          path="/terms&conditions"
          element={
            <AuthLayout authentication>
              <TermsAndConditions />
            </AuthLayout>
          }
        />
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        transition={bounce}
        toastClassName={"bg-black text-white rounded-none"}
      />
    </>
  );
};

export default App;
