import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../Contexts/AuthContext";

type Props = {
  children: React.ReactNode;
};

const RequiresAuth: React.FC<Props> = ({ children }) => {
  const { token } = useContext(AuthContext);

  return <>{token ? children : <Navigate to="/" />}</>;
};

export default RequiresAuth;
