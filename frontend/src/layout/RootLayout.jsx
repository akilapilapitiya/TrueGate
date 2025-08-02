import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";

const RootLayout = () => {
  const location = useLocation();
  return (
    <div className="root-container">
      {/* Navigation bar View  */}
      {location.pathname !== "/" && (
        <div className="navbar-container">
          <Navbar />
        </div>
      )}
      {/* Main content area */}
      <div className="main-container">
        <Outlet />
      </div>
    </div>
  );
};

export default RootLayout;
