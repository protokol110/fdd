import {configureStore} from "@reduxjs/toolkit";
import mainSlice from "./mainSlice";
import normativeSlice from "./normativeSlice";
import departmentSlice from "./departmentSlice";
import postSlice from "./postSlice";
import reportSlice from "./reportSlice";

export const store = configureStore({
  reducer: {
    main: mainSlice,
    normative: normativeSlice,
    department: departmentSlice,
    post: postSlice,
    report: reportSlice,
  },
});
