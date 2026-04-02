import { useMemo, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import TextButton from "../components/button/TextButton.jsx";
import CartItemRow from "../components/common/CartItemRow.jsx";
import OrderSummaryCard from "../components/common/OrderSummaryCard.jsx";
import SectionTitle from "../components/text/SectionTitle.jsx";
import {
  getCartSummaryRows,
  getMockCartItems,
} from "../data/mockData.js";
import useDocumentTitle from "../hooks/useDocumentTitle.js";
import { formatCurrency } from "../utils/format.js";

function CartPage() {
  useDocumentTitle("Giỏ hàng - Quán Cô Lệ");
  const navigate = useNavigate();
  const initialCartItems = getMockCartItems();

  const [cartItems, setCartItems] = useState(initialCartItems);
  const [selectedNames, setSelectedNames] = useState(
    initialCartItems.map((item) => item.name),
  );

  const selectedItems = useMemo(
    () => cartItems.filter((item) => selectedNames.includes(item.name)),
    [cartItems, selectedNames],
  );

  const selectedQuantity = selectedItems.reduce(
    (sum, item) => sum + item.quantity,
    0,
  );
  const selectedTotal = selectedItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const isAllChecked =
    cartItems.length > 0 && selectedNames.length === cartItems.length;
  const groupedItems = cartItems.reduce((groups, item) => {
    if (!groups[item.category]) groups[item.category] = [];
    groups[item.category].push(item);
    return groups;
  }, {});

  function toggleItem(name) {
    setSelectedNames((current) =>
      current.includes(name)
        ? current.filter((itemName) => itemName !== name)
        : [...current, name],
    );
  }

  function toggleAll() {
    setSelectedNames(isAllChecked ? [] : cartItems.map((item) => item.name));
  }

  function updateQuantity(name, delta) {
    setCartItems((current) =>
      current.map((item) =>
        item.name === name
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item,
      ),
    );
  }

  function openOrderPage() {
    navigate("/order", { state: { items: selectedItems } });
  }

  return (
    <section className="section-bg-two min-h-[calc(100vh-8rem)] py-10 sm:py-12">
      <div className="page-wrap">
        <div className="mx-auto grid max-w-5xl gap-6">
          <div className="card">
            <SectionTitle label="Giỏ hàng" title="Món ăn bạn đã chọn" />
            <p className="mt-3 text-sm text-stone-600">
              Chọn những món muốn giữ lại để tiếp tục đặt hàng.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="grid gap-4">
              <label className="flex items-center gap-3 rounded-2xl border border-stone-200 bg-white px-4 py-3">
                <input
                  type="checkbox"
                  checked={isAllChecked}
                  onChange={toggleAll}
                  className="h-4 w-4 accent-brand-brown"
                />
                <span className="text-sm font-medium text-stone-700">
                  Chọn tất cả
                </span>
              </label>

              {Object.entries(groupedItems).map(([category, items]) => (
                <div key={category} className="grid gap-3">
                  <div className="rounded-xl bg-stone-100 px-4 py-2">
                    <p className="text-sm font-semibold text-brand-brown">
                      {category}
                    </p>
                  </div>

                  {items.map((item) => (
                    <CartItemRow
                      key={item.name}
                      item={item}
                      checked={selectedNames.includes(item.name)}
                      onToggle={toggleItem}
                      onDecrease={(name) => updateQuantity(name, -1)}
                      onIncrease={(name) => updateQuantity(name, 1)}
                    />
                  ))}
                </div>
              ))}
            </div>

            <OrderSummaryCard
              title="Tóm tắt đơn hàng"
              rows={getCartSummaryRows({
                selectedCount: selectedItems.length,
                totalAmount: formatCurrency(selectedTotal),
                totalQuantity: selectedQuantity,
              })}
              actions={
                <>
                <TextButton
                  disabled={!selectedItems.length}
                  onClick={openOrderPage}
                >
                  Đặt những món đã chọn
                </TextButton>
                <TextButton as={NavLink} to="/menu" variant="secondary">
                  Tiếp tục xem thực đơn
                </TextButton>
                </>
              }
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default CartPage;
