export default function Textarea({
  label,
  name,
  value,
  onChange,
  error,
  placeholder,
  rows = 3,
  id,
  className = "",
}) {
  const textareaId = id || name;

  return (
    <div className={className}>
      {label && (
        <label
          htmlFor={textareaId}
          className="mb-1.5 block font-body text-sm text-text-secondary"
        >
          {label}
        </label>
      )}
      <textarea
        id={textareaId}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={rows}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${textareaId}-error` : undefined}
        className={`w-full resize-y rounded-lg border px-3.5 py-2.5 font-body text-text-primary placeholder:text-text-secondary/60 transition-shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 ${
          error
            ? "border-error focus-visible:ring-error"
            : "border-black/10 focus-visible:ring-orange-hover"
        }`}
      />
      {error && (
        <p id={`${textareaId}-error`} className="mt-1.5 text-sm text-error">
          {error}
        </p>
      )}
    </div>
  );
}
