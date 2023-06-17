import {
  createAsyncThunk,
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";
import { sleep } from "../../utils/sleep.js";
import { postApi } from "../../api/api.js";
import Fuse from "fuse.js";

export const postsData = createAsyncThunk(
  "postsSlice/getPosts",
  async (args, { rejectWithValue }) => {
    try {
      return postApi.getPosts();
    } catch (error) {
      rejectWithValue(error.response.data);
    }
  }
);

export const deletePost = createAsyncThunk(
  "postsSlice/deletePost",
  async (id, { rejectWithValue }) => {
    try {
      await postApi.deletePost(id);
      return id;
    } catch (error) {
      rejectWithValue(error.response.data);
    }
  }
);

export const loadMore = createAsyncThunk("postsSlice/loadMore", async () => {
  await sleep(200);
});

const postsSlice = createSlice({
  name: "postsSlice",
  initialState: {
    data: [],
    limit: 10,
    isSuccess: false,
    message: "",
    loading: false,
    deleting: [],
    searchTerm: "",
  },
  reducers: {
    setSearchTerm(state, { payload }) {
      state.searchTerm = payload;
    },
  },
  extraReducers: {
    [postsData.pending](state) {
      state.loading = true;
    },
    [postsData.fulfilled](state, { payload }) {
      state.loading = false;
      state.data = payload;
      state.isSuccess = true;
      state.message = "";
    },
    [postsData.rejected](state) {
      state.isSuccess = false;
      state.loading = false;
      state.message = "fail";
    },
    [loadMore.pending](state) {
      state.loading = true;
    },
    [loadMore.fulfilled](state) {
      state.limit += 10;
      state.loading = false;
    },
    [deletePost.pending](state, { meta }) {
      state.deleting.push(meta.arg);
    },
    [deletePost.fulfilled](state, { payload: id }) {
      state.data = state.data.filter((p) => p.id !== id);
      state.deleting = state.deleting.filter((p) => p !== id);
      state.limit -= 1;
    },
  },
});

const selectPostData = (state) => state.posts?.data ?? [];
const selectLimit = (state) => state.posts?.limit ?? 10;
const selectSearchTerm = (state) => state.posts?.searchTerm ?? "";

const selectUserMap = (state) => state.users.userMap ?? [];

const selectPostsWithUser = createSelector(
  [selectPostData, selectUserMap],
  (data, userMap) => {
    return data.map((post) => ({ ...post, user: userMap[post.userId] }));
  }
);

export const postsSelector = createSelector(
  [selectPostsWithUser, selectLimit, selectSearchTerm],
  (postsWithUser, limit, searchTerm) => {
    const posts = postsWithUser.slice(0, limit);

    if (!searchTerm) {
      return posts;
    }

    const fuse = new Fuse(posts, {
      keys: ["title", "user.name"],
    });

    return fuse.search(searchTerm).map((i) => i.item);
  }
);

const selectTotal = (state) => state.posts.data?.length;

export const hasMoreSelector = createSelector(
  [selectLimit, selectTotal],
  (limit, total) => limit < total
);

export default postsSlice;

export const { setSearchTerm } = postsSlice.actions;
