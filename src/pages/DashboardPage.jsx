import { useState } from "react";
import AppLayout from "../components/layout/AppLayout";
import Card from "../components/ui/Card";
import Avatar from "../components/ui/Avatar";
import Button from "../components/ui/Button";
import EmptyState from "../components/ui/EmptyState";
import { StatusBadge, TypeBadge } from "../components/ui/Badge";
import { useAuth } from "../context/auth-context";
import {
  listProjects,
  countByStatus,
  mostRecent,
  statusLabel,
  typeLabel,
  formatDate,
} from "../lib/projects";

export default function DashboardPage() {
  const { session } = useAuth();
  const [projects] = useState(() => listProjects(session.email));

  const inProgress = countByStatus(projects, "in_progress");
  const done = countByStatus(projects, "done");
  const recent = mostRecent(projects, 5);

  return (
    <AppLayout
      title={`Olá, ${session.name}`}
      subtitle="Bem-vindo de volta ao Nexora Stack."
      actions={<Avatar name={session.name} />}
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Card
          title="Projetos"
          value={projects.length}
          hint={projects.length === 0 ? "Nenhum projeto criado ainda" : "No total"}
        />
        <Card
          title="Em andamento"
          value={inProgress}
          hint={inProgress === 0 ? "Nada em curso" : "Ativos agora"}
        />
        <Card
          title="Concluídos"
          value={done}
          hint={done === 0 ? "Nenhum finalizado" : "Finalizados"}
        />
      </div>

      <section className="mt-10">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="font-display text-lg font-semibold text-text-primary">
            Atividade recente
          </h2>
          {projects.length > 0 && (
            <Button to="/projects" variant="ghost" size="sm">
              Ver todos
            </Button>
          )}
        </div>

        <div className="mt-4">
          {recent.length === 0 ? (
            <EmptyState
              title="Nenhuma atividade por aqui ainda"
              description="Assim que você criar um projeto, tudo aparece nesta linha do tempo."
              action={
                <Button to="/projects" variant="primary">
                  Criar projeto
                </Button>
              }
            />
          ) : (
            <ul className="divide-y divide-black/5 overflow-hidden rounded-xl border border-black/5 bg-bg-alt">
              {recent.map((project) => (
                <li
                  key={project.id}
                  className="flex flex-wrap items-center justify-between gap-3 px-5 py-4"
                >
                  <div className="min-w-0">
                    <p className="truncate font-body text-sm font-medium text-text-primary">
                      {project.name}
                    </p>
                    <p className="mt-1 font-mono text-xs text-text-secondary">
                      Atualizado em {formatDate(project.updatedAt)}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <TypeBadge label={typeLabel(project.type)} />
                    <StatusBadge
                      status={project.status}
                      label={statusLabel(project.status)}
                    />
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </AppLayout>
  );
}
