import { configureStore } from "@reduxjs/toolkit";
//slices
import authReducer from "./Slices/authSlice";
import userReducer from "./Slices/userSlice";
import videoReducer from "./Slices/videoSlice";
import tweetReducer from "./Slices/tweetSlice";
import commentReducer from "./Slices/commentSlice";
import dashboardReducer from "./Slices/dashboardSlice";
import likeReducer from "./Slices/likeSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    video: videoReducer,
    tweet: tweetReducer,
    comment: commentReducer,
    dashboard: dashboardReducer,
    like: likeReducer,
  },
});
export default store;
