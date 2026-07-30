import { useState } from "react";
import { Link } from "react-router-dom";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import AuthLayout from "../components/layout/AuthLayout";
import { isRequired, isValidEmail } from "../lib/validation";

const linkClasses =
  "rounded font-medium text-purple underline underline-offset-2 hover:decoration-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple focus-visible:ring-offset-2";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();

    if (!isRequired(email)) {
      setError("Email é obrigatório");
      return;
    }
    if (!isValidEmail(email)) {
      setError("Informe um e-mail válido");
      return;
    }

    setError("");
    setSubmitted(true);
  }

  return (
    <AuthLayout
      title={submitted ? "Verifique seu e-mail" : "Redefinir senha"}
      subtitle={
        submitted
          ? undefined
          : "Informe o e-mail da sua conta e enviaremos um link de redefinição."
      }
      tagline="Recupere o acesso e volte às suas camadas."
      footer={
        <p>
          <Link to="/login" className={linkClasses}>
            Voltar para o login
          </Link>
        </p>
      }
    >
      {submitted ? (
        <div className="space-y-4">
          {/* Deliberately generic: confirming whether an address has an account
              would let anyone enumerate registered users. */}
          <p className="font-body text-sm text-text-primary">
            Se existir uma conta associada a{" "}
            <span className="font-mono text-text-primary">{email}</span>, você receberá
            um link para criar uma nova senha.
          </p>
          <p className="rounded-lg border border-purple/30 bg-purple/5 px-4 py-3 font-body text-sm text-text-secondary">
            <span className="font-medium text-text-primary">Demonstração:</span> nenhum
            e-mail é enviado de verdade. Um fluxo real precisa de um servidor para gerar
            e enviar um token de uso único com validade.
          </p>
          <Button variant="ghost" onClick={() => setSubmitted(false)} className="w-full">
            Usar outro e-mail
          </Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} noValidate className="space-y-5">
          <Input
            label="Email"
            type="email"
            name="email"
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
              setError("");
            }}
            error={error}
            required
            placeholder="voce@empresa.com"
          />

          <Button type="submit" variant="primary" className="w-full">
            Enviar link de redefinição
          </Button>
        </form>
      )}
    </AuthLayout>
  );
}
