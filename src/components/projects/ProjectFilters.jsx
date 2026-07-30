import Input from "../ui/Input";
import Select from "../ui/Select";
import { PROJECT_TYPES, PROJECT_STATUSES } from "../../lib/projects";

const typeOptions = [{ value: "all", label: "Todos os tipos" }, ...PROJECT_TYPES];
const statusOptions = [{ value: "all", label: "Todos os status" }, ...PROJECT_STATUSES];

export default function ProjectFilters({ filters, onChange }) {
  function handleChange(event) {
    const { name, value } = event.target;
    onChange({ ...filters, [name]: value });
  }

  return (
    <div className="grid gap-4 rounded-xl border border-black/5 bg-bg-alt p-4 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr]">
      <Input
        label="Buscar"
        type="search"
        name="query"
        value={filters.query}
        onChange={handleChange}
        placeholder="Nome ou descrição"
      />
      <Select
        label="Tipo"
        name="type"
        value={filters.type}
        onChange={handleChange}
        options={typeOptions}
      />
      <Select
        label="Status"
        name="status"
        value={filters.status}
        onChange={handleChange}
        options={statusOptions}
      />
    </div>
  );
}
