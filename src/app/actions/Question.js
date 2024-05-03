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
      const {
        question,
        options,
        level,
        semester,
        course,
        topic,
        code,
        resetForm,
      } = body;
      const { data } = await api.CreateQuestion({
        question,
        options,
        level,
        semester,
        course,
        topic,
        code,
      });
      if (data.message) {
        toast.success(data.message);
        // resetForm();
      }
      return data;
    } catch (error) {
      const errorMessage = errorHandler({ error, toast: true });
      return rejectWithValue(errorMessage);
    }
  }
);

export const searchQuestion = createAsyncThunk(
  "/search/searchQuestion",
  async (query, { rejectWithValue }) => {
    try {
      const { data } = await api.SearchQuestions(query);
      return data;
    } catch (error) {
      const errorMessage = errorHandler({ error });
      return rejectWithValue(errorMessage);
    }
  }
);

export const deleteQuestion = createAsyncThunk(
  "/search/deleteQuestion",
  async (query, { rejectWithValue }) => {
    try {
      const { data } = await api.DeleteQuestion(query);
      return data;
    } catch (error) {
      const errorMessage = errorHandler({ error, toast: true });
      return rejectWithValue(errorMessage);
    }
  }
);

export const editQuestion = createAsyncThunk(
  "/questions/editQuestion",
  async (body, { rejectWithValue }) => {
    const {
      question,
      options,
      level,
      semester,
      course,
      topic,
      code,
      id,
      navigate,
    } = body;

    try {
      const { data } = await api.EditQuestion({
        question,
        options,
        level,
        semester,
        course,
        topic,
        code,
        id,
      });
      if (data.message) {
        toast.success(data.message);
        navigate("/allquestions");
      }
      return data;
    } catch (error) {
      const errorMessage = errorHandler({ error, toast: true });
      return rejectWithValue(errorMessage);
    }
  }
);
