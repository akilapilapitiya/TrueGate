import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../utils/Firebase";
import { useDispatch } from "react-redux";
import { addUser, removeUser } from "../utils/UserSlice";
import { useNavigate } from "react-router-dom";

const AuthListener = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName } = user;
        // Must be changed accordingly
        const firstName = displayName ? displayName.split(" ")[0] : "User";
        const lastName = displayName? displayName.split(" ").slice(1).join(" "): "User";
        const gender = "male";
        const role = "houseOwner";
        dispatch(addUser({ uid, email, displayName, firstName, lastName, gender, role }));
      } else {
        dispatch(removeUser());
        if (
          window.location.pathname !== "/" &&
          window.location.pathname !== "/login" &&
          window.location.pathname !== "/register"
        ) {
          navigate("/");
        }
      }
    });

    return () => unsubscribe();
  }, [dispatch, navigate]);

  return null;
};

export default AuthListener;
