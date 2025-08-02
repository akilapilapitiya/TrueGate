import axios from "axios";

// Use local HTTPS for development, production URL for deployment
const baseURL = process.env.NODE_ENV === 'production' 
  ? "https://truegate.live/api"
  : "https://localhost/api";

const axiosInstance = axios.create({
  baseURL: baseURL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Helper to set CSRF token in headers
export const setCsrfToken = (csrfToken) => {
  axiosInstance.defaults.headers['x-csrf-token'] = csrfToken;
  console.log("CSRF token set in axios headers:", csrfToken);
};

export default axiosInstance;
