import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "./UserSlice";
import axiosInstance from "../services/axiosInstance";

const AuthInitializer = ({ children }) => {
  const dispatch = useDispatch();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const user =
      JSON.parse(localStorage.getItem("authUser")) ||
      JSON.parse(sessionStorage.getItem("authUser"));
    const token =
      localStorage.getItem("authToken") || sessionStorage.getItem("authToken");

    if (user && token) {
      dispatch(addUser({ user, token }));
      axiosInstance.defaults.headers["Authorization"] = `Bearer ${token}`;
    }

    setReady(true);
  }, [dispatch]);

  if (!ready) return <div>Loading...</div>; // Can be spinner or splash

  return children;
};

export default AuthInitializer;
