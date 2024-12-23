import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import axiosInstance from "../../utils/axiosInstance";

const initialState = {
  loading: false,
  likedVideos: [],
};

export const toogleVideoLike = createAsyncThunk(
  "toogleVideoLike",
  async (videoId) => {
    try {
      const response = await axiosInstance.post(`/like/toggle/v/${videoId}`);
      return response.data.data;
    } catch (error) {
      toast.error(error?.response?.data?.message);
      throw error;
    }
  }
);
export const toogleCommentLike = createAsyncThunk(
  "toogleCommentLike",
  async (commentId) => {
    try {
      const response = await axiosInstance.post(`/like/toggle/c/${commentId}`);
      return response.data.data;
    } catch (error) {
      toast.error(error?.response?.data?.message);
      throw error;
    }
  }
);
export const toogleTweetLike = createAsyncThunk(
  "toogleTweetLike",
  async (tweetId) => {
    try {
      const response = await axiosInstance.post(`/like/toggle/t/${tweetId}`);
      return response.data.data;
    } catch (error) {
      toast.error(error?.response?.data?.message);
      throw error;
    }
  }
);
export const getLikedVideos = createAsyncThunk("getLikedVideos", async () => {
  try {
    const response = await axiosInstance.get(`/like/videos`);
    return response.data.data;
  } catch (error) {
    toast.error(error?.response?.data?.message);
    throw error;
  }
});

const likeSlice = createSlice({
  name: "like",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getLikedVideos.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getLikedVideos.fulfilled, (state, action) => {
      state.loading = false;
      state.likedVideos = action.payload;
    });
  },
});

export default likeSlice.reducer;
