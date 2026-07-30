export default function SplitScreen({ left, right }) {
  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      <div className="relative h-48 overflow-hidden md:h-auto md:w-1/2">{left}</div>
      <div className="flex flex-1 items-start bg-bg-base md:w-1/2 md:items-center">{right}</div>
    </div>
  );
}
