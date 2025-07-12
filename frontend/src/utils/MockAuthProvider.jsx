
import { addUser } from "./UserSlice";

export const mockLoginUser = (dispatch) => {
  dispatch(
    addUser({
      uid: "dummy-uid-123",
      email: "testuser@example.com",
      phone: "0123456789",
      firstName: "John",
      lastName: "Doe",
      displayName: "John Doe",
      gender: "male",
      role: "admin",
      emailVerified: true,
    })
  );
};
