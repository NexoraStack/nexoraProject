export default function Avatar({ name, size = "md" }) {
  const initials = name ? name.slice(0, 2).toUpperCase() : "?";
  const sizeClasses = size === "sm" ? "h-8 w-8 text-xs" : "h-11 w-11 text-sm";

  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden rounded-full bg-orange/10 font-display font-semibold text-text-primary ${sizeClasses}`}
    >
      {initials}
      <div className="absolute inset-x-0 bottom-0 flex h-[4px] flex-col">
        <span className="h-[1.5px] bg-orange" />
        <span className="h-[1.5px] bg-purple" />
      </div>
    </div>
  );
}
