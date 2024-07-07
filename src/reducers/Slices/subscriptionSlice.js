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
export const getUserChannerlSubscribers = createAsyncThunk(
  "getUserChannerlSubscribers",
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
