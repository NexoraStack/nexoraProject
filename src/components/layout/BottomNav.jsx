import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth-context";
import { NAV_ITEMS } from "./navItems";

export default function BottomNav() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/");
  }

  return (
    <nav className="fixed inset-x-0 bottom-0 z-10 flex items-center justify-around border-t border-black/5 bg-bg-alt py-2 md:hidden">
      {NAV_ITEMS.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          end
          className={({ isActive }) =>
            `rounded-lg px-3 py-1.5 font-body text-xs transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-hover focus-visible:ring-offset-2 ${
              isActive
                ? "bg-orange/10 font-semibold text-text-primary"
                : "text-text-secondary"
            }`
          }
        >
          {item.label}
        </NavLink>
      ))}

      <button
        type="button"
        onClick={handleLogout}
        className="rounded-lg px-3 py-1.5 font-body text-xs text-text-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-hover focus-visible:ring-offset-2"
      >
        Sair
      </button>
    </nav>
  );
}
