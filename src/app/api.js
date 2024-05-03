import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_APP_API_KEY,
});

export const GetQuestions = (query) =>
  API.get(
    `/api/questions?level=${query.level}&semester=${query.semester}&course=${query.course}&fullName=${query.fullName}&topic=${query.topic}`
  );
export const CreateQuestion = (body) => API.post("/api/create", body);
export const SearchQuestions = (query) =>
  API.get(`/api/search?search=${query.search}&page=${query.page}`);
export const DeleteQuestion = (query) =>
  API.delete(`/api/delete?code=${query.code}&id=${query.id}`);
export const EditQuestion = (body) => API.patch("/api/edit", body);
