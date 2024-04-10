import { configureStore } from "@reduxjs/toolkit";
import frontendReducer from "./slice/frontend";
import questionReducer from "./slice/Question";

export const store = configureStore({
  reducer: {
    frontend: frontendReducer,
    question: questionReducer,
  },
});
