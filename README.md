# Vida Extraordinária

MVP de um app pessoal de organização — Vite + React + TypeScript + Tailwind v4.

## Rodando localmente

```bash
npm install
npm run dev
```

Abre em `http://localhost:5173`.

## Estrutura

- `src/screens/Hoje.tsx` — única tela totalmente funcional nesta etapa.
- `src/screens/Placeholder.tsx` — Inbox, Semana, Projetos, Áreas e Vida Extraordinária ainda não construídas (mostram um aviso "em construção").
- `src/data.ts` / `src/types.ts` — modelo de dados e dados de exemplo.
- `src/useAppData.ts` + `src/AppDataContext.tsx` — estado da aplicação (persistido em localStorage), compartilhado via Context para que o FAB de captura e a tela Hoje leiam/escrevam os mesmos dados.
- `legacy-vanilla-mvp/` — a primeira versão (HTML/CSS/JS puro, sem build), mantida como referência.

## Próxima etapa

Construir a tela Inbox (captura → triagem), que hoje só recebe os itens capturados pelo botão flutuante sem uma tela própria para processá-los.
