function IconButton({
  as: Component = "button",
  children,
  className = "",
  label,
  onClick,
  size = "md",
  to,
  type = "button",
  variant = "filled",
  ...props
}) {
  return (
    <Component
      {...props}
      {...(Component === "button" ? { type } : {})}
      {...(to ? { to } : {})}
      onClick={onClick}
      aria-label={label}
      className={[
        "icon-button",
        size === "lg" ? "icon-button-lg" : "icon-button-md",
        variant === "outline"
          ? "icon-button-outline"
          : variant === "header"
            ? "icon-button-header"
            : variant === "headerLight"
              ? "icon-button-header-light"
              : "icon-button-filled",
        className,
      ].join(" ")}
    >
      {children}
    </Component>
  );
}

export default IconButton;
