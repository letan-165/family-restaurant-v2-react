import fetchClient from "../fetchClient.js";

export const profileService = {
  get: () => fetchClient.get("/profile/public"),
  update: (data) => fetchClient.put("/profile/public", data),
};
