import { NavLink, useParams } from "react-router-dom";
import TextButton from "../components/button/TextButton.jsx";
import OrderItemRow from "../components/common/OrderItemRow.jsx";
import OrderSummaryCard from "../components/common/OrderSummaryCard.jsx";
import DisplayField from "../components/text/DisplayField.jsx";
import SectionTitle from "../components/text/SectionTitle.jsx";
import {
  getMockOrderById,
  getOrderSummaryRows,
  profileView,
} from "../data/mockData.js";
import useDocumentTitle from "../hooks/useDocumentTitle.js";
import { formatCurrency } from "../utils/format.js";

function OrderDetailPage() {
  useDocumentTitle("Chi tiết đơn hàng - Quán Cô Lệ");

  const { orderId } = useParams();
  const order = getMockOrderById(orderId);

  if (!order) {
    return (
      <section className="page-section">
        <div className="page-wrap">
          <div className="mx-auto max-w-5xl">
            <div className="card card-empty">
              <p className="text-base text-stone-600">Không tìm thấy đơn hàng.</p>
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
                  <DisplayField label="Người nhận" value={profileView.fullname} />
                  <DisplayField label="Số điện thoại" value={profileView.phone} />
                  <DisplayField label="Địa chỉ" value={profileView.address} />
                </div>
              </div>

              <div className="card">
                <h2 className="font-display text-2xl font-semibold text-brand-brown">
                  Món đã đặt
                </h2>

                <div className="mt-6 grid gap-4">
                  {order.items.map((item) => (
                    <OrderItemRow key={`${order.id}-${item.name}`} item={item} />
                  ))}
                </div>
              </div>
            </div>

            <OrderSummaryCard
              title="Tóm tắt đơn"
              rows={getOrderSummaryRows({
                itemCount: order.items.length,
                totalAmount: formatCurrency(order.totalAmount),
                totalQuantity: order.totalQuantity,
              })}
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
