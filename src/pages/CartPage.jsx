import { useEffect, useMemo, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { cartItemService } from "../api/services/cartItemService.js";
import TextButton from "../components/button/TextButton.jsx";
import CartItemRow from "../components/common/CartItemRow.jsx";
import OrderSummaryCard from "../components/common/OrderSummaryCard.jsx";
import SectionTitle from "../components/text/SectionTitle.jsx";
import { getCartSummaryRows } from "../data/mockData.js";
import useDocumentTitle from "../hooks/useDocumentTitle.js";
import { formatCurrency } from "../utils/format.js";

const TYPE_LABELS = {
  MAIN: "Món chính",
  SIDE: "Món phụ",
  DRINK: "Món nước",
};

function mapCartItem(rawItem = {}) {
  return {
    id: rawItem.id,
    itemId: rawItem.itemId,
    objId: rawItem.objId,
    name: rawItem.name || "Món ăn",
    type: rawItem.type || "MAIN",
    category: TYPE_LABELS[rawItem.type] || "Khác",
    price: rawItem.price || 0,
    image: rawItem.picture || "/food-bun.png",
    description: rawItem.description || "",
    quantity: rawItem.quantity || 1,
  };
}

function CartPage() {
  useDocumentTitle("Giỏ hàng - Quán Cô Lệ");
  const navigate = useNavigate();

  const [cartId, setCartId] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [busyItemId, setBusyItemId] = useState(null);

  useEffect(() => {
    let active = true;

    async function fetchCartItems() {
      try {
        const response = await cartItemService.getAll();
        const result = response?.result || {};
        const nextCartItems = (result.items || []).map(mapCartItem);

        if (!active) {
          return;
        }

        setCartId(result.cartId || null);
        setCartItems(nextCartItems);
        setSelectedIds(nextCartItems.map((item) => item.id));
        setError("");
      } catch (fetchError) {
        if (!active) {
          return;
        }

        setCartId(null);
        setCartItems([]);
        setSelectedIds([]);
        setError(fetchError.message || "Không thể tải giỏ hàng.");
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    fetchCartItems();

    return () => {
      active = false;
    };
  }, []);

  const selectedItems = useMemo(
    () => cartItems.filter((item) => selectedIds.includes(item.id)),
    [cartItems, selectedIds],
  );

  const selectedQuantity = selectedItems.reduce(
    (sum, item) => sum + item.quantity,
    0,
  );
  const selectedTotal = selectedItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const isAllChecked = cartItems.length > 0 && selectedIds.length === cartItems.length;
  const groupedItems = cartItems.reduce((groups, item) => {
    if (!groups[item.category]) groups[item.category] = [];
    groups[item.category].push(item);
    return groups;
  }, {});

  function toggleItem(id) {
    setSelectedIds((current) =>
      current.includes(id)
        ? current.filter((itemId) => itemId !== id)
        : [...current, id],
    );
  }

  function toggleAll() {
    setSelectedIds(isAllChecked ? [] : cartItems.map((item) => item.id));
  }

  async function deleteItem(id) {
    setBusyItemId(id);

    try {
      await cartItemService.deleteById(id);

      setCartItems((current) => current.filter((item) => item.id !== id));
      setSelectedIds((current) => current.filter((itemId) => itemId !== id));
    } catch (deleteError) {
      window.alert(deleteError.message || "Không thể xóa món khỏi giỏ hàng.");
    } finally {
      setBusyItemId(null);
    }
  }

  async function updateQuantity(id, delta) {
    const currentItem = cartItems.find((item) => item.id === id);

    if (!currentItem) {
      return;
    }

    const nextQuantity = currentItem.quantity + delta;

    if (nextQuantity <= 0) {
      await deleteItem(id);
      return;
    }

    setBusyItemId(id);

    try {
      await cartItemService.updateById(id, {
        quantity: nextQuantity,
      });

      setCartItems((current) =>
        current.map((item) =>
          item.id === id ? { ...item, quantity: nextQuantity } : item,
        ),
      );
    } catch (updateError) {
      window.alert(updateError.message || "Không thể cập nhật số lượng.");
    } finally {
      setBusyItemId(null);
    }
  }

  function openOrderPage() {
    navigate("/order", {
      state: { items: selectedItems, cartId },
    });
  }

  return (
    <section className="page-section">
      <div className="page-wrap">
        <div className="page-grid">
          <div className="card">
            <SectionTitle label="Giỏ hàng" title="Món ăn bạn đã chọn" />
            <p className="mt-3 text-sm text-stone-600">
              Chọn những món muốn giữ lại để tiếp tục đặt hàng.
            </p>
          </div>

          {loading ? (
            <div className="card text-sm text-stone-600">Đang tải giỏ hàng...</div>
          ) : error ? (
            <div className="card text-sm text-rose-600">{error}</div>
          ) : (
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
                        key={item.id}
                        item={item}
                        checked={selectedIds.includes(item.id)}
                        busy={busyItemId === item.id}
                        onToggle={toggleItem}
                        onDecrease={(nextId) => updateQuantity(nextId, -1)}
                        onIncrease={(nextId) => updateQuantity(nextId, 1)}
                        onDelete={deleteItem}
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
          )}
        </div>
      </div>
    </section>
  );
}

export default CartPage;
