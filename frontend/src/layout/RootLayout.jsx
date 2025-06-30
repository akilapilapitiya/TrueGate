import Navbar from "../components/Navbar";
import { Outlet, useLocation } from "react-router-dom";
import AuthListener from "../utils/AuthListener";
import { CssBaseline } from "@mui/material";

const RootLayout = () => {
  const location = useLocation();

  return (
    <div>
      <CssBaseline />
      <AuthListener /> {/* Handles login/logout sync */}
      {location.pathname !== "/login" &&
        location.pathname !== "/register" &&
        location.pathname !== "/" &&
        location.pathname !== "/error" && (
          <div className="navbar">
            <Navbar />
          </div>
        )}
      <div className="main-body">
        <Outlet />
      </div>
    </div>
  );
};

export default RootLayout;
