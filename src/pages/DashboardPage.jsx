import { useAuth } from "../context/AuthContext";
import Sidebar from "../components/layout/Sidebar";
import BottomNav from "../components/layout/BottomNav";
import Card from "../components/ui/Card";
import Avatar from "../components/ui/Avatar";

export default function DashboardPage() {
  const { session } = useAuth();
  const displayName = session?.name
    ? session.name[0].toUpperCase() + session.name.slice(1)
    : "";

  return (
    <div className="flex min-h-screen bg-bg-base">
      <Sidebar />

      <main className="flex-1 px-6 py-8 pb-24 md:px-10 md:py-10 md:pb-10">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-display text-2xl font-semibold text-text-primary">
              Olá, {displayName}
            </h1>
            <p className="mt-1 text-sm text-text-secondary">
              Bem-vindo de volta ao Nexora Stack.
            </p>
          </div>
          <Avatar name={displayName} />
        </div>

        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Card title="Projetos ativos" value="0" hint="Nenhum projeto criado ainda" />
          <Card title="Tarefas pendentes" value="0" hint="Tudo em dia" />
          <Card title="Última atividade" value="—" hint="Sem registros" />
        </div>

        <section className="mt-10">
          <h2 className="font-display text-lg font-semibold text-text-primary">
            Atividade recente
          </h2>
          <div className="mt-4 rounded-xl border border-dashed border-black/10 bg-bg-alt px-6 py-12 text-center">
            <p className="text-sm text-text-secondary">
              Nenhuma atividade por aqui ainda.
            </p>
            <p className="mt-1 text-sm text-text-secondary">
              Assim que você criar um projeto, tudo aparece nesta linha do tempo.
            </p>
          </div>
        </section>
      </main>

      <BottomNav />
    </div>
  );
}
