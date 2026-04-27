# Story 1.4: Create SQLite Persistence Foundation

Status: done

## Story Goal

Add the smallest SQLite persistence foundation needed for later backend Todo API stories: an explicit database path, a schema initialisation module, and an automated proof that the configured database can be opened and initialised.

## Story

As a developer,  
I want a small SQLite persistence module for todos,  
so that todo data can be stored durably without unnecessary infrastructure.

## Dependency Context

Stories 1.1, 1.2, and 1.3 are complete and provide the foundation this story must build on:

- `backend/` already has Node.js, TypeScript, Express, Vitest, Supertest, and coverage scripts.
- `backend/src/app.ts`, `backend/src/server.ts`, and `backend/src/routes/health.ts` already exist.
- `GET /health` is already covered by a backend integration test.
- Environment placeholders already define `SQLITE_DB_PATH=./data/todos.db`.
- Backend test setup already uses an isolated test path, so this story must not contaminate normal development data.

This story is the first persistence story, but it is still foundation work. It must not become the full Todo data-access implementation.

## Scope

This story is limited to SQLite database path handling, schema initialisation, and one proof check.

In scope:

- Add the SQLite driver dependency if it is not already installed, using `better-sqlite3` and TypeScript types where needed.
- Add a small SQLite module, preferably `backend/src/db/sqlite.ts`.
- Read the database path from `process.env.SQLITE_DB_PATH`.
- Provide a sensible development fallback such as `./data/todos.db` only when `SQLITE_DB_PATH` is not set.
- Ensure the parent directory for the configured database file can be created when needed.
- Initialise a `todos` table with `id`, `text`, `completed`, and `createdAt` fields.
- Make schema initialisation happen on backend startup, or provide a very small documented init path in code that future startup code can call.
- Add one automated backend test proving the schema initialises and the configured database path is usable.

Out of scope:

- Todo CRUD API routes.
- `/api/todos`.
- Todo create, list, complete, delete helper functions.
- Todo validation logic.
- Express route changes except a tiny startup call if schema initialisation is wired into `server.ts`.
- Frontend work.
- Docker runtime completion.
- Playwright journeys.
- Repository pattern, service layer, ORM, migration framework, GraphQL, authentication, admin routes, caching, shared packages, microservices, background jobs, or speculative infrastructure.

## Acceptance Criteria

1. Given the backend app skeleton exists, when SQLite persistence foundation is added, then the backend includes a small SQLite initialisation module under `backend/src/db/`.

2. Given the SQLite module is configured, when it resolves the database path, then it uses `process.env.SQLITE_DB_PATH` and only falls back to `./data/todos.db` when the environment variable is not set.

3. Given schema initialisation runs, when the configured SQLite database is opened, then a `todos` table exists with at least `id`, `text`, `completed`, and `createdAt` fields.

4. Given backend startup is updated, when the backend server starts, then schema initialisation is called on startup or a small documented init function exists and is clearly ready to be wired into startup.

5. Given backend tests run, when the schema proof test executes, then it uses an isolated test database path and proves both that the configured path is usable and that the `todos` table schema exists.

6. Given Story 1.4 is complete, when backend build, backend test, and backend coverage commands run, then they pass without requiring Todo CRUD routes, `/api/todos`, frontend code, Docker runtime, or Playwright journey tests.

7. Given the codebase is reviewed, when scope is checked, then no Todo CRUD API, `/api/todos`, Todo validation, full data-access helpers, repository pattern, service layer, ORM, migration framework, GraphQL, authentication, admin routes, caching, frontend work, Docker runtime work, or speculative infrastructure has been added.

## Tasks / Subtasks

- [x] Add minimal SQLite driver support. (AC: 1, 6, 7)
  - [x] Install `better-sqlite3` if it is not already present in `backend/package.json`.
  - [x] Install `@types/better-sqlite3` as a backend dev dependency if TypeScript types are needed.
  - [x] Do not add an ORM, migration framework, repository library, or any extra database tooling.

- [x] Create the SQLite initialisation module. (AC: 1, 2, 3, 4, 7)
  - [x] Add `backend/src/db/sqlite.ts`.
  - [x] Implement a tiny database path resolver that reads `process.env.SQLITE_DB_PATH`.
  - [x] Use `./data/todos.db` only as the development fallback when `SQLITE_DB_PATH` is absent.
  - [x] Ensure the database directory exists before opening a file-backed database.
  - [x] Implement schema initialisation for a `todos` table with `id`, `text`, `completed`, and `createdAt`.
  - [x] Keep exports limited to schema/path initialisation helpers needed by this story.
  - [x] Do not add Todo insert, select, update, delete, or validation functions.

- [x] Wire or document schema initialisation path. (AC: 4, 6, 7)
  - [x] Prefer calling the schema initialisation function from `backend/src/server.ts` before `app.listen(...)` if this remains simple and testable.
  - [x] If startup wiring would create unnecessary complexity, provide a clearly named exported init function and document that it is the startup hook for later wiring.
  - [x] Do not change `GET /health` response or add any new HTTP endpoint.

- [x] Add automated schema proof test. (AC: 3, 5, 6, 7)
  - [x] Add a focused backend test under `backend/src/test/`.
  - [x] Use an isolated test database path, not `./data/todos.db`.
  - [x] Prove the configured path is used and usable.
  - [x] Prove the `todos` table exists after schema initialisation.
  - [x] Check the expected schema fields: `id`, `text`, `completed`, and `createdAt`.
  - [x] Clean up any temporary test database files where practical.
  - [x] Do not test Todo CRUD behaviour.

- [x] Verify commands and scope. (AC: 1-7)
  - [x] Run `npm run backend:test`.
  - [x] Run `npm --prefix backend run build`.
  - [x] Run `npm run backend:coverage`.
  - [x] Confirm the health endpoint test still passes.
  - [x] Confirm no `/api/todos`, CRUD route, Todo validation, full persistence helper, frontend work, Docker runtime work, or out-of-scope architecture was introduced.

### Review Findings

- [x] [Review][Patch] Restore unset `SQLITE_DB_PATH` by deleting the env var rather than assigning `undefined` [`backend/src/test/sqlite.integration.test.ts`]
- [x] [Review][Patch] Assert the `todos` schema has exactly `id`, `text`, `completed`, and `createdAt` columns [`backend/src/test/sqlite.integration.test.ts`]

## Dev Notes

### Approved Technical Direction

- Persistence is SQLite.
- The intended SQLite driver is `better-sqlite3`.
- The persistence boundary belongs under `backend/src/db/`.
- The backend remains Node.js, TypeScript, and Express.
- This story supports future Todo API stories, but it must not implement those API stories.

### Recommended Implementation Shape

Use the smallest clear backend persistence structure:

```text
backend/src/
├── db/
│   └── sqlite.ts
├── server.ts
└── test/
    └── sqlite.integration.test.ts
```

Recommended responsibilities:

- `sqlite.ts`: resolve database path, ensure the parent directory exists, open the SQLite database, initialise schema.
- `server.ts`: optionally call the schema initialisation function before starting the HTTP listener.
- `sqlite.integration.test.ts`: set or pass an isolated database path, run schema initialisation, verify the file/path and table schema.

Keep the module tiny. It may expose functions such as `getDatabasePath`, `openDatabase`, and `initializeDatabase`, but it should not expose Todo CRUD functions yet.

### Schema Guidance

The schema should be just enough for later Todo API stories:

```sql
CREATE TABLE IF NOT EXISTS todos (
  id TEXT PRIMARY KEY,
  text TEXT NOT NULL,
  completed INTEGER NOT NULL DEFAULT 0,
  createdAt TEXT NOT NULL
);
```

Notes:

- `completed` can be stored as `0`/`1` in SQLite and later mapped to booleans at the API boundary.
- `createdAt` should be stored in a serialisable text format, with later API stories returning ISO 8601 strings.
- Do not add priorities, deadlines, tags, categories, users, sort indexes, audit fields, or other out-of-scope columns.
- Do not seed data in this story.

### Database Path Guidance

The module must use `SQLITE_DB_PATH` explicitly:

```bash
SQLITE_DB_PATH=./data/todos.db
```

Testing should use an isolated path. Story 1.2 already established a test-only SQLite path, but this story's schema proof may also use a temporary test path if that makes cleanup safer.

Do not write to the normal development database during automated tests.

### Testing Notes

The proof test should verify schema setup rather than product behaviour.

Acceptable checks:

- The configured database path is not the normal development path.
- Schema initialisation completes without throwing.
- The database file or connection path is usable.
- `sqlite_master` contains the `todos` table.
- `PRAGMA table_info(todos)` includes `id`, `text`, `completed`, and `createdAt`.

Do not add tests for:

- `POST /api/todos`.
- `GET /api/todos`.
- `PATCH /api/todos/:id`.
- `DELETE /api/todos/:id`.
- Todo validation.
- Frontend behaviour.
- Playwright journeys.

### Previous Story Intelligence

From Story 1.3:

- `backend/src/app.ts` exports the Express app.
- `backend/src/server.ts` starts the HTTP server with `PORT` defaulting to `3000`.
- `backend/src/routes/health.ts` exposes only `GET /health`.
- `backend/src/test/health.integration.test.ts` uses Supertest against the app export.
- `backend/src/index.ts` remains a placeholder and should not be used for server startup.

From Story 1.2:

- Backend tests use Vitest in the Node environment.
- Supertest and coverage support are already configured.
- `backend/src/test/setup.ts` sets an isolated `SQLITE_DB_PATH`.
- Coverage commands are scaffolding; this story does not need to reach the final 70 percent target.

### Project Structure Notes

The approved architecture names `backend/src/db/sqlite.ts` for SQLite setup and `backend/src/db/todosPersistence.ts` for later Todo persistence operations.

For this story:

- Create `backend/src/db/sqlite.ts`.
- Do not create `todosPersistence.ts` unless the implementation genuinely cannot prove schema setup without it, which should not be necessary.
- Do not add `routes/todos.ts` or `validation/todoValidation.ts`.
- Do not add middleware beyond what already exists.

### Latest Technical Notes

`better-sqlite3` is suitable for this small synchronous SQLite use case and current versions support modern Node versions. In TypeScript, install `@types/better-sqlite3` if the project needs type definitions.

Because `better-sqlite3` is a native module, keep Docker image compatibility concerns for the later Docker story. Do not change Docker runtime configuration here.

### Definition Of Done

- Story file requirements and all acceptance criteria above are satisfied.
- `backend/src/db/sqlite.ts` exists and handles SQLite path resolution and schema initialisation.
- `SQLITE_DB_PATH` is the explicit database path source, with `./data/todos.db` only as fallback.
- The `todos` schema includes `id`, `text`, `completed`, and `createdAt`.
- Backend startup calls schema initialisation, or a small documented init function exists and is ready for startup wiring.
- A backend automated proof check verifies schema initialisation and configured path usability using an isolated test database path.
- Backend build, backend tests, and backend coverage commands pass.
- No Todo CRUD routes, `/api/todos`, Todo validation, frontend work, Docker runtime work, Playwright journeys, repository pattern, ORM, GraphQL, authentication, admin routes, caching, or speculative infrastructure is added.

### References

- `_bmad-output/planning-artifacts/epics.md` - Epic 1 and Story 1.4 acceptance criteria.
- `_bmad-output/planning-artifacts/architecture.md` - SQLite data architecture, database naming, backend structure, and project boundaries.
- `_bmad-output/planning-artifacts/prd.md` - FR3, FR18, persistence expectations, and delivery constraints.
- `_bmad-output/implementation-artifacts/sprint-status.yaml` - Sprint 1 sequencing and dependencies.
- `_bmad-output/implementation-artifacts/1-2-configure-baseline-automated-test-infrastructure.md` - backend Vitest setup and isolated test database path.
- `_bmad-output/implementation-artifacts/1-3-create-backend-app-skeleton-and-health-endpoint.md` - current backend app/server skeleton.

## Dev Agent Record

### Agent Model Used

GPT-5.5

### Debug Log References

- `npm install better-sqlite3 && npm install -D @types/better-sqlite3` in `backend/`.
- `npm run backend:test` red phase failed as expected because `backend/src/db/sqlite.ts` did not exist yet.
- `npm run backend:test`
- `npm --prefix backend run build`
- `npm run backend:coverage`
- `npm run frontend:test`
- `npm run e2e`
- Scope scan across backend source and backend package config for forbidden `/api/todos`, CRUD, validation, frontend, Docker, and architecture additions.

### Completion Notes List

- Story context created from approved PRD, architecture, epics, sprint status, and completed Stories 1.1-1.3.
- Status set to ready-for-dev.
- Added `better-sqlite3` and `@types/better-sqlite3` only.
- Added `backend/src/db/sqlite.ts` with database path resolution, parent directory creation, database opening, and `todos` schema initialisation.
- Wired schema initialisation into `backend/src/server.ts` before the HTTP listener starts.
- Added `backend/src/test/sqlite.integration.test.ts` proving the configured isolated database path is used, the database file is usable, and the `todos` table includes `id`, `text`, `completed`, and `createdAt`.
- No Todo CRUD routes, `/api/todos`, Todo validation, full data-access helpers, frontend work, Docker runtime work, Playwright journeys, repository pattern, ORM, GraphQL, authentication, admin routes, caching, or speculative infrastructure were added.
- Resolved review findings by restoring unset `SQLITE_DB_PATH` with `delete` and asserting the schema columns exactly.

### Change Log

- 2026-04-27: Implemented SQLite persistence foundation and moved story to review.
- 2026-04-27: Addressed review findings and moved story to done.

### File List

- `_bmad-output/implementation-artifacts/1-4-create-sqlite-persistence-foundation.md`
- `_bmad-output/implementation-artifacts/sprint-status.yaml`
- `backend/package.json`
- `backend/package-lock.json`
- `backend/src/db/sqlite.ts`
- `backend/src/server.ts`
- `backend/src/test/sqlite.integration.test.ts`
