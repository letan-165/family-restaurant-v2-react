import IconButton from "../button/IconButton.jsx";
import { formatCurrency } from "../../utils/format.js";

function CartItemRow({ checked, item, onDecrease, onIncrease, onToggle }) {
  return (
    <label className="flex items-center gap-4 rounded-2xl border border-stone-200 bg-white p-4">
      <input
        type="checkbox"
        checked={checked}
        onChange={() => onToggle(item.name)}
        className="h-4 w-4 accent-brand-brown"
      />

      <img
        src={item.image}
        alt={item.name}
        className="h-16 w-16 rounded-xl object-cover"
      />

      <div className="min-w-0 flex-1">
        <p className="text-base font-semibold text-brand-brown">{item.name}</p>
        <p className="mt-1 text-sm text-stone-600">{item.category}</p>

        <div className="mt-3 flex items-center gap-3">
          <IconButton
            label={`Giảm số lượng ${item.name}`}
            onClick={() => onDecrease(item.name)}
          >
            -
          </IconButton>
          <span className="min-w-6 text-center text-sm font-semibold text-brand-brown">
            {item.quantity}
          </span>
          <IconButton
            label={`Tăng số lượng ${item.name}`}
            onClick={() => onIncrease(item.name)}
          >
            +
          </IconButton>
        </div>
      </div>

      <div className="text-right">
        <p className="font-semibold text-stone-800">
          {formatCurrency(item.price * item.quantity)}
        </p>
      </div>
    </label>
  );
}

export default CartItemRow;
