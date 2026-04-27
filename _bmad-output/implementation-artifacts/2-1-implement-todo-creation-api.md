# Story 2.1: Implement Todo Creation API

Status: done

## Story Goal

Add the first real Todo API endpoint: create a todo from valid text, persist it in SQLite, return the created todo as JSON, and prove through backend integration tests that the created todo can be read back through the API.

## Story

As a user,  
I want the backend to create a todo from a short text description,  
so that my task can be stored for later use.

## Dependency Context

Sprint 2 starts after Epic 1 foundation work is complete:

- `backend/src/app.ts` already exports the Express app.
- `backend/src/server.ts` already starts the HTTP server and initialises SQLite before listening.
- `backend/src/routes/health.ts` already exposes `GET /health`.
- `backend/src/db/sqlite.ts` already resolves `SQLITE_DB_PATH`, opens SQLite, and initialises the `todos` table.
- Backend Vitest, Supertest, coverage scripts, and isolated test database setup already exist.

This story is the first Epic 2 API story. It may introduce the minimal Todo route, validation, persistence, and error shape needed for creation, but it must not become the full CRUD implementation.

## Scope

This story is limited to `POST /api/todos` and the smallest read-back support needed to prove creation persistence.

In scope:

- Register JSON body parsing for the backend API.
- Add `POST /api/todos`.
- Trim todo text before validation and persistence.
- Reject empty or invalid text with a clear 4xx JSON validation error.
- Create a todo with `id`, `text`, `completed`, and `createdAt`.
- Default `completed` to `false`.
- Store `completed` in SQLite in a simple compatible form, such as `0`/`1`, while returning booleans at the API boundary.
- Return the created todo as JSON.
- Persist the new todo in SQLite.
- Add backend integration tests for valid creation and invalid creation input using an isolated test database path.
- Add only the minimum `GET /api/todos` support needed for the creation integration test to prove the newly created todo can be read back through the API.
- Add a small README update if backend commands, environment usage, or the first real Todo API endpoint need to be documented.

Out of scope:

- Full standalone `GET /api/todos` retrieval story beyond the minimum read-back proof required here.
- `PATCH /api/todos/:id`.
- `DELETE /api/todos/:id`.
- Frontend work.
- Docker runtime work.
- Playwright journeys.
- Full backend test coverage suite for every endpoint.
- Sorting/list-order acceptance beyond what is strictly needed to read back the created todo; Story 2.2 owns full list retrieval and ordering.
- Edit todo text after creation.
- Repository patterns, service layers, ORM, GraphQL, authentication, admin routes, caching, shared packages, microservices, background jobs, or speculative infrastructure.

## Acceptance Criteria

1. Given the backend API and SQLite persistence foundation exist, when a client sends `POST /api/todos` with non-empty text, then the backend trims and validates the text.

2. Given valid todo text is accepted, when the todo is created, then the backend creates a todo with `id`, `text`, `completed`, and `createdAt`.

3. Given a todo is created, when the API response is returned, then `completed` defaults to `false`, `createdAt` is an ISO 8601 string, and the response body is the created todo as JSON.

4. Given a todo is created, when SQLite is queried through the backend API, then the new todo is persisted and can be read back through `GET /api/todos`.

5. Given backend integration tests run, when valid creation is tested, then the tests use an isolated SQLite database path and prove the created todo can be read back via `GET /api/todos`.

6. Given a client sends `POST /api/todos` with empty or invalid text, when the request is processed, then the backend returns a clear 4xx JSON validation response using the standard error shape and no todo is persisted.

7. Given Story 2.1 is complete, when backend build, backend tests, and backend coverage commands run, then they pass without implementing PATCH, DELETE, frontend work, Docker runtime work, Playwright journeys, or speculative architecture.

8. Given this story exposes the first real Todo API endpoint, when README documentation is updated, then the update is minimal and factual: current backend API endpoint, relevant environment variable, and verification commands only.

## Tasks / Subtasks

- [x] Add minimal Todo API route wiring. (AC: 1, 2, 3, 4, 7)
  - [x] Add `backend/src/routes/todos.ts`.
  - [x] Register the Todo router in `backend/src/app.ts`.
  - [x] Add JSON request body parsing in `app.ts` before the Todo router.
  - [x] Preserve existing `GET /health` behaviour exactly.
  - [x] Do not add PATCH or DELETE routes.

- [x] Add creation validation. (AC: 1, 6, 7)
  - [x] Add a small validation function, preferably in `backend/src/validation/todoValidation.ts`.
  - [x] Accept only a string `text` field for creation.
  - [x] Trim leading and trailing whitespace.
  - [x] Reject missing, non-string, empty, or whitespace-only text.
  - [x] Return a clear 4xx JSON error shape, for example `{ "error": { "message": "Todo text is required" } }`.
  - [x] Do not add validation for completion, deletion, editing, search, filtering, sorting, users, priorities, deadlines, tags, or categories.

- [x] Add minimal Todo persistence for creation and read-back proof. (AC: 2, 3, 4, 5, 7)
  - [x] Reuse `backend/src/db/sqlite.ts` for opening/initialising the configured SQLite database.
  - [x] Add the smallest practical Todo persistence code, preferably `backend/src/db/todosPersistence.ts`, because the approved architecture places Todo persistence under `backend/src/db/`.
  - [x] Implement only what this story needs: insert a todo and list/read todos for creation persistence proof.
  - [x] Generate a unique string `id` using a standard Node API such as `crypto.randomUUID()`.
  - [x] Generate `createdAt` as `new Date().toISOString()`.
  - [x] Persist `completed` as false by default and return it as a boolean in API JSON.
  - [x] Do not add update, delete, edit, filtering, sorting, pagination, repository classes, service classes, ORM, or migration tooling.

- [x] Implement `POST /api/todos`. (AC: 1, 2, 3, 4, 6, 7)
  - [x] On valid input, return an appropriate success status and the created todo JSON.
  - [x] Ensure the response includes exactly the Todo API fields needed by the approved model: `id`, `text`, `completed`, `createdAt`.
  - [x] Ensure the stored text is the trimmed text.
  - [x] Ensure invalid input does not create a database row.
  - [x] Keep unexpected errors safe and do not expose stack traces in client-visible responses.

- [x] Add only the minimum `GET /api/todos` read-back support needed by this story. (AC: 4, 5, 7)
  - [x] Return a JSON array of todos sufficient for the creation test to confirm persistence.
  - [x] Map SQLite `completed` values to booleans in API responses.
  - [x] Do not expand this into the full Story 2.2 retrieval scope, ordering assertions, empty-state story, frontend loading behaviour, or complete list test suite.

- [x] Add backend integration tests for creation. (AC: 1, 2, 3, 4, 5, 6, 7)
  - [x] Add a focused backend integration test, preferably `backend/src/test/todos.creation.integration.test.ts`.
  - [x] Use Supertest against the Express app export, not a live network listener.
  - [x] Use an isolated SQLite database path and clean up test data/files where practical.
  - [x] Test valid creation with surrounding whitespace and assert returned `text` is trimmed.
  - [x] Assert returned `completed` is `false`.
  - [x] Assert returned `createdAt` is a valid ISO 8601 string.
  - [x] Assert the created todo can be read back through `GET /api/todos`.
  - [x] Test empty, whitespace-only, missing, or non-string text as invalid input.
  - [x] Assert invalid creation returns a clear 4xx JSON error and does not persist a todo.

- [x] Add a minimal README update if needed. (AC: 8)
  - [x] Document the current backend API endpoint `POST /api/todos`.
  - [x] Mention `SQLITE_DB_PATH` only if the new API verification relies on it.
  - [x] Add or adjust only factual verification commands such as backend test/build commands.
  - [x] Do not finalise the whole README and do not document future PATCH, DELETE, frontend, Docker, or Playwright work.

- [x] Verify commands and scope. (AC: 1-8)
  - [x] Run `npm run backend:test`.
  - [x] Run `npm --prefix backend run build`.
  - [x] Run `npm run backend:coverage`.
  - [x] Confirm `GET /health` still returns exactly `{ "status": "ok" }`.
  - [x] Confirm no PATCH, DELETE, frontend work, Docker runtime work, Playwright journeys, repository pattern, service layer, ORM, GraphQL, authentication, admin routes, caching, or speculative infrastructure was introduced.

## Dev Notes

### Approved Technical Direction

- Backend remains Node.js, TypeScript, and Express.
- Persistence remains SQLite through `better-sqlite3`.
- API style is REST over JSON.
- Todo JSON shape is `id`, `text`, `completed`, `createdAt`.
- `completed` is a boolean in API responses.
- `createdAt` is an ISO 8601 string in API responses.
- Backend validation is authoritative.
- Client-visible errors use a consistent JSON shape and must not expose stack traces.

### Recommended Implementation Shape

Use the smallest clear backend structure that supports creation:

```text
backend/src/
├── app.ts
├── routes/
│   ├── health.ts
│   └── todos.ts
├── validation/
│   └── todoValidation.ts
├── db/
│   ├── sqlite.ts
│   └── todosPersistence.ts
└── test/
    └── todos.creation.integration.test.ts
```

Recommended responsibilities:

- `app.ts`: configure JSON parsing, register `healthRouter`, register `todosRouter`.
- `routes/todos.ts`: own HTTP route handlers for `POST /api/todos` and the minimal `GET /api/todos` read-back route.
- `validation/todoValidation.ts`: own create-text validation only.
- `db/sqlite.ts`: continue to own SQLite path handling, opening, and schema initialisation.
- `db/todosPersistence.ts`: own only minimal insert and list/read helpers needed for this story.
- `todos.creation.integration.test.ts`: prove valid and invalid creation behaviour against the Express app.

Keep this functional and explicit. Do not introduce classes, dependency injection, service layers, repository abstractions, DTO mappers, or generic frameworks.

### API Contract For This Story

`POST /api/todos`

Request body:

```json
{
  "text": "Buy milk"
}
```

Success response body:

```json
{
  "id": "generated-string-id",
  "text": "Buy milk",
  "completed": false,
  "createdAt": "2026-04-27T15:45:00.000Z"
}
```

Validation error response shape:

```json
{
  "error": {
    "message": "Todo text is required"
  }
}
```

Use an appropriate 4xx status for validation failures. The exact message can differ if it remains clear, factual, and consistent with the standard error shape.

### Persistence Guidance

The existing schema is:

```sql
CREATE TABLE IF NOT EXISTS todos (
  id TEXT PRIMARY KEY,
  text TEXT NOT NULL,
  completed INTEGER NOT NULL DEFAULT 0,
  createdAt TEXT NOT NULL
);
```

Implementation guidance:

- Use `initializeDatabase()` or `openDatabase()` from `backend/src/db/sqlite.ts` rather than creating a second SQLite setup path.
- Make sure schema initialisation still happens before route use in normal server startup.
- For tests, set or pass an isolated database path so `./data/todos.db` is not touched.
- Convert SQLite `completed` values to booleans at the API boundary.
- Store and return `createdAt` as ISO 8601 text.

### Testing Notes

Backend integration tests should test the Express app contract with Supertest.

Required valid-input checks:

- `POST /api/todos` accepts non-empty text.
- Input text is trimmed before persistence and response.
- Response contains `id`, `text`, `completed`, and `createdAt`.
- `completed` is `false`.
- `createdAt` parses as a valid ISO 8601 string.
- `GET /api/todos` can read back the created todo, proving SQLite persistence.

Required invalid-input checks:

- Empty or whitespace-only text returns a 4xx JSON validation error.
- Missing or non-string `text` returns a 4xx JSON validation error.
- Invalid input does not persist a todo.

Do not add tests for:

- `PATCH /api/todos/:id`.
- `DELETE /api/todos/:id`.
- Full list ordering, empty list behaviour, or full retrieval story coverage beyond read-back proof.
- Frontend behaviour.
- Playwright journeys.
- Docker runtime behaviour.

### Previous Story Intelligence

From Story 1.4:

- `backend/src/db/sqlite.ts` exists and exposes `getDatabasePath`, `openDatabase`, and `initializeDatabase`.
- `initializeDatabase()` creates the `todos` table and returns a `better-sqlite3` database connection.
- `backend/src/server.ts` calls `initializeDatabase()` before starting the HTTP listener.
- SQLite tests should restore `SQLITE_DB_PATH` cleanly after mutation and should avoid the development database path.
- The current schema has exactly `id`, `text`, `completed`, and `createdAt`.

From Story 1.3:

- `backend/src/app.ts` exports the Express app and must not start a listener.
- `backend/src/server.ts` owns `app.listen(...)` with `PORT` defaulting to `3000`.
- `GET /health` returns exactly `{ "status": "ok" }`.
- Integration tests import the Express app directly and use Supertest.

From Story 1.2:

- Backend tests use Vitest in the Node environment.
- Supertest and coverage support are already configured.
- `backend/src/test/setup.ts` currently sets `SQLITE_DB_PATH` to `./data/test-todos.db`; story-specific tests may still use a temporary isolated path if that makes cleanup safer.
- Coverage commands are available, but this story does not need to reach the final 70 percent target by itself.

### Project Structure Notes

Expected files to add or modify:

- `backend/src/app.ts`
- `backend/src/routes/todos.ts`
- `backend/src/validation/todoValidation.ts`
- `backend/src/db/todosPersistence.ts`
- `backend/src/test/todos.creation.integration.test.ts`
- `README.md` only if a minimal backend API note is needed

Existing files to preserve:

- `backend/src/routes/health.ts`
- `backend/src/server.ts`, unless a tiny import or startup adjustment is genuinely needed
- `backend/src/db/sqlite.ts`, unless a tiny supporting change is genuinely needed
- `backend/src/index.ts`, which remains a scaffold placeholder and should not become the server entry point

### Definition Of Done

- Story file requirements and all acceptance criteria above are satisfied.
- `POST /api/todos` exists and creates persisted todos with `id`, trimmed `text`, `completed: false`, and ISO `createdAt`.
- Invalid create input returns a clear 4xx JSON error and does not persist data.
- Backend integration tests prove valid creation, invalid creation, isolated database use, and read-back through `GET /api/todos`.
- Minimal read-back support does not expand into the full Story 2.2 retrieval scope.
- README is updated only if needed, and only with minimal factual API/command/env details.
- Backend build, backend tests, and backend coverage commands pass.
- `GET /health` behaviour remains unchanged.
- No PATCH, DELETE, frontend work, Docker runtime work, Playwright journeys, edit functionality, search, filtering, sorting, analytics, authentication, GraphQL, microservices, caching, service layer, repository pattern, ORM, shared package, or speculative architecture is added.

### References

- `_bmad-output/planning-artifacts/epics.md` - Epic 2 and Story 2.1 acceptance criteria.
- `_bmad-output/planning-artifacts/architecture.md` - REST API contract, backend structure, Todo model, validation, error format, and SQLite boundaries.
- `_bmad-output/planning-artifacts/prd.md` - FR1, FR2, FR3, FR15, FR17, FR18, and backend persistence requirements.
- `_bmad-output/implementation-artifacts/sprint-status.yaml` - Sprint 2 scope, sequencing, and current status.
- `_bmad-output/implementation-artifacts/sprint-2-plan.md` - Sprint 2 implementation order and guardrails.
- `_bmad-output/implementation-artifacts/1-4-create-sqlite-persistence-foundation.md` - completed SQLite foundation and test isolation learnings.

## Dev Agent Record

### Agent Model Used

GPT-5.5

### Debug Log References

- `npm run backend:test -- --runInBand` red phase failed as expected because `/api/todos` was not implemented yet.
- `npm run backend:test`
- `npm --prefix backend run build`
- `npm run backend:coverage`
- `npm run frontend:test`
- `npm run e2e`
- Scope scan across backend source, README, and Story 2.1 for out-of-scope PATCH, DELETE, frontend, Docker, Playwright, GraphQL, authentication, service layer, repository pattern, ORM, and related terms.
- Code review reran `npm --prefix backend run build`, `npm run backend:test`, and `npm run backend:coverage`.
- Code review full-file README pass found stale top-level status wording; README was patched and backend checks remained green.

### Completion Notes List

- Story context created from approved PRD, architecture, epics, Sprint 2 plan, sprint status, and completed Epic 1 implementation records.
- Status set to ready-for-dev.
- Added `POST /api/todos` with backend text trimming, validation, created todo JSON response, SQLite persistence, `completed: false`, and ISO `createdAt`.
- Added minimal `GET /api/todos` read-back support only for creation persistence verification.
- Added focused backend integration tests covering valid creation, invalid creation, isolated SQLite path usage, and read-back through the API.
- Updated README with only the current Story 2.1 backend API facts and verification commands.
- During review, reconciled the README top-level status wording with completed Stories 1.3, 1.4, and 2.1.
- Backend build, backend tests, backend coverage, frontend scaffold tests, and Playwright scaffold tests pass.
- No PATCH, DELETE, frontend Todo UI, Docker runtime, Playwright journeys, service layer, repository pattern, ORM, GraphQL, authentication, admin routes, caching, shared package, or speculative infrastructure was added.
- Code review found no unresolved blockers or high-risk implementation concerns.

### Change Log

- 2026-04-27: Created Story 2.1 developer handoff and moved story to ready-for-dev.
- 2026-04-27: Implemented Todo creation API and moved story to review.
- 2026-04-27: Fixed README status drift from review and moved story to done.

### File List

- `_bmad-output/implementation-artifacts/2-1-implement-todo-creation-api.md`
- `_bmad-output/implementation-artifacts/sprint-status.yaml`
- `README.md`
- `backend/src/app.ts`
- `backend/src/db/todosPersistence.ts`
- `backend/src/routes/todos.ts`
- `backend/src/test/todos.creation.integration.test.ts`
- `backend/src/validation/todoValidation.ts`
