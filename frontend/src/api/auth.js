import api from "./axios.js";

// Each function here just wraps one backend endpoint,
// so our components can call clean functions like authAPI.login(...)
// instead of writing axios.post(...) everywhere.

export const registerUser = (name, email, password) =>
  api.post("/auth/register", { name, email, password }).then((res) => res.data);

export const loginUser = (email, password) =>
  api.post("/auth/login", { email, password }).then((res) => res.data);

export const logoutUser = () =>
  api.post("/auth/logout").then((res) => res.data);

export const getProfile = () =>
  api.get("/auth/profile").then((res) => res.data);
