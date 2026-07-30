const sizeClasses = {
  sm: "h-8 w-8 text-xs",
  md: "h-11 w-11 text-sm",
  lg: "h-16 w-16 text-lg",
};

function initialsFrom(name) {
  if (!name) return "?";

  const words = name.trim().split(/\s+/);
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase();

  return (words[0][0] + words[words.length - 1][0]).toUpperCase();
}

export default function Avatar({ name, size = "md", className = "" }) {
  return (
    <div
      className={`relative flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-orange/10 font-display font-semibold text-text-primary ${sizeClasses[size]} ${className}`}
    >
      {initialsFrom(name)}
      <div className="absolute inset-x-0 bottom-0 flex h-[4px] flex-col" aria-hidden="true">
        <span className="h-[1.5px] bg-orange" />
        <span className="h-[1.5px] bg-purple" />
      </div>
    </div>
  );
}
