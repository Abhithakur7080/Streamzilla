import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import axiosInstance from "../../utils/axiosInstance";

const initialState = {
  loading: false,
  playlist: [],
  playlists: [],
};
export const createAplaylist = createAsyncThunk(
  "createAplaylist",
  async ({ name, description }) => {
    try {
      const response = await axiosInstance.post(`/playlist`, {
        name,
        description,
      });
      toast.success(response?.data?.message);
      return response.data.data;
    } catch (error) {
      toast.error(error?.response?.data?.message);
      throw error;
    }
  }
);
export const addVideoToplaylist = createAsyncThunk(
  "addVideoToplaylist",
  async ({ playlistId, videoId }) => {
    try {
      const response = await axiosInstance.patch(
        `/playlist/add/${videoId}/${playlistId}`
      );
      toast.success(response?.data?.message);
      
      return response.data.data;
    } catch (error) {
      toast.error(error?.response?.data?.message);
      throw error;
    }
  }
);
export const removeVideoFromplaylist = createAsyncThunk(
  "removeVideoFromplaylist",
  async ({ playlistId, videoId }) => {
    try {
      const response = await axiosInstance.patch(
        `/playlist/delete/${videoId}/${playlistId}`
      );
      toast.success(response?.data?.message);
      return response.data.data;
    } catch (error) {
      toast.error(error?.response?.data?.message);
      throw error;
    }
  }
);
export const getPlaylistById = createAsyncThunk(
  "getPlaylistById",
  async (playlistId) => {
    try {
      const response = await axiosInstance.get(`/playlist/${playlistId}`);
      return response.data.data;
    } catch (error) {
      toast.error(error?.response?.data?.message);
      throw error;
    }
  }
);
export const getUserPlaylists = createAsyncThunk(
  "getUserPlaylists",
  async (userId) => {
    try {
      const response = await axiosInstance.get(`/playlist/user/${userId}`);
      return response.data.data;
    } catch (error) {
      toast.error(error?.response?.data?.message);
      throw error;
    }
  }
);
export const updatePlaylist = createAsyncThunk(
  "updatePlaylist",
  async ({ playlistId, name, description }) => {
    try {
      const response = await axiosInstance.patch(`/playlist/${playlistId}`, {
        name,
        description,
      });
      toast.success(response?.data?.message);
      return response.data.data;
    } catch (error) {
      toast.error(error?.response?.data?.message);
      throw error;
    }
  }
);
export const deletePlaylist = createAsyncThunk(
  "deletePlaylist",
  async (playlistId) => {
    try {
      const response = await axiosInstance.delete(`/playlist/${playlistId}`);
      toast.success(response?.data?.message);
      return response.data.data;
    } catch (error) {
      toast.error(error?.response?.data?.message);
      throw error;
    }
  }
);

const playlistSlice = createSlice({
    name: "playlist",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getUserPlaylists.pending, (state) => {
            state.loading = false
        })
        builder.addCase(getUserPlaylists.fulfilled, (state, action) => {
            state.loading = false
            state.playlists = action.payload
        })
        builder.addCase(getPlaylistById.pending, (state) => {
            state.loading = false
        })
        builder.addCase(getPlaylistById.fulfilled, (state, action) => {
            state.loading = false
            state.playlist = action.payload
        })
    }
})
export default playlistSlice.reducer