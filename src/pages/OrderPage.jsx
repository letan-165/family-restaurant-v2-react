import { useMemo, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import TextButton from "../components/button/TextButton.jsx";
import OrderItemRow from "../components/common/OrderItemRow.jsx";
import OrderSummaryCard from "../components/common/OrderSummaryCard.jsx";
import FormField from "../components/text/FormField.jsx";
import SectionTitle from "../components/text/SectionTitle.jsx";
import { getOrderSummaryRows, profileView } from "../data/mockData.js";
import useDocumentTitle from "../hooks/useDocumentTitle.js";
import { formatCurrency } from "../utils/format.js";

function OrderPage() {
  useDocumentTitle("Đặt món - Quán Cô Lệ");

  const location = useLocation();
  const orderItems = location.state?.items || [];
  const [receiver, setReceiver] = useState({
    fullname: "",
    phone: "",
    address: "",
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
    setReceiver({
      fullname: profileView.fullname,
      phone: profileView.phone,
      address: profileView.address,
    });
  }

  return (
    <section className="section-bg-two min-h-[calc(100vh-8rem)] py-10 sm:py-12">
      <div className="page-wrap">
        <div className="mx-auto grid max-w-5xl gap-6">
          <div className="card">
            <SectionTitle label="Đơn hàng" title="Xác nhận món đã chọn" />
            <p className="mt-3 text-sm text-stone-600">
              Kiểm tra lại món ăn và điền thông tin người nhận để tiếp tục.
            </p>
          </div>

          {!orderItems.length ? (
            <div className="card text-center">
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
                      <OrderItemRow key={item.name} item={item} />
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
                      htmlFor="fullname"
                      label="Tên người nhận"
                      name="fullname"
                      value={receiver.fullname}
                      onChange={handleChange}
                    />
                    <FormField
                      htmlFor="phone"
                      label="Số điện thoại"
                      name="phone"
                      value={receiver.phone}
                      onChange={handleChange}
                    />
                    <FormField
                      as="textarea"
                      htmlFor="address"
                      label="Địa chỉ"
                      name="address"
                      value={receiver.address}
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
                  <TextButton>Xác nhận đặt món</TextButton>
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
