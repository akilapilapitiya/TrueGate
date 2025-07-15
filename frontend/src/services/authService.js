import { addUser, removeUser } from "../utils/UserSlice";
import axiosInstance from "./axiosInstance"; 
import {
  checkLogInValidateData,
  checkSignUpValidateData,
  profileUpdateValidateData,
} from "../utils/Validate";

// ############################################ USER LOGIN #############################################


export const userLogin = async (email, password, rememberChecked, dispatch) => {
  console.log("Starting userLogin...");

  const message = checkLogInValidateData(email, password);
  if (message) {
    console.log("Validation failed:", message);
    return { success: false, message };
  }

  let csrfToken;
  try {
    console.log("Fetching CSRF token...");
    const csrfRes = await axiosInstance.get('/csrf-token');
    csrfToken = csrfRes.data.csrfToken;
    console.log("CSRF token received at login:", csrfToken);
    axiosInstance.defaults.headers['x-csrf-token'] = csrfToken;
  } catch (err) {
    console.error("Error fetching CSRF token:", err);
    return { success: false, message: "Failed to get CSRF token" };
  }

  if (rememberChecked) {
    console.log("Remember Me is checked");
  } else {
    console.log("Remember Me is not checked");
  }

  try {
    const nonce = ""; // Set your nonce here if required
    console.log("Sending login request with:", { email, password, nonce });
    const loginRes = await axiosInstance.post('/login', { email, password, nonce });

    console.log("Login response received:", loginRes.data);
    const user = loginRes.data.user;

    if (!user) {
      console.log("Login failed: No user data returned");
      return { success: false, message: "Login failed: No user data returned" };
    }

    console.log("Login successful, saving user and dispatching...");
    localStorage.setItem("authUser", JSON.stringify(user));
    dispatch(addUser(user));

    return { success: true };
  } catch (err) {
    console.error("Login API error:", err.response?.data || err.message);
    return { success: false, message: err.response?.data?.error || "Login failed" };
  }
};




// ############################################ USER REGISTRATION #############################################
export const userRegister = async (
  email,
  password,
  confirmPassword,
  firstName,
  lastName,
  dob,
  contact,
  gender,
  agree,
  dispatch // optional for Redux
) => {
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
    return { success: false, message };
  }

  if (!agree) {
    return { success: false, message: "You must agree to the terms and conditions" };
  }

  let csrfToken;
  try {
    const csrfRes = await axiosInstance.get("/csrf-token");
    csrfToken = csrfRes.data.csrfToken;
    axiosInstance.defaults.headers["x-csrf-token"] = csrfToken;
    console.log("CSRF token for register:", csrfToken);
  } catch (err) {
    console.error("Failed to get CSRF token:", err);
    return { success: false, message: "CSRF token fetch failed" };
  }

  const payload = {
    email,
    password,
    firstName,
    lastName,
    birthDate: dob,
    gender,
    role: "admin",
    contactNumber: contact,
  };

  try {
    const res = await axiosInstance.post("/register", payload);
    console.log("Registration successful:", res.data);

    if (res.data.user) {
      localStorage.setItem("authUser", JSON.stringify(res.data.user));
      if (dispatch) dispatch(addUser(res.data.user));
    }

    return { success: true };
  } catch (err) {
    console.error("Registration failed:", err.response?.data || err.message);
    return {
      success: false,
      message: err.response?.data?.error || "Registration failed",
    };
  }
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
