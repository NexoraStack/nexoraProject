import { useEffect, useState } from "react";
import Modal from "../ui/Modal";
import Input from "../ui/Input";
import Textarea from "../ui/Textarea";
import Select from "../ui/Select";
import Button from "../ui/Button";
import { PROJECT_TYPES, PROJECT_STATUSES } from "../../lib/projects";
import { isRequired } from "../../lib/validation";

const emptyValues = {
  name: "",
  description: "",
  type: PROJECT_TYPES[0].value,
  status: PROJECT_STATUSES[0].value,
};

export default function ProjectFormDialog({ open, project, onClose, onSubmit }) {
  const [values, setValues] = useState(emptyValues);
  const [errors, setErrors] = useState({});

  // Reload the form whenever the dialog opens, so editing one project then another
  // (or switching to "new") never shows stale values.
  useEffect(() => {
    if (!open) return;
    setValues(
      project
        ? {
            name: project.name,
            description: project.description,
            type: project.type,
            status: project.status,
          }
        : emptyValues,
    );
    setErrors({});
  }, [open, project]);

  function handleChange(event) {
    const { name, value } = event.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (!isRequired(values.name)) {
      setErrors({ name: "Dê um nome ao projeto" });
      return;
    }

    onSubmit(values);
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={project ? "Editar projeto" : "Novo projeto"}
      description={
        project
          ? "Atualize os dados deste projeto."
          : "Comece com o essencial — você pode ajustar depois."
      }
    >
      <form onSubmit={handleSubmit} noValidate className="space-y-4">
        <Input
          label="Nome"
          name="name"
          value={values.name}
          onChange={handleChange}
          error={errors.name}
          required
          placeholder="Ex: Redesign do site"
        />
        <Textarea
          label="Descrição"
          name="description"
          value={values.description}
          onChange={handleChange}
          placeholder="O que este projeto envolve? (opcional)"
        />

        <div className="grid gap-4 sm:grid-cols-2">
          <Select
            label="Tipo"
            name="type"
            value={values.type}
            onChange={handleChange}
            options={PROJECT_TYPES}
          />
          <Select
            label="Status"
            name="status"
            value={values.status}
            onChange={handleChange}
            options={PROJECT_STATUSES}
          />
        </div>

        <div className="flex justify-end gap-3 pt-2">
          <Button type="button" variant="ghost" onClick={onClose}>
            Cancelar
          </Button>
          <Button type="submit" variant="primary">
            {project ? "Salvar alterações" : "Criar projeto"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
