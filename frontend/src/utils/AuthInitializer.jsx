import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "./UserSlice";

const AuthInitializer = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const storedUser = localStorage.getItem("authUser");
    if (storedUser) {
      dispatch(addUser(JSON.parse(storedUser)));
    }
  }, [dispatch]);

  return null;
};

export default AuthInitializer;
