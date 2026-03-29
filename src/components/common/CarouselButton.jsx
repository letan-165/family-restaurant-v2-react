function CarouselButton({ children, label, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-brand-brown/15 bg-white text-xl text-brand-brown transition hover:bg-brand-brown hover:text-white"
    >
      {children}
    </button>
  );
}

export default CarouselButton;
