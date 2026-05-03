import { useEffect, useMemo, useState } from "react";
import { userOrderService } from "../api/services/userOrderService.js";
import TextButton from "../components/button/TextButton.jsx";
import OrderStatusCard from "../components/common/OrderStatusCard.jsx";
import SectionTitle from "../components/text/SectionTitle.jsx";
import useDocumentTitle from "../hooks/useDocumentTitle.js";

const ORDER_STATUSES = [
  { key: "PENDING", label: "PENDING" },
  { key: "CONFIRMED", label: "CONFIRMED" },
  { key: "COMPLETED", label: "COMPLETED" },
  { key: "CANCELLED", label: "CANCELLED" },
];

function getOrderList(result) {
  if (Array.isArray(result?.orders)) {
    return result.orders;
  }

  if (Array.isArray(result?.content)) {
    return result.content;
  }

  if (Array.isArray(result)) {
    return result;
  }

  return [];
}

function mapOrder(rawEntry = {}) {
  const user = rawEntry.user || {};
  const order = rawEntry.order || rawEntry;

  return {
    id: order.id || user.orderId || rawEntry.id,
    userId: user.userId || "",
    receiverName: user.receiverName || "",
    phone: user.phone || "",
    address: user.address || "",
    status: order.status || "PENDING",
    createdAt: order.timeBooking || order.createdAt || "",
    completedAt: order.timeCompleted || "",
    totalAmount: order.total || order.totalAmount || 0,
    note: order.note || "",
  };
}

function OrderStatusPage() {
  useDocumentTitle("Trạng thái đơn hàng - Quán Cô Lệ");

  const [activeStatus, setActiveStatus] = useState(ORDER_STATUSES[0].key);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    async function fetchOrders() {
      try {
        setLoading(true);

        const response = await userOrderService.getAllMy({
          status: activeStatus,
        });
        const nextOrders = getOrderList(response?.result).map(mapOrder);

        if (!active) {
          return;
        }

        setOrders(nextOrders);
        setError("");
      } catch (fetchError) {
        if (!active) {
          return;
        }

        setOrders([]);
        setError(fetchError.message || "Không thể tải danh sách đơn hàng.");
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    fetchOrders();

    return () => {
      active = false;
    };
  }, [activeStatus]);

  const activeLabel = useMemo(
    () =>
      ORDER_STATUSES.find((status) => status.key === activeStatus)?.label ||
      activeStatus,
    [activeStatus],
  );

  return (
    <section className="page-section">
      <div className="page-wrap">
        <div className="page-grid">
          <div className="card">
            <SectionTitle label="Đơn hàng" title="Theo dõi trạng thái đơn hàng" />
            <div className="mt-6 flex flex-wrap gap-3">
              {ORDER_STATUSES.map((status) => (
                <TextButton
                  key={status.key}
                  variant={status.key === activeStatus ? "primary" : "secondary"}
                  onClick={() => setActiveStatus(status.key)}
                >
                  {status.label}
                </TextButton>
              ))}
            </div>
          </div>

          {loading ? (
            <div className="card card-empty text-sm text-stone-600">
              Đang tải đơn hàng...
            </div>
          ) : error ? (
            <div className="card card-empty text-sm text-rose-600">{error}</div>
          ) : !orders.length ? (
            <div className="card card-empty text-sm text-stone-600">
              Hiện chưa có đơn hàng ở trạng thái {activeLabel}.
            </div>
          ) : (
            <div className="grid gap-4">
              {orders.map((order) => (
                <OrderStatusCard key={order.id} order={order} />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default OrderStatusPage;
