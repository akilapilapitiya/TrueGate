import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://truegate.live/api",
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
