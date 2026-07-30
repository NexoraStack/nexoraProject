const sizeClasses = {
  sm: "text-lg",
  md: "text-2xl",
  lg: "text-4xl",
};

export default function Logo({ size = "md", variant = "dark", className = "" }) {
  const textColor = variant === "light" ? "text-white" : "text-text-primary";
  const accentColor = variant === "light" ? "text-white" : "text-orange";

  return (
    <span
      className={`font-display font-semibold tracking-tight ${sizeClasses[size]} ${textColor} ${className}`}
    >
      Nexora <span className={accentColor}>Stack</span>
    </span>
  );
}
