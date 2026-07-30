import Sidebar from "./Sidebar";
import BottomNav from "./BottomNav";

// Shared shell for the authenticated pages: persistent navigation plus a page
// header, so Dashboard/Projetos/Perfil share the same rhythm and max width.
export default function AppLayout({ title, subtitle, actions, children }) {
  return (
    <div className="flex min-h-screen bg-bg-base">
      <Sidebar />

      <main className="flex-1 px-6 py-8 pb-24 md:px-10 md:py-10 md:pb-10">
        <div className="mx-auto w-full max-w-6xl">
          <header className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <h1 className="font-display text-2xl font-semibold tracking-tight text-text-primary">
                {title}
              </h1>
              {subtitle && (
                <p className="mt-1.5 font-body text-sm text-text-secondary">{subtitle}</p>
              )}
            </div>
            {actions && <div className="flex items-center gap-3">{actions}</div>}
          </header>

          <div className="mt-8">{children}</div>
        </div>
      </main>

      <BottomNav />
    </div>
  );
}
