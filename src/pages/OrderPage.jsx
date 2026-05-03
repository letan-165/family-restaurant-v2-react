import { useMemo, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { orderService } from "../api/services/orderService.js";
import TextButton from "../components/button/TextButton.jsx";
import OrderItemRow from "../components/common/OrderItemRow.jsx";
import OrderSummaryCard from "../components/common/OrderSummaryCard.jsx";
import FormField from "../components/text/FormField.jsx";
import SectionTitle from "../components/text/SectionTitle.jsx";
import { getOrderSummaryRows } from "../data/mockData.js";
import useDocumentTitle from "../hooks/useDocumentTitle.js";
import { normalizeProfile } from "../utils/userSession.js";
import { formatCurrency } from "../utils/format.js";

function OrderPage() {
  useDocumentTitle("Đặt món - Quán Cô Lệ");

  const location = useLocation();
  const navigate = useNavigate();
  const profile = normalizeProfile();
  const cartId = location.state?.cartId;
  const orderItems = useMemo(() => location.state?.items || [], [location.state]);
  const [submitting, setSubmitting] = useState(false);
  const [receiver, setReceiver] = useState({
    receiverName: "",
    phone: "",
    address: "",
    note: "",
  });

  const totalQuantity = useMemo(
    () => orderItems.reduce((sum, item) => sum + item.quantity, 0),
    [orderItems],
  );
  const totalPrice = useMemo(
    () => orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [orderItems],
  );

  function handleChange(event) {
    const { name, value } = event.target;
    setReceiver((current) => ({ ...current, [name]: value }));
  }

  function fillFromProfile() {
    setReceiver((current) => ({
      ...current,
      receiverName: profile.fullName || "",
      phone: profile.phone || "",
      address: profile.address || "",
    }));
  }

  async function handleCreateOrder() {
    if (!cartId || !orderItems.length) {
      window.alert("Không có dữ liệu giỏ hàng để đặt món.");
      return;
    }

    try {
      setSubmitting(true);

      await orderService.createFromCart(cartId, {
        receiverName: receiver.receiverName,
        phone: receiver.phone,
        address: receiver.address,
        note: receiver.note,
        itemCartIds: orderItems.map((item) => item.id),
      });

      window.alert("Đặt món thành công.");
      navigate("/order-status");
    } catch (error) {
      window.alert(error.message || "Không thể đặt món.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className="page-section">
      <div className="page-wrap">
        <div className="page-grid">
          <div className="card">
            <SectionTitle label="Đơn hàng" title="Xác nhận món đã chọn" />
            <p className="mt-3 text-sm text-stone-600">
              Kiểm tra lại món ăn và điền thông tin người nhận để tiếp tục.
            </p>
          </div>

          {!orderItems.length ? (
            <div className="card card-empty">
              <p className="text-base text-stone-600">
                Chưa có món nào được chọn để đặt.
              </p>
              <div className="mt-4">
                <TextButton as={NavLink} to="/cart">
                  Quay lại giỏ hàng
                </TextButton>
              </div>
            </div>
          ) : (
            <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
              <div className="grid gap-6">
                <div className="card">
                  <h2 className="font-display text-2xl font-semibold text-brand-brown">
                    Món đã chọn
                  </h2>

                  <div className="mt-6 grid gap-4">
                    {orderItems.map((item) => (
                      <OrderItemRow key={item.id} item={item} />
                    ))}
                  </div>
                </div>

                <div className="card">
                  <div className="flex items-center justify-between gap-4">
                    <h2 className="font-display text-2xl font-semibold text-brand-brown">
                      Thông tin người nhận
                    </h2>
                    <TextButton onClick={fillFromProfile} variant="secondary">
                      Cá nhân
                    </TextButton>
                  </div>

                  <div className="mt-6 grid gap-4">
                    <FormField
                      label="Tên người nhận"
                      name="receiverName"
                      value={receiver.receiverName}
                      onChange={handleChange}
                    />
                    <FormField
                      label="Số điện thoại"
                      name="phone"
                      value={receiver.phone}
                      onChange={handleChange}
                    />
                    <FormField
                      label="Địa chỉ"
                      name="address"
                      value={receiver.address}
                      onChange={handleChange}
                    />
                    <FormField
                      as="textarea"
                      label="Ghi chú"
                      name="note"
                      value={receiver.note}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>

              <OrderSummaryCard
                rows={getOrderSummaryRows({
                  itemCount: orderItems.length,
                  totalAmount: formatCurrency(totalPrice),
                  totalQuantity: totalQuantity,
                })}
                actions={
                  <>
                    <TextButton
                      loading={submitting}
                      loadingText="Đang đặt món..."
                      onClick={handleCreateOrder}
                    >
                      Xác nhận đặt món
                    </TextButton>
                    <TextButton as={NavLink} to="/cart" variant="secondary">
                      Quay lại giỏ hàng
                    </TextButton>
                  </>
                }
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default OrderPage;
