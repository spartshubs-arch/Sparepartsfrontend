// src/pages/user/PrivateRoute.js
import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const PrivateRoute = () => {
  const location = useLocation();

  const isLoggedIn = sessionStorage.getItem("userInfo");

  return isLoggedIn ? (
    <Outlet />
  ) : (
    <Navigate to="/loginuser" replace state={{ from: location }} />
  );
};

export default PrivateRoute;
