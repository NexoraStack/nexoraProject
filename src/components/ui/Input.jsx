export default function Input({
  label,
  type = "text",
  name,
  value,
  onChange,
  error,
  required = false,
  placeholder,
  id,
  className = "",
}) {
  const inputId = id || name;

  return (
    <div className={className}>
      {label && (
        <label
          htmlFor={inputId}
          className="block font-body text-sm text-text-secondary mb-1.5"
        >
          {label}
        </label>
      )}
      <input
        id={inputId}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        placeholder={placeholder}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${inputId}-error` : undefined}
        className={`w-full rounded-lg border px-3.5 py-2.5 font-body text-text-primary placeholder:text-text-secondary/60 transition-shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 ${
          error
            ? "border-error focus-visible:ring-error"
            : "border-black/10 focus-visible:ring-orange-hover"
        }`}
      />
      {error && (
        <p id={`${inputId}-error`} className="mt-1.5 text-sm text-error">
          {error}
        </p>
      )}
    </div>
  );
}
