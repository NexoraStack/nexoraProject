import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Logo from "../components/ui/Logo";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import SplitScreen from "../components/layout/SplitScreen";
import StackedLinesPattern from "../components/layout/StackedLinesPattern";
import { isRequired, isValidEmail } from "../lib/validation";
import { useAuth } from "../context/AuthContext";
import { DEMO_CREDENTIALS } from "../lib/auth";

export default function LoginPage() {
  const [values, setValues] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  function handleChange(event) {
    const { name, value } = event.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
    setFormError("");
  }

  function handleSubmit(event) {
    event.preventDefault();

    const nextErrors = {};
    if (!isRequired(values.email)) {
      nextErrors.email = "Email é obrigatório";
    } else if (!isValidEmail(values.email)) {
      nextErrors.email = "Informe um e-mail válido";
    }
    if (!isRequired(values.password)) {
      nextErrors.password = "Senha é obrigatória";
    }

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    const result = login(values.email, values.password);
    if (result.success) {
      navigate("/dashboard");
    } else {
      setFormError(result.error);
    }
  }

  return (
    <SplitScreen
      left={
        <div className="flex h-full w-full flex-col justify-center bg-orange px-8 py-10 md:px-14">
          <StackedLinesPattern />
          <div className="relative z-10">
            <Link to="/" className="inline-block rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-text-primary focus-visible:ring-offset-2">
              <Logo variant="light" size="md" />
            </Link>
            <p className="mt-4 max-w-xs font-display text-lg text-text-primary">
              Organize seus projetos em camadas, do jeito Nexora.
            </p>
          </div>
        </div>
      }
      right={
        <div className="ml-8 w-full max-w-sm px-6 py-10 md:ml-16 md:px-0">
          <Link
            to="/"
            className="mb-8 inline-block rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-hover focus-visible:ring-offset-2 md:hidden"
          >
            <Logo variant="dark" size="sm" />
          </Link>
          <h1 className="font-display text-2xl font-semibold text-text-primary">
            Entrar
          </h1>
          <p className="mt-1 text-sm text-text-secondary">
            Acesse sua conta Nexora Stack.
          </p>

          <form onSubmit={handleSubmit} noValidate className="mt-8 space-y-5">
            <Input
              label="Email"
              type="email"
              name="email"
              value={values.email}
              onChange={handleChange}
              error={errors.email}
              required
              placeholder="voce@empresa.com"
            />
            <Input
              label="Senha"
              type="password"
              name="password"
              value={values.password}
              onChange={handleChange}
              error={errors.password}
              required
              placeholder="••••••••"
            />

            {formError && (
              <p role="alert" className="text-sm text-error">
                {formError}
              </p>
            )}

            <Button type="submit" variant="primary" className="w-full">
              Entrar
            </Button>
          </form>

          <p className="mt-6 font-mono text-xs text-text-secondary">
            Demo: {DEMO_CREDENTIALS.email} / {DEMO_CREDENTIALS.password}
          </p>
        </div>
      }
    />
  );
}
