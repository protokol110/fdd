import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import instance from "../services/http.service";

const initialState = {
  loading: false,
  error: {show: false, text: ""},
  posts: [],
  postsArh: [],
  postsArhYears: [],
  postsPage: [],
  postsSearch: [],
  currPage: 1,
  currArhYear: 2024,
  totalPages: 1,
  postsOnPage: 6,
  post: {},
  search: "",
  searchStatus: false,
};

export const getAllPostsByDesc = createAsyncThunk(
  "post/getAllPostsByDesc",
  async function (_, {dispatch, rejectWithValue}) {
    try {
      const res = await instance.get("/news/alldesc");
      dispatch(setPosts(res.data));
      dispatch(setPostsPage("posts"));
      return res.data;
    } catch (error) {
      dispatch(setPosts([]));
      dispatch(setPostsPage("posts"));
      return rejectWithValue(error);
    }
  }
);

export const getArhPostsByDesc = createAsyncThunk(
  "post/getArhPostsByDesc",
  async function ({isInitial}, {dispatch, rejectWithValue, getState}) {
    try {
      const res = await instance.get("/news/arhdesc");
      dispatch(setPostsArh({data: res.data, isInitial}));
      dispatch(
        setPostsArhPage({
          posts: getState().post.postsArh,
          year: getState().post.currArhYear,
        })
      );
      return res.data;
    } catch (error) {
      dispatch(setPostsArh([]));
      dispatch(
        setPostsArhPage({
          posts: getState().post.postsArh,
          year: getState().post.currArhYear,
        })
      );
      return rejectWithValue(error);
    }
  }
);

export const getTop6Posts = createAsyncThunk(
  "post/getTop6Posts",
  async function (_, {dispatch, rejectWithValue}) {
    try {
      const res = await instance.get("/news/top");
      dispatch(setPosts(res.data));
      return res.data;
    } catch (error) {
      dispatch(setPosts([]));
      return rejectWithValue(error);
    }
  }
);

export const getPostByID = createAsyncThunk(
  "post/getPostByID",
  async function (id, {dispatch, rejectWithValue}) {
    try {
      const res = await instance.get(`/news/${id}`);
      dispatch(setPost(res.data));
      return res.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getSearch = createAsyncThunk(
  "post/getSearch",
  async function (_, {dispatch, rejectWithValue, getState}) {
    try {
      const search = getState().post.search;
      const res = await instance.get(`/news/search/${search}`);
      dispatch(setPostsSearch(res.data));
      dispatch(setPostsPage("postsSearch"));
      dispatch(clearSearch());
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const postNewPost = createAsyncThunk(
  "post/postNewPost",
  async function ({icon, content, values}, {dispatch, rejectWithValue}) {
    try {
      let formData = new FormData();

      if (icon.length > 0) {
        for (let i = 0; i < icon.length; i++) {
          formData.append("mainIcon", icon[i]);
        }
      } else {
        formData.append("mainIcon", new File([], ""));
      }
      formData.append("headline", values.headline);
      formData.append("shortText", values.shortText);
      formData.append("content", content);

      const res = await instance.post("/create/news", formData, {
        headers: {
          "Content-type": "multipart/form-data",
        },
      });

      dispatch(getAllPostsByDesc());
      return res.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const editPost = createAsyncThunk(
  "post/editPost",
  async function (
    {id, icon, content, values},
    {dispatch, rejectWithValue}
  ) {
    try {
      let formData = new FormData();

      if (icon.length > 0) {
        for (let i = 0; i < icon.length; i++) {
          formData.append("mainIcon", icon[i]);
        }
      } else {
        formData.append("mainIcon", new File([], ""));
      }
      formData.append("headline", values.headline);
      formData.append("shortText", values.shortText);
      formData.append("content", content);

      const res = await instance.put(`/edit/news/${id}`, formData, {
        headers: {
          "Content-type": "multipart/form-data",
        },
      });

      dispatch(getAllPostsByDesc());
      return res.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const clearIcon = createAsyncThunk(
  "post/clearIcon",
  async function ({id, content, values}, {dispatch, rejectWithValue}) {
    try {
      let formData = new FormData();

      formData.append("mainIcon", new File([], ""));
      formData.append("headline", values.headline);
      formData.append("shortText", values.shortText);
      formData.append("content", content);

      const res = await instance.put(`/edit/news/clearicon/${id}`, formData, {
        headers: {
          "Content-type": "multipart/form-data",
        },
      });

      dispatch(getPostByID(id));
      return res.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const delPost = createAsyncThunk(
  "post/delPost",
  async function (id, {dispatch, rejectWithValue}) {
    try {
      const res = await instance.delete(`/delete/news/${id}`);
      if (res.status === 200) {
        dispatch(getAllPostsByDesc());
      } else {
        dispatch(setError("Ошибка удаления записи!"));
      }
      return res.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    setPost: (state, action) => {
      state.post = action.payload;
    },
    setPosts: (state, action) => {
      state.posts = action.payload;
    },
    setPostsArh: (state, action) => {
      if (action.payload.data.length > 0) {
        const years = action.payload.data.map((post) => {
          return post.publishYear;
        });
        const uniqueYears = new Set(years);
        state.postsArhYears = Array.from(uniqueYears);
        if (action.payload.isInitial) {
          state.currArhYear = Array.from(uniqueYears)[0];
        }
      }
      state.postsArh = action.payload.data;
    },
    setPostsSearch: (state, action) => {
      state.postsSearch = action.payload;
    },
    setPostsPage: (state, action) => {
      if (state[action.payload].length > 0) {
        state.postsPage = state[action.payload].slice(
          (state.currPage - 1) * state.postsOnPage,
          state.currPage * state.postsOnPage
        );
        state.totalPages = Math.ceil(
          state[action.payload].length / state.postsOnPage
        );
      } else {
        state.postsPage = [];
        state.totalPages = 1;
      }
    },
    setPostsArhPage: (state, action) => {
      if (action.payload.posts.length > 0) {
        const currYearPosts = action.payload.posts.filter((post) => {
          if (post.publishYear === action.payload.year) {
            return post;
          }
        });
        state.postsPage = currYearPosts.slice(
          (state.currPage - 1) * state.postsOnPage,
          state.currPage * state.postsOnPage
        );
        state.totalPages = Math.ceil(currYearPosts.length / state.postsOnPage);
      } else {
        state.postsPage = [];
        state.totalPages = 1;
      }
    },
    setCurrPage: (state, action) => {
      state.currPage = action.payload;
    },
    changeSearch: (state, action) => {
      state.search = action.payload;
    },
    changeCurrArhYear: (state, action) => {
      state.currArhYear = action.payload;
    },
    clearSearch: (state) => {
      state.search = "";
    },
    changeSearchStatus: (state) => {
      state.searchStatus = !state.searchStatus;
    },
    setError: (state, action) => {
      state.error.show = true;
      state.error.text = action.payload;
    },
    clearError: (state) => {
      state.error.show = false;
      state.error.text = "";
    },
  },
  extraReducers: {
    [getAllPostsByDesc.pending]: (state) => {
      state.loading = true;
      state.error = {show: false, text: ""};
    },
    [getAllPostsByDesc.fulfilled]: (state) => {
      state.loading = false;
    },
    [getAllPostsByDesc.rejected]: (state, action) => {
      state.loading = false;
      state.error.show = true;
      state.error.text = action.payload;
    },
    [getArhPostsByDesc.pending]: (state) => {
      state.loading = true;
      state.error = {show: false, text: ""};
    },
    [getArhPostsByDesc.fulfilled]: (state) => {
      state.loading = false;
    },
    [getArhPostsByDesc.rejected]: (state, action) => {
      state.loading = false;
      state.error.show = true;
      state.error.text = action.payload;
    },
    [getTop6Posts.pending]: (state) => {
      state.loading = true;
      state.error = {show: false, text: ""};
    },
    [getTop6Posts.fulfilled]: (state) => {
      state.loading = false;
    },
    [getTop6Posts.rejected]: (state, action) => {
      state.loading = false;
      state.error.show = true;
      state.error.text = action.payload;
    },
    [getPostByID.pending]: (state) => {
      state.loading = true;
      state.error = {show: false, text: ""};
    },
    [getPostByID.fulfilled]: (state) => {
      state.loading = false;
    },
    [getPostByID.rejected]: (state, action) => {
      state.loading = false;
      state.error.show = true;
      state.error.text = action.payload;
    },
    [postNewPost.pending]: (state) => {
      state.loading = true;
      state.error = {show: false, text: ""};
    },
    [postNewPost.fulfilled]: (state) => {
      state.loading = false;
    },
    [postNewPost.rejected]: (state, action) => {
      state.loading = false;
      state.error.show = true;
      state.error.text = action.payload;
    },
    [editPost.pending]: (state) => {
      state.loading = true;
      state.error = {show: false, text: ""};
    },
    [editPost.fulfilled]: (state) => {
      state.loading = false;
    },
    [editPost.rejected]: (state, action) => {
      state.loading = false;
      state.error.show = true;
      state.error.text = action.payload;
    },
    [getSearch.pending]: (state) => {
      state.loading = true;
      state.error = {show: false, text: ""};
    },
    [getSearch.fulfilled]: (state) => {
      state.loading = false;
    },
    [getSearch.rejected]: (state, action) => {
      state.loading = false;
      state.error.show = true;
      state.error.text = action.payload;
    },
    [delPost.pending]: (state) => {
      state.loading = true;
      state.error = {show: false, text: ""};
    },
    [delPost.fulfilled]: (state) => {
      state.loading = false;
    },
    [delPost.rejected]: (state, action) => {
      state.loading = false;
      state.error.show = true;
      state.error.text = action.payload;
    },
  },
});

export const {
  setPost,
  setPosts,
  setPostsArh,
  setPostsSearch,
  setPostsPage,
  setPostsArhPage,
  setCurrPage,
  changeSearch,
  changeCurrArhYear,
  setError,
  clearError,
  clearSearch,
  changeSearchStatus,
} = postSlice.actions;
export default postSlice.reducer;
