import { NavLink } from "react-router-dom";
import { formatCurrency } from "../../utils/format.js";

function OrderStatusCard({ order }) {
  return (
    <NavLink
      to={`/order-status/${order.id}`}
      className="card block transition hover:border-stone-300"
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-base font-semibold text-brand-brown">{order.id}</p>
          <p className="mt-1 text-sm text-stone-500">{order.createdAt}</p>
        </div>
        <span className="rounded-full bg-stone-100 px-3 py-1 text-sm font-medium text-stone-700">
          {order.status}
        </span>
      </div>

      <div className="mt-4 flex items-center justify-between border-t border-stone-200 pt-4 text-sm">
        <span className="text-stone-500">Tổng số lượng: {order.totalQuantity}</span>
        <span className="font-semibold text-brand-brown">
          {formatCurrency(order.totalAmount)}
        </span>
      </div>

      <p className="mt-3 text-sm text-stone-500">Nhấn để xem chi tiết đơn hàng</p>
    </NavLink>
  );
}

export default OrderStatusCard;
