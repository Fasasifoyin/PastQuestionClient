import * as api from "../api";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { errorHandler } from "../error";
import { changeTimeUp, resetAnsweredQuestions } from "../slice/frontend";
import { toast } from "react-hot-toast";

export const getQuestions = createAsyncThunk(
  "/questions/getQuestions",
  async (query, { rejectWithValue }) => {
    try {
      const { navigate, dispatch, fullName, level, semester, course, topic } =
        query;
      const { data } = await api.GetQuestions({
        fullName,
        level,
        semester,
        course,
        topic,
      });
      if (data) {
        dispatch(changeTimeUp(false));
        dispatch(resetAnsweredQuestions());
        navigate("/quiz");
      }
      return data;
    } catch (error) {
      const errorMessage = errorHandler({ error, toast: true });
      return rejectWithValue(errorMessage);
    }
  }
);

export const createQuestion = createAsyncThunk(
  "/questions/createQuestion",
  async (body, { rejectWithValue }) => {
    try {
      const { data } = await api.CreateQuestion(body);
      toast.success(data);
      return data;
    } catch (error) {
      const errorMessage = errorHandler({ error, toast: true });
      return rejectWithValue(errorMessage);
    }
  }
);
