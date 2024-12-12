import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BASE_URL } from "../../constants";
import { toast } from "react-toastify";
import axiosInstance from "../../utils/axiosInstance";

const initialState = {
  loading: false,
  comments: [],
  totalComments: "No",
  hasNextPage: false,
};

export const createAcomment = createAsyncThunk(
  "createAcomment",
  async ({ videoId, content }) => {

    try {
      const response = await axiosInstance.post(`/comment/${videoId}`, {
        content,
      });
      return response.data.data;
    } catch (error) {
      toast.error(error?.response?.data?.message);
      throw error;
    }
  }
);
export const editAcomment = createAsyncThunk(
  "editAcomment",
  async ({ commentId, content }) => {
    try {
      const response = await axiosInstance.patch(`/comment/c/${commentId}`, {
        content,
      });
      return response.data.data;
    } catch (error) {
      toast.error(error?.response?.data?.message);
      throw error;
    }
  }
);
export const deleteAcomment = createAsyncThunk(
  "deleteAcomment",
  async (commentId) => {
    try {
      const response = await axiosInstance.delete(`/comment/c/${commentId}`);
      return response.data.data;
    } catch (error) {
      toast.error(error?.response?.data?.message);
      throw error;
    }
  }
);
export const getVideoComments = createAsyncThunk(
  "getVideoComments",
  async ({ videoId, page, limit }) => {
    const url = new URL(`${BASE_URL}/comment/${videoId}`);
    if (page) url.searchParams.set("page", page);
    if (limit) url.searchParams.set("limit", limit);
    try {
      const response = await axiosInstance.get(url);
      return response.data.data;
    } catch (error) {
      toast.error(error?.response?.data?.message);
      throw error;
    }
  }
);

const commentSlice = createSlice({
  name: "comment",
  initialState,
  reducers: {
    cleanUpComments: (state) => {
      state.comments = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getVideoComments.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getVideoComments.fulfilled, (state, action) => {
      state.loading = false;
      state.comments = [...state.comments, ...action.payload.docs];
      state.totalComments = action.payload.totalDocs;
      state.hasNextPage = action.payload.hasNextPage;
    });
    builder.addCase(createAcomment.fulfilled, (state, action) => {
      state.comments.unshift(action.payload);
      state.totalComments++;
    });
    builder.addCase(deleteAcomment.fulfilled, (state, action) => {
      state.comments = state.comments.filter(
        (comment) => comment._id !== action.payload.commentId
      );
      state.totalComments--;
    });
  },
});

export const { cleanUpComments } = commentSlice.actions;

export default commentSlice.reducer;
