export default function StackedLinesPattern({ count = 10, className = "" }) {
  const lines = Array.from({ length: count }, (_, i) => {
    const opacity = 0.22 - i * (0.2 / count);
    return { key: i, y: i * 14, opacity: Math.max(opacity, 0.02) };
  });

  return (
    <svg
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
      preserveAspectRatio="xMidYMid slice"
      viewBox="0 0 400 400"
      aria-hidden="true"
    >
      {lines.map((line) => (
        <rect
          key={line.key}
          x="-40"
          y={line.y}
          width="480"
          height="6"
          fill="white"
          opacity={line.opacity}
          transform="rotate(-6 200 200)"
        />
      ))}
    </svg>
  );
}
