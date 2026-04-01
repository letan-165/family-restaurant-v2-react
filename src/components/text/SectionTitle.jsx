function SectionTitle({ label, title, center = false }) {
  const alignClass = center ? "text-center" : "";

  return (
    <div className={alignClass}>
      {label ? <p className="section-label">{label}</p> : null}
      <h2 className="section-title">{title}</h2>
    </div>
  );
}

export default SectionTitle;
