import { addUser, removeUser } from "../utils/UserSlice";
import axiosInstance from "./axiosInstance";
import {
  checkLogInValidateData,
  checkSignUpValidateData,
  profileUpdateValidateData,
} from "../utils/Validate";

// USER LOGIN
export const userLogin = async (email, password, rememberChecked, dispatch) => {
  const message = checkLogInValidateData(email, password);
  if (message) {
    return { success: false, message };
  }

  let csrfToken;
  try {
    const csrfRes = await axiosInstance.get("/csrf-token");
    csrfToken = csrfRes.data.csrfToken;
    axiosInstance.defaults.headers["x-csrf-token"] = csrfToken;
  } catch (err) {
    return { success: false, message: "Failed to get CSRF token" };
  }

  try {
    const nonce = ""; // if needed
    const res = await axiosInstance.post("/login", { email, password, nonce });
    const { user, token } = res.data;

    if (!user || !token) {
      return { success: false, message: "Login failed: No user/token" };
    }

    const storage = rememberChecked ? localStorage : sessionStorage;
    storage.setItem("authUser", JSON.stringify(user));
    storage.setItem("authToken", token);

    axiosInstance.defaults.headers["Authorization"] = `Bearer ${token}`;
    dispatch(addUser({ user, token }));

    return { success: true };
  } catch (err) {
    return {
      success: false,
      message: err.response?.data?.error || "Login failed",
    };
  }
};


// USER REGISTRATION
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
  dispatch
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
    return {
      success: false,
      message: "You must agree to the terms and conditions",
    };
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
export const userSignOut = async (dispatch) => {
  try {
    // Optional: Invalidate session on server
    await axiosInstance.post("/logout"); // Only if you have a backend logout endpoint
  } catch (err) {
    console.warn("Logout API failed:", err.message);
  }

  // Clear browser storage
  localStorage.removeItem("authUser");
  localStorage.removeItem("authToken");
  sessionStorage.removeItem("authUser");
  sessionStorage.removeItem("authToken");

  // Clear Redux store
  dispatch(removeUser());

  // Remove token from axios headers
  delete axiosInstance.defaults.headers["Authorization"];

  // Optional: You can return a flag or redirect here
  return { success: true };
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
