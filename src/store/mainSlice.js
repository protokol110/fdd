import {createSlice} from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  error: {
    show: false,
    text: "",
  },
  headerCategory: [
    {
      id: 1,
      label: "Главная",
      link: "/",
      children: [],
    },
    {
      id: 2,
      label: "Контакты",
      link: "/contacts",
      children: [],
    },
    {
      id: 3,
      label: "Новости",
      link: "/posts",
      children: [
        {id: 1, label: "Актуально", link: "/actual"},
        {id: 2, label: "Архив", link: "/arh"},
      ],
    },
    {
      id: 4,
      label: "Нормативно-методологический блок",
      link: "/educ",
      children: [
        {id: 1, label: "Документы...", link: "/documents"},
        {id: 2, label: "SOC playbook", link: "/playbook"},
        {id: 3, label: "Материалы обучения", link: "/educ"},
      ],
    },
    {
      id: 5,
      label: "Ссылки",
      link: "/links",
      children: [],
    },
  ],
  activeCategory: {
    header: {},
    child: {},
  },
  toolbar: {
    options: [
      "inline",
      "fontSize",
      "fontFamily",
      "list",
      "textAlign",
      "link",
      "image",
      "history",
      "colorPicker",
      "emoji",
    ],
    inline: {
      options: [
        "bold",
        "italic",
        "underline",
        "strikethrough",
        "superscript",
        "subscript",
      ],
    },
    fontSize: {
      className: "rtFontColor",
      options: [8, 9, 10, 11, 12, 14, 16, 18, 24, 30, 36, 48, 60, 72, 96],
    },
    fontFamily: {
      className: "rtFontColor",
      options: [
        "Arial",
        "Georgia",
        "Impact",
        "Tahoma",
        "Times New Roman",
        "Verdana",
      ],
    },
    list: {
      options: ["unordered", "ordered", "indent", "outdent"],
    },
    textAlign: {
      options: ["left", "center", "right", "justify"],
    },
    link: {
      options: ["link", "unlink"],
    },
    image: {
      urlEnabled: true,
      uploadEnabled: true,
      inputAccept: "image/gif,image/jpeg,image/jpg,image/png,image/svg",
    },
    history: {
      options: ["undo", "redo"],
    },
  },
};

const mainSlice = createSlice({
  name: "main",
  initialState,
  reducers: {
    changeCategory: (state, action) => {
      const header = state.headerCategory.find(
        (e) => e.link === action.payload.headerLink
      );

      const child = header.children.find(
        (e) => e.link === action.payload.childLink
      );

      state.activeCategory.header = header;
      state.activeCategory.child = child;
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
  extraReducers: {},
});

export const {changeCategory, setError, clearError} = mainSlice.actions;
export default mainSlice.reducer;
