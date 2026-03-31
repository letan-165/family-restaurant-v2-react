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

      <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">
        {items.map((item) => {
          const quantity = quantities[item.name] || 0;
          const cardStateClass =
            quantity > 0 ? "border-brand-brown" : "border-stone-200";

          return (
            <article
              key={item.name}
              className={`overflow-hidden rounded-2xl border bg-white shadow-sm transition ${cardStateClass}`}
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
