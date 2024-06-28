import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axiosInstance";
import toast from "react-hot-toast";

const initialState = {
  loading: false,
  status: false,
  userData: null,
};

export const createAccount = createAsyncThunk("register", async (data) => {
  const formData = new FormData();
  formData.append("avatar", data.avatar[0]);
  formData.append("username", data.username);
  formData.append("email", data.email);
  formData.append("password", data.password);
  formData.append("fullName", data.fullName);
  if (data.coverImage) {
    formData.append("coverImage", data.coverImage[0]);
  }
  try {
    const response = await axiosInstance.post("/users/register", formData);
    toast.success(response.data?.messege);
    return response.data;
  } catch (error) {
    console.log(error?.response?.data?.messege);
    toast.error(error?.response?.data?.messege);
    throw error;
  }
});
export const userLogin = createAsyncThunk("login", async (data) => {
  try {
    const response = await axiosInstance.post("/users/login", data);
    toast.success(response.data?.messege);
    return response.data;
  } catch (error) {
    toast.error(error?.response?.data?.messege);
    throw error;
  }
});
export const userLogout = createAsyncThunk("logout", async () => {
  try {
    const response = await axiosInstance.post("/users/logout");
    console.log(response);
    return response.data;
  } catch (error) {
    console.log(error);
    toast.error(error?.response?.data?.messege);
    throw error;
  }
});

export const refreshAccessToken = createAsyncThunk(
  "refreshAccessToken",
  async (data) => {
    try {
      const response = await axiosInstance.post("/users/refresh-token", data);
      console.log(response.data);
      return response.data;
    } catch (error) {
      toast.error(error?.response?.data?.messege);
      throw error;
    }
  }
);
export const changePassword = createAsyncThunk(
  "changePassword",
  async (data) => {
    try {
      const response = await axiosInstance.post("/users/change-password", data);
      console.log(response.data);
      toast.success(response.data?.messege);
      return response.data;
    } catch (error) {
      toast.error(error?.response?.data?.messege);
      throw error;
    }
  }
);
export const getCurrentUser = createAsyncThunk("getCurrentUser", async () => {
  const response = await axiosInstance.get("/users/current-user");
  console.log(response.data);
  return response.data;
});
export const updateUserDetails = createAsyncThunk(
  "updateUserDetails",
  async (data) => {
    try {
      const response = await axiosInstance.patch("/users/update-account", data);
      console.log(response.data);
      toast.success(response.data?.messege);
      return response.data;
    } catch (error) {
      toast.error(error?.response?.data?.messege);
      throw error;
    }
  }
);
export const updateAvatar = createAsyncThunk("updateAvatar", async (avatar) => {
  try {
    const response = await axiosInstance.patch("/users/avatar", avatar);
    console.log(response.data);
    toast.success(response.data?.messege);
    return response.data;
  } catch (error) {
    toast.error(error?.response?.data?.messege);
    throw error;
  }
});
export const updateCoverImage = createAsyncThunk(
  "updateCoverImage",
  async (coverImg) => {
    try {
      const response = await axiosInstance.patch(
        "/users/cover-image",
        coverImg
      );
      console.log(response.data);
      toast.success(response.data?.messege);
      return response.data;
    } catch (error) {
      toast.error(error?.response?.data?.messege);
      throw error;
    }
  }
);
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createAccount.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createAccount.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(userLogin.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(userLogin.fulfilled, (state, action) => {
      state.loading = false;
      state.status = true;
      state.userData = action.payload;
    });
    builder.addCase(userLogout.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(userLogout.fulfilled, (state) => {
      state.loading = false;
      state.status = false;
      state.userData = null;
    });
    builder.addCase(getCurrentUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getCurrentUser.fulfilled, (state, action) => {
      state.loading = false;
      state.status = true;
      state.userData = action.payload;
    });
    builder.addCase(getCurrentUser.rejected, (state) => {
      state.loading = false;
      state.status = false;
      state.userData = null;
    });
    builder.addCase(updateUserDetails.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateUserDetails.fulfilled, (state, action) => {
      state.loading = false;
      state.userData = action.payload;
    });
    builder.addCase(updateAvatar.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateAvatar.fulfilled, (state, action) => {
      state.loading = false;
      state.userData = action.payload;
    });
    builder.addCase(updateAvatar.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(updateCoverImage.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateCoverImage.fulfilled, (state, action) => {
      state.loading = false;
      state.userData = action.payload;
    });
    builder.addCase(updateCoverImage.rejected, (state) => {
      state.loading = false;
    });
  },
});

export default authSlice.reducer