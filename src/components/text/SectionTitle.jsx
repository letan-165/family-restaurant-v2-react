function SectionTitle({ label, title, center = false }) {
  return (
    <div className={center ? "text-center" : ""}>
      {label ? (
        <p className="text-sm font-semibold text-brand-brown">{label}</p>
      ) : null}
      <h2 className="mt-1 font-display text-3xl font-bold text-brand-brown">
        {title}
      </h2>
    </div>
  );
}

export default SectionTitle;
