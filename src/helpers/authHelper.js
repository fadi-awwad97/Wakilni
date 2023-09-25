import React from "react";
import { Navigate } from "react-router-dom";
import cookie from "js-cookie";

function Protected({ children }) {
  if (! cookie.get("accessToken")) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

export default Protected;
