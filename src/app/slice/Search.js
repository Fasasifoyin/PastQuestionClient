import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";
import { deleteQuestion, searchQuestion } from "../actions/Question";
import { toast } from "react-hot-toast";

const searchAdapter = createEntityAdapter({
  selectId: (e) => e._id,
});

const initialState = searchAdapter.getInitialState({
  status: "idle",
  error: null,
  currentPage: 0,
  totalPages: 0,
  totalQuestions: 0,
  deleteError: null,
});

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearchEmpty: (state) => {
      searchAdapter.setAll(state, []);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchQuestion.pending, (state) => {
        state.status = "pending";
      })
      .addCase(searchQuestion.fulfilled, (state, { payload }) => {
        state.status = "success";
        state.error = null;
        searchAdapter.upsertMany(state, payload.data);
        (state.currentPage = payload.currentPage),
          (state.totalPages = payload.totalPages),
          (state.totalQuestions = payload.totalQuestions);
      })
      .addCase(searchQuestion.rejected, (state, { payload }) => {
        state.status = "failed";
        state.error = payload;
      })
      .addCase(deleteQuestion.pending, (state) => {
        state.status = "pending";
      })
      .addCase(deleteQuestion.fulfilled, (state, { payload }) => {
        state.deleteError = null;
        state.status = "success";
        searchAdapter.removeOne(state, payload.id);
        toast.success("Deleted");
      })
      .addCase(deleteQuestion.rejected, (state, { payload }) => {
        state.status = "failed";
        state.deleteError = payload;
      });
  },
});

export const { selectById: searchId, selectIds: allSearchId } =
  searchAdapter.getSelectors((state) => state.search);

export const Status = (state) => state.search.status;
export const Error = (state) => state.search.error;
export const CurrentPage = (state) => state.search.currentPage;
export const TotalPages = (state) => state.search.totalPages;
export const TotalQuestions = (state) => state.search.totalQuestions;

export const { setSearchEmpty } = searchSlice.actions;

export default searchSlice.reducer;
