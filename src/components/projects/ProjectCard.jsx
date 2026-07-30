import { StatusBadge, TypeBadge } from "../ui/Badge";
import { statusLabel, typeLabel, formatDate } from "../../lib/projects";

const actionClasses =
  "rounded-md px-2 py-1 font-body text-xs text-text-secondary transition-colors hover:bg-black/5 hover:text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-hover focus-visible:ring-offset-1";

export default function ProjectCard({ project, onEdit, onDelete }) {
  return (
    <article className="flex flex-col rounded-xl border border-black/5 bg-bg-alt p-5 transition-shadow hover:shadow-md">
      <div className="flex items-start justify-between gap-3">
        <h3 className="font-display text-base font-semibold leading-snug text-text-primary">
          {project.name}
        </h3>
        <TypeBadge label={typeLabel(project.type)} className="shrink-0" />
      </div>

      {project.description && (
        <p className="mt-2 line-clamp-3 font-body text-sm text-text-secondary">
          {project.description}
        </p>
      )}

      <div className="mt-4 flex flex-1 items-end justify-between gap-3">
        <StatusBadge status={project.status} label={statusLabel(project.status)} />
        <span className="font-mono text-xs text-text-secondary">
          {formatDate(project.updatedAt)}
        </span>
      </div>

      <div className="mt-4 flex gap-1 border-t border-black/5 pt-3">
        <button type="button" onClick={() => onEdit(project)} className={actionClasses}>
          Editar
        </button>
        <button
          type="button"
          onClick={() => onDelete(project)}
          className={`${actionClasses} hover:text-error`}
        >
          Excluir
        </button>
      </div>
    </article>
  );
}
