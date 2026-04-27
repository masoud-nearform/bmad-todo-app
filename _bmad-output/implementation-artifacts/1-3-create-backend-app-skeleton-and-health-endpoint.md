# Story 1.3: Create Backend App Skeleton And Health Endpoint

Status: done

## Story Goal

Create the first real backend app structure by separating the Express app from server startup and adding a minimal `GET /health` endpoint that can be verified directly by backend integration tests and later reused for Docker health checks.

## Story

As a developer,  
I want a minimal Express backend with a health endpoint,  
so that the backend can be verified directly and used by Docker health checks.

## Dependency Context

Stories 1.1 and 1.2 are complete and provide the foundation this story must build on:

- `backend/` already exists with Node.js, TypeScript, Express, `tsx`, and strict TypeScript configuration.
- `backend/src/index.ts` is currently only a placeholder and does not start an HTTP server.
- Backend Vitest, Supertest, coverage commands, and test setup already exist.
- Backend tests already set `process.env.SQLITE_DB_PATH` to the isolated test path `./data/test-todos.db`.
- Root scripts already include `backend:dev`, `backend:test`, and `backend:coverage`.

Do not restructure the scaffold beyond the minimum needed to introduce the approved backend app/server split.

## Scope

This story is limited to the backend app skeleton and health endpoint.

In scope:

- Create a minimal Express app module at `backend/src/app.ts`.
- Create a server entry point at `backend/src/server.ts` that starts the HTTP server.
- Update the backend dev script if needed so local backend startup runs the server entry point.
- Add a small health route module at `backend/src/routes/health.ts`.
- Expose `GET /health`.
- Return HTTP 200 with JSON body exactly `{ "status": "ok" }`.
- Add backend integration test coverage for `GET /health` using Supertest against the exported Express app.
- Keep the implementation simple, explicit, and easy to extend in later backend stories.

Out of scope:

- Todo CRUD routes or `/api/todos` handlers.
- SQLite schema, database initialisation, database connection, persistence modules, or `better-sqlite3` usage.
- Todo validation logic or Todo request/response models.
- Error handling middleware beyond what is strictly needed for a minimal safe app skeleton.
- Request logging middleware unless it is absolutely necessary for the health endpoint, which it should not be.
- Dockerfile or Docker Compose runtime completion.
- Frontend Todo UI or frontend API client work.
- E2E user journey tests.
- Service layers, repository patterns, ORM, GraphQL, authentication, authorisation, admin routes, caching, shared packages, microservices, background jobs, or speculative infrastructure.

## Acceptance Criteria

1. Given the backend project exists, when the app skeleton is implemented, then the backend has a minimal Express app module that can be imported by tests without starting a network listener.

2. Given the backend app module exists, when the server entry point runs, then it starts the HTTP server using the configured `PORT` environment variable with a sensible default of `3000`.

3. Given the health route is implemented, when a client sends `GET /health`, then the backend returns HTTP 200 with JSON body `{ "status": "ok" }`.

4. Given backend integration tests run, when the health endpoint is tested with Supertest, then the tests verify both the HTTP 200 status code and the exact response body.

5. Given Story 1.3 is complete, when the backend build and backend test commands run, then they pass without requiring SQLite schema, persistence logic, Todo routes, frontend code, Docker runtime, or E2E journey tests.

6. Given the codebase is reviewed, when scope is checked, then no Todo CRUD routes, `/api/todos` tests, SQLite schema/persistence logic, Todo validation, Docker runtime work, frontend Todo UI work, service layers, repository patterns, ORM, GraphQL, authentication, authorisation, admin routes, caching, shared packages, microservices, or speculative infrastructure have been added.

## Tasks / Subtasks

- [x] Create minimal backend app structure. (AC: 1, 2, 5, 6)
  - [x] Add `backend/src/app.ts` exporting the Express app without calling `listen()`.
  - [x] Add `backend/src/server.ts` to import the app and start the HTTP server.
  - [x] Update `backend/package.json` `dev` script to run the server entry point if needed.
  - [x] Do not modify `backend/src/index.ts` for this story unless a build failure proves a tiny compatibility adjustment is required.

- [x] Implement health route. (AC: 3, 5, 6)
  - [x] Add `backend/src/routes/health.ts`.
  - [x] Register the health route from `app.ts`.
  - [x] Make `GET /health` return status `200` and JSON body exactly `{ "status": "ok" }`.
  - [x] Do not add `/api/todos` or any other product route in this story.

- [x] Add backend integration coverage for health endpoint. (AC: 4, 5, 6)
  - [x] Add `backend/src/test/health.integration.test.ts` that imports the Express app and uses Supertest.
  - [x] Assert `GET /health` returns HTTP 200.
  - [x] Assert the response body is exactly `{ status: 'ok' }`.
  - [x] Avoid starting the HTTP server inside the test.
  - [x] Avoid database setup, SQLite file access, persistence helpers, or Todo fixtures.

- [x] Verify commands and scope. (AC: 1-6)
  - [x] Run `npm run backend:test`.
  - [x] Run `npm --prefix backend run build`.
  - [x] Run `npm run backend:coverage` if coverage config is affected.
  - [x] Optionally smoke-check `npm run backend:dev` long enough to confirm the server starts, then stop it.
  - [x] Confirm no Todo CRUD, health-check Docker wiring, SQLite persistence, frontend Todo UI, or out-of-scope architecture was introduced.

## Dev Notes

### Approved Technical Direction

- Backend stack is Node.js, TypeScript, and Express.
- API style is REST over JSON.
- `GET /health` is part of the approved API contract and is the only endpoint in scope for this story.
- Backend integration tests should exercise the Express app/API contract, not direct implementation helpers.
- Keep backend layers light: app bootstrap, routes, and later persistence/error handling only when their stories require them.

### Recommended Implementation Shape

Use the standard testable Express split:

```text
backend/src/
├── app.ts
├── server.ts
├── routes/
│   └── health.ts
└── test/
    ├── setup.ts
    └── health.integration.test.ts
```

Recommended responsibilities:

- `app.ts`: create the Express app, register JSON middleware only if needed, register health routes, export the app.
- `server.ts`: read `process.env.PORT ?? '3000'`, start `app.listen(...)`, and log a small startup message.
- `routes/health.ts`: export an Express router with `GET /health`.
- `health.integration.test.ts`: import `app` and call `request(app).get('/health')`.

This app export pattern lets Supertest test the route without binding to a port.

### Health Response Contract

Use the smallest unambiguous response:

```json
{ "status": "ok" }
```

Do not add database status, dependency checks, uptime, version information, environment names, build metadata, or container-specific fields in this story. Those are unnecessary for the current assignment scope.

### Testing Notes

Story 1.2 already installed and configured Vitest and Supertest for backend tests.

The health endpoint test should:

- Import the Express app from `backend/src/app.ts`.
- Use Supertest to make an in-memory request.
- Verify HTTP 200.
- Verify the exact JSON body.
- Not touch `SQLITE_DB_PATH`, SQLite files, persistence modules, Todo models, or Todo routes.

Do not add Playwright tests for the health endpoint. E2E user journey coverage belongs to later stories.

### Previous Story Intelligence

From Story 1.1:

- The backend currently has only a placeholder `backend/src/index.ts`.
- The placeholder intentionally does not start an HTTP server, implement health, Todo routes, validation, middleware, SQLite schema, or persistence.
- Root and backend scripts should stay simple and easy to explain.

From Story 1.2:

- Backend tests are configured with Vitest in the Node environment.
- Supertest is installed and available for Express app contract tests.
- Backend test setup uses an isolated SQLite test path, but this story must not use SQLite.
- Coverage commands exist; this story should not claim the final 70 percent coverage target.

### Project Structure Notes

The approved architecture names these backend boundaries:

- `server.ts` starts the HTTP server.
- `app.ts` configures the Express app.
- `routes/` owns HTTP endpoints.
- `db/` owns SQLite initialisation and persistence, but `db/` is not in scope for this story.
- `middleware/errorHandler.ts` owns safe error responses later, but a full error handler is not required for a single health endpoint.

Keep any created files inside `backend/src/`. Do not create shared packages or move backend code outside the approved backend boundary.

### Latest Technical Notes

Current Express and Supertest practice supports exporting the app separately from `listen()` so integration tests can call the Express app directly. This avoids port conflicts and keeps backend tests fast and deterministic.

### Definition Of Done

- Story file requirements and all acceptance criteria above are satisfied.
- `backend/src/app.ts` exports a minimal Express app.
- `backend/src/server.ts` starts the HTTP server using `PORT` with default `3000`.
- `backend/src/routes/health.ts` exposes `GET /health`.
- `GET /health` returns HTTP 200 with `{ "status": "ok" }`.
- Backend integration tests verify the health endpoint status and response body using Supertest.
- Backend build and test commands pass.
- No Todo CRUD routes, `/api/todos` tests, SQLite schema/persistence logic, Todo validation, Docker runtime completion, frontend Todo UI work, or forbidden architecture is added.

### References

- `_bmad-output/planning-artifacts/epics.md` - Epic 1 and Story 1.3 acceptance criteria.
- `_bmad-output/planning-artifacts/architecture.md` - backend structure, API contract, health check, and testing patterns.
- `_bmad-output/planning-artifacts/prd.md` - FR16, NFR13, and backend API/delivery constraints.
- `_bmad-output/implementation-artifacts/sprint-status.yaml` - Sprint 1 sequencing and dependencies.
- `_bmad-output/implementation-artifacts/1-1-initialise-project-structure-and-tooling.md` - existing backend placeholder and scaffold boundaries.
- `_bmad-output/implementation-artifacts/1-2-configure-baseline-automated-test-infrastructure.md` - backend Vitest/Supertest setup and test isolation.

## Dev Agent Record

### Agent Model Used

GPT-5.5

### Debug Log References

- `npm run backend:test` red phase failed as expected because `backend/src/app.ts` did not exist yet.
- `npm run backend:test`
- `npm --prefix backend run build`
- `npm run backend:coverage`
- `npm run backend:dev` smoke check, then stopped the local server.
- `npm run frontend:test`
- `npm run e2e`
- Scope scan across backend source and backend package config for forbidden Story 1.4/product/infrastructure additions.

### Completion Notes List

- Story context created from approved PRD, architecture, epics, sprint status, and completed Stories 1.1 and 1.2.
- Status set to ready-for-dev.
- Added a minimal exported Express app in `backend/src/app.ts` without starting a network listener.
- Added `backend/src/server.ts` to start the HTTP server using `PORT` with default `3000`.
- Added `backend/src/routes/health.ts` exposing only `GET /health`.
- Added `backend/src/test/health.integration.test.ts` using Supertest against the app export to verify HTTP 200 and exact `{ status: 'ok' }` response body.
- Updated the backend dev script to run `src/server.ts`.
- Left `backend/src/index.ts` unchanged because no compatibility change was required.
- No Todo CRUD routes, `/api/todos`, SQLite schema/persistence logic, Todo validation, Docker runtime work, frontend work, service layers, repository patterns, ORM, GraphQL, authentication, admin routes, caching, or speculative infrastructure were added.

### Change Log

- 2026-04-27: Implemented backend app skeleton and health endpoint; moved story to review.

### File List

- `_bmad-output/implementation-artifacts/1-3-create-backend-app-skeleton-and-health-endpoint.md`
- `_bmad-output/implementation-artifacts/sprint-status.yaml`
- `backend/package.json`
- `backend/src/app.ts`
- `backend/src/server.ts`
- `backend/src/routes/health.ts`
- `backend/src/test/health.integration.test.ts`
