import { createSlice } from "@reduxjs/toolkit";
import { createQuestion, getQuestions } from "../actions/Question";

const initialState = {
  questions: [],
  status: "idle",
  error: null,
  numberOfQuestions: 0,
  info: {
    fullName: "",
    level: 0,
    semester: "",
    course: "",
    topic: "",
  },
};

const questionSlice = createSlice({
  name: "questions",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getQuestions.pending, (state) => {
      state.status = "pending";
    });
    builder.addCase(getQuestions.fulfilled, (state, { payload }) => {
      state.status = "success";
      state.error = null;
      (state.questions = payload.data),
        (state.numberOfQuestions = payload.data.length);
      state.info = payload.info;
    });
    builder.addCase(getQuestions.rejected, (state, { payload }) => {
      state.status = "failed";
      state.error = payload;
    });
    builder.addCase(createQuestion.pending, (state) => {
      state.status = "pending";
    });
    builder.addCase(createQuestion.fulfilled, (state) => {
      state.status = "success";
    });
    builder.addCase(createQuestion.rejected, (state) => {
      state.status = "failed";
    });
  },
});

export const Question = (state) => state.question.questions;
export const Status = (state) => state.question.status;
export const Error = (state) => state.question.error;
export const NumberOfQuestions = (state) => state.question.numberOfQuestions;
export const Info = (state) => state.question.info;

export default questionSlice.reducer;
