import { useEffect, useMemo, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { orderService } from "../api/services/orderService.js";
import TextButton from "../components/button/TextButton.jsx";
import OrderItemRow from "../components/common/OrderItemRow.jsx";
import OrderSummaryCard from "../components/common/OrderSummaryCard.jsx";
import DisplayField from "../components/text/DisplayField.jsx";
import SectionTitle from "../components/text/SectionTitle.jsx";
import { getOrderSummaryRows } from "../data/mockData.js";
import useDocumentTitle from "../hooks/useDocumentTitle.js";
import { formatCurrency } from "../utils/format.js";

function mapOrderDetail(result = {}) {
  const user = result.user || {};
  const order = result.order || {};
  const items = (result.items || []).map((item) => ({
    id: item.id,
    itemId: item.itemId,
    objId: item.objId,
    name: item.name || "Món ăn",
    category: item.type || "Khác",
    quantity: item.quantity || 1,
    price: item.price || 0,
    image: item.picture || "/food-bun.png",
  }));

  return {
    id: order.id || user.orderId,
    userId: user.userId || "",
    receiverName: user.receiverName || "",
    phone: user.phone || "",
    address: user.address || "",
    status: order.status || "PENDING",
    note: order.note || "",
    createdAt: order.timeBooking || "",
    completedAt: order.timeCompleted || "",
    items,
    totalQuantity: items.reduce((sum, item) => sum + item.quantity, 0),
    totalAmount: order.total || 0,
  };
}

function OrderDetailPage() {
  useDocumentTitle("Chi tiết đơn hàng - Quán Cô Lệ");

  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    async function fetchOrderDetail() {
      try {
        const response = await orderService.getDetailById(orderId);
        const nextOrder = mapOrderDetail(response?.result || {});

        if (!active) {
          return;
        }

        setOrder(nextOrder);
        setError("");
      } catch (fetchError) {
        if (!active) {
          return;
        }

        setOrder(null);
        setError(fetchError.message || "Không tìm thấy đơn hàng.");
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    fetchOrderDetail();

    return () => {
      active = false;
    };
  }, [orderId]);

  const summaryRows = useMemo(() => {
    if (!order) {
      return [];
    }

    return getOrderSummaryRows({
      itemCount: order.items.length,
      totalAmount: formatCurrency(order.totalAmount),
      totalQuantity: order.totalQuantity,
    });
  }, [order]);

  if (loading) {
    return (
      <section className="page-section">
        <div className="page-wrap">
          <div className="mx-auto max-w-5xl">
            <div className="card card-empty">
              <p className="text-base text-stone-600">Đang tải chi tiết đơn hàng...</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error || !order) {
    return (
      <section className="page-section">
        <div className="page-wrap">
          <div className="mx-auto max-w-5xl">
            <div className="card card-empty">
              <p className="text-base text-stone-600">
                {error || "Không tìm thấy đơn hàng."}
              </p>
              <div className="mt-4">
                <TextButton as={NavLink} to="/order-status">
                  Quay lại trạng thái đơn
                </TextButton>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="page-section">
      <div className="page-wrap">
        <div className="page-grid">
          <div className="card">
            <SectionTitle label="Đơn hàng" title={`Chi tiết ${order.id}`} />
            <p className="mt-3 text-sm text-stone-600">
              Theo dõi thông tin đơn và kiểm tra lại món đã đặt.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
            <div className="grid gap-6">
              <div className="card">
                <h2 className="font-display text-2xl font-semibold text-brand-brown">
                  Thông tin đơn
                </h2>

                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <DisplayField label="Mã đơn" value={order.id} />
                  <DisplayField label="Trạng thái" value={order.status} />
                  <DisplayField label="Thời gian tạo" value={order.createdAt} />
                  <DisplayField label="Thời gian hoàn tất" value={order.completedAt} />
                  <DisplayField label="Người nhận" value={order.receiverName} />
                  <DisplayField label="Số điện thoại" value={order.phone} />
                  <DisplayField label="Địa chỉ" value={order.address} />
                  <DisplayField label="Ghi chú" value={order.note || "Không có"} />
                </div>
              </div>

              <div className="card">
                <h2 className="font-display text-2xl font-semibold text-brand-brown">
                  Món đã đặt
                </h2>

                <div className="mt-6 grid gap-4">
                  {order.items.map((item) => (
                    <OrderItemRow key={`${order.id}-${item.id}`} item={item} />
                  ))}
                </div>
              </div>
            </div>

            <OrderSummaryCard
              title="Tóm tắt đơn"
              rows={summaryRows}
              actions={
                <TextButton as={NavLink} to="/order-status" variant="secondary">
                  Quay lại trạng thái đơn
                </TextButton>
              }
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default OrderDetailPage;
