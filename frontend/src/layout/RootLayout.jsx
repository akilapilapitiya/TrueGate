import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import AuthListener from "../utils/AuthListener";

const RootLayout = () => {
  const location = useLocation();
  return (
    <div className="root-container">
      <AuthListener />
      {location.pathname !== "/" &&
        location.pathname !== "/login" &&
        location.pathname !== "/register" &&
        location.pathname !== "/password-reset" &&
        location.pathname !== "/about" && (
          <div className="navbar-container">
            <Navbar />
          </div>
        )}
      <div className="main-container">
        <Outlet />
      </div>
    </div>
  );
};

export default RootLayout;
