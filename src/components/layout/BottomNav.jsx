import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const navItems = [
  { to: "/dashboard", label: "Home", active: true },
  { label: "Projetos", active: false },
  { label: "Perfil", active: false },
];

export default function BottomNav() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <nav className="fixed inset-x-0 bottom-0 z-10 flex items-center justify-around border-t border-black/5 bg-bg-alt py-2 md:hidden">
      {navItems.map((item) =>
        item.active ? (
          <NavLink
            key={item.label}
            to={item.to}
            end
            className={({ isActive }) =>
              `rounded-lg px-3 py-1.5 text-xs font-body transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-hover focus-visible:ring-offset-2 ${
                isActive
                  ? "bg-orange/10 font-semibold text-text-primary"
                  : "text-text-secondary"
              }`
            }
          >
            {item.label}
          </NavLink>
        ) : (
          <span
            key={item.label}
            className="px-3 py-1.5 text-xs font-body text-text-secondary/50"
          >
            {item.label}
          </span>
        ),
      )}
      <button
        type="button"
        onClick={handleLogout}
        className="rounded-lg px-3 py-1.5 text-xs font-body text-text-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-hover focus-visible:ring-offset-2"
      >
        Sair
      </button>
    </nav>
  );
}
