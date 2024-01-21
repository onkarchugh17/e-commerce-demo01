import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createUser, checkUser, signOutUser } from "./authAPI";
import { updateUser } from "../UserData/userAPI";

const initialState = {
  loggedInUser: null,
  status: "idle",
  error: null,
};

export const createUserAsync = createAsyncThunk(
  "user/createUser",
  async (userData) => {
    const response = await createUser(userData);
    return response.data;
  }
);

export const checkUserAsync = createAsyncThunk(
  "user/checkUser",
  async (loginInfo, { rejectWithValue }) => {
    try {
      const response = await checkUser(loginInfo);
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const signOutUserAsync = createAsyncThunk(
  "user/signOutUser",
  async (userId) => {
    const response = await signOutUser(userId);
    return response.data;
  }
);

export const authSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.loggedInUser = action.payload;
    },
    setLogout: (state, action) => {
      localStorage.clear();
      state.loggedInUser = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(createUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.loggedInUser = action.payload;
      })
      .addCase(checkUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(checkUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.loggedInUser = action.payload;
        localStorage.setItem("userdata", JSON.stringify({ ...action.payload }));
        state.error = null;
      })
      .addCase(checkUserAsync.rejected, (state, action) => {
        state.status = "idle";
        state.error = action.payload.error;
      })

      .addCase(signOutUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(signOutUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        localStorage.clear();
        state.loggedInUser = null;
      });
  },
});

export const selectLoggedInUser = (state) => state.auth.loggedInUser;
export const selectError = (state) => state.auth.error;
export const { setUser } = authSlice.actions;

export default authSlice.reducer;
