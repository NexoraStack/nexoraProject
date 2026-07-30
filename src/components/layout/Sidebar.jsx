import { NavLink, useNavigate } from "react-router-dom";
import Logo from "../ui/Logo";
import { useAuth } from "../../context/AuthContext";

const navItems = [
  { to: "/dashboard", label: "Home", active: true },
  { label: "Projetos", active: false },
  { label: "Perfil", active: false },
];

export default function Sidebar() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <aside className="hidden w-56 flex-col border-r border-black/5 bg-bg-alt px-4 py-6 md:flex">
      <Logo size="sm" className="px-2" />

      <nav className="mt-10 flex flex-1 flex-col gap-1">
        {navItems.map((item) =>
          item.active ? (
            <NavLink
              key={item.label}
              to={item.to}
              end
              className={({ isActive }) =>
                `rounded-lg px-3 py-2 text-sm font-body transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-hover focus-visible:ring-offset-2 ${
                  isActive
                    ? "bg-orange/10 font-semibold text-text-primary"
                    : "text-text-secondary hover:bg-black/5"
                }`
              }
            >
              {item.label}
            </NavLink>
          ) : (
            <span
              key={item.label}
              className="cursor-not-allowed rounded-lg px-3 py-2 text-sm font-body text-text-secondary/50"
              title="Em breve"
            >
              {item.label}
            </span>
          ),
        )}
      </nav>

      <button
        type="button"
        onClick={handleLogout}
        className="rounded-lg px-3 py-2 text-left text-sm font-body text-text-secondary transition-colors hover:bg-black/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-hover focus-visible:ring-offset-2"
      >
        Sair
      </button>
    </aside>
  );
}
