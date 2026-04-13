import fetchClient from "../fetchClient.js";

export const pingService = {
  get: () => fetchClient.get("/ping"),
};
