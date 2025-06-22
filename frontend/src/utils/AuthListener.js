import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";

const AuthListener = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    const storedUser = localStorage.getItem("user");

    if (isLoggedIn && storedUser) {
      const user = JSON.parse(storedUser);
      dispatch(addUser(user));
    } else {
      dispatch(removeUser());
    }
  }, [dispatch]);

  return null;
};

export default AuthListener;
