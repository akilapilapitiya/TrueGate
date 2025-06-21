import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../utils/Firebase";
import { addUser, removeUser } from "../utils/UserSlice";

import { doc, getDoc } from "firebase/firestore";

const AuthListener = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const { uid, email } = user;

        try {
          // Fetch extra user data from Firestore
          const userDocRef = doc(db, "users", uid);
          const userDocSnap = await getDoc(userDocRef);

          if (userDocSnap.exists()) {
            const userData = userDocSnap.data();

            // Dispatch combined data to Redux
            dispatch(
              addUser({
                uid,
                email,
                ...userData, // includes firstName, surName, dob, gender, mode, contact, etc.
              })
            );
          } else {
            // If no Firestore doc exists for the user, dispatch basic info
            dispatch(addUser({ uid, email }));
          }
        } catch (error) {
          console.error("Failed to fetch user data:", error);
          // You can decide what to dispatch here; fallback to basic data
          dispatch(addUser({ uid, email }));
        }
      } else {
        dispatch(removeUser());
      }
    });

    return () => unsubscribe(); // cleanup
  }, [dispatch, navigate]);

  return null;
};

export default AuthListener;

