import axios from "axios";

// Create one shared Axios instance so we don't repeat the base URL
// in every single API call throughout the app.
const api = axios.create({
  baseURL: "http://localhost:5000/api",
});

// An "interceptor" runs before every request is sent.
// Here, we automatically attach the JWT token (if we have one)
// so the backend knows who is making the request.
api.interceptors.request.use((config) => {
  const userInfo = localStorage.getItem("userInfo");

  if (userInfo) {
    const { token } = JSON.parse(userInfo);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }

  return config;
});

export default api;
