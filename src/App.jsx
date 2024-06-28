import React from "react";
import Layout from "./Layout";
import { Toaster } from "react-hot-toast";
import { Route, Routes } from "react-router-dom";
import {
  AdminDashboard,
  ChangePassword,
  Channel,
  ChannelPlaylists,
  ChannelSubscribers,
  ChannelTweets,
  ChannelVideos,
  EditChannel,
  EditPersonalInfo,
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
import { AuthLayout, LoginPopup } from "./components";
import LoginSkeleton from "./skeletons/LoginSkeleton";

const App = () => {
  return (
    <>
      {/* <Routes>
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

        <Route
          path="/login"
          element={
            <AuthLayout authentication={false}>
              <Channel />
            </AuthLayout>
          }
        />
        <Route
          path="/signup"
          element={
            <AuthLayout authentication={false}>
              <Channel />
            </AuthLayout>
          }
        />

        <Route
          path="/watch/:videoId"
          element={
            <AuthLayout authentication>
              <VideoDetails />
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
          path="/terms&conditions"
          element={
            <AuthLayout authentication>
              <TermsAndConditions />
            </AuthLayout>
          }
        />
      </Routes> */}
      {/* <Login/> */}
      {/* <Signup/> */}
      {/* <LoginPopup/> */}
      <LoginSkeleton/>
      <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{
          error: {
            style: {
              borderRadius: 0,
              color: "#fff",
              background: "#222",
            },
          },
          success: {
            style: {
              borderRadius: 0,
              color: "#fff",
              background: "#222",
            },
          },
          duration: 4000,
        }}
      />
    </>
  );
};

export default App;
