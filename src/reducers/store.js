import { configureStore } from "@reduxjs/toolkit";
//slices
import authReducer from "./Slices/authSlice";
import userReducer from "./Slices/userSlice";
import likeReducer from "./Slices/likeSlice";
import videoReducer from "./Slices/videoSlice";
import tweetReducer from "./Slices/tweetSlice";
import commentReducer from "./Slices/commentSlice";
import playlistReducer from "./Slices/playlistSlice";
import dashboardReducer from "./Slices/dashboardSlice";
import subscriptionReducer from "./Slices/subscriptionSlice";
import loggerMiddleware from "./middlewares/loggermiddleware";

const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    like: likeReducer,
    video: videoReducer,
    tweet: tweetReducer,
    comment: commentReducer,
    playlist: playlistReducer,
    dashboard: dashboardReducer,
    subscription: subscriptionReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(loggerMiddleware),
});

export default store;
