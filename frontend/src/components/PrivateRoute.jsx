import React from "react";
import { useContext } from "react";
import { Navigate } from "react-router-dom";
// import { AuthContext } from "./AuthContext";
import { useAuth } from "./AuthContext";


export default function PrivateRoute({ children }) {
  // const { user } = useContext(useAuth);
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
