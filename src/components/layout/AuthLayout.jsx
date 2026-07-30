import { Link } from "react-router-dom";
import Logo from "../ui/Logo";
import SplitScreen from "./SplitScreen";
import StackedLinesPattern from "./StackedLinesPattern";

// Shared shell for the auth screens (login, signup, password reset) so the brand
// panel and form column stay identical across all three.
export default function AuthLayout({
  title,
  subtitle,
  tagline = "Organize seus projetos em camadas, do jeito Nexora.",
  children,
  footer,
}) {
  return (
    <SplitScreen
      left={
        <div className="flex h-full w-full flex-col justify-center bg-orange px-8 py-10 md:px-14">
          <StackedLinesPattern />
          <div className="relative z-10">
            <Link
              to="/"
              className="inline-block rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-text-primary focus-visible:ring-offset-2"
            >
              <Logo variant="light" size="md" />
            </Link>
            <p className="mt-4 max-w-xs font-display text-lg text-text-primary">
              {tagline}
            </p>
          </div>
        </div>
      }
      right={
        <div className="ml-8 w-full max-w-sm px-6 py-10 md:ml-16 md:px-0">
          <Link
            to="/"
            className="mb-8 inline-block rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-hover focus-visible:ring-offset-2 md:hidden"
          >
            <Logo variant="dark" size="sm" />
          </Link>

          <h1 className="font-display text-2xl font-semibold tracking-tight text-text-primary">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-1.5 font-body text-sm text-text-secondary">{subtitle}</p>
          )}

          <div className="mt-8">{children}</div>

          {footer && <div className="mt-6 text-sm text-text-secondary">{footer}</div>}
        </div>
      }
    />
  );
}
