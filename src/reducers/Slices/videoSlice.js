import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { BASE_URL } from "../../constants";
import axiosInstance from "../../utils/axiosInstance";

const initialState = {
  loading: false,
  uploading: false,
  uploaded: false,
  videos: {
    docs: [],
    hasNextPage: false,
  },
  video: null,
  publishToggled: false,
};

export const getAllVideos = createAsyncThunk(
  "getAllVideos",
  async (data = {}) => {
    const { userId, sortBy, sortType, query, page, limit } = data;
    try {
      const url = new URL(`${BASE_URL}/video`);
      if (userId) url.searchParams.set("userId", userId);
      if (query) url.searchParams.set("query", query);
      if (page) url.searchParams.set("page", page);
      if (limit) url.searchParams.set("limit", limit);
      if (sortBy && sortType) {
        url.searchParams.set("sortBy", sortBy);
        url.searchParams.set("sortType", sortType);
      }
      const response = await axiosInstance.get(url);
      console.log(response)
      return response.data.data;
    } catch (error) {
      toast.error(error?.response?.data?.message);
      throw error;
    }
  }
);

export const publishAvideo = createAsyncThunk("publishAvideo", async (data) => {
  const formData = new FormData();
  formData.append("title", data.title);
  formData.append("description", data.description);
  formData.append("videoFile", data.videoFile[0]);
  formData.append("thumbnail", data.thumbnail[0]);

  try {
    const response = await axiosInstance.post("/video", formData);
    toast.success(response?.data?.message);
    return response.data.data;
  } catch (error) {
    toast.error(error?.response?.data?.message);
    throw error;
  }
});

export const updateAvideo = createAsyncThunk(
  "updateAvideo",
  async ({ videoId, data }) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("thumbnail", data.thumbnail[0]);

    try {
      const response = await axiosInstance.patch(`/video/${videoId}`, formData);
      toast.success(response?.data?.message);
      return response.data.data;
    } catch (error) {
      toast.error(error?.response?.data?.message);
      throw error;
    }
  }
);

export const deleteAvideo = createAsyncThunk(
  "deleteAvideo",
  async (videoId) => {
    try {
      const response = await axiosInstance.delete(`/video/${videoId}`);
      toast.success(response?.data?.message);
      return response.data.data;
    } catch (error) {
      toast.error(error?.response?.data?.message);
      throw error;
    }
  }
);
export const getVideoById = createAsyncThunk(
  "getVideoById",
  async (videoId) => {
    try {
      const response = await axiosInstance.get(`/video/${videoId}`);
      return response.data.data;
    } catch (error) {
      toast.error(error?.response?.data?.message);
      throw error;
    }
  }
);
export const togglePublishStatus = createAsyncThunk(
  "togglePublishStatus",
  async (videoId) => {
    try {
      const response = await axiosInstance.patch(
        `/video/toggle/publish/${videoId}`
      );
      toast.success(response?.data?.message);
      return response.data.data;
    } catch (error) {
      toast.error(error?.response?.data?.message);
      throw error;
    }
  }
);

const videoSlice = createSlice({
  name: "video",
  initialState,
  reducers: {
    updateUploadState: (state) => {
      state.uploading = false;
      state.uploaded = false;
    },
    makeVideosNull: (state) => {
      state.videos.docs = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllVideos.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getAllVideos.fulfilled, (state, action) => {
      state.loading = false;
      state.videos.docs = [...state.videos.docs, ...action.payload.docs];
      state.videos.hasNextPage = action.payload.hasNextPage;
    });
    builder.addCase(publishAvideo.pending, (state) => {
      state.uploading = true;
    });
    builder.addCase(publishAvideo.fulfilled, (state) => {
      state.uploading = false;
      state.uploaded = true;
    });
    builder.addCase(updateAvideo.pending, (state) => {
      state.uploading = true;
    });
    builder.addCase(updateAvideo.fulfilled, (state) => {
      state.uploading = false;
      state.uploaded = true;
    });
    builder.addCase(deleteAvideo.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteAvideo.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(getVideoById.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getVideoById.fulfilled, (state, action) => {
      state.loading = false;
      state.video = action.payload;
    });
    builder.addCase(togglePublishStatus.fulfilled, (state) => {
      state.publishToggled = !state.publishToggled;
    });
  },
});

export const { updateUploadState, makeVideosNull } = videoSlice.actions;

export default videoSlice.reducer;
