import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchUserOrders , updateUser , fetchUserInfo } from "./userAPI";

const initialState = {
  userInfo: null,
  userOrders: [],
  status: "idle",
};

export const fetchUserInfoAsync = createAsyncThunk(
  "user/fetchUserInfo",
  async (userId) => {
    const response = await fetchUserInfo(userId);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const fetchUserOrdersAsync = createAsyncThunk(
  "user/fetchUserOrdersAsync",
  async (userId) => {
    const response = await fetchUserOrders(userId);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const updateUserAsync = createAsyncThunk(
  "user/updateUser",
  async (update) => {
    const response = await updateUser(update);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,

  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchUserOrdersAsync.pending, (state) => {
        state.user = "loading";
      })
      .addCase(fetchUserOrdersAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.userOrders = action.payload;
      })
      .addCase(fetchUserInfoAsync.pending, (state) => {
        state.user = "loading";
      })
      .addCase(fetchUserInfoAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.userInfo = action.payload;
      })
      .addCase(updateUserAsync.pending, (state) => {
        state.user = "loading";
      })
      .addCase(updateUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.userInfo = action.payload;
      })
  },
});

export const userOrders = (state) => state.user.userOrders;
export const selectUserInfo = (state) => state.user.userInfo

export default userSlice.reducer;
