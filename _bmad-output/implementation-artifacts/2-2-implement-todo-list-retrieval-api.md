# Story 2.2: Implement Todo List Retrieval API

Status: done

## Story Goal

Turn the existing minimal `GET /api/todos` read-back route into the proper Todo list retrieval endpoint: return all persisted todos as a JSON array, with the approved Todo shape, boolean `completed`, ISO `createdAt`, ascending `createdAt` ordering, and clear empty-list behaviour.

## Story

As a user,  
I want the backend to return the current list of todos,  
so that the app can show my saved tasks after opening or refreshing.

## Dependency Context

Story 2.1 is complete and provides the starting point for this story:

- `backend/src/routes/todos.ts` already registers `POST /api/todos` and a minimal `GET /api/todos` used for creation read-back proof.
- `backend/src/db/todosPersistence.ts` already contains `createTodo(text)` and `listTodos()`.
- `listTodos()` already maps SQLite `completed` values to booleans, but it currently has no explicit ordering.
- `backend/src/test/todos.creation.integration.test.ts` already verifies create and single-item read-back using an isolated SQLite database path.
- `README.md` currently describes `GET /api/todos` as minimal read-back support only.

This story should refine the existing retrieval path. It should not replace the small backend shape, introduce a new architecture, or expand into later mutation stories.

## Scope

This story is limited to `GET /api/todos` retrieval behaviour.

In scope:

- Treat `GET /api/todos` as the proper list retrieval endpoint.
- Return a JSON array of todos.
- Ensure every returned todo includes `id`, `text`, `completed`, and `createdAt`.
- Ensure `completed` values are booleans in API responses.
- Ensure `createdAt` values are ISO 8601 strings in API responses.
- Return todos in ascending `createdAt` order.
- Return an empty JSON array when no todos exist.
- Add focused backend integration tests for empty-list and populated-list retrieval.
- Verify populated-list tests cover response shape, boolean `completed`, ISO `createdAt`, and ascending `createdAt` ordering.
- Review the whole README and update only the current API documentation/status wording needed to keep it truthful after Story 2.2.

Out of scope:

- `PATCH /api/todos/:id`.
- `DELETE /api/todos/:id`.
- Todo completion or deletion behaviour.
- Todo editing.
- Frontend work.
- Docker runtime work.
- Playwright journeys.
- Full Story 4 backend API test suite beyond the retrieval checks required here.
- Filtering, search, sorting options, pagination, query parameters, categories, tags, priorities, deadlines, users, authentication, admin routes, analytics, or AI product features.
- Repository patterns, service layers, ORM, GraphQL, caching, shared packages, microservices, background jobs, or speculative infrastructure.

## Acceptance Criteria

1. Given todos exist in SQLite, when a client sends `GET /api/todos`, then the backend returns a JSON array of todos.

2. Given todos are returned by `GET /api/todos`, when the response is inspected, then each todo includes `id`, `text`, `completed`, and `createdAt`.

3. Given todos are returned by `GET /api/todos`, when `completed` values are inspected, then they are booleans in the API response.

4. Given todos are returned by `GET /api/todos`, when `createdAt` values are inspected, then they are ISO 8601 strings.

5. Given more than one todo exists, when a client sends `GET /api/todos`, then todos are returned in ascending `createdAt` order.

6. Given no todos exist, when a client sends `GET /api/todos`, then the backend returns an empty JSON array.

7. Given backend integration tests run, when list retrieval is tested, then tests use an isolated SQLite database path and cover empty-list retrieval, populated-list retrieval, response shape, boolean `completed`, ISO `createdAt`, and ordering.

8. Given Story 2.2 is complete, when backend build, backend tests, and backend coverage commands run, then they pass without implementing PATCH, DELETE, frontend work, Docker runtime work, Playwright journeys, or speculative architecture.

9. Given README documentation is reviewed, when the story is complete, then the README remains fully truthful and documents only currently implemented API behaviour.

## Tasks / Subtasks

- [x] Refine the existing Todo retrieval persistence behaviour. (AC: 1, 2, 3, 4, 5, 6, 8)
  - [x] Reuse `backend/src/db/todosPersistence.ts`.
  - [x] Keep `listTodos()` as the small retrieval helper unless a tiny rename is clearly needed.
  - [x] Add explicit ascending `createdAt` ordering to the list query.
  - [x] Preserve the API Todo shape: `id`, `text`, `completed`, `createdAt`.
  - [x] Preserve boolean conversion for `completed`.
  - [x] Preserve ISO `createdAt` strings as stored/returned.
  - [x] Do not add update, delete, edit, filtering, search, sorting options, pagination, repository classes, service classes, ORM, or migration tooling.

- [x] Keep the route implementation small and scoped. (AC: 1, 2, 3, 4, 5, 6, 8)
  - [x] Reuse the existing `GET /api/todos` route in `backend/src/routes/todos.ts`.
  - [x] Keep the route response as a direct JSON array.
  - [x] Preserve existing `POST /api/todos` behaviour from Story 2.1.
  - [x] Preserve existing `GET /health` behaviour exactly.
  - [x] Do not add PATCH or DELETE routes.

- [x] Add focused backend integration tests for retrieval. (AC: 1, 2, 3, 4, 5, 6, 7, 8)
  - [x] Add or update a focused backend integration test, preferably `backend/src/test/todos.retrieval.integration.test.ts`.
  - [x] Use Supertest against the Express app export, not a live network listener.
  - [x] Use an isolated SQLite database path and clean up test data/files where practical.
  - [x] Test `GET /api/todos` returns `[]` when no todos exist.
  - [x] Test `GET /api/todos` returns multiple existing todos.
  - [x] Verify each returned todo includes only the approved API fields: `id`, `text`, `completed`, `createdAt`.
  - [x] Verify `completed` values are booleans, including at least one persisted `0` and one persisted `1` value if practical.
  - [x] Verify `createdAt` values parse as ISO 8601 strings.
  - [x] Verify ascending `createdAt` ordering using controlled test data.
  - [x] Do not test PATCH, DELETE, frontend behaviour, Docker runtime, or Playwright journeys.

- [x] Keep test setup truthful and isolated. (AC: 7, 8)
  - [x] Prefer seeding retrieval test rows directly into the isolated SQLite database when controlled `createdAt` values or `completed` values are needed.
  - [x] Use `initializeDatabase()` or existing SQLite helpers for test setup rather than adding production-only seed helpers.
  - [x] Do not touch `./data/todos.db` during automated tests.
  - [x] Restore or clean up `SQLITE_DB_PATH` after tests.

- [x] Review and minimally update README. (AC: 9)
  - [x] Read the whole README, not only the Story 2.1 section.
  - [x] Replace the Story 2.1 note that says `GET /api/todos` is only minimal read-back support.
  - [x] Document that `GET /api/todos` now returns the current todo list as a JSON array in ascending `createdAt` order.
  - [x] Keep documentation factual and limited to behaviour implemented by Stories 1.1-1.4, 2.1, and 2.2.
  - [x] Do not claim PATCH, DELETE, frontend Todo UI, Docker runtime completion, Playwright user journeys, accessibility audit completion, final QA/security documentation, or excluded features.

- [x] Verify commands and scope. (AC: 1-9)
  - [x] Run `npm run backend:test`.
  - [x] Run `npm --prefix backend run build`.
  - [x] Run `npm run backend:coverage`.
  - [x] Confirm `GET /health` still returns exactly `{ "status": "ok" }`.
  - [x] Confirm `POST /api/todos` tests from Story 2.1 still pass.
  - [x] Confirm no PATCH, DELETE, frontend work, Docker runtime work, Playwright journeys, repository pattern, service layer, ORM, GraphQL, authentication, admin routes, caching, shared packages, or speculative infrastructure was introduced.

## Dev Notes

### Approved Technical Direction

- Backend remains Node.js, TypeScript, and Express.
- Persistence remains SQLite through `better-sqlite3`.
- API style is REST over JSON.
- List endpoint returns a direct JSON array of todos.
- Todo JSON shape is `id`, `text`, `completed`, `createdAt`.
- `completed` is a boolean in API responses.
- `createdAt` is an ISO 8601 string in API responses.
- Retrieval ordering is ascending `createdAt`.

### Recommended Implementation Shape

Build on the Story 2.1 files:

```text
backend/src/
├── routes/
│   └── todos.ts
├── db/
│   ├── sqlite.ts
│   └── todosPersistence.ts
└── test/
    ├── todos.creation.integration.test.ts
    └── todos.retrieval.integration.test.ts
```

Recommended responsibilities:

- `routes/todos.ts`: keep `GET /api/todos` as the HTTP contract and return `response.status(200).json(listTodos())`.
- `todosPersistence.ts`: own SQLite retrieval ordering and row-to-API mapping.
- `todos.retrieval.integration.test.ts`: prove empty and populated retrieval through the Express app.

Keep this functional and explicit. Do not introduce classes, dependency injection, service layers, repository abstractions, DTO mappers, generic query builders, or framework-heavy patterns.

### API Contract For This Story

`GET /api/todos`

Success response body when todos exist:

```json
[
  {
    "id": "todo-1",
    "text": "First task",
    "completed": false,
    "createdAt": "2026-04-27T15:00:00.000Z"
  },
  {
    "id": "todo-2",
    "text": "Second task",
    "completed": true,
    "createdAt": "2026-04-27T15:05:00.000Z"
  }
]
```

Success response body when no todos exist:

```json
[]
```

The API should not introduce query parameters, sorting choices, filters, pagination, or search. Ascending `createdAt` ordering is the only approved ordering rule for this story.

### Persistence Guidance

Current Story 2.1 retrieval code exists in `backend/src/db/todosPersistence.ts`:

- `createTodo(text)` inserts a todo with `completed` persisted as `0`.
- `listTodos()` selects `id`, `text`, `completed`, and `createdAt`, and maps `completed` with `Boolean(row.completed)`.

For this story:

- Add `ORDER BY createdAt ASC` to the retrieval query.
- Keep the database path and schema setup delegated to `backend/src/db/sqlite.ts`.
- Do not add new schema columns.
- Do not add update/delete helpers.
- Do not add a general repository abstraction around SQLite.

### Testing Notes

Backend integration tests should test the Express app contract with Supertest.

Required empty-list checks:

- `GET /api/todos` returns HTTP 200.
- Response body is exactly `[]` when the isolated database has no todos.

Required populated-list checks:

- `GET /api/todos` returns HTTP 200.
- Response body is a JSON array with multiple todos.
- Every item has `id`, `text`, `completed`, and `createdAt`.
- `completed` values are booleans. Direct test seeding may use SQLite `0` and `1` values to prove both `false` and `true` mapping without implementing completion.
- `createdAt` values are ISO 8601 strings.
- Items are returned in ascending `createdAt` order.

Suggested test setup:

- Use a temporary SQLite database path per test file or per test.
- Call `initializeDatabase()` to create the schema.
- Insert controlled rows directly into the isolated test database for retrieval tests when exact ordering and completed values matter.
- Close the database connection and clean up the temporary directory after the test.

Do not add tests for:

- `PATCH /api/todos/:id`.
- `DELETE /api/todos/:id`.
- Frontend behaviour.
- Playwright journeys.
- Docker runtime behaviour.

### Previous Story Intelligence

From Story 2.1:

- `backend/src/routes/todos.ts` already exposes `GET /api/todos` and `POST /api/todos`.
- `GET /api/todos` currently works as minimal read-back support but is not yet covered as a full retrieval story.
- `backend/src/db/todosPersistence.ts` already has `listTodos()`, but its query currently has no `ORDER BY`.
- `backend/src/test/todos.creation.integration.test.ts` uses a temporary `SQLITE_DB_PATH` and restores the environment afterwards.
- The README was reviewed and fixed during Story 2.1 code review; keep that discipline for Story 2.2.

From Story 1.4:

- `backend/src/db/sqlite.ts` exposes `getDatabasePath`, `openDatabase`, and `initializeDatabase`.
- `initializeDatabase()` creates the `todos` table and returns a `better-sqlite3` database connection.
- The `todos` schema has exactly `id`, `text`, `completed`, and `createdAt`.

From Story 1.3:

- `backend/src/app.ts` exports the Express app and must not start a listener.
- `backend/src/server.ts` owns `app.listen(...)` with `PORT` defaulting to `3000`.
- `GET /health` returns exactly `{ "status": "ok" }`.
- Integration tests import the Express app directly and use Supertest.

### Project Structure Notes

Expected files to add or modify:

- `backend/src/db/todosPersistence.ts`
- `backend/src/test/todos.retrieval.integration.test.ts`
- `README.md`
- `_bmad-output/implementation-artifacts/2-2-implement-todo-list-retrieval-api.md`
- `_bmad-output/implementation-artifacts/sprint-status.yaml`

Existing files to preserve unless a tiny scoped change is genuinely needed:

- `backend/src/routes/todos.ts`
- `backend/src/app.ts`
- `backend/src/routes/health.ts`
- `backend/src/server.ts`
- `backend/src/db/sqlite.ts`
- `backend/src/validation/todoValidation.ts`
- `backend/src/test/todos.creation.integration.test.ts`

### Definition Of Done

- Story file requirements and all acceptance criteria above are satisfied.
- `GET /api/todos` returns a JSON array for both empty and populated states.
- Returned todos include `id`, `text`, `completed`, and `createdAt`.
- `completed` values are booleans.
- `createdAt` values are ISO 8601 strings.
- Todos are returned in ascending `createdAt` order.
- Backend integration tests prove empty-list retrieval, populated-list retrieval, response shape, boolean mapping, ISO date values, ordering, and isolated database usage.
- README remains truthful after a full-file review and documents only current behaviour.
- Backend build, backend tests, and backend coverage commands pass.
- `GET /health` and `POST /api/todos` behaviour from previous stories remain unchanged.
- No PATCH, DELETE, frontend work, Docker runtime work, Playwright journeys, edit functionality, search, filtering, sorting options, pagination, analytics, authentication, GraphQL, microservices, caching, service layer, repository pattern, ORM, shared package, or speculative architecture is added.

### References

- `_bmad-output/planning-artifacts/epics.md` - Epic 2 and Story 2.2 acceptance criteria.
- `_bmad-output/planning-artifacts/architecture.md` - REST API contract, backend structure, Todo model, response formats, and SQLite boundaries.
- `_bmad-output/planning-artifacts/prd.md` - FR4, FR5, FR15, FR18, and backend persistence requirements.
- `_bmad-output/implementation-artifacts/sprint-status.yaml` - Sprint 2 scope, sequencing, and current status.
- `_bmad-output/implementation-artifacts/sprint-2-plan.md` - Sprint 2 implementation order and guardrails.
- `_bmad-output/implementation-artifacts/2-1-implement-todo-creation-api.md` - completed creation API and current retrieval read-back implementation.

## Dev Agent Record

### Agent Model Used

GPT-5.5

### Debug Log References

- `npm run backend:test` red phase failed as expected because `GET /api/todos` did not yet return rows in ascending `createdAt` order.
- `npm run backend:test`
- `npm --prefix backend run build`
- `npm run backend:coverage`
- `npm run frontend:test`
- `npm run e2e`
- README scan for stale minimal read-back wording and unsupported future functionality claims.
- Scope scan across backend source, README, and Story 2.2 for out-of-scope PATCH, DELETE, frontend, Docker, Playwright, GraphQL, authentication, service layer, repository pattern, ORM, query parameters, pagination, search, and related terms.
- Code review reran `npm --prefix backend run build`, `npm run backend:test`, and `npm run backend:coverage`.
- Code review full-file README pass found stale scaffold wording around backend tests and coverage; README was patched and backend checks remained green.

### Completion Notes List

- Story context created from approved PRD, architecture, epics, Sprint 2 plan, sprint status, and completed Story 2.1 implementation record.
- Status set to ready-for-dev.
- Added `ORDER BY createdAt ASC` to the existing `listTodos()` retrieval query.
- Added focused `GET /api/todos` integration tests for empty-list retrieval and populated-list retrieval using an isolated SQLite database path.
- Retrieval tests directly seed the isolated SQLite database for controlled `createdAt` ordering and `completed` boolean mapping without adding production seed helpers.
- Updated README after a full-file review so `GET /api/todos` is documented as the proper list endpoint with ascending `createdAt` ordering.
- During review, tightened README wording for backend tests and coverage so the full file remains truthful after Story 2.2.
- Backend build, backend tests, backend coverage, frontend scaffold tests, and Playwright scaffold tests pass.
- No PATCH, DELETE, frontend Todo UI, Docker runtime, Playwright journeys, filtering, search, pagination, query parameters, service layer, repository pattern, ORM, GraphQL, authentication, admin routes, caching, shared package, or speculative infrastructure was added.
- Code review found no unresolved blockers or high-risk implementation concerns.

### Change Log

- 2026-04-27: Created Story 2.2 developer handoff and moved story to ready-for-dev.
- 2026-04-27: Implemented Todo list retrieval ordering and tests, updated README, and moved story to review.
- 2026-04-27: Fixed README wording drift from review and moved story to done.

### File List

- `_bmad-output/implementation-artifacts/2-2-implement-todo-list-retrieval-api.md`
- `_bmad-output/implementation-artifacts/sprint-status.yaml`
- `README.md`
- `backend/src/db/todosPersistence.ts`
- `backend/src/test/todos.retrieval.integration.test.ts`
