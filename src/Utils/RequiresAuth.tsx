import React from "react";
import { Navigate } from "react-router-dom";

type Props = {
  children: React.ReactNode;
};

const RequiresAuth: React.FC<Props> = ({ children }) => {
  const token = localStorage.getItem("token");

  return <>{token ? children : <Navigate to="/" />}</>;
};

export default RequiresAuth;
