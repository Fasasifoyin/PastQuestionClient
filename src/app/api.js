import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_APP_API_KEY,
});

export const GetQuestions = (query) =>
  API.get(
    `/api/questions?level=${query.level}&semester=${query.semester}&course=${query.course}&fullName=${query.fullName}&topic=${query.topic}`
  );

export const CreateQuestion = (body) => API.post("/api/create/question", body);
