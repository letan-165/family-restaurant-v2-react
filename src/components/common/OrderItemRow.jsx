import { formatCurrency } from "../../utils/format.js";

function OrderItemRow({ item }) {
  return (
    <div className="flex items-center gap-4 rounded-2xl border border-stone-200 bg-white p-4">
      <img
        src={item.image}
        alt={item.name}
        className="h-16 w-16 rounded-xl object-cover"
      />

      <div className="min-w-0 flex-1">
        <p className="text-base font-semibold text-brand-brown">{item.name}</p>
        <p className="mt-1 text-sm text-stone-600">
          {item.category} x {item.quantity}
        </p>
      </div>

      <p className="text-sm font-semibold text-stone-800">
        {formatCurrency(item.price * item.quantity)}
      </p>
    </div>
  );
}

export default OrderItemRow;
