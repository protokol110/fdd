import {configureStore} from "@reduxjs/toolkit";
import mainSlice from "./mainSlice";
import normativeSlice from "./normativeSlice";
import departmentSlice from "./departmentSlice";
import postSlice from "./postSlice";
import reportSlice from "./reportSlice";
import userSlice from "./userSlice";
import linksSlice from "./linksSlice";

export const store = configureStore({
  reducer: {
    main: mainSlice,
    normative: normativeSlice,
    department: departmentSlice,
    post: postSlice,
    report: reportSlice,
    user: userSlice,
    links: linksSlice
  },
});
