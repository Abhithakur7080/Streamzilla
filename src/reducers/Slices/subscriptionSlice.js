import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import axiosInstance from "../../utils/axiosInstance";

const initialState = {
  loading: false,
  subscribed: null,
  channelSubscribers: [],
  mySubscriptions: [],
};

export const toggleSubscription = createAsyncThunk(
  "toggleSubscription",
  async (channelId) => {
    try {
      const response = await axiosInstance.post(`/subscription/c/${channelId}`);
      toast.success(response?.data?.messege);
      return response.data.data;
    } catch (error) {
      toast.error(error?.response?.data?.messege);
      throw error;
    }
  }
);
export const getSubscribedChannels = createAsyncThunk(
  "getSubscribedChannels",
  async (subscriberId) => {
    try {
      const response = await axiosInstance.get(
        `/subscription/u/${subscriberId}`
      );
      toast.success(response?.data?.messege);
      return response.data.data;
    } catch (error) {
      toast.error(error?.response?.data?.messege);
      throw error;
    }
  }
);
export const getUserChannelSubscribers = createAsyncThunk(
  "getUserChannelSubscribers",
  async (channelId) => {
    try {
      const response = await axiosInstance.get(`/subscription/c/${channelId}`);
      toast.success(response?.data?.messege);
      return response.data.data;
    } catch (error) {
      toast.error(error?.response?.data?.messege);
      throw error;
    }
  }
);
const subscriptionSlice = createSlice({
  name: "subscription",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(toggleSubscription.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(toggleSubscription.fulfilled, (state, action) => {
      state.loading = false;
      state.subscribed = action.payload;
    });
    builder.addCase(getSubscribedChannels.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getSubscribedChannels.fulfilled, (state, action) => {
      state.loading = false;
      state.mySubscriptions = action.payload.filter(
        (subscription) => subscription?.subscribedChannel?.latestVideo
      );
    });
    builder.addCase(getUserChannelSubscribers.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getUserChannelSubscribers.fulfilled, (state, action) => {
      state.loading = false;
      state.channelSubscribers = action.payload;
    });
  },
});

export default subscriptionSlice.reducer;
