import { AUTH_ENDPOINTS } from "../endpoints.js";
import fetchClient from "../fetchClient.js";

export const authService = {
  login: (data) => fetchClient.post(AUTH_ENDPOINTS.login, data),
  signup: (data) => fetchClient.post(AUTH_ENDPOINTS.signup, data),
};
