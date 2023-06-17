import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { userApi } from "../../api/api.js";

export const getUsersThunk = createAsyncThunk(
  "userSlice/getUsers",
  async (args, { rejectWithValue }) => {
    try {
      return await userApi.getUsers();
    } catch (error) {
      rejectWithValue(error.response.data);
    }
  }
);

const usersSlice = createSlice({
  name: "usersSlice",
  initialState: {
    users: [],
    userMap: {},
    isSuccess: false,
    message: "",
    loading: false,
  },
  reducers: {},
  extraReducers: {
    [getUsersThunk.pending](state) {
      state.loading = true;
    },
    [getUsersThunk.fulfilled](state, { payload }) {
      state.loading = false;
      state.users = payload;
      state.userMap = Object.fromEntries(
        payload.map((user) => [user.id, user])
      );
      state.isSuccess = true;
      state.message = "";
    },
    [getUsersThunk.rejected](state) {
      state.isSuccess = false;
      state.loading = false;
      state.message = "fail";
    },
  },
});

export default usersSlice;
