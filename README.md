# Nexora Stack

Demo de produto para o portfólio: landing, cadastro/login, dashboard e gestão de
projetos com tipos, status e filtros. Direção de design e tokens em
[AGENT.md](./AGENT.md).

Ao vivo: https://nexora-project-lovat.vercel.app

## Stack

- React + Vite
- Tailwind CSS v4 (tokens CSS-first via `@theme`)
- React Router (SPA)

## Rodando localmente

```bash
npm install
npm run dev
```

`npm run lint` e `npm run build` também devem passar limpos.

## Conta de demonstração

`demo@nexora.com` / `nexora123` — ou crie uma conta pela tela de cadastro.

> **Dados são locais.** Contas e projetos vivem no `localStorage` do navegador,
> incluindo as senhas em texto puro. Isso é aceitável aqui porque não há usuários
> nem dados reais, mas nunca deve ir para produção assim: um app real autentica
> contra um servidor e jamais guarda credenciais no cliente. A redefinição de senha
> é igualmente ilustrativa — nenhum e-mail é enviado.

## Estrutura

```
src/
  components/
    ui/        # Logo, Button, Input, Select, Textarea, Card, Avatar, Badge, Modal, EmptyState
    layout/    # AppLayout, AuthLayout, SplitScreen, Sidebar, BottomNav, StackedLinesPattern
    projects/  # ProjectCard, ProjectFilters, ProjectFormDialog
  pages/       # Landing, Login, Signup, ForgotPassword, Dashboard, Projects, Profile
  context/     # AuthProvider (componente) + auth-context (contexto e hook)
  lib/         # auth.js, projects.js, validation.js
```

## Rotas

| Rota | Acesso |
|---|---|
| `/` | pública (landing) |
| `/login`, `/signup`, `/forgot-password` | só deslogado |
| `/dashboard`, `/projects`, `/profile` | só logado |

`vercel.json` reescreve tudo para `index.html` para as rotas client-side
funcionarem em acesso direto e refresh.
