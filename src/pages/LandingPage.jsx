import Logo from "../components/ui/Logo";
import Button from "../components/ui/Button";
import StackedLinesPattern from "../components/layout/StackedLinesPattern";

const features = [
  {
    title: "Tipos",
    description: "Web, mobile, design ou backend — cada projeto no seu lugar.",
  },
  {
    title: "Status",
    description: "Da ideia ao concluído, sempre visível em uma olhada.",
  },
  {
    title: "Filtros",
    description: "Busque e combine tipo com status para achar o que importa.",
  },
];

export default function LandingPage() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-orange px-6 py-16">
      <StackedLinesPattern />

      <main className="relative z-10 flex w-full max-w-2xl flex-col items-center text-center">
        <Logo variant="light" size="lg" />

        <h1 className="mt-6 font-display text-3xl font-semibold tracking-tight text-text-primary md:text-5xl">
          Organize seus projetos em camadas.
        </h1>
        <p className="mt-4 max-w-md font-body text-text-primary/90">
          Nexora Stack é um jeito simples de acompanhar o que importa, sem ruído.
        </p>

        <div className="mt-8 flex w-full flex-col items-stretch gap-3 sm:w-auto sm:flex-row sm:items-center">
          <Button to="/signup" variant="inverse" size="lg">
            Criar conta
          </Button>
          <Button to="/login" variant="inverseOutline" size="lg">
            Entrar
          </Button>
        </div>

        <ul className="mt-14 grid w-full gap-px overflow-hidden rounded-xl border border-text-primary/15 bg-text-primary/15 text-left sm:grid-cols-3">
          {features.map((feature) => (
            <li key={feature.title} className="bg-orange p-5">
              <h2 className="font-display text-sm font-semibold text-text-primary">
                {feature.title}
              </h2>
              <p className="mt-1.5 font-body text-sm text-text-primary/80">
                {feature.description}
              </p>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}
