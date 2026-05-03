import { useEffect, useMemo, useState } from "react";
import { cartItemService } from "../api/services/cartItemService.js";
import { itemService } from "../api/services/itemService.js";
import ItemCard from "../components/common/ItemCard.jsx";
import SectionTitle from "../components/text/SectionTitle.jsx";
import useDocumentTitle from "../hooks/useDocumentTitle.js";

const MENU_SECTIONS = [
  { type: "MAIN", title: "MÓN CHÍNH" },
  { type: "SIDE", title: "MÓN THÊM" },
  { type: "DRINK", title: "MÓN NƯỚC" },
];

function MenuPage() {
  useDocumentTitle("Thực đơn - Quán Cô Lệ");

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    async function fetchItems() {
      try {
        const response = await itemService.getAll();

        if (!active) {
          return;
        }

        setItems(response?.result || []);
        setError("");
      } catch (fetchError) {
        if (!active) {
          return;
        }

        setItems([]);
        setError(fetchError.message || "Không thể tải thực đơn.");
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    fetchItems();

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
      const cartResponse = await cartItemService.getAll();
      const cartId = cartResponse?.result?.cartId;

      if (!cartId) {
        window.alert("Không tìm thấy giỏ hàng.");
        return;
      }

      await cartItemService.create({
        cartId,
        itemId: item.id,
        quantity: 1,
      });

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
              <ItemCard
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
