import { NavLink, Link, useNavigate } from "react-router-dom";
import Logo from "../ui/Logo";
import Avatar from "../ui/Avatar";
import { useAuth } from "../../context/auth-context";
import { NAV_ITEMS } from "./navItems";

export default function Sidebar() {
  const { session, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/");
  }

  return (
    <aside className="hidden w-60 shrink-0 flex-col border-r border-black/5 bg-bg-alt px-4 py-6 md:flex">
      <Link
        to="/"
        className="rounded-lg px-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-hover focus-visible:ring-offset-2"
      >
        <Logo size="sm" />
      </Link>

      <nav className="mt-10 flex flex-1 flex-col gap-1">
        {NAV_ITEMS.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end
            className={({ isActive }) =>
              `rounded-lg px-3 py-2 font-body text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-hover focus-visible:ring-offset-2 ${
                isActive
                  ? "bg-orange/10 font-semibold text-text-primary"
                  : "text-text-secondary hover:bg-black/5 hover:text-text-primary"
              }`
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div className="mt-6 border-t border-black/5 pt-4">
        <div className="flex items-center gap-2.5 px-1">
          <Avatar name={session?.name} size="sm" />
          <div className="min-w-0">
            <p className="truncate font-body text-sm font-medium text-text-primary">
              {session?.name}
            </p>
            <p className="truncate font-mono text-xs text-text-secondary">
              {session?.email}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={handleLogout}
          className="mt-3 w-full rounded-lg px-3 py-2 text-left font-body text-sm text-text-secondary transition-colors hover:bg-black/5 hover:text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-hover focus-visible:ring-offset-2"
        >
          Sair
        </button>
      </div>
    </aside>
  );
}
