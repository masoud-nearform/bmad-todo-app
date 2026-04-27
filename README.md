# Full-Stack Todo App

This repository contains the scaffold for a deliberately small full-stack Todo application. Stories 1.1 and 1.2 establish the project structure, starter tooling, and baseline test infrastructure.

## Story 1.1 Scope

Included now:

- `frontend/` scaffolded with React, TypeScript, and Vite.
- `backend/` initialised with Node.js, TypeScript, and Express dependencies.
- Playwright configured at the repo root, targeting `tests/e2e/`.
- Environment placeholders for the frontend API base URL, backend port, and SQLite database path.
- Placeholder `docker-compose.yml` for a later Docker story.

Not included yet:

- Todo CRUD API endpoints.
- Health endpoint logic.
- SQLite schema or persistence logic.
- Frontend Todo UI.
- Real frontend, backend, or E2E journey coverage.
- Working Docker Compose runtime.

## Environment Placeholders

Root `.env.example`:

```bash
VITE_API_BASE_URL=http://localhost:3000
PORT=3000
SQLITE_DB_PATH=./data/todos.db
```

Frontend-specific placeholder:

```bash
frontend/.env.example
```

Backend-specific placeholder:

```bash
backend/.env.example
```

Do not commit local `.env` files.

## Story 1.1 Commands

Run the frontend scaffold:

```bash
npm run frontend:dev
```

Run the backend scaffold:

```bash
npm run backend:dev
```

Invoke Playwright tooling:

```bash
npm run e2e
```

The E2E command is present for tooling access. Real E2E journey tests are added in later stories.

## Story 1.2 Test Commands

Run the frontend test scaffold:

```bash
npm run frontend:test
```

Run the backend test scaffold:

```bash
npm run backend:test
```

Generate frontend coverage output:

```bash
npm run frontend:coverage
```

Generate backend coverage output:

```bash
npm run backend:coverage
```

The coverage commands are scaffolding only. The final 70 percent meaningful coverage target is reached in later implementation and QA stories.
