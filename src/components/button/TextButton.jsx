function TextButton({
  as: Component = "button",
  children,
  className = "",
  disabled = false,
  loading = false,
  loadingText = "Đang xử lý...",
  onClick,
  to,
  type = "button",
  variant = "primary",
  ...props
}) {
  return (
    <Component
      {...props}
      {...(Component === "button" ? { type } : {})}
      {...(to ? { to } : {})}
      onClick={onClick}
      disabled={Component === "button" ? disabled || loading : undefined}
      aria-busy={loading}
      className={[
        "text-button",
        variant === "secondary"
          ? "text-button-secondary"
          : variant === "ghost"
            ? "text-button-ghost"
            : variant === "header"
              ? "text-button-header"
              : "text-button-primary",
        className,
      ].join(" ")}
    >
      {loading ? loadingText : children}
    </Component>
  );
}

export default TextButton;
