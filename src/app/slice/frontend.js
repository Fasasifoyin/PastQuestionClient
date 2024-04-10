import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  timeUp: false,
  answeredQuestion: [],
  score: 0,
  authorized: 0,
};

const frontendSlice = createSlice({
  name: "frontend",
  initialState,
  reducers: {
    addOrUpdateAnsweredObject: (state, action) => {
      const index = state.answeredQuestion.findIndex(
        (each) => each.id === action.payload.id
      );

      if (index !== -1) {
        const updatedData = [...state.answeredQuestion];
        updatedData[index] = action.payload;
        state.answeredQuestion = updatedData;
      } else {
        state.answeredQuestion.push(action.payload);
      }

      state.score = state.answeredQuestion.filter(
        (each) => each.option.isCorrect === true
      ).length;
    },

    changeTimeUp: (state, { payload }) => {
      state.timeUp = payload;
    },
    resetAnsweredQuestions: (state) => {
      state.answeredQuestion = [];
      state.score = 0;
    },
    changeAuthorize: (state) => {
      state.authorized = state.authorized + 1;
    },
  },
});

export const AnsweredQuestions = (state) => state.frontend.answeredQuestion;
export const Score = (state) => state.frontend.score;
export const TimeUp = (state) => state.frontend.timeUp;
export const Authorized = (state) => state.frontend.authorized;

export const {
  addOrUpdateAnsweredObject,
  changeTimeUp,
  resetAnsweredQuestions,
  changeAuthorize,
} = frontendSlice.actions;

export default frontendSlice.reducer;
