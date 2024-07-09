import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import instance from "../services/http.service";

const initialState = {
  links: [],
  loading: false,
  linkDeleted: false,
  linkCreated: false,
  linkUpdated: false,
  error: {show: false, text: ""},
};

export const createLink = createAsyncThunk(
  "link/createLinks",
  async ({name, description}) => {
    const data = {
      name: name,
      description: description,
    };
    try {
      const res = await instance.post(`create/link`, data);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const getLinks = createAsyncThunk(
  "links/getLinks",
  async () => {
    try {
      const res = await instance.get(`links/all`);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  });

export const updateLink = createAsyncThunk(
  "link/updateLink",
  async ({name, description, id}) => {
    const data = {
      name: name,
      description: description,
      id: id,
    };
    try {
      const res = await instance.put(`edit/link`, data);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const deleteLink = createAsyncThunk(
  "link/deleteLink",
  async ({id}) => {
    try {
      const res = await instance.delete(`delete/link/${id}`);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
);

const linkSlice = createSlice({
  name: "linkSlice",
  initialState,
  reducers: {
    setLinkDeleted: (state, action) => {
      state.linkDeleted = action.payload;
    },
    setLinkCreated: (state, action) => { // новый редьюсер
      state.linkCreated = action.payload;
    },
    setLinkUpdated: (state, action) => { // новый редьюсер
      state.linkUpdated = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createLink.pending, (state) => {
        state.loading = true;
        state.linkCreated = true;
        state.error = {show: false, text: ""};
      })
      .addCase(createLink.fulfilled, (state, action) => {
        state.loading = false;
        state.error = {show: false, text: ""};
      })
      .addCase(createLink.rejected, (state) => {
        state.loading = false;
      })
      .addCase(getLinks.pending, (state) => {
        state.loading = true;
        state.error = {show: false, text: ""};
      })
      .addCase(getLinks.fulfilled, (state, action) => {
        state.loading = false;
        state.links = action.payload;
        state.error = {show: false, text: ""};
      })
      .addCase(getLinks.rejected, (state) => {
        state.loading = false;
      })
      .addCase(updateLink.pending, (state) => {
        state.loading = true;
        state.error = {show: false, text: ""};
      })
      .addCase(updateLink.fulfilled, (state) => {
        state.loading = false;
        state.linkUpdated = true;
        state.error = {show: false, text: ""};
      })
      .addCase(updateLink.rejected, (state) => {
        state.loading = false;
      })
      .addCase(deleteLink.pending, (state) => {
        state.loading = true;
        state.error = {show: false, text: ""};
      })
      .addCase(deleteLink.fulfilled, (state) => {
        state.loading = false;
        state.error = {show: false, text: ""};
        state.linkDeleted = true;
      })
      .addCase(deleteLink.rejected, (state) => {
        state.loading = false;
      });
  },
});
export const {setLinkDeleted, setLinkCreated, setLinkUpdated} = linkSlice.actions
export default linkSlice.reducer;
