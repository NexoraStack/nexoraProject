import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import AuthLayout from "../components/layout/AuthLayout";
import {
  isRequired,
  isValidEmail,
  isLongEnough,
  matches,
  MIN_PASSWORD_LENGTH,
} from "../lib/validation";
import { useAuth } from "../context/auth-context";

const linkClasses =
  "rounded font-medium text-purple underline underline-offset-2 hover:decoration-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple focus-visible:ring-offset-2";

export default function SignupPage() {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState("");
  const { signup } = useAuth();
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
    if (!isRequired(values.name)) {
      nextErrors.name = "Nome é obrigatório";
    }
    if (!isRequired(values.email)) {
      nextErrors.email = "Email é obrigatório";
    } else if (!isValidEmail(values.email)) {
      nextErrors.email = "Informe um e-mail válido";
    }
    if (!isRequired(values.password)) {
      nextErrors.password = "Senha é obrigatória";
    } else if (!isLongEnough(values.password)) {
      nextErrors.password = `Use pelo menos ${MIN_PASSWORD_LENGTH} caracteres`;
    }
    if (!matches(values.password, values.confirmPassword)) {
      nextErrors.confirmPassword = "As senhas não coincidem";
    }

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    const result = signup({
      name: values.name,
      email: values.email,
      password: values.password,
    });

    if (result.success) {
      navigate("/dashboard");
    } else {
      setFormError(result.error);
    }
  }

  return (
    <AuthLayout
      title="Criar conta"
      subtitle="Comece a organizar seus projetos em camadas."
      tagline="Uma conta, todos os seus projetos em camadas."
      footer={
        <p>
          Já tem uma conta?{" "}
          <Link to="/login" className={linkClasses}>
            Entrar
          </Link>
        </p>
      }
    >
      <form onSubmit={handleSubmit} noValidate className="space-y-5">
        <Input
          label="Nome"
          name="name"
          value={values.name}
          onChange={handleChange}
          error={errors.name}
          required
          placeholder="Como podemos te chamar"
        />
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
          placeholder={`Mínimo de ${MIN_PASSWORD_LENGTH} caracteres`}
        />
        <Input
          label="Confirmar senha"
          type="password"
          name="confirmPassword"
          value={values.confirmPassword}
          onChange={handleChange}
          error={errors.confirmPassword}
          required
          placeholder="••••••••"
        />

        {formError && (
          <p role="alert" className="text-sm text-error">
            {formError}
          </p>
        )}

        <Button type="submit" variant="primary" className="w-full">
          Criar conta
        </Button>
      </form>
    </AuthLayout>
  );
}
