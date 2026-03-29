import { formatCurrency } from "../../utils/format.js";

function DishPreviewCard({ dish }) {
  return (
    <article className="overflow-hidden rounded-[1.75rem] border border-white/70 bg-white/85 text-left shadow-[0_18px_48px_rgba(91,57,32,0.12)] transition hover:-translate-y-1">
      <img
        src={dish.image}
        alt={dish.name}
        className="h-52 w-full object-cover"
      />
      <div className="p-5">
        <h3 className="text-lg font-bold text-brand-brown">{dish.name}</h3>
        <p className="mt-2 text-sm text-stone-600">
          {formatCurrency(dish.price)}
        </p>
      </div>
    </article>
  );
}

export default DishPreviewCard;
