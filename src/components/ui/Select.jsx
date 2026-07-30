export default function Select({
  label,
  name,
  value,
  onChange,
  options,
  error,
  id,
  className = "",
}) {
  const selectId = id || name;

  return (
    <div className={className}>
      {label && (
        <label
          htmlFor={selectId}
          className="mb-1.5 block font-body text-sm text-text-secondary"
        >
          {label}
        </label>
      )}

      <div className="relative">
        <select
          id={selectId}
          name={name}
          value={value}
          onChange={onChange}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${selectId}-error` : undefined}
          className={`w-full appearance-none rounded-lg border bg-bg-base py-2.5 pl-3.5 pr-10 font-body text-text-primary transition-shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 ${
            error
              ? "border-error focus-visible:ring-error"
              : "border-black/10 focus-visible:ring-orange-hover"
          }`}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        {/* Rendered as a real element rather than a background-image data URI, which
            is brittle inside an arbitrary Tailwind value. */}
        <svg
          viewBox="0 0 12 12"
          aria-hidden="true"
          className="pointer-events-none absolute right-3.5 top-1/2 h-3 w-3 -translate-y-1/2 text-text-secondary"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        >
          <path d="M2.5 4.5 6 8l3.5-3.5" />
        </svg>
      </div>

      {error && (
        <p id={`${selectId}-error`} className="mt-1.5 text-sm text-error">
          {error}
        </p>
      )}
    </div>
  );
}
