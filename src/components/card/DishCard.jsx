import { formatCurrency } from "../../utils/format.js";

function DishCard({ dish }) {
  return (
    <article className="overflow-hidden rounded-2xl border border-stone-200 bg-white text-left shadow-sm transition hover:-translate-y-1">
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

export default DishCard;
