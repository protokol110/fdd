import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import instance from "../services/http.service";

const initialState = {
  users: [],
  loading: false,
  user: [],
  error: {show: false, text: ""},
};

export const createUser = createAsyncThunk(
  "user/createUser",
  async ({name, phone, description, position, idDep}) => {
    const data = {
      name: name,
      phone: phone,
      description: description,
      position: position,
      idDeport: idDep,
    };
    try {
      const res = await instance.post(`create/user`, data);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const getUsers = createAsyncThunk("user/getUser", async () => {
  try {
    const res = await instance.get(`users/all`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
});

export const getUsersById = createAsyncThunk(
  "user/getUsersById",
  async ({id}) => {
    try {
      const res = await instance.get(`users/${id}`);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  });

export const updateUser = createAsyncThunk(
  "user/updateUser",
  async ({id, name, phone, description, position, idDep}) => {
    const data = {
      id: id,
      name: name,
      phone: phone,
      description: description,
      position: position,
      idDeport: idDep,
    };
    try {
      const res = await instance.put(`edit/user`, data);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const deleteUser = createAsyncThunk(
  "user/deleteUser",
  async ({id}) => {
    try {
      const res = await instance.delete(`delete/user/${id}`);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
);

const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createUser.pending, (state) => {
        state.loading = true;
        state.error = {show: false, text: ""};
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
        state.error = {show: false, text: ""};
      })
      .addCase(createUser.rejected, (state) => {
        state.loading = false;
      })
      .addCase(getUsers.pending, (state) => {
        state.loading = true;
        state.error = {show: false, text: ""};
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        console.log('Fetched users:', action.payload);
        state.loading = false;
        state.users = action.payload;
        state.error = {show: false, text: ""};
      })
      .addCase(getUsers.rejected, (state) => {
        state.loading = false;
      })
      .addCase(getUsersById.pending, (state) => {
        state.loading = true;
        state.error = {show: false, text: ""};
      })
      .addCase(getUsersById.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.error = {show: false, text: ""};
      })
      .addCase(getUsersById.rejected, (state) => {
        state.loading = false;
      })
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
        state.error = {show: false, text: ""};
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        state.error = {show: false, text: ""};
      })
      .addCase(updateUser.rejected, (state) => {
        state.loading = false;
      })
      .addCase(deleteUser.pending, (state) => {
        state.loading = true;
        state.error = {show: false, text: ""};
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.loading = false;
        state.error = {show: false, text: ""};
      })
      .addCase(deleteUser.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default userSlice.reducer;
