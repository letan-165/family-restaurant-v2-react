function OrderSummaryCard({ actions, rows, title = "Tóm tắt" }) {
  return (
    <div className="card h-fit">
      <h2 className="font-display text-2xl font-semibold text-brand-brown">
        {title}
      </h2>

      <div className="mt-6 space-y-3 text-sm text-stone-700">
        {rows.map((row) => (
          <div
            key={row.label}
            className={[
              "flex items-center justify-between",
              row.highlight
                ? "border-t border-stone-200 pt-3 text-base font-semibold text-brand-brown"
                : "",
            ].join(" ")}
          >
            <span>{row.label}</span>
            <span>{row.value}</span>
          </div>
        ))}
      </div>

      <div className="mt-6 grid gap-3">{actions}</div>
    </div>
  );
}

export default OrderSummaryCard;
