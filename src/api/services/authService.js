import fetchClient from "../fetchClient.js";

export const authService = {
  login: (data) => fetchClient.post("/auth/public/login", data),
  signup: (data) => fetchClient.post("/auth/public/signup", data),
};
