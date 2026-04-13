import fetchClient from "../fetchClient.js";

export const cartItemService = {
  getAll: () => fetchClient.get("/cart/item/public"),
  create: (data) => fetchClient.post("/cart/item/public", data),
  updateById: (id, data) =>
    fetchClient.put(`/cart/item/public/${id}`, data),
  deleteById: (id) => fetchClient.delete(`/cart/item/public/${id}`),
};
