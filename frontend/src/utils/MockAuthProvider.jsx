import { addUser } from "./UserSlice";

export const mockLoginUser = (dispatch) => {
  const user = {
    uid: "dummy-uid-123",
    email: "testuser@example.com",
    phone: "0123456789",
    firstName: "John",
    lastName: "Doe",
    displayName: "John Doe",
    gender: "male",
    role: "admin",
    emailVerified: true,
  };

  // Save user to localStorage
  localStorage.setItem("authUser", JSON.stringify(user));

  // Dispatch to Redux
  dispatch(addUser(user));
};
