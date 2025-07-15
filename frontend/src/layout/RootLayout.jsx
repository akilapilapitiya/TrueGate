import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import AuthInitializer from "../utils/AuthInitializer";
import { useEffect } from "react";
import { addUser } from "../utils/UserSlice";
import { useDispatch } from "react-redux";
import axiosInstance from "../services/axiosInstance";

const RootLayout = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const user =
      JSON.parse(localStorage.getItem("authUser")) ||
      JSON.parse(sessionStorage.getItem("authUser"));
    const token =
      localStorage.getItem("authToken") ||
      sessionStorage.getItem("authToken");

    if (user && token) {
      dispatch(addUser({ user, token }));
      axiosInstance.defaults.headers["Authorization"] = `Bearer ${token}`;
    }
  }, [dispatch]);
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
