# Story 1.2: Configure Baseline Automated Test Infrastructure

Status: done

## Story Goal

Add the baseline automated test infrastructure needed from day one so later stories can add real frontend, backend, and E2E coverage without reworking project structure or contaminating development data.

## Story

As a developer,  
I want baseline frontend, backend, and E2E test commands configured,  
so that QA is present from day one.

## Dependency Context

Story 1.1 is complete and provides the scaffold this story must build on:

- Root `package.json` already has `frontend:dev`, `backend:dev`, and `e2e`.
- Frontend is a Vite React TypeScript app under `frontend/`.
- Backend is a Node.js TypeScript project with Express under `backend/`.
- Playwright is configured at repo root with `testDir: './tests/e2e'`.
- Environment placeholders already exist for `VITE_API_BASE_URL`, `PORT`, and `SQLITE_DB_PATH`.

Do not restructure the scaffold from Story 1.1 unless a tiny correction is required to make test tooling work.

## Scope

This story is limited to baseline test setup and command wiring.

In scope:

- Add frontend Vitest setup for unit and component testing.
- Add React Testing Library support for future frontend component tests.
- Add frontend coverage command/configuration as scaffolding only.
- Add backend Vitest setup.
- Add Supertest-style backend integration test support.
- Add backend coverage command/configuration as scaffolding only.
- Ensure backend tests use an isolated SQLite test database path, separate from the normal development database path.
- Keep Playwright configured at repo root and targeting `tests/e2e/`.
- Add package scripts for frontend tests, backend tests, frontend coverage, backend coverage, and E2E tooling.
- Add only placeholder or smoke-level tests needed to prove the baseline test commands work.

Out of scope:

- Todo CRUD tests.
- Health endpoint tests.
- SQLite schema, database initialisation, or persistence logic.
- Frontend Todo UI tests.
- The required five Playwright journey tests.
- Docker runtime work.
- README completion beyond commands or notes strictly needed for this story.
- Any product behaviour, API routes, frontend Todo components, router, global state library, ORM, shared package, GraphQL, microservices, caching, authentication, analytics, or speculative infrastructure.

## Acceptance Criteria

1. Given the frontend and backend projects exist, when test infrastructure is configured, then the frontend has Vitest configured for unit/component tests.

2. Given frontend test infrastructure is configured, when frontend test scripts run, then they can execute a minimal placeholder or scaffold test without requiring Todo UI implementation.

3. Given frontend coverage scaffolding is configured, when the frontend coverage command runs, then coverage output can be generated later without claiming the final 70 percent coverage target has been achieved.

4. Given the backend project exists, when backend test infrastructure is configured, then the backend has Vitest and Supertest-style integration test support.

5. Given backend test infrastructure is configured, when backend test scripts run, then they can execute a minimal placeholder or scaffold test without requiring health endpoint, Todo routes, SQLite schema, or persistence logic.

6. Given backend tests are configured, when they run, then they use an isolated test SQLite database path rather than the normal development database file.

7. Given Playwright is already configured at repo root, when E2E tooling is checked, then `tests/e2e/` remains the intended E2E location and the E2E command remains wired from the root.

8. Given package scripts are reviewed, when a developer checks the root, frontend, and backend `package.json` files, then scripts exist for running frontend tests, backend tests, frontend coverage, backend coverage, and E2E tooling.

9. Given the story is complete, when a developer reviews the codebase, then no Todo CRUD tests, health endpoint tests, SQLite schema or persistence logic, frontend Todo UI tests, required five Playwright journey tests, Docker runtime work, or out-of-scope architecture has been added.

## Tasks / Subtasks

- [x] Configure frontend Vitest baseline. (AC: 1, 2, 3, 8, 9)
  - [x] Install only frontend test dependencies needed for React/Vite testing, such as `vitest`, `@testing-library/react`, `@testing-library/jest-dom`, `@testing-library/user-event`, `jsdom`, and `@vitest/coverage-v8`.
  - [x] Add a frontend Vitest config or extend the Vite config in the smallest clear way.
  - [x] Configure `jsdom` for component tests.
  - [x] Add a frontend test setup file for Testing Library cleanup and matchers.
  - [x] Add a minimal placeholder/scaffold test that does not test Todo UI or product behaviour.
  - [x] Add `test`, `test:run`, and `test:coverage` style scripts in `frontend/package.json`.

- [x] Configure backend Vitest and Supertest baseline. (AC: 4, 5, 6, 8, 9)
  - [x] Install only backend test dependencies needed for Vitest and Supertest-style integration testing, such as `vitest`, `supertest`, `@types/supertest`, and `@vitest/coverage-v8`.
  - [x] Add a backend Vitest config using the Node test environment.
  - [x] Add backend test setup that sets `process.env.SQLITE_DB_PATH` to an isolated test database path.
  - [x] Ensure the isolated test path is separate from `./data/todos.db`, for example under a temporary or test-only location.
  - [x] Add a minimal placeholder/scaffold test that proves the backend test runner works without creating routes, health endpoint logic, SQLite schema, or persistence logic.
  - [x] Add `test`, `test:run`, and `test:coverage` style scripts in `backend/package.json`.

- [x] Confirm Playwright baseline wiring. (AC: 7, 8, 9)
  - [x] Keep `playwright.config.ts` at the repo root.
  - [x] Keep `testDir` pointed at `tests/e2e`.
  - [x] Add either a harmless placeholder E2E smoke test or configure the E2E script so the command is wired without requiring real journey tests yet.
  - [x] Do not add the five required journey tests in this story.
  - [x] Do not add CI workflow output.

- [x] Add root-level test and coverage command wiring. (AC: 8)
  - [x] Add root scripts for frontend tests, backend tests, frontend coverage, backend coverage, and E2E.
  - [x] Keep scripts simple and avoid monorepo tooling.
  - [x] Do not claim final coverage achievement in scripts or docs.

- [x] Add strictly necessary documentation notes. (AC: 8, 9)
  - [x] Update the root README only enough to document new Story 1.2 test and coverage commands.
  - [x] Make clear that coverage commands are scaffolding and the 70 percent target is reached later.
  - [x] Do not expand README into final submission documentation.

- [x] Verify scope and commands. (AC: 1-9)
  - [x] Run frontend test and frontend coverage commands.
  - [x] Run backend test and backend coverage commands.
  - [x] Run or smoke-check the E2E command.
  - [x] Confirm no Todo CRUD tests, health endpoint tests, SQLite schema/persistence logic, Todo UI tests, Docker runtime work, or out-of-scope architecture was introduced.

## Dev Notes

### Current Project State

After Story 1.1:

- `frontend/package.json` contains Vite scripts: `dev`, `build`, `lint`, and `preview`.
- `backend/package.json` contains `dev`, `build`, and a placeholder `test` script.
- Root `package.json` contains `frontend:dev`, `backend:dev`, and `e2e`.
- `playwright.config.ts` already uses `testDir: './tests/e2e'`.
- `tests/e2e/.gitkeep` exists.
- `backend/src/index.ts` is only a scaffold placeholder. It must not become an HTTP server in this story.

### Frontend Test Guidance

Use Vitest with Vite and React Testing Library. Keep the setup conventional and small:

- `frontend/vitest.config.ts` or equivalent Vite/Vitest config.
- `frontend/src/test/setup.ts` for Testing Library matchers and cleanup.
- One minimal placeholder test, such as checking a plain value or a tiny scaffold component, is acceptable.

Do not add tests for `AddTodoForm`, `TodoList`, `TodoItem`, empty state, loading state, error state, API client, or any Todo behaviour. Those belong to later frontend stories.

### Backend Test Guidance

Use Vitest with a Node environment and Supertest installed for later Express app contract tests.

This story should create support for integration tests without needing a real Express app export yet. Acceptable options include:

- A Vitest config under `backend/`.
- A setup file that sets `process.env.SQLITE_DB_PATH` to a test-only database path.
- A placeholder test that asserts the test environment is configured, including the isolated `SQLITE_DB_PATH`.

Do not implement `app.ts`, `server.ts`, `routes/health.ts`, Todo routes, SQLite schema initialisation, persistence modules, validation, or middleware in this story.

### Isolated Test Database Path

Backend tests must not use the development SQLite path.

Use a clear test-only value such as:

```bash
SQLITE_DB_PATH=./data/test-todos.db
```

or a temporary path under a backend test artefact folder. The exact value can be chosen during implementation, but it must be explicit and separate from normal development data.

### Coverage Guidance

Add coverage commands and configuration only. This story does not need to meet the final 70 percent meaningful coverage target.

Use Vitest coverage with the V8 provider where practical:

- Frontend coverage should target future `frontend/src/**/*.{ts,tsx}` code.
- Backend coverage should target future `backend/src/**/*.ts` code.
- Exclude test files and generated/build output.

### Playwright Guidance

Playwright is already installed at the root and configured for `tests/e2e`.

For this story:

- Keep root Playwright config.
- Keep E2E target under `tests/e2e`.
- Keep the E2E command wired.
- A placeholder smoke test is acceptable only if needed to make the command pass.
- Do not implement create, complete, delete, empty state, error handling, or responsive E2E journey tests.

### Root Script Guidance

Prefer simple root scripts that delegate to package-local scripts:

```json
{
  "frontend:test": "npm --prefix frontend run test:run",
  "frontend:coverage": "npm --prefix frontend run test:coverage",
  "backend:test": "npm --prefix backend run test:run",
  "backend:coverage": "npm --prefix backend run test:coverage",
  "e2e": "playwright test"
}
```

Exact names can vary if they are clear and documented, but avoid workspace tooling or complex orchestration.

### Previous Story Intelligence

Story 1.1 completed cleanly and moved to `done`.

Useful established patterns:

- Keep root scripts simple.
- Preserve Story 1.1 scaffold structure.
- Use environment placeholders rather than full runtime wiring.
- Avoid expanding README beyond the current story's immediate needs.
- Do not treat the backend scaffold as a running API yet.

### Latest Technical Notes

Current guidance remains aligned with the approved architecture:

- Vitest is suitable for both frontend and backend TypeScript tests.
- React Testing Library with `jsdom` is suitable for future component tests.
- Supertest is suitable for later Express app contract/integration tests.
- Vitest coverage commonly uses `@vitest/coverage-v8`.

### Definition Of Done

- Story file requirements and all acceptance criteria above are satisfied.
- Frontend Vitest and component-test support are configured.
- Backend Vitest and Supertest-style integration-test support are configured.
- Backend test setup uses an isolated SQLite test database path.
- Frontend and backend coverage commands/configuration exist but do not claim final coverage achievement.
- Root scripts or README commands exist for frontend tests, backend tests, coverage, and E2E.
- Playwright remains rooted and targeted at `tests/e2e`.
- No product behaviour, health endpoint, CRUD, SQLite schema/persistence, Todo UI tests, Docker runtime work, or out-of-scope architecture is added.

### References

- `_bmad-output/planning-artifacts/epics.md` - Epic 1 and Story 1.2 acceptance criteria.
- `_bmad-output/planning-artifacts/architecture.md` - testing architecture, project structure, and scope guardrails.
- `_bmad-output/planning-artifacts/prd.md` - testing and delivery constraints.
- `_bmad-output/implementation-artifacts/sprint-status.yaml` - Sprint 1 order and current status.
- `_bmad-output/implementation-artifacts/1-1-initialise-project-structure-and-tooling.md` - previous story output and scaffold context.

## Dev Agent Record

### Agent Model Used

GPT-5.5

### Debug Log References

- `npm install -D vitest @testing-library/react @testing-library/jest-dom @testing-library/user-event jsdom @vitest/coverage-v8` in `frontend/`.
- `npm install -D vitest supertest @types/supertest @vitest/coverage-v8` in `backend/`.
- `npm run frontend:test`
- `npm run backend:test`
- `npm run e2e`
- `npm run frontend:coverage`
- `npm run backend:coverage`
- `npm --prefix frontend run build`
- `npm --prefix backend run build`
- Scope scan for forbidden implementation patterns across source, config, tests, package scripts, and README.

### Completion Notes List

- Story context created from approved PRD, architecture, epics, sprint status, and completed Story 1.1 scaffold.
- Status set to ready-for-dev.
- Added frontend Vitest configuration with `jsdom`, Testing Library setup, V8 coverage scaffolding, and a non-product scaffold test.
- Added backend Vitest configuration with Node environment, Supertest availability, V8 coverage scaffolding, and an isolated test-only `SQLITE_DB_PATH`.
- Kept Playwright at the repo root with `testDir: './tests/e2e'` and added only a harmless tooling smoke test.
- Added simple root scripts that delegate to package-local test and coverage commands.
- Updated README with Story 1.2 test commands only, including the note that coverage target achievement belongs to later stories.
- No Todo CRUD tests, health endpoint tests, SQLite schema/persistence logic, Todo UI tests, Docker runtime work, or out-of-scope architecture were added.

### Change Log

- 2026-04-27: Implemented Story 1.2 baseline automated test infrastructure and moved story to review.

### File List

- `_bmad-output/implementation-artifacts/1-2-configure-baseline-automated-test-infrastructure.md`
- `_bmad-output/implementation-artifacts/sprint-status.yaml`
- `package.json`
- `README.md`
- `frontend/package.json`
- `frontend/package-lock.json`
- `frontend/vitest.config.ts`
- `frontend/src/test/setup.ts`
- `frontend/src/test/scaffold.test.ts`
- `backend/package.json`
- `backend/package-lock.json`
- `backend/vitest.config.ts`
- `backend/src/test/setup.ts`
- `backend/src/test/scaffold.test.ts`
- `tests/e2e/scaffold.spec.ts`
