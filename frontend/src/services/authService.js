import { addUser, removeUser } from "../utils/UserSlice";
import {
  checkLogInValidateData,
  checkSignUpValidateData,
  profileUpdateValidateData,
} from "../utils/Validate";

// ############################################ USER LOGIN #############################################
export const userLogin = (email, password, rememberChecked, dispatch) => {
  // Validate email and password
  const message = checkLogInValidateData(email, password);
  if (message) {
    return message;
  }

  // Remember Me Check
  if (rememberChecked) {
    console.log("Remember Me is checked");
    // Token Logic
  }

  //Login Logic from API

  // Redux Add user
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
  return null;
};

// ############################################ USER REGISTRATION #############################################
export const userRegister = (
  email,
  password,
  confirmPassword,
  firstName,
  lastName,
  dob,
  contact,
  gender,
  agree
) => {
  // Validate registration data
  const message = checkSignUpValidateData(
    email,
    password,
    confirmPassword,
    firstName,
    lastName,
    dob,
    contact,
    gender
  );
  if (message) {
    return message;
  }

  // Terms and Conditions Check
  if (!agree) {
    return "You must agree to the terms and conditions";
  }

  // Registration Logic from API
  const mode = "admin"; // Defaulted at Resgistration here
  return null;
};

// ############################################ USER LOGOUT #############################################
export const userSignOut = (dispatch) => {
  // Logout Logic From API

  //State management
  localStorage.removeItem("authUser");
  dispatch(removeUser());
  return null;
};

// ############################################ USER PROFILE UPDATE #############################################
export const userProfileUpdate = (firstName, lastName, contact) => {
  // Validate profile update data
  const message = profileUpdateValidateData(firstName, lastName, contact);
  if (message) {
    return message;
  }

  // Profile Update Logic from API
  return null;
};

// ############################################ USER DELETE ACCOUNT #############################################
export const userDeleteAccount = () => {
  const message = "null";
  if (message) {
    return message;
  }
  return null;
};
