function TextButton({
  as: Component = "button",
  children,
  className = "",
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
      {children}
    </Component>
  );
}

export default TextButton;
