function DisplayField({ label, value, className = "" }) {
  return (
    <div className={`field-box ${className}`.trim()}>
      <p className="field-label">{label}</p>
      <p className="field-value">{value}</p>
    </div>
  );
}

export default DisplayField;
