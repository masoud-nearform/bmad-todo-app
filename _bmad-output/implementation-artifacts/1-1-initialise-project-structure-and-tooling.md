# Story 1.1: Initialise Project Structure And Tooling

Status: done

## Story Goal

Create the initial greenfield project structure for the full-stack Todo app so later stories can build on clear frontend, backend, and E2E foundations without introducing product features or unnecessary architecture.

## Story

As a developer,  
I want the frontend, backend, and E2E test project structure initialised,  
so that implementation can proceed from a clear, testable foundation.

## Scope

This story is limited to project scaffolding, basic commands, environment placeholders, and empty or generated starter files.

In scope:

- Create or confirm root-level structure for `frontend/`, `backend/`, `tests/e2e/`, `.gitignore`, `README.md`, and `docker-compose.yml`.
- Scaffold the frontend with React, TypeScript, and Vite in `frontend/`.
- Initialise the backend as a small Node.js, TypeScript, and Express project in `backend/`.
- Configure Playwright at repo root or in a clearly documented equivalent location, with E2E files under `tests/e2e/` where practical.
- Provide root-level scripts or clearly documented commands for starting the frontend, starting the backend, and invoking E2E tooling.
- Define basic environment variable placeholders for frontend API base URL, backend port, and SQLite database path.

Out of scope:

- Todo CRUD API endpoints.
- Backend health endpoint implementation.
- SQLite schema, persistence module, or database initialisation logic.
- Vitest, Supertest, coverage thresholds, or full test infrastructure beyond whatever is created by the starter tooling.
- Frontend Todo UI components beyond the generated Vite starter shell.
- Dockerfile implementation, Docker Compose runtime behaviour, image hardening, or container health checks.
- Router, global state library, ORM, shared package, GraphQL, microservices, background workers, caching, analytics, authentication, multi-user support, or speculative infrastructure.

## Acceptance Criteria

1. Given the repository is empty or contains only planning artefacts, when the project structure is initialised, then the repository contains `frontend/`, `backend/`, `tests/e2e/`, `.gitignore`, `README.md`, and `docker-compose.yml` placeholders where appropriate.

2. Given the frontend scaffold is created, when a developer inspects `frontend/`, then it is a React, TypeScript, and Vite application using the approved starter approach.

3. Given the backend scaffold is created, when a developer inspects `backend/`, then it is a Node.js and TypeScript project with Express dependencies installed and no unrelated backend framework or feature scaffolding.

4. Given E2E tooling is initialised, when a developer inspects the repo root, then Playwright is configured at the root or in a clearly documented equivalent location, with E2E tests intended for `tests/e2e/` where practical.

5. Given the scaffold is complete, when a developer checks project commands, then clear root-level scripts or README-documented commands exist for starting the frontend, starting the backend, and invoking E2E tooling.

6. Given environment configuration placeholders are added, when a developer checks the repo, then placeholders exist for frontend API base URL, backend port, and SQLite database path.

7. Given the scaffold is complete, when a developer reviews dependencies and files, then no router, global state library, ORM, shared package, GraphQL, microservice tooling, caching layer, authentication, multi-user support, or speculative infrastructure has been added.

## Tasks / Subtasks

- [x] Create root scaffold and placeholders. (AC: 1)
  - [x] Ensure `frontend/`, `backend/`, and `tests/e2e/` exist or are created by starter tooling.
  - [x] Add `.gitignore` suitable for Node, Vite, Playwright artefacts, local environment files, build output, coverage output, and SQLite database files.
  - [x] Add a lightweight root `README.md` placeholder with Story 1.1 commands only.
  - [x] Add a lightweight root `docker-compose.yml` placeholder only if needed to satisfy the approved scaffold shape; do not implement the runtime yet.

- [x] Scaffold the frontend. (AC: 2, 7)
  - [x] Use `npm create vite@latest frontend -- --template react-ts`.
  - [x] Run dependency installation inside `frontend/`.
  - [x] Keep the generated app minimal; do not add router, global state, UI libraries, API client, Todo components, or product behaviour in this story.

- [x] Initialise the backend. (AC: 3, 7)
  - [x] Create `backend/package.json`.
  - [x] Add runtime dependencies needed for a minimal Express backend.
  - [x] Add TypeScript development dependencies needed to compile or run backend TypeScript.
  - [x] Add basic `tsconfig.json` and an empty or minimal `src/` placeholder if needed for scripts.
  - [x] Do not implement `GET /health`, Todo routes, SQLite schema, validation, middleware, or persistence yet.

- [x] Initialise Playwright location and E2E scaffold. (AC: 4, 7)
  - [x] Use `npm init playwright@latest` at repo root, selecting TypeScript.
  - [x] Prefer `tests/e2e/` for project E2E test files; if Playwright creates a different folder, move or document it clearly.
  - [x] Do not create the required five core journey tests in this story.
  - [x] Do not add CI workflow output unless explicitly required by the prompt during Playwright setup; if prompted, decline CI setup for now.

- [x] Add root-level scripts or documented commands. (AC: 5)
  - [x] Provide a clear way to start the frontend from the repo root or document `cd frontend && npm run dev`.
  - [x] Provide a clear way to start the backend from the repo root or document the backend dev command.
  - [x] Provide a clear way to invoke Playwright tooling from the repo root.
  - [x] Keep commands simple and avoid introducing monorepo tooling.

- [x] Add environment placeholders. (AC: 6)
  - [x] Define a frontend API base URL placeholder, such as `VITE_API_BASE_URL`.
  - [x] Define a backend port placeholder, such as `PORT`.
  - [x] Define a SQLite database path placeholder, such as `SQLITE_DB_PATH`.
  - [x] Use `.env.example` files or README-documented placeholders; do not commit local `.env` files.

- [x] Verify scaffold boundaries. (AC: 1-7)
  - [x] Confirm generated files do not introduce out-of-scope product or architecture features.
  - [x] Confirm commands and placeholders are documented enough for Story 1.2 to add test infrastructure cleanly.

## Dev Notes

### Approved Technical Direction

- Frontend: React, TypeScript, Vite.
- Backend: Node.js, TypeScript, Express.
- E2E: Playwright.
- Persistence direction for later stories: SQLite using a configurable database path.
- API style for later stories: REST over JSON.

Current starter commands from the architecture remain suitable:

Frontend, from repo root:

```bash
npm create vite@latest frontend -- --template react-ts
cd frontend
npm install
```

Backend, from repo root:

```bash
mkdir backend
cd backend
npm init -y
npm install express
npm install -D typescript tsx @types/node @types/express
```

Playwright, from repo root:

```bash
npm init playwright@latest
```

`better-sqlite3`, Vitest, Supertest, SQLite schema setup, and coverage configuration belong in later Epic 1 stories unless the implementation needs a tiny placeholder to keep commands coherent. Do not implement persistence in Story 1.1.

### Project Structure Notes

The intended top-level shape after this story is:

```text
/
├── .gitignore
├── README.md
├── docker-compose.yml
├── frontend/
├── backend/
└── tests/
    └── e2e/
```

Keep source locations aligned with the architecture:

- Frontend source stays under `frontend/src/`.
- Backend source stays under `backend/src/`.
- Playwright E2E tests live under `tests/e2e/` unless a clearly documented Playwright default is temporarily used.
- Do not add a shared package. Small duplicated TypeScript types are acceptable later if needed.

### Root Commands Guidance

Use the simplest approach that works. Either root-level scripts or README-documented commands are acceptable for this story.

Acceptable documented commands:

```bash
cd frontend && npm run dev
cd backend && npm run dev
npx playwright test
```

If root `package.json` scripts are added, keep them simple, such as wrapping the commands above, and avoid workspace or monorepo tooling unless the implementation genuinely needs it.

### Environment Placeholder Guidance

Use placeholders only. Do not wire full runtime behaviour yet.

Suggested placeholders:

```bash
VITE_API_BASE_URL=http://localhost:3000
PORT=3000
SQLITE_DB_PATH=./data/todos.db
```

Possible file placement:

- Root `.env.example` for shared documentation.
- `frontend/.env.example` for `VITE_API_BASE_URL`.
- `backend/.env.example` for `PORT` and `SQLITE_DB_PATH`.

The exact placement may be chosen during implementation, but it must be clear enough for Docker, README, and later backend stories to reuse.

### Testing Notes For This Story Only

This story does not require real application tests.

Relevant checks:

- Frontend dependencies install successfully.
- Backend dependencies install successfully.
- The frontend starter command can be run or is clearly documented.
- The backend dev command exists or is clearly documented, even if it only points to a minimal placeholder entry.
- Playwright is installed/configured at root or its location is clearly documented.
- The scaffold contains no out-of-scope libraries or generated CI workflow.

Do not implement Story 1.2 coverage configuration, backend integration tests, or Playwright core journey tests here.

### Definition Of Done

- Story file requirements and all acceptance criteria above are satisfied.
- The scaffold is small, understandable, and aligned with the approved architecture.
- Commands or documented commands exist for frontend, backend, and E2E tooling.
- Environment placeholders exist for frontend API base URL, backend port, and SQLite database path.
- No product feature implementation has been added.
- No forbidden architecture or tooling has been introduced.
- `sprint-status.yaml` can be updated from `ready-for-dev` to later statuses as work proceeds.

### References

- `_bmad-output/planning-artifacts/epics.md` - Epic 1 and Story 1.1 acceptance criteria.
- `_bmad-output/planning-artifacts/architecture.md` - starter approach, project structure, implementation patterns, and scope guardrails.
- `_bmad-output/planning-artifacts/prd.md` - technical direction, delivery constraints, and out-of-scope guardrails.
- `_bmad-output/implementation-artifacts/sprint-status.yaml` - Sprint 1 scope and implementation order.

## Dev Agent Record

### Agent Model Used

GPT-5.5

### Debug Log References

- `npm create vite@latest frontend -- --template react-ts`
- `npm install` in `frontend/`
- `npm init -y` in `backend/`
- `npm install express` in `backend/`
- `npm install -D typescript tsx @types/node @types/express` in `backend/`
- `npm init playwright@latest -- --quiet --lang=TypeScript --no-browsers --no-examples`
- `npm run build` in `frontend/`
- `npm run build` in `backend/`
- `npx playwright --version`
- `npm run backend:dev`
- `git status --short -uall`

### Completion Notes List

- Story context created from approved PRD, architecture, epics, and Sprint 1 plan.
- Status set to ready-for-dev.
- Implemented Story 1.1 scaffold only: frontend starter, backend package scaffold, Playwright root config, E2E folder placeholder, root scripts, environment examples, README placeholder, `.gitignore`, and placeholder-only Docker Compose file.
- Backend includes a tiny TypeScript placeholder entry to make the backend dev command meaningful; it does not start an HTTP server and does not implement health, Todo routes, validation, middleware, SQLite schema, or persistence.
- Playwright was initialised without a GitHub Actions workflow and configured to target `tests/e2e/`. No core journey tests were added.
- Verification passed: frontend build, backend TypeScript build, Playwright CLI availability, backend dev placeholder command, YAML validation, lint diagnostics, and forbidden attribution search across newly added implementation content.

### Change Log

- 2026-04-27: Implemented Story 1.1 scaffold and moved story to review.

### File List

- `_bmad-output/implementation-artifacts/1-1-initialise-project-structure-and-tooling.md`
- `_bmad-output/implementation-artifacts/sprint-status.yaml`
- `.env.example`
- `.gitignore`
- `README.md`
- `backend/.env.example`
- `backend/package-lock.json`
- `backend/package.json`
- `backend/src/index.ts`
- `backend/tsconfig.json`
- `docker-compose.yml`
- `frontend/.env.example`
- `frontend/.gitignore`
- `frontend/README.md`
- `frontend/eslint.config.js`
- `frontend/index.html`
- `frontend/package-lock.json`
- `frontend/package.json`
- `frontend/public/favicon.svg`
- `frontend/public/icons.svg`
- `frontend/src/App.css`
- `frontend/src/App.tsx`
- `frontend/src/assets/hero.png`
- `frontend/src/assets/react.svg`
- `frontend/src/assets/vite.svg`
- `frontend/src/index.css`
- `frontend/src/main.tsx`
- `frontend/tsconfig.app.json`
- `frontend/tsconfig.json`
- `frontend/tsconfig.node.json`
- `frontend/vite.config.ts`
- `package-lock.json`
- `package.json`
- `playwright.config.ts`
- `tests/e2e/.gitkeep`
