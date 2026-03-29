import { useState } from "react";
import MenuSection from "../components/menu/MenuSection.jsx";
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
    <section className="section-bg-two min-h-[calc(100vh-8rem)] px-4 py-10 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex flex-col gap-4 rounded-[2rem] border border-white/70 bg-white/80 p-6 shadow-[0_20px_60px_rgba(91,57,32,0.12)] backdrop-blur lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.24em] text-brand-brown/70">
              Thực đơn
            </p>
            <h1 className="font-display text-3xl font-bold text-brand-brown">
              Chọn món cho bữa ăn của bạn
            </h1>
          </div>

          <div className="rounded-[1.5rem] border border-brand-brown/15 bg-stone-50 px-5 py-4 text-center shadow-sm lg:min-w-64">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-brand-brown/60">
              Tổng tạm tính
            </p>
            <p className="mt-2 font-display text-3xl font-bold text-brand-brown">
              {formatCurrency(total)}
            </p>
            <p className="mt-1 text-sm text-stone-600">
              Tính năng đặt món đang được phát triển.
            </p>
          </div>
        </div>

        <MenuSection
          title="Món ăn chính"
          items={mainDishes}
          quantities={quantities}
          onUpdateQuantity={updateQuantity}
        />
        <MenuSection
          title="Món thêm"
          items={extraDishes}
          quantities={quantities}
          onUpdateQuantity={updateQuantity}
        />
      </div>
    </section>
  );
}

export default MenuPage;
