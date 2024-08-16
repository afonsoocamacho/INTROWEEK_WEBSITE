// src/components/ProtectedRoute.js
import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../AuthContext";

const ProtectedRoute = ({ children, allowedTypes }) => {
  const { team } = useAuth();
  const location = useLocation();

  if (!team) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (allowedTypes && !allowedTypes.includes(team.teamType)) {
    if (team.teamType === "admin") {
      return <Navigate to="/adminreview" replace />;
    } else {
      return <Navigate to="/" replace />;
    }
  }

  return children;
};

export default ProtectedRoute;
