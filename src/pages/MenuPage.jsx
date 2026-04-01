import { useState } from "react";
import MenuGrid from "../components/common/MenuGrid.jsx";
import SectionTitle from "../components/text/SectionTitle.jsx";
import { extraDishes, mainDishes } from "../data/siteData.js";
import useDocumentTitle from "../hooks/useDocumentTitle.js";
import { formatCurrency } from "../utils/format.js";

function MenuPage() {
  useDocumentTitle("Thực đơn - Quán Cô Lệ");

  const [quantities, setQuantities] = useState({});
  const allDishes = [...mainDishes, ...extraDishes];
  const total = allDishes.reduce(
    (sum, dish) => sum + (quantities[dish.name] || 0) * dish.price,
    0,
  );

  function updateQuantity(name, delta) {
    setQuantities((current) => {
      const nextValue = Math.max(0, (current[name] || 0) + delta);
      return { ...current, [name]: nextValue };
    });
  }

  return (
    <section className="section-bg-two min-h-[calc(100vh-8rem)] py-10">
      <div className="page-wrap">
        <div className="fixed right-4 bottom-10 rounded-2xl bg-brand-brown p-4">
          <p className="text-sm text-white/80">
            Tổng:
            <span className="ml-2 font-display text-3xl font-bold text-white">
              {formatCurrency(total)}
            </span>
          </p>
        </div>

        <SectionTitle title="THỰC ĐƠN" />
        <MenuGrid
          title="MÓN CHÍNH"
          items={mainDishes}
          quantities={quantities}
          onUpdateQuantity={updateQuantity}
        />
        <MenuGrid
          title="MÓN THÊM"
          items={extraDishes}
          quantities={quantities}
          onUpdateQuantity={updateQuantity}
        />
      </div>
    </section>
  );
}

export default MenuPage;
