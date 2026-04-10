function FormField({
  as = "input",
  defaultValue,
  label,
  name,
  onChange,
  rows = 4,
  type = "text",
  value,
}) {
  return (
    <label htmlFor={name} className="form-field">
      <span className="form-label">{label}</span>
      {as === "textarea" ? (
        <textarea
          id={name}
          name={name}
          rows={rows}
          {...(value !== undefined ? { value } : { defaultValue })}
          onChange={onChange}
          className="form-control"
        />
      ) : (
        <input
          id={name}
          name={name}
          type={type}
          {...(type === "file"
            ? {}
            : value !== undefined
              ? { value }
              : { defaultValue })}
          onChange={onChange}
          className="form-control"
        />
      )}
    </label>
  );
}

export default FormField;
