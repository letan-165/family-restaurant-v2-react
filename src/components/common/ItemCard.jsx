import IconButton from "../button/IconButton.jsx";
import { formatCurrency } from "../../utils/format.js";

function ItemCard({ items, onAddToCart, title }) {
  function getPictureSrc(item) {
    const picture = typeof item.picture === "string" ? item.picture.trim() : "";
    return picture || "/food-bun.png";
  }

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
              src={getPictureSrc(item)}
              alt={item.name}
              className="h-40 w-full object-cover sm:h-48"
              onError={(event) => {
                event.currentTarget.src = "/food-bun.png";
              }}
            />

            <div className="space-y-3 p-3 sm:p-4">
              <h3 className="truncate text-base font-bold text-brand-brown sm:text-lg">
                {item.name}
              </h3>

              <p className="line-clamp-2 text-sm leading-5 text-stone-600">
                {item.description || "Chưa có mô tả."}
              </p>

              <div className="flex items-center justify-between gap-4">
                <p className="text-sm font-semibold text-brand-brown sm:text-base">
                  {formatCurrency(item.price)}
                </p>

                <p className="shrink-0 text-xs text-stone-500 sm:text-sm">
                  Đã bán: {item.sold}
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

export default ItemCard;
