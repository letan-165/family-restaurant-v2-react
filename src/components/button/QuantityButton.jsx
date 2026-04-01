function QuantityButton({ children, label, onClick }) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-brand-brown text-lg font-bold text-white transition hover:bg-brand-brown-dark"
    >
      {children}
    </button>
  );
}

export default QuantityButton;
