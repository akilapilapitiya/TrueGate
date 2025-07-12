import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "./UserSlice";

const MockAuthProvider = ({ enableMock = true }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (enableMock) {
      // Dummy user data for local UI testing
      dispatch(
        addUser({
          uid: "dummy-uid-123",
          email: "testuser@example.com",
          phone: "0123456789",
          firstName: "John",
          lastName: "Doe",
          displayName: "John Doe",
          gender: "male",
          role: "clinet", // use "client" || "admin",
          emailVerified: true,

        })
      );
    }
  }, [dispatch, enableMock]);

  return null;
};

export default MockAuthProvider;
