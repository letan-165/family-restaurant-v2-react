import fetchClient from "../fetchClient.js";

export const itemService = {
  getAll: () => fetchClient.get("/item/public"),
  create: (data) => fetchClient.post("/item/public", data),
  updateById: (id, data) => fetchClient.put(`/item/public/${id}`, data),
  deleteById: (id) => fetchClient.delete(`/item/public/${id}`),
};
