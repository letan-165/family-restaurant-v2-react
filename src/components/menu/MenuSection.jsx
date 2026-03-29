import QuantityButton from "../common/QuantityButton.jsx";
import { formatCurrency } from "../../utils/format.js";

function MenuSection({ items, onUpdateQuantity, quantities, title }) {
  return (
    <section className="mb-10">
      <div className="mb-4">
        <h2 className="font-display text-2xl font-bold text-brand-brown">
          {title}
        </h2>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {items.map((item) => {
          const quantity = quantities[item.name] || 0;

          return (
            <article
              key={item.name}
              className={`overflow-hidden rounded-[1.75rem] border bg-white/90 shadow-[0_18px_48px_rgba(91,57,32,0.12)] transition ${
                quantity > 0
                  ? "border-emerald-400 ring-2 ring-emerald-100"
                  : "border-[#a67b5b]/30"
              }`}
            >
              <img
                src={item.image}
                alt={item.name}
                className="h-56 w-full object-cover"
              />
              <div className="space-y-4 p-5 text-center">
                <div>
                  <h3 className="text-lg font-bold text-brand-brown">
                    {item.name}
                  </h3>
                  <p className="mt-1 text-sm font-semibold text-stone-600">
                    {formatCurrency(item.price)}
                  </p>
                </div>

                <div className="flex items-center justify-center gap-3">
                  <QuantityButton
                    label={`Giảm số lượng ${item.name}`}
                    onClick={() => onUpdateQuantity(item.name, -1)}
                  >
                    -
                  </QuantityButton>
                  <span className="min-w-8 text-lg font-bold text-brand-brown">
                    {quantity}
                  </span>
                  <QuantityButton
                    label={`Tăng số lượng ${item.name}`}
                    onClick={() => onUpdateQuantity(item.name, 1)}
                  >
                    +
                  </QuantityButton>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

export default MenuSection;
