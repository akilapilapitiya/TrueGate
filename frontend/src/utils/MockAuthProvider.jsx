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
          displayName: "John Doe",
          firstName: "John",
          lastName: "Doe",
          gender: "male",
          role: "admin", // use "houseOwner" or "admin"
        })
      );
    }
  }, [dispatch, enableMock]);

  return null;
};

export default MockAuthProvider;
