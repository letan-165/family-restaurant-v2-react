import fetchClient from "../fetchClient.js";

function buildQuery(params = {}) {
  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      searchParams.set(key, value);
    }
  });

  const queryString = searchParams.toString();
  return queryString ? `?${queryString}` : "";
}

export const userOrderService = {
  getAllMy: (params) =>
    fetchClient.get(`/user/order/public${buildQuery(params)}`),
  updateById: (orderId, data) =>
    fetchClient.put(`/user/order/public/${orderId}`, data),
};
