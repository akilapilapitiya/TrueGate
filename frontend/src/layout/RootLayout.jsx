import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import AuthListener from "../utils/MockAuthProvider";

const RootLayout = () => {
  const location = useLocation();
  return (
    <div className="root-container">
      <AuthListener />
      <div className="navbar-container">
        <Navbar />
      </div>

      <div className="main-container">
        <Outlet />
      </div>
    </div>
  );
};

export default RootLayout;
