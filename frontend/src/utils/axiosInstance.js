// frontend/utils/axiosInstance.js
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:5555",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: false, // Use true only if you rely on cookies
});

// ✅ Auto-attach token to all outgoing requests with logging
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log("✅ Token attached to request:", token); // ✅ Debug log
    } else {
      console.warn("⚠️ No token found in localStorage");
    }
    return config;
  },
  (error) => {
    console.error("❌ Axios request interceptor error:", error);
    return Promise.reject(error);
  }
);

export default axiosInstance;
