# Nexora Stack

Tela de Login (e, no futuro, Dashboard) do portfólio Nexora Stack. Direção de design, tokens e roteiro completo em [AGENT.md](./AGENT.md).

## Stack

- React + Vite
- Tailwind CSS v4

## Rodando localmente

```bash
npm install
npm run dev
```

## Estrutura

```
src/
  components/
    ui/       # Logo, Button, Input
    layout/   # SplitScreen, StackedLinesPattern (motivo-assinatura)
  pages/      # LoginPage
  lib/        # validation.js
```

Escopo atual: Etapas 1–3 do roteiro em AGENT.md (setup, componentes base, tela de Login). Autenticação real e Dashboard ficam para as próximas etapas.
