import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import instance from "../services/http.service";

const initialState = {
  loading: false,
  error: {show: false, text: ""},
  reports: [],
  report: {},
  headers: [
    "Отчет",
    "Содержание",
    "Периодичность обновления",
    "Ответственный за обновление",
    "Архитектор данных",
    "Методология данных",
    "Действия",
  ],
};

export const getAllReports = createAsyncThunk(
  "report/getAllReports",
  async function (_, {dispatch, rejectWithValue}) {
    try {
      const res = await instance.get("/dashboard/all");
      dispatch(setReports(res.data));
      return res.data;
    } catch (error) {
      dispatch(setReports([]));
      return rejectWithValue(error);
    }
  }
);

export const getReportByID = createAsyncThunk(
  "report/getReportByID",
  async function ({id}, {dispatch, rejectWithValue}) {
    try {
      const res = await instance.get(`/dashboard/${id}`);
      dispatch(setReport(res.data));
      return res.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const postReport = createAsyncThunk(
  "report/postReport",
  async function ({values}, {dispatch, rejectWithValue}) {
    try {
      const res = await instance.post("/create/dashboard", values);
      dispatch(getAllReports());
      return res.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const putReport = createAsyncThunk(
  "report/putReport",
  async function ({values}, {dispatch, rejectWithValue}) {
    try {
      const res = await instance.put(`/edit/dashboard/${values.id}`, values);
      dispatch(getAllReports());
      return res.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const delReport = createAsyncThunk(
  "report/delReport",
  async function ({id}, {dispatch, rejectWithValue}) {
    try {
      const res = await instance.delete(`/delete/dashboard/${id}`);
      if (res.status === 200) {
        dispatch(getAllReports());
      } else {
        dispatch(setError("Ошибка удаления записи!"));
      }
      return res.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const reportSlice = createSlice({
  name: "report",
  initialState,
  reducers: {
    setReports: (state, action) => {
      state.reports = action.payload;
    },
    setReport: (state, action) => {
      state.report = action.payload;
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

  extraReducers: (builder) => {
    builder
      .addCase(getAllReports.pending, (state) => {
        state.loading = true;
        state.error = {show: false, text: ""};
      })
      .addCase(getAllReports.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(getAllReports.rejected, (state, action) => {
        state.loading = false;
        state.error.show = true;
        state.error.text = action.payload;
      })
      .addCase(getReportByID.pending, (state) => {
        state.loading = true;
        state.error = {show: false, text: ""};
      })
      .addCase(getReportByID.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(getReportByID.rejected, (state, action) => {
        state.loading = false;
        state.error.show = true;
        state.error.text = action.payload;
      })
      .addCase(postReport.pending, (state) => {
        state.loading = true;
        state.error = {show: false, text: ""};
      })
      .addCase(postReport.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(postReport.rejected, (state, action) => {
        state.loading = false;
        state.error.show = true;
        state.error.text = action.payload;
      })
      .addCase(putReport.pending, (state) => {
        state.loading = true;
        state.error = {show: false, text: ""};
      })
      .addCase(putReport.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(putReport.rejected, (state, action) => {
        state.loading = false;
        state.error.show = true;
        state.error.text = action.payload;
      })
      .addCase(delReport.pending, (state) => {
        state.loading = true;
        state.error = {show: false, text: ""};
      })
      .addCase(delReport.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(delReport.rejected, (state, action) => {
        state.loading = false;
        state.error.show = true;
        state.error.text = action.payload;
      });
  },
});

export const {
  setReports,
  setReport,
  setError,
  clearError,
} = reportSlice.actions;
export default reportSlice.reducer;
