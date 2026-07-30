const sizeClasses = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-4 py-2.5 text-sm",
  lg: "px-6 py-3 text-base",
};

const variantClasses = {
  primary:
    "bg-orange text-text-primary hover:bg-orange-hover focus-visible:ring-orange-hover disabled:opacity-50 disabled:cursor-not-allowed",
  ghost:
    "bg-transparent text-purple border border-purple hover:bg-purple/10 focus-visible:ring-purple disabled:opacity-50 disabled:cursor-not-allowed",
};

export default function Button({
  variant = "primary",
  size = "md",
  type = "button",
  disabled = false,
  children,
  className = "",
  ...rest
}) {
  return (
    <button
      type={type}
      disabled={disabled}
      className={`font-body font-medium rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
}
