// Projects are stored per account in localStorage, keyed by e-mail. Same caveat as
// lib/auth.js: this stands in for a real backend in a demo build.

const PROJECTS_KEY = "nexora_projects";

export const PROJECT_TYPES = [
  { value: "web", label: "Web" },
  { value: "mobile", label: "Mobile" },
  { value: "design", label: "Design" },
  { value: "backend", label: "Backend" },
];

export const PROJECT_STATUSES = [
  { value: "idea", label: "Ideia" },
  { value: "in_progress", label: "Em andamento" },
  { value: "done", label: "Concluído" },
  { value: "paused", label: "Pausado" },
];

export function typeLabel(value) {
  return PROJECT_TYPES.find((type) => type.value === value)?.label ?? value;
}

export function statusLabel(value) {
  return PROJECT_STATUSES.find((status) => status.value === value)?.label ?? value;
}

function readAll() {
  const raw = localStorage.getItem(PROJECTS_KEY);
  return raw ? JSON.parse(raw) : {};
}

function writeAll(all) {
  localStorage.setItem(PROJECTS_KEY, JSON.stringify(all));
}

export function listProjects(email) {
  return readAll()[email] ?? [];
}

export function createProject(email, { name, description, type, status }) {
  const all = readAll();
  const now = new Date().toISOString();
  const project = {
    id: crypto.randomUUID(),
    name: name.trim(),
    description: description.trim(),
    type,
    status,
    createdAt: now,
    updatedAt: now,
  };

  all[email] = [project, ...(all[email] ?? [])];
  writeAll(all);

  return project;
}

export function updateProject(email, id, updates) {
  const all = readAll();
  all[email] = (all[email] ?? []).map((project) =>
    project.id === id
      ? { ...project, ...updates, updatedAt: new Date().toISOString() }
      : project,
  );
  writeAll(all);

  return all[email].find((project) => project.id === id);
}

/** Projects are keyed by e-mail, so changing an account's e-mail has to move them. */
export function migrateProjectsOwner(oldEmail, newEmail) {
  if (oldEmail === newEmail) return;

  const all = readAll();
  if (!(oldEmail in all)) return;

  all[newEmail] = [...(all[newEmail] ?? []), ...all[oldEmail]];
  delete all[oldEmail];
  writeAll(all);
}

export function deleteProject(email, id) {
  const all = readAll();
  all[email] = (all[email] ?? []).filter((project) => project.id !== id);
  writeAll(all);
}

/** Pure filter over an already-loaded list, so it stays trivial to reason about. */
export function filterProjects(projects, { query = "", type = "all", status = "all" }) {
  const normalizedQuery = query.trim().toLowerCase();

  return projects.filter((project) => {
    if (type !== "all" && project.type !== type) return false;
    if (status !== "all" && project.status !== status) return false;
    if (!normalizedQuery) return true;

    return (
      project.name.toLowerCase().includes(normalizedQuery) ||
      project.description.toLowerCase().includes(normalizedQuery)
    );
  });
}

export function countByStatus(projects, status) {
  return projects.filter((project) => project.status === status).length;
}

export function mostRecent(projects, limit = 5) {
  return [...projects]
    .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
    .slice(0, limit);
}

export function formatDate(isoString) {
  return new Date(isoString).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}
