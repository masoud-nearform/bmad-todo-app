# Full-Stack Todo App

This repository contains a deliberately small full-stack Todo application in progress. Stories 1.1 through 1.4 establish the scaffold, test setup, health endpoint, and SQLite foundation; Stories 2.1 and 2.2 add backend Todo creation and list retrieval.

## Story 1.1 Foundation Scope

Included by the foundation stories:

- `frontend/` scaffolded with React, TypeScript, and Vite.
- `backend/` initialised with Node.js, TypeScript, and Express dependencies.
- Playwright configured at the repo root, targeting `tests/e2e/`.
- Environment placeholders for the frontend API base URL, backend port, and SQLite database path.
- `GET /health` backend endpoint.
- SQLite `todos` schema foundation.
- Placeholder `docker-compose.yml` for a later Docker story.

Not included yet:

- Full Todo CRUD API endpoints.
- Todo completion or deletion endpoints.
- Frontend Todo UI.
- Real frontend Todo UI coverage or E2E journey coverage.
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

Run the backend server:

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

Run the backend tests:

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

The coverage commands generate the current frontend and backend coverage reports. The final 70 percent meaningful coverage target is confirmed in later implementation and QA stories.

## Sprint 2 Backend API

Currently implemented backend Todo API:

- `POST /api/todos` creates a todo from non-empty text.
- Creation trims text, defaults `completed` to `false`, returns `id`, `text`, `completed`, and `createdAt`, and persists the todo in SQLite.
- `GET /api/todos` returns the current todo list as a JSON array.
- List responses include `id`, `text`, `completed`, and `createdAt`, return `completed` as booleans, and use ascending `createdAt` order.
- `GET /api/todos` returns `[]` when no todos exist.

Backend persistence uses `SQLITE_DB_PATH`, with `./data/todos.db` as the development fallback.

Useful backend verification commands:

```bash
npm run backend:test
npm --prefix backend run build
npm run backend:coverage
```
