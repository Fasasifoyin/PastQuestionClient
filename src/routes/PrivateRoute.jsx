/* eslint-disable react/prop-types */
import { Navigate } from "react-router-dom";

import { useSelector } from "react-redux";
import { Authorized } from "../app/slice/frontend";

const PrivateRoute = ({ children }) => {
  const authorized = useSelector(Authorized);

  return <>{authorized > 10 ? children : <Navigate to={"/"} />}</>;
};

export default PrivateRoute;
