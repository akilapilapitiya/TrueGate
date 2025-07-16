import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

const RootLayout = () => {
  return (
    <div className="root-container">
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
