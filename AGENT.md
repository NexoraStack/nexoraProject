# Plano — Login & Dashboard | Nexora Stack

> Documento de referência para implementação com **Claude Code**. Contém direção visual, tokens de design e um roteiro de etapas sequenciais.

---

## 1. Contexto do projeto

- **Empresa:** Nexora Stack
- **Peça a construir:** Tela de Login + Dashboard inicial (tela simples pós-login)
- **Stack de código:** React
- **Estilo:** Moderno, minimalista, cores laranja + branco (primárias) e roxo (terciária)

---

## 2. Tokens de design

### 2.1 Paleta de cores

| Papel | Hex | Uso |
|---|---|---|
| Fundo base | `#FFFFFF` | Fundo principal, respiro |
| Fundo alternativo | `#FAFAFA` | Cards, seções sutis |
| Laranja primário | `#FF6B1A` | CTAs, destaque de marca |
| Laranja escuro (hover) | `#E85D0A` | Hover/estados ativos |
| Roxo terciário | `#6C4CE0` | Acentos secundários, gráficos, links, ícones |
| Texto principal | `#171717` | Quase-preto |
| Texto secundário | `#6B6B6B` | Legendas, labels |

> Regra de uso: laranja é a cor de ação (CTAs, estados ativos). Roxo é acento pontual (ícones, links, detalhes gráficos) — nunca os dois competindo no mesmo elemento.

### 2.2 Tipografia

| Papel | Fonte sugerida | Uso |
|---|---|---|
| Display | Space Grotesk (ou General Sans) | Logo, títulos, saudação do dashboard |
| Corpo | Inter | Textos, labels, inputs, botões |
| Utility/dados | JetBrains Mono | IDs, timestamps, badges de status |

### 2.3 Layout — Login

Split-screen assimétrico:
- **Lado esquerdo:** painel de marca, fundo laranja com gradiente sutil, padrão geométrico de linhas empilhadas em baixa opacidade (motivo "stack"), logo + tagline.
- **Lado direito:** fundo branco, formulário (email, senha, botão "Entrar"), alinhado à esquerda do bloco, não centralizado no meio da tela toda.

### 2.4 Layout — Dashboard

- **Sidebar minimalista:** logo no topo, itens de navegação (Home, Projetos, Perfil, Sair).
- **Área principal:** saudação ("Olá, [Nome]"), 2–3 cards de resumo, seção de atividade recente (ou estado vazio, já que o dashboard é simples por enquanto).

### 2.5 Elemento-assinatura

Motivo "camadas empilhadas" (stack) recorrente e sutil:
- Login: linhas horizontais empilhadas com opacidade decrescente atrás do formulário.
- Dashboard: borda inferior tripla (3 linhas finas: laranja → roxo → transparente) em avatares e cards de resumo.

---

## 3. Próximas etapas (roteiro sequencial)

### Etapa 1 — Setup do projeto
- [ ] Criar/confirmar projeto React (Vite ou Next.js — decidir conforme necessidade de rotas/backend).
- [ ] Instalar Tailwind CSS (ou CSS Modules, se preferir não usar Tailwind).
- [ ] Configurar as fontes (Space Grotesk, Inter, JetBrains Mono) via Google Fonts ou self-hosted.
- [ ] Criar arquivo de tokens (`theme.js` / `tailwind.config.js`) com as cores e tipografia da seção 2.

### Etapa 2 — Componentes base
- [ ] Criar componente `Logo` (texto ou SVG com "Nexora Stack").
- [ ] Criar componente `Button` (variante primária laranja, variante ghost/roxa).
- [ ] Criar componente `Input` (com label, estado de erro, foco visível para acessibilidade).

### Etapa 3 — Tela de Login
- [ ] Montar layout split-screen (painel de marca + formulário).
- [ ] Implementar o padrão geométrico de linhas empilhadas no painel de marca (SVG ou CSS).
- [ ] Implementar formulário com validação simples (campos obrigatórios, formato de e-mail).
- [ ] Testar responsividade (o split-screen deve empilhar verticalmente no mobile).

### Etapa 4 — Autenticação (decisão técnica)
- [ ] Definir se o login será:
  - Mock/local (sem backend real, só para portfólio) — mais rápido de implementar.
  - Integrado a um backend real (Firebase Auth, Supabase, API própria) — mais robusto.
- [ ] Implementar o fluxo escolhido (login, erro de credenciais, redirecionamento para o dashboard).

### Etapa 5 — Dashboard inicial
- [ ] Montar sidebar com navegação.
- [ ] Montar header com saudação dinâmica ("Olá, [Nome]").
- [ ] Montar 2–3 cards de resumo (com a borda tripla laranja → roxo → transparente).
- [ ] Implementar estado vazio para "atividade recente" (texto + call-to-action, seguindo tom da marca).
- [ ] Testar responsividade (sidebar deve virar menu retrátil ou bottom nav no mobile).

### Etapa 6 — Polimento e revisão
- [ ] Revisar contraste de cores para acessibilidade (WCAG AA).
- [ ] Revisar foco de teclado em todos os elementos interativos.
- [ ] Revisar `prefers-reduced-motion` se houver qualquer animação/transição.
- [ ] Tirar prints do resultado e comparar com o plano de design (esta seção 2) para garantir fidelidade.

### Etapa 7 — Integração com o site de portfólio
- [ ] Definir a rota de acesso (ex: `/login`, `/dashboard`).
- [ ] Conectar o botão de login/logout com o restante do site.
- [ ] Testar o fluxo completo: portfólio → login → dashboard → logout.

---

## 4. Ferramentas recomendadas

### Ambiente de código
- **VS Code** — editor com boa integração de extensões React/Tailwind.
- **Claude Code** — para construir o projeto direto no terminal, VS Code ou app desktop.

### Setup do projeto
- **Vite** — criação do projeto React, mais rápido e leve que Create React App (descontinuado).
- **Next.js** — alternativa caso queira rotas, SSR, ou backend integrado (relevante se o login for real e não mock).

### Estilização
- **Tailwind CSS** — aplica os tokens de cor/tipografia do plano (seção 2) de forma rápida.
- **shadcn/ui** — componentes prontos (inputs, botões) customizáveis com a paleta da marca, útil no formulário de login.

### Autenticação (ligado à decisão da Etapa 4)
- **Firebase Auth** ou **Supabase Auth** — login real sem montar backend do zero; Supabase já inclui banco Postgres, útil se o dashboard crescer.
- **Clerk** — componentes de login prontos e customizáveis, alternativa às duas acima.

### Deploy
- **Vercel** — deploy direto para projetos React/Next.js, com preview automático por branch/PR.
- **Netlify** — alternativa para sites estáticos/portfólio.

### Versionamento
- **GitHub** — versionamento do código, conectado ao deploy automático (Vercel/Netlify).

> Combinação sugerida para um portfólio sem usuários reais: **Vite + Tailwind + shadcn/ui + Supabase (auth mock ou real) + Vercel**.

---

## 5. Notas para o Claude Code

- Seguir os tokens da seção 2 à risca antes de introduzir variações.
- Priorizar poucas animações, bem executadas (ex: transição suave ao trocar de estado no login), em vez de muitos microefeitos.
- Evitar clichês visuais (ícones de blocos 3D para representar "stack", gradientes genéricos roxo-azul).
- Qualquer dúvida de direção visual, revisitar a seção 2.5 (elemento-assinatura) como referência de identidade.