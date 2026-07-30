export default function Card({ title, value, hint, children, className = "" }) {
  return (
    <div
      className={`relative overflow-hidden rounded-xl border border-black/5 bg-bg-alt p-5 pb-6 ${className}`}
    >
      {children ?? (
        <>
          <p className="font-body text-sm text-text-secondary">{title}</p>
          <p className="mt-2 font-display text-3xl font-semibold tracking-tight text-text-primary">
            {value}
          </p>
          {hint && <p className="mt-1 font-body text-xs text-text-secondary">{hint}</p>}
        </>
      )}

      {/* Signature motif from AGENT.md §2.5: three thin lines, orange → purple → transparent. */}
      <div className="absolute inset-x-0 bottom-0 flex h-[6px] flex-col" aria-hidden="true">
        <span className="h-[2px] bg-orange" />
        <span className="h-[2px] bg-purple" />
        <span className="h-[2px] bg-transparent" />
      </div>
    </div>
  );
}
