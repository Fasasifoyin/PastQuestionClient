import { configureStore } from "@reduxjs/toolkit";
import frontendReducer from "./slice/frontend";
import questionReducer from "./slice/Question";
import searchReducer from "./slice/Search";

export const store = configureStore({
  reducer: {
    frontend: frontendReducer,
    question: questionReducer,
    search: searchReducer,
  },
});
