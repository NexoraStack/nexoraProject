// Status colour is reinforcement only — the label always carries the meaning, and
// the text sits dark on a light tint so it stays well above AA regardless of hue.
const statusStyles = {
  idea: { tint: "bg-purple/10", dot: "bg-purple" },
  in_progress: { tint: "bg-orange/15", dot: "bg-orange" },
  done: { tint: "bg-success/10", dot: "bg-success" },
  paused: { tint: "bg-black/[0.06]", dot: "bg-text-secondary" },
};

export function StatusBadge({ status, label, className = "" }) {
  const style = statusStyles[status] ?? statusStyles.paused;

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 font-mono text-xs text-text-primary ${style.tint} ${className}`}
    >
      <span className={`h-1.5 w-1.5 shrink-0 rounded-full ${style.dot}`} aria-hidden="true" />
      {label}
    </span>
  );
}

export function TypeBadge({ label, className = "" }) {
  return (
    <span
      className={`inline-flex items-center rounded-md border border-black/10 px-2 py-0.5 font-body text-xs text-text-secondary ${className}`}
    >
      {label}
    </span>
  );
}
