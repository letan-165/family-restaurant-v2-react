import { useEffect, useMemo, useState } from "react";
import { cartItemService } from "../api/services/cartItemService.js";
import { itemService } from "../api/services/itemService.js";
import ItemCart from "../components/common/ItemCart.jsx";
import SectionTitle from "../components/text/SectionTitle.jsx";
import useDocumentTitle from "../hooks/useDocumentTitle.js";

const MENU_SECTIONS = [
  { type: "MAIN", title: "MÓN CHÍNH" },
  { type: "SIDE", title: "MÓN PHỤ" },
  { type: "DRINK", title: "MÓN NƯỚC" },
];

function MenuPage() {
  useDocumentTitle("Thực đơn - Quán Cô Lệ");

  const [cartId, setCartId] = useState(null);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    async function fetchData() {
      try {
        const [itemsResponse, cartResponse] = await Promise.all([
          itemService.getAll(),
          cartItemService.getAll(),
        ]);

        if (!active) {
          return;
        }

        setItems(itemsResponse?.result || []);
        setCartId(cartResponse?.result?.cartId || null);
        setError("");
      } catch (fetchError) {
        if (!active) {
          return;
        }

        setItems([]);
        setCartId(null);
        setError(fetchError.message || "Không thể tải thực đơn.");
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    fetchData();

    return () => {
      active = false;
    };
  }, []);

  const menuSections = useMemo(
    () =>
      MENU_SECTIONS.map((section) => ({
        ...section,
        items: items.filter((item) => item.type === section.type),
      })).filter((section) => section.items.length > 0),
    [items],
  );

  async function addToCart(item) {
    try {
      const nextCartId = cartId || (await cartItemService.getAll())?.result?.cartId;

      if (!nextCartId) {
        window.alert("Không tìm thấy giỏ hàng.");
        return;
      }

      await cartItemService.create({
        cartId: nextCartId,
        itemId: item.id,
        quantity: 1,
      });

      setCartId(nextCartId);
      window.alert("Thêm vào giỏ hàng thành công.");
    } catch (addError) {
      window.alert(addError.message || "Không thể thêm vào giỏ hàng.");
    }
  }

  return (
    <section className="section-bg-two min-h-[calc(100vh-8rem)] py-10">
      <div className="page-wrap">
        <SectionTitle title="THỰC ĐƠN" />

        {loading ? (
          <div className="card mt-6 text-sm text-stone-600">
            Đang tải thực đơn...
          </div>
        ) : error ? (
          <div className="card mt-6 text-sm text-rose-600">{error}</div>
        ) : (
          <>
            {menuSections.map((section) => (
              <ItemCart
                key={section.type}
                title={section.title}
                items={section.items}
                onAddToCart={addToCart}
              />
            ))}
          </>
        )}
      </div>
    </section>
  );
}

export default MenuPage;
