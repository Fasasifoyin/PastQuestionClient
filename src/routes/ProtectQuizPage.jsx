/* eslint-disable react/prop-types */
import { useSelector } from "react-redux";
import { Question } from "../app/slice/Question";
import { Navigate } from "react-router-dom";

const ProtectQuizPage = ({ children }) => {
  const data = useSelector(Question);

  return <>{data.length > 0 ? children : <Navigate to="/" />}</>;
};

export default ProtectQuizPage;
