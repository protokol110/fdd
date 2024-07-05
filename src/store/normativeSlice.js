import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import instance from "../services/http.service";
import {getRuDate} from "../utils/utils";

const initialState = {
  loading: false,
  error: {show: false, text: ""},
  PAHeaders: [
    "Дата утверждения",
    "Название документа",
    "Ссылки на документы",
    "Действия",
  ],
  PAHeadersUseful: [
    "Дата добавления",
    "Название документа",
    "Ссылки на документы",
    "Действия",
  ],
  NPAs: [],
  LPAs: [],
  usefuls: [],
};

export const getAllNPA = createAsyncThunk(
  "normative/getAllNPA",
  async function (_, {dispatch, rejectWithValue}) {
    try {
      const res = await instance.get("/documnormativ/all");
      dispatch(setNormativeData({type: "NPAs", data: res.data}));
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getAllUseful = createAsyncThunk(
  "normative/getAllUseful",
  async function (_, {dispatch, rejectWithValue}) {
    try {
      const res = await instance.get("/useful/all");
      dispatch(setNormativeData({type: "usefuls", data: res.data}));
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getAllLPA = createAsyncThunk(
  "normative/getAllLPA",
  async function (_, {dispatch, rejectWithValue}) {
    try {
      const res = await instance.get("/documlocal/all");
      dispatch(setNormativeData({type: "LPAs", data: res.data}));
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const postNewNPA = createAsyncThunk(
  "normative/postNewNPA",
  async function ({files, values}, {dispatch, rejectWithValue}) {
    try {
      let formData = new FormData();

      if (files === undefined) {
        return rejectWithValue("Не выбран файл для загрузки!");
      }

      for (let i = 0; i < files.length; i++) {
        formData.append("file", files[i]);
      }
      formData.append("nameDocument", values.nameDocument);
      formData.append("dateUtv", getRuDate(values.dateUtv));

      const res = await instance.post("/create/documlocal", formData, {
        headers: {
          "Content-type": "multipart/form-data",
        },
      });

      dispatch(getAllNPA());
      return res;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const postNewLPA = createAsyncThunk(
  "normative/postNewLPA",
  async function ({files, values}, {dispatch, rejectWithValue}) {
    try {
      let formData = new FormData();

      if (files === undefined) {
        return rejectWithValue("Не выбран файл для загрузки!");
      }

      for (let i = 0; i < files.length; i++) {
        formData.append("file", files[i]);
      }
      formData.append("nameDocument", values.nameDocument);
      formData.append("dateUtv", getRuDate(values.dateUtv));

      const res = await instance.post("/create/documnormativ", formData, {
        headers: {
          "Content-type": "multipart/form-data",
        },
      });

      dispatch(getAllLPA());
      return res;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const postNewUseful = createAsyncThunk(
  "normative/postNewUseful",
  async function ({files, values}, {dispatch, rejectWithValue}) {
    try {
      let formData = new FormData();

      if (files === undefined) {
        return rejectWithValue("Не выбран файл для загрузки!");
      }

      for (let i = 0; i < files.length; i++) {
        formData.append("files", files[i]);
      }
      formData.append("zagolovok", values.zagolovok);
      formData.append("strDelAttachUsefulFiles", "");

      const res = await instance.post("/create/useful", formData, {
        headers: {
          "Content-type": "multipart/form-data",
        },
      });

      dispatch(getAllUseful());
      return res;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const delNormative = createAsyncThunk(
  "normative/delNormative",
  async function ({id, path}, {dispatch, rejectWithValue}) {
    let apiPath;
    switch (path) {
      case "/educ":
        apiPath = "useful";
        break;
      case "/normative":
        apiPath = "documnormativ";
        break;
      case "/playbook":
        apiPath = "documlocal";
        break;
      case "/documents":
        apiPath = "documnormativ";
        break;
      default:
        break;
    }

    try {
      const res = await instance.delete(`/delete/${apiPath}/${id}`);
      if (res.status === 200) {
        switch (path) {
          case "/educ":
            dispatch(getAllNPA());
            break;
          case "/normative":
            dispatch(getAllNPA());
            break;
          case "/playbook":
            dispatch(getAllLPA());
            break;
          case "/documents":
            dispatch(getAllUseful());
            break;
          default:
            break;
        }
      } else {
        dispatch(setError("Ошибка удаления записи!"));
      }
      return res.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const normativeSlice = createSlice({
  name: "normative",
  initialState,
  reducers: {
    setNormativeData: (state, action) => {
      state[action.payload.type] = action.payload.data;
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
    [getAllNPA.pending]: (state) => {
      state.loading = true;
      state.error = {show: false, text: ""};
    },
    [getAllNPA.fulfilled]: (state) => {
      state.loading = false;
    },
    [getAllNPA.rejected]: (state, action) => {
      state.loading = false;
      state.error.show = true;
      state.error.text = action.payload;
    },
    [getAllUseful.pending]: (state) => {
      state.loading = true;
      state.error = {show: false, text: ""};
    },
    [getAllUseful.fulfilled]: (state) => {
      state.loading = false;
    },
    [getAllUseful.rejected]: (state, action) => {
      state.loading = false;
      state.error.show = true;
      state.error.text = action.payload;
    },
    [getAllLPA.pending]: (state) => {
      state.loading = true;
      state.error = {show: false, text: ""};
    },
    [getAllLPA.fulfilled]: (state) => {
      state.loading = false;
    },
    [getAllLPA.rejected]: (state, action) => {
      state.loading = false;
      state.error.show = true;
      state.error.text = action.payload;
    },
    [postNewNPA.pending]: (state) => {
      state.loading = true;
      state.error = {show: false, text: ""};
    },
    [postNewNPA.fulfilled]: (state) => {
      state.loading = false;
    },
    [postNewNPA.rejected]: (state, action) => {
      state.loading = false;
      state.error.show = true;
      state.error.text = action.payload;
    },
    [postNewLPA.pending]: (state) => {
      state.loading = true;
      state.error = {show: false, text: ""};
    },
    [postNewLPA.fulfilled]: (state) => {
      state.loading = false;
    },
    [postNewLPA.rejected]: (state, action) => {
      state.loading = false;
      state.error.show = true;
      state.error.text = action.payload;
    },
    [postNewUseful.pending]: (state) => {
      state.loading = true;
      state.error = {show: false, text: ""};
    },
    [postNewUseful.fulfilled]: (state) => {
      state.loading = false;
    },
    [postNewUseful.rejected]: (state, action) => {
      state.loading = false;
      state.error.show = true;
      state.error.text = action.payload;
    },
    [delNormative.pending]: (state) => {
      state.loading = true;
      state.error = {show: false, text: ""};
    },
    [delNormative.fulfilled]: (state) => {
      state.loading = false;
    },
    [delNormative.rejected]: (state, action) => {
      state.loading = false;
      state.error.show = true;
      state.error.text = action.payload;
    },
  },
});

export const {
  setNormativeData,
  setError,
  clearError,
} = normativeSlice.actions;
export default normativeSlice.reducer;
