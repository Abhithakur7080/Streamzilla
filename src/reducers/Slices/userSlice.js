import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axiosInstance";
import { toast } from "react-toastify";

const initialState = {
  loading: false,
  profileData: null,
  history: [],
};

export const getUserChannelProfile = createAsyncThunk(
  "getUserChannelProfile",
  async (username) => {
    try {
      const response = await axiosInstance.get(`/user/c/${username}`);
      return response.data;
    } catch (error) {
      toast.error(error?.response?.data?.message);
      throw error;
    }
  }
);
export const getWatchHistory = createAsyncThunk("getWatchHistory", async () => {
  try {
    const response = await axiosInstance.get("/user/watch-history");
    return response.data.data;
  } catch (error) {
    toast.error(error?.response?.data?.message);
    throw error;
  }
});

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUserChannelProfile.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getUserChannelProfile.fulfilled, (state, action) => {
      state.loading = false;
      state.profileData = action.payload.data;
    });
    builder.addCase(getWatchHistory.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getWatchHistory.fulfilled, (state, action) => {
      state.loading = false;
      state.history = action.payload;
    });
  },
});

export default userSlice.reducer;
