/* eslint-disable react/prop-types */
import { Navigate } from "react-router-dom";

import { useSelector } from "react-redux";
import { TimeUp } from "../app/slice/frontend";

const ProtectResult = ({ children }) => {
  const timeUp = useSelector(TimeUp);

  return (
    <>{timeUp ? children : <Navigate to={"/"}/>}</>
  );
};

export default ProtectResult;
