import IconButton from "../button/IconButton.jsx";
import { formatCurrency } from "../../utils/format.js";

const STATUS_STYLES = {
  ACTIVE: "bg-emerald-100 text-emerald-700",
  INACTIVE: "bg-stone-200 text-stone-700",
  SOLD_OUT: "bg-rose-100 text-rose-700",
};

function ItemCart({ items, onAddToCart, title }) {
  return (
    <section className="mb-10">
      <div className="mb-4">
        <h2 className="font-display text-2xl font-bold text-brand-brown">
          {title}
        </h2>
      </div>

      <div className="grid grid-cols-2 gap-4 xl:grid-cols-3">
        {items.map((item) => (
          <article
            key={item.id}
            className="overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm"
          >
            <img
              src={item.picture}
              alt={item.name}
              className="h-40 w-full object-cover sm:h-48"
            />

            <div className="space-y-3 p-3 sm:p-4">
              <div className="flex items-start justify-between gap-2">
                <div className="flex min-w-0 flex-1 items-center gap-2 justify-between">
                  <h3 className="truncate text-base font-bold text-brand-brown sm:text-lg">
                    {item.name}
                  </h3>
                  <p className="shrink-0 text-xs text-stone-500 sm:text-sm">
                    Đã bán: {item.sold}
                  </p>
                </div>

                <span
                  className={[
                    "mt-1 h-3 w-3 shrink-0 rounded-full",
                    STATUS_STYLES[item.status] || "bg-amber-100 text-amber-700",
                  ].join(" ")}
                />
              </div>

              <p className="line-clamp-2 text-sm leading-5 text-stone-600">
                {item.description || "Chưa có mô tả."}
              </p>

              <div className="flex items-center justify-between gap-4">
                <p className="text-sm font-semibold text-brand-brown sm:text-base">
                  {formatCurrency(item.price)}
                </p>

                <IconButton
                  label={`Thêm ${item.name} vào giỏ hàng`}
                  onClick={() => onAddToCart(item)}
                  variant="secondary"
                  disabled={item.status !== "ACTIVE"}
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

export default ItemCart;
