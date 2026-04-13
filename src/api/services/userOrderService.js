import fetchClient from "../fetchClient.js";

export const userOrderService = {
  getAll: () => fetchClient.get("/user/order/public"),
  updateById: (orderId, data) =>
    fetchClient.put(`/user/order/public/${orderId}`, data),
};
