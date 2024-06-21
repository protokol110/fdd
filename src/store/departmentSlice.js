import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import instance from "../services/http.service";
import {getRuDate} from "../utils/utils";

const initialState = {
  loading: false,
  error: { show: false, text: "" },
  uprs: [],
  dep: {},
  about: {
    id: null,
    name: "",
    text: "",
    type: "",
  },
  orders: [],
  telSprData: [],
  telSprDataActive: "42.1",
  dataAbout: {
    id: null,
    name: "",
    text: "",
    type: "",
    podrs: [],
  },
  dataActive: 1,
};

export const getAllUpr = createAsyncThunk(
  "department/getAllUpr",
  async function (_, { dispatch, rejectWithValue }) {
    try {
      const res = await instance.get("/upravlen/all");
      dispatch(setUprs(res.data));
      return res.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getAllOrder = createAsyncThunk(
  "department/getAllOrder",
  async function (_, { dispatch, rejectWithValue }) {
    try {
      const res = await instance.get("/documabout/all");
      dispatch(setOrders(res.data));
      return res.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);


export const getDeportById = createAsyncThunk(
  "department/getDeportById",
  async function (id, { dispatch, rejectWithValue }) {
    try {
      const res = await instance.get(`/deport/${id}`);
      let data = res.data;
      data = { ...data, type: "dep" };
      dispatch(setDep(data));
      dispatch(setAbout(data));
      return res.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const postNewOrder = createAsyncThunk(
  "department/postNewOrder",
  async function ({ files, values }, { dispatch, rejectWithValue, getState }) {
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

      const res = await instance.post("/create/documabout", formData, {
        headers: {
          "Content-type": "multipart/form-data",
        },
      });

      // dispatch(clearOrder());
      dispatch(getAllOrder());
      return res.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);



export const getTelSpr = createAsyncThunk(
  "department/getTelSpr",
  async function (_, { dispatch, rejectWithValue }) {
    try {
      const res = await instance.get("/upravlen/structure");
      dispatch(setTelSprData(res.data));
      return res.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const delDepInfo = createAsyncThunk(
  "department/delDepInfo",
  async function ({ id, path }, { dispatch, rejectWithValue }) {
    let apiPath;
    switch (path) {
      case "/order":
        apiPath = "documabout";
        break;
      default:
        break;
    }

    try {
      const res = await instance.delete(`/delete/${apiPath}/${id}`);
      if (res.status === 200) {
        switch (path) {
          case "/order":
            dispatch(getAllOrder());
            break;
          default:
            break;
        }
      } else {
        dispatch(setError("Ошибка удаления записи!"));
      }
      return res.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const putAbout = createAsyncThunk(
  "department/putAbout",
  async function (values, { dispatch, rejectWithValue, getState }) {
    try {
      let res;
      let formData = new FormData();

      if (values.type === "dep") {
        formData.append("nameDeport", values.name);
        formData.append("textDeport", values.text);
        res = await instance.put(
          `/edit/deport/${process.env.REACT_APP_DEP_ID}`,
          formData,
          {
            headers: {
              "Content-type": "multipart/form-data",
            },
          }
        );
      } else {
        formData.append("icon", new File([], ""));
        formData.append("nameUpravlen", values.name);
        formData.append("textUpravlen", values.text);
        res = await instance.put(`/edit/upravlen/${values.id}`, formData, {
          headers: {
            "Content-type": "multipart/form-data",
          },
        });
      }

      dispatch(getDeportById(`${process.env.REACT_APP_DEP_ID}`));
      dispatch(getAllUpr());
      return res.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const departmentSlice = createSlice({
  name: "department",
  initialState,
  reducers: {
    setUprs: (state, action) => {
      state.uprs = action.payload;
      state.dataAbout.podrs = action.payload.map((e) => {
        return {...e, name: e.nameUpravlen, text: e.textUpravlen};
      });
    },
    setDep: (state, action) => {
      state.dep = action.payload;
      state.dataAbout.id = action.payload.id;
      state.dataAbout.name = action.payload.nameDeport;
      state.dataAbout.text = action.payload.textDeport;
      state.dataAbout.type = action.payload.type;
    },
    setAbout: (state, action) => {
      state.about.id = action.payload.id;
      state.about.name = action.payload.nameDeport;
      state.about.text = action.payload.textDeport;
      state.about.type = action.payload.type;
    },
    changeAbout: (state, action) => {
      const upr = state.uprs.find((e) => e.id === action.payload.payload);
      state.about.id = upr.id;
      state.about.name = upr.nameUpravlen;
      state.about.text = upr.textUpravlen;
      state.about.type = action.payload.type;
    },
    setOrders: (state, action) => {
      state.orders = action.payload;
    },
    setVacancies: (state, action) => {
      state.vacancies = action.payload;
    },
    setTelSprData: (state, action) => {
      state.telSprData = action.payload;
    },
    setTelSprActive: (state, action) => {
      state.telSprDataActive = action.payload;
    },
    setDataActive: (state, action) => {
      state.dataActive = action.payload;
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
    [getAllUpr.pending]: (state) => {
      state.loading = true;
      state.error = { show: false, text: "" };
    },
    [getAllUpr.fulfilled]: (state) => {
      state.loading = false;
    },
    [getAllUpr.rejected]: (state, action) => {
      state.loading = false;
      state.error.show = true;
      state.error.text = action.payload;
    },
    [getAllOrder.pending]: (state) => {
      state.loading = true;
      state.error = { show: false, text: "" };
    },
    [getAllOrder.fulfilled]: (state) => {
      state.loading = false;
    },
    [getAllOrder.rejected]: (state, action) => {
      state.loading = false;
      state.error.show = true;
      state.error.text = action.payload;
    },
    [getDeportById.pending]: (state) => {
      state.loading = true;
      state.error = { show: false, text: "" };
    },
    [getDeportById.fulfilled]: (state) => {
      state.loading = false;
    },
    [getDeportById.rejected]: (state, action) => {
      state.loading = false;
      state.error.show = true;
      state.error.text = action.payload;
    },
    [postNewOrder.pending]: (state) => {
      state.loading = true;
      state.error = { show: false, text: "" };
    },
    [postNewOrder.fulfilled]: (state) => {
      state.loading = false;
    },
    [postNewOrder.rejected]: (state, action) => {
      state.loading = false;
      state.error.show = true;
      state.error.text = action.payload;
    },
    [getTelSpr.pending]: (state) => {
      state.loading = true;
      state.error = { show: false, text: "" };
    },
    [getTelSpr.fulfilled]: (state) => {
      state.loading = false;
    },
    [getTelSpr.rejected]: (state, action) => {
      state.loading = false;
      state.error.show = true;
      state.error.text = action.payload;
    },
    [delDepInfo.pending]: (state) => {
      state.loading = true;
      state.error = { show: false, text: "" };
    },
    [delDepInfo.fulfilled]: (state) => {
      state.loading = false;
    },
    [delDepInfo.rejected]: (state, action) => {
      state.loading = false;
      state.error.show = true;
      state.error.text = action.payload;
    },
    [putAbout.pending]: (state) => {
      state.loading = true;
      state.error = { show: false, text: "" };
    },
    [putAbout.fulfilled]: (state) => {
      state.loading = false;
    },
    [putAbout.rejected]: (state, action) => {
      state.loading = false;
      state.error.show = true;
      state.error.text = action.payload;
    },
  },
});

export const {
  setUprs,
  setDep,
  setAbout,
  changeAbout,
  setOrders,
  setVacancies,
  setTelSprData,
  setTelSprActive,
  setDataActive,
  setError,
  clearError,
} = departmentSlice.actions;
export default departmentSlice.reducer;
