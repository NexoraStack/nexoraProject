import Logo from "../components/ui/Logo";
import Button from "../components/ui/Button";
import StackedLinesPattern from "../components/layout/StackedLinesPattern";

export default function LandingPage() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-orange px-6 py-16 text-center">
      <StackedLinesPattern />

      <div className="relative z-10 flex max-w-lg flex-col items-center">
        <Logo variant="light" size="lg" />
        <h1 className="mt-6 font-display text-3xl font-semibold text-text-primary md:text-4xl">
          Organize seus projetos em camadas.
        </h1>
        <p className="mt-4 font-body text-text-primary">
          Nexora Stack é um jeito simples de acompanhar o que importa, sem
          ruído. Entre para ver como funciona.
        </p>
        <Button to="/login" variant="inverse" size="lg" className="mt-8">
          Entrar
        </Button>
      </div>
    </div>
  );
}
