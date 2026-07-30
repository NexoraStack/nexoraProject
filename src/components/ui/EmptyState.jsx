export default function EmptyState({ title, description, action, className = "" }) {
  return (
    <div
      className={`rounded-xl border border-dashed border-black/10 bg-bg-alt px-6 py-12 text-center ${className}`}
    >
      <p className="font-display text-base font-semibold text-text-primary">{title}</p>
      {description && (
        <p className="mx-auto mt-1.5 max-w-sm font-body text-sm text-text-secondary">
          {description}
        </p>
      )}
      {action && <div className="mt-5 flex justify-center">{action}</div>}
    </div>
  );
}
