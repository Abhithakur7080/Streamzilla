import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import axiosInstance from "../../utils/axiosInstance";

const initialState = {
  loading: false,
  tweets: [],
};

export const createTweet = createAsyncThunk("createTweet", async (content) => {
  try {
    const response = await axiosInstance.post("/tweet", content );
    toast.success(response?.data?.message);
    return response.data.data;
  } catch (error) {
    toast.error(error?.response?.data?.message);
    throw error;
  }
});
export const editTweet = createAsyncThunk(
  "editTweet",
  async ({ tweetId, content }) => {
    try {
      const response = await axiosInstance.patch(`/tweet/${tweetId}`, {
        content,
      });
      toast.success(response?.data?.message);
      return response.data.data;
    } catch (error) {
      toast.error(error?.response?.data?.message);
      throw error;
    }
  }
);
export const deleteTweet = createAsyncThunk("deleteTweet", async (tweetId) => {
  try {
    const response = await axiosInstance.delete(`/tweet/${tweetId}`);
    toast.success(response?.data?.message);
    return response.data.data;
  } catch (error) {
    toast.error(error?.response?.data?.message);
    throw error;
  }
});
export const getUserTweets = createAsyncThunk(
  "getUserTweets",
  async (tweetId) => {
    try {
      const response = await axiosInstance.get(`/tweet/user/${tweetId}`);
      return response.data.data;
    } catch (error) {
      toast.error(error?.response?.data?.message);
      throw error;
    }
  }
);

const tweetSlice = createSlice({
  name: "tweet",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUserTweets.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getUserTweets.fulfilled, (state, action) => {
      state.loading = false;
      state.tweets = action.payload;
    });
    builder.addCase(createTweet.fulfilled, (state, action) => {
      state.tweets.unshift(action.payload);
    });
    builder.addCase(deleteTweet.fulfilled, (state, action) => {
      state.tweets = state.tweets.filter(
        (tweet) => tweet._id !== action.payload
      );
    });
  },
});

export default tweetSlice.reducer;
