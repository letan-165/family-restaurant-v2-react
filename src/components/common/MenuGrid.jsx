import IconButton from "../button/IconButton.jsx";
import { formatCurrency } from "../../utils/format.js";

function MenuGrid({ items, onAddToCart, title }) {
  return (
    <section className="mb-10">
      <div className="mb-4">
        <h2 className="font-display text-2xl font-bold text-brand-brown">
          {title}
        </h2>
      </div>

      <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">
        {items.map((item) => (
          <article
            key={item.name}
            className="overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm"
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

              <div className="flex justify-center bg-brand-brown">
                <IconButton
                  label={`Thêm ${item.name} vào giỏ hàng`}
                  onClick={() => onAddToCart(item)}
                  variant="outline"
                >
                  <img
                    src="/addCart.png"
                    alt=""
                    aria-hidden="true"
                    className="h-5 w-5 object-contain"
                  />
                </IconButton>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default MenuGrid;
