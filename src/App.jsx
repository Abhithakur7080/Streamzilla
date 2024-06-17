import React from "react";
import Layout from "./Layout";
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

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Homepage />} />

        {/* channel routes */}
        <Route path="channel/:username" element={<Channel />}>
          <Route path="videos" element={<ChannelVideos />} />
          <Route path="playlists" element={<ChannelPlaylists />} />
          <Route path="subscribers" element={<ChannelSubscribers />} />
          <Route path="tweets" element={<ChannelTweets />} />
        </Route>

        <Route path="/search/:query" element={<SearchVideos />} />

        <Route path="/history" element={<History />} />

        <Route path="/liked-videos" element={<LikedVideos />} />

        <Route path="/subscriptions" element={<Subscriptions />} />

        <Route path="/edit" element={<EditChannel />}>
          <Route path="personalInfo" element={<EditPersonalInfo />} />
          <Route path="password" element={<ChangePassword />} />
        </Route>
      </Route>

      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      <Route path="/watch/:videoId" element={<VideoDetails />} />
      <Route path="/collections" element={<AdminDashboard />} />
      <Route path="/terms&conditions" element={<TermsAndConditions />} />
    </Routes>
  );
};

export default App;
