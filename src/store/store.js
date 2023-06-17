import { configureStore } from "@reduxjs/toolkit";
import postsSlice from "./slices/postsSlice";
import usersSlice from "./slices/user.slice.js";
const store = configureStore({
  reducer: {
    posts: postsSlice.reducer,
    users: usersSlice.reducer,
  },
});
export default store;
