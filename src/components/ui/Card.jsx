export default function Card({ title, value, hint, children, className = "" }) {
  return (
    <div className={`relative overflow-hidden rounded-xl bg-bg-alt p-5 ${className}`}>
      {children ?? (
        <>
          <p className="text-sm text-text-secondary">{title}</p>
          <p className="mt-2 font-display text-3xl font-semibold text-text-primary">
            {value}
          </p>
          {hint && <p className="mt-1 text-xs text-text-secondary">{hint}</p>}
        </>
      )}
      <div className="absolute inset-x-0 bottom-0 flex h-[6px] flex-col">
        <span className="h-[2px] bg-orange" />
        <span className="h-[2px] bg-purple" />
        <span className="h-[2px] bg-transparent" />
      </div>
    </div>
  );
}
