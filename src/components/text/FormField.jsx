function FormField({
  as = "input",
  defaultValue,
  htmlFor,
  label,
  name,
  onChange,
  rows = 4,
  type = "text",
  value,
}) {
  return (
    <label htmlFor={htmlFor} className="form-field">
      <span className="form-label">{label}</span>
      {as === "textarea" ? (
        <textarea
          id={htmlFor}
          name={name}
          rows={rows}
          {...(value !== undefined ? { value } : { defaultValue })}
          onChange={onChange}
          className="form-control"
        />
      ) : (
        <input
          id={htmlFor}
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
