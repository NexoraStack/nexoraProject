import { useMemo, useState } from "react";
import AppLayout from "../components/layout/AppLayout";
import Button from "../components/ui/Button";
import Modal from "../components/ui/Modal";
import EmptyState from "../components/ui/EmptyState";
import ProjectCard from "../components/projects/ProjectCard";
import ProjectFilters from "../components/projects/ProjectFilters";
import ProjectFormDialog from "../components/projects/ProjectFormDialog";
import { useAuth } from "../context/auth-context";
import {
  listProjects,
  createProject,
  updateProject,
  deleteProject,
  filterProjects,
} from "../lib/projects";

const emptyFilters = { query: "", type: "all", status: "all" };

export default function ProjectsPage() {
  const { session } = useAuth();
  const [projects, setProjects] = useState(() => listProjects(session.email));
  const [filters, setFilters] = useState(emptyFilters);
  const [formOpen, setFormOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [pendingDeletion, setPendingDeletion] = useState(null);

  const visibleProjects = useMemo(
    () => filterProjects(projects, filters),
    [projects, filters],
  );

  const hasActiveFilters =
    filters.query.trim() !== "" || filters.type !== "all" || filters.status !== "all";

  function openCreateForm() {
    setEditingProject(null);
    setFormOpen(true);
  }

  function openEditForm(project) {
    setEditingProject(project);
    setFormOpen(true);
  }

  function handleFormSubmit(values) {
    if (editingProject) {
      updateProject(session.email, editingProject.id, values);
    } else {
      createProject(session.email, values);
    }
    setProjects(listProjects(session.email));
    setFormOpen(false);
    setEditingProject(null);
  }

  function confirmDeletion() {
    deleteProject(session.email, pendingDeletion.id);
    setProjects(listProjects(session.email));
    setPendingDeletion(null);
  }

  return (
    <AppLayout
      title="Projetos"
      subtitle={
        projects.length === 0
          ? "Nenhum projeto ainda."
          : `${visibleProjects.length} de ${projects.length} ${
              projects.length === 1 ? "projeto" : "projetos"
            }`
      }
      actions={
        <Button variant="primary" onClick={openCreateForm}>
          Novo projeto
        </Button>
      }
    >
      {projects.length > 0 && (
        <ProjectFilters filters={filters} onChange={setFilters} />
      )}

      <div className={projects.length > 0 ? "mt-6" : ""}>
        {projects.length === 0 ? (
          <EmptyState
            title="Comece seu primeiro projeto"
            description="Cada projeto ganha um tipo e um status, para você acompanhar tudo em camadas."
            action={
              <Button variant="primary" onClick={openCreateForm}>
                Criar projeto
              </Button>
            }
          />
        ) : visibleProjects.length === 0 ? (
          <EmptyState
            title="Nenhum projeto encontrado"
            description="Nenhum projeto corresponde aos filtros atuais."
            action={
              <Button variant="ghost" onClick={() => setFilters(emptyFilters)}>
                Limpar filtros
              </Button>
            }
          />
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {visibleProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onEdit={openEditForm}
                onDelete={setPendingDeletion}
              />
            ))}
          </div>
        )}
      </div>

      <ProjectFormDialog
        open={formOpen}
        project={editingProject}
        onClose={() => {
          setFormOpen(false);
          setEditingProject(null);
        }}
        onSubmit={handleFormSubmit}
      />

      <Modal
        open={pendingDeletion !== null}
        onClose={() => setPendingDeletion(null)}
        title="Excluir projeto"
        description="Esta ação não pode ser desfeita."
      >
        <p className="font-body text-sm text-text-secondary">
          O projeto{" "}
          <span className="font-medium text-text-primary">{pendingDeletion?.name}</span>{" "}
          será removido permanentemente.
        </p>
        <div className="mt-6 flex justify-end gap-3">
          <Button variant="ghost" onClick={() => setPendingDeletion(null)}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={confirmDeletion}>
            Excluir
          </Button>
        </div>
      </Modal>

      {hasActiveFilters && visibleProjects.length > 0 && (
        <p className="mt-6 font-body text-sm text-text-secondary">
          Filtros ativos.{" "}
          <button
            type="button"
            onClick={() => setFilters(emptyFilters)}
            className="rounded font-medium text-purple underline underline-offset-2 hover:decoration-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple focus-visible:ring-offset-2"
          >
            Limpar
          </button>
        </p>
      )}
    </AppLayout>
  );
}
