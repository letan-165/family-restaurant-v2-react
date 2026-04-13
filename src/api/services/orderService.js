import fetchClient from "../fetchClient.js";

export const orderService = {
  create: (data) => fetchClient.post("/order/public", data),
  createFromCart: (cartId, data) =>
    fetchClient.post(`/order/public/${cartId}/cart`, data),
  getDetailById: (id) => fetchClient.get(`/order/public/${id}/detail`),
  updateStatusById: (id, data) =>
    fetchClient.put(`/order/public/${id}/status`, data),
};
