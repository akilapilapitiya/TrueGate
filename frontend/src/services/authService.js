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
  agree
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

  try {
    // CSRF token
    const csrfRes = await axiosInstance.get("/csrf-token");
    const csrfToken = csrfRes.data.csrfToken;
    axiosInstance.defaults.headers["x-csrf-token"] = csrfToken;

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

    const res = await axiosInstance.post("/register", payload);

    // Check if registration was successful
    if (res.status === 200) {
      return {
        success: true,
        message: res.data.message || "Registered successfully. Please check your email.",
      };
    }

    return {
      success: false,
      message: res.data.message || "Registration succeeded, but something went wrong.",
    };
  } catch (err) {
    return {
      success: false,
      message: err.response?.data?.error || "Registration failed",
    };
  }
};

// USER LOGOUT 
export const userSignOut = async (dispatch) => {
  try {
    // Optional: Invalidate session on server
    await axiosInstance.post("/logout"); 
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
// USER PROFILE UPDATE 
export const userProfileUpdate = async (firstName, lastName, contact) => {
  // 1. Validate inputs
  const message = profileUpdateValidateData(firstName, lastName, contact);
  if (message) return { success: false, message };

  try {
    // 2. Get user and token from storage
    const storage = localStorage.getItem("authUser") ? localStorage : sessionStorage;
    const storedUser = JSON.parse(storage.getItem("authUser"));
    const token = storage.getItem("authToken");

    if (!storedUser || !token) {
      return { success: false, message: "User not authenticated" };
    }

    const email = storedUser.email;

    // 3. Attach token to Axios headers
    axiosInstance.defaults.headers["Authorization"] = `Bearer ${token}`;

    // 4. Get CSRF token
    const csrfRes = await axiosInstance.get("/csrf-token");
    axiosInstance.defaults.headers["x-csrf-token"] = csrfRes.data.csrfToken;

    // 5. Prepare payload
    const payload = {
      firstName,
      lastName,
      contactNumber: contact,
    };

    // 6. Send PUT request
    const res = await axiosInstance.put(`/users/${email}`, payload);

    if (res.status === 200) {
      return {
        success: true,
        message: res.data.message || "Profile updated successfully.",
      };
    } else {
      return {
        success: false,
        message: res.data.message || "Profile update failed.",
      };
    }
  } catch (err) {
    return {
      success: false,
      message: err.response?.data?.error || "An error occurred during profile update.",
    };
  }
};

// Resend Email Verification
const sendEmailVerification = async (setIsVerificationLoading, setVerificationMessage, setVerificationSent) => {
  setIsVerificationLoading(true);
  setVerificationMessage(null);

  try {
    // Get user and token from storage
    const storage = localStorage.getItem("authUser") ? localStorage : sessionStorage;
    const storedUser = JSON.parse(storage.getItem("authUser"));
    const token = storage.getItem("authToken");

    if (!storedUser || !token) {
      setVerificationMessage("You must be logged in to send a verification email.");
      setIsVerificationLoading(false);
      return;
    }

    const email = storedUser.email;

    // Set auth token in headers
    axiosInstance.defaults.headers["Authorization"] = `Bearer ${token}`;

    // Get CSRF token
    const csrfRes = await axiosInstance.get("/csrf-token");
    axiosInstance.defaults.headers["x-csrf-token"] = csrfRes.data.csrfToken;

    // Send verification email
    const res = await axiosInstance.post("/resend-verification", { email });

    if (!res.data.success) {
      setVerificationMessage("Failed to send verification email. Please try again.");
    } else {
      setVerificationMessage("Verification email sent successfully! Please check your inbox.");
      setVerificationSent(true);
    }
  } catch (error) {
    setVerificationMessage(
      error.response?.data?.error || "An error occurred while sending the verification email."
    );
  } finally {
    setIsVerificationLoading(false);
  }
};



// ############################################ USER DELETE ACCOUNT #############################################
export const userDeleteAccount = () => {
  const message = "null";
  if (message) {
    return message;
  }
  return null;
};
