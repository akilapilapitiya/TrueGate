import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import AuthInitializer from "../utils/AuthInitializer";

const RootLayout = () => {
  const location = useLocation();
  return (
    <div className="root-container">
      <AuthInitializer />
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
