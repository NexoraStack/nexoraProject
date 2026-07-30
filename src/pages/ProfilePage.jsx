import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AppLayout from "../components/layout/AppLayout";
import Avatar from "../components/ui/Avatar";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import { StatusBadge } from "../components/ui/Badge";
import { useAuth } from "../context/auth-context";
import {
  isRequired,
  isValidEmail,
  isLongEnough,
  matches,
  MIN_PASSWORD_LENGTH,
} from "../lib/validation";
import {
  listProjects,
  countByStatus,
  migrateProjectsOwner,
  PROJECT_STATUSES,
  statusLabel,
} from "../lib/projects";

function SectionCard({ title, description, children }) {
  return (
    <section className="rounded-xl border border-black/5 bg-bg-alt p-5 md:p-6">
      <h2 className="font-display text-base font-semibold text-text-primary">{title}</h2>
      {description && (
        <p className="mt-1 font-body text-sm text-text-secondary">{description}</p>
      )}
      <div className="mt-5">{children}</div>
    </section>
  );
}

export default function ProfilePage() {
  const { session, updateProfile, changePassword, logout } = useAuth();
  const navigate = useNavigate();

  const [projects] = useState(() => listProjects(session.email));

  const [account, setAccount] = useState({ name: session.name, email: session.email });
  const [accountErrors, setAccountErrors] = useState({});
  const [accountMessage, setAccountMessage] = useState("");

  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [passwordErrors, setPasswordErrors] = useState({});
  const [passwordMessage, setPasswordMessage] = useState("");

  function handleAccountChange(event) {
    const { name, value } = event.target;
    setAccount((prev) => ({ ...prev, [name]: value }));
    setAccountErrors((prev) => ({ ...prev, [name]: undefined }));
    setAccountMessage("");
  }

  function handleAccountSubmit(event) {
    event.preventDefault();

    const nextErrors = {};
    if (!isRequired(account.name)) nextErrors.name = "Nome é obrigatório";
    if (!isRequired(account.email)) {
      nextErrors.email = "Email é obrigatório";
    } else if (!isValidEmail(account.email)) {
      nextErrors.email = "Informe um e-mail válido";
    }

    setAccountErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    const previousEmail = session.email;
    const result = updateProfile(account);
    if (result.success) {
      migrateProjectsOwner(previousEmail, result.session.email);
      setAccountMessage("Dados atualizados.");
    } else {
      setAccountErrors({ email: result.error });
    }
  }

  function handlePasswordChange(event) {
    const { name, value } = event.target;
    setPasswords((prev) => ({ ...prev, [name]: value }));
    setPasswordErrors((prev) => ({ ...prev, [name]: undefined }));
    setPasswordMessage("");
  }

  function handlePasswordSubmit(event) {
    event.preventDefault();

    const nextErrors = {};
    if (!isRequired(passwords.currentPassword)) {
      nextErrors.currentPassword = "Informe a senha atual";
    }
    if (!isLongEnough(passwords.newPassword)) {
      nextErrors.newPassword = `Use pelo menos ${MIN_PASSWORD_LENGTH} caracteres`;
    }
    if (!matches(passwords.newPassword, passwords.confirmPassword)) {
      nextErrors.confirmPassword = "As senhas não coincidem";
    }

    setPasswordErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    const result = changePassword({
      currentPassword: passwords.currentPassword,
      newPassword: passwords.newPassword,
    });

    if (result.success) {
      setPasswords({ currentPassword: "", newPassword: "", confirmPassword: "" });
      setPasswordMessage("Senha alterada.");
    } else {
      setPasswordErrors({ currentPassword: result.error });
    }
  }

  function handleLogout() {
    logout();
    navigate("/");
  }

  return (
    <AppLayout title="Perfil" subtitle="Seus dados e preferências de conta.">
      <div className="grid gap-6 lg:grid-cols-[1fr_1.3fr]">
        <div className="space-y-6">
          <section className="rounded-xl border border-black/5 bg-bg-alt p-5 md:p-6">
            <div className="flex items-center gap-4">
              <Avatar name={session.name} size="lg" />
              <div className="min-w-0">
                <p className="truncate font-display text-lg font-semibold text-text-primary">
                  {session.name}
                </p>
                <p className="truncate font-mono text-xs text-text-secondary">
                  {session.email}
                </p>
              </div>
            </div>

            <div className="mt-6 border-t border-black/5 pt-5">
              <p className="font-body text-sm font-medium text-text-primary">
                {projects.length} {projects.length === 1 ? "projeto" : "projetos"}
              </p>
              {projects.length === 0 ? (
                <p className="mt-1 font-body text-sm text-text-secondary">
                  Você ainda não criou nenhum projeto.
                </p>
              ) : (
                <ul className="mt-3 flex flex-wrap gap-2">
                  {PROJECT_STATUSES.filter(
                    (status) => countByStatus(projects, status.value) > 0,
                  ).map((status) => (
                    <li key={status.value}>
                      <StatusBadge
                        status={status.value}
                        label={`${countByStatus(projects, status.value)} ${statusLabel(
                          status.value,
                        )}`}
                      />
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </section>

          <Button variant="ghost" onClick={handleLogout} className="w-full">
            Sair da conta
          </Button>
        </div>

        <div className="space-y-6">
          <SectionCard title="Dados da conta" description="Atualize seu nome e e-mail.">
            <form onSubmit={handleAccountSubmit} noValidate className="space-y-4">
              <Input
                label="Nome"
                name="name"
                value={account.name}
                onChange={handleAccountChange}
                error={accountErrors.name}
                required
              />
              <Input
                label="Email"
                type="email"
                name="email"
                value={account.email}
                onChange={handleAccountChange}
                error={accountErrors.email}
                required
              />

              {accountMessage && (
                <p role="status" className="font-body text-sm text-success">
                  {accountMessage}
                </p>
              )}

              <div className="flex justify-end">
                <Button type="submit" variant="primary">
                  Salvar
                </Button>
              </div>
            </form>
          </SectionCard>

          <SectionCard
            title="Senha"
            description={`Use pelo menos ${MIN_PASSWORD_LENGTH} caracteres.`}
          >
            <form onSubmit={handlePasswordSubmit} noValidate className="space-y-4">
              <Input
                label="Senha atual"
                type="password"
                name="currentPassword"
                value={passwords.currentPassword}
                onChange={handlePasswordChange}
                error={passwordErrors.currentPassword}
                required
                placeholder="••••••••"
              />
              <Input
                label="Nova senha"
                type="password"
                name="newPassword"
                value={passwords.newPassword}
                onChange={handlePasswordChange}
                error={passwordErrors.newPassword}
                required
                placeholder="••••••••"
              />
              <Input
                label="Confirmar nova senha"
                type="password"
                name="confirmPassword"
                value={passwords.confirmPassword}
                onChange={handlePasswordChange}
                error={passwordErrors.confirmPassword}
                required
                placeholder="••••••••"
              />

              {passwordMessage && (
                <p role="status" className="font-body text-sm text-success">
                  {passwordMessage}
                </p>
              )}

              <div className="flex justify-end">
                <Button type="submit" variant="primary">
                  Alterar senha
                </Button>
              </div>
            </form>
          </SectionCard>
        </div>
      </div>
    </AppLayout>
  );
}
