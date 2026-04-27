# Full-Stack Todo App

This repository contains the scaffold for a deliberately small full-stack Todo application. Story 1.1 only establishes the project structure and starter tooling.

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
- Backend, frontend, or E2E test coverage.
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
