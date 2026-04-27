---
stepsCompleted:
  - 1
  - 2
  - 3
  - 4
  - 5
  - 6
  - 7
  - 8
inputDocuments:
  - "_bmad-output/planning-artifacts/prd.md"
  - "_bmad-output/planning-artifacts/product-brief-full-stack-todo-app.md"
  - "docs/input/todo-app-prd.md"
  - "docs/input/assignment-requirements.md"
workflowType: "architecture"
project_name: "Full-Stack Todo App"
user_name: "Masoudrousta"
date: "2026-04-27"
lastStep: 8
status: "complete"
completedAt: "2026-04-27"
---

# Architecture Decision Document

_This document builds collaboratively through step-by-step discovery. Sections are appended as we work through each architectural decision together._

## Project Context Analysis

### Requirements Overview

**Functional Requirements:**

The application is a small single-user full-stack Todo app. The core functional surface is limited to:

- Creating todos with a short text description.
- Viewing the current todo list.
- Completing todos.
- Deleting todos.
- Persisting todos through a backend API across refreshes and sessions.
- Showing completed todos as visually distinct from active todos.
- Providing clear empty, loading, and error states.
- Exposing a small REST JSON API plus a health endpoint.
- Supporting automated unit, integration, and E2E tests.
- Running through Docker Compose with separate frontend and backend containers.

Architecturally, this points to a straightforward frontend/backend split with a small API boundary, a single persisted Todo model, and no need for distributed system patterns.

**Non-Functional Requirements:**

The architecture must prioritise:

- Simplicity and clarity.
- Reliable SQLite-backed persistence.
- Responsive UI behaviour under normal local and test conditions.
- Accessibility-conscious UI structure and zero critical WCAG violations.
- Safe validation and error handling.
- Maintainable separation between frontend and backend responsibilities.
- Testability across unit, component, API integration, and E2E levels.
- Local deployability through Docker Compose.
- Clear logging, health checks, README documentation, QA evidence, and AI integration log support.

**Scale & Complexity:**

- Primary domain: Full-stack web application.
- Complexity level: Low product complexity, medium delivery discipline.
- Estimated architectural components: Frontend app, backend API, SQLite database, test suites, Docker Compose environment, documentation/QA artefacts.

### Technical Constraints & Dependencies

The architecture will use the agreed stack:

- React, TypeScript, and Vite for the frontend.
- Node.js, TypeScript, and Express for the backend.
- SQLite for persistence.
- REST over JSON for API communication.
- Vitest for unit and component tests.
- Playwright for E2E tests.
- Dockerfiles for frontend and backend with Docker Compose orchestration.

The architecture must not introduce authentication, multi-user support, collaboration, edit functionality, priorities, deadlines, notifications, tags, categories, analytics, search, filtering, sorting, GraphQL, microservices, event-driven architecture, real-time sync, background jobs, caching layers, or enterprise-scale patterns.

### Cross-Cutting Concerns Identified

- Validation: Todo creation and mutation inputs need consistent backend validation and clear frontend error handling.
- Persistence: SQLite must provide durable todo storage across browser refreshes and user sessions.
- Error handling: API errors and frontend request failures must produce understandable user-facing states.
- Accessibility: UI controls, labels, focus behaviour, semantic structure, and state messaging need to support accessibility checks.
- Testing: Architecture must make unit, component, backend integration, and Playwright E2E tests straightforward.
- Docker readiness: Frontend, backend, health checks, environment variables, logs, and persistence need to work under Docker Compose.
- Documentation evidence: README, QA/security review notes, and AI integration log need to be supported by the project structure.

## Starter Template Evaluation

### Primary Technology Domain

The project is a small full-stack web application with:

- A React/Vite frontend.
- A Node/Express backend.
- SQLite persistence.
- REST JSON API communication.
- Vitest and Playwright test coverage.
- Docker Compose orchestration.

### Starter Options Considered

**Vite React TypeScript starter**

Use the official Vite React TypeScript template for the frontend. It provides a minimal, current, TypeScript-ready React foundation without adding routing, server-side rendering, authentication, analytics, or platform framework assumptions.

**Manual Express TypeScript backend setup**

Use a minimal manual Express + TypeScript setup for the backend rather than a large backend generator. This keeps the backend small and explicit: app bootstrap, routes, validation, error handling, SQLite persistence, and tests.

**Playwright project setup**

Use Playwright's current setup command to add E2E testing. Playwright should cover the required user journeys: create todo, complete todo, delete todo, empty state, and error handling.

### Selected Starter Approach

Use small, explicit foundations:

- Frontend scaffolded with Vite React TypeScript.
- Backend created as a simple TypeScript Express app.
- Tests added deliberately with Vitest and Playwright.
- Docker support added as part of the project structure, not imported from a broad starter.

**Rationale for Selection:**

This approach keeps the architecture aligned with the PRD: simple, maintainable, testable, Docker-friendly, and free from extra product or platform scope. It avoids hidden framework decisions that could introduce authentication, routing complexity, server-side rendering, analytics, deployment coupling, or enterprise patterns.

### Initialization Commands

Frontend:

```bash
npm create vite@latest frontend -- --template react-ts
```

Backend:

```bash
mkdir backend
cd backend
npm init -y
npm install express better-sqlite3
npm install -D typescript tsx vitest supertest @types/node @types/express @types/supertest
```

E2E:

```bash
npm init playwright@latest
```

### Architectural Decisions Provided By Starter Choice

**Language & Runtime:**

- TypeScript across frontend and backend.
- Node.js runtime for backend.
- Browser-based React frontend.

**Build Tooling:**

- Vite handles frontend development and production build.
- TypeScript compiler or `tsx` supports backend development and build scripts.

**Testing Framework:**

- Vitest for frontend unit/component tests and backend unit tests.
- Supertest-style backend integration tests for API endpoints.
- Playwright for E2E user journeys.

**Code Organisation:**

- Separate `frontend/` and `backend/` folders.
- Shared concepts documented through API contracts rather than a shared package.
- Docker Compose orchestrates the runtime boundary between frontend and backend.

**Development Experience:**

- Frontend and backend can run independently during development.
- Docker Compose provides the assignment-ready local deployment path.
- The structure remains easy to explain in README, QA notes, and architecture documentation.

**Note:** Project initialisation using these commands should be the first implementation story.

## Core Architectural Decisions

### Decision Priority Analysis

**Critical Decisions (Block Implementation):**

- Use a separate frontend and backend repository structure.
- Use React, TypeScript, and Vite for the frontend.
- Use Node.js, TypeScript, and Express for the backend.
- Use SQLite for durable local persistence.
- Use REST over JSON for API communication.
- Use Vitest for unit/component tests and backend unit tests.
- Use backend integration tests for all API endpoints.
- Use Playwright for E2E tests.
- Use Dockerfiles plus Docker Compose for local deployment.

**Important Decisions (Shape Architecture):**

- Use minimal React state and effects rather than a global state library.
- Use a single-screen frontend without a router unless implementation later proves it necessary.
- Keep backend layers light: app bootstrap, routes, validation, persistence, error handling, and health endpoint.
- Document API contracts directly rather than introducing a shared package.
- Use practical request/application logging only.
- Keep environment configuration explicit and small.

**Deferred Decisions (Post-MVP):**

No deferred feature decisions are planned for this MVP. Authentication, multi-user support, edit functionality, search, filtering, sorting, GraphQL, microservices, real-time sync, background jobs, caching layers, and enterprise patterns remain out of scope.

### Data Architecture

**Decision:** Use SQLite as the persistence store.

**Rationale:** SQLite provides durable local storage with minimal operational overhead. It fits the assignment's persistence requirement without introducing database infrastructure that would distract from the core product.

**Todo model:**

- `id`
- `text`
- `completed`
- `createdAt`

**Mutation rules:**

- Create requires non-empty trimmed `text`.
- Complete updates `completed`.
- Delete removes the todo.
- Editing todo text is out of scope.

**Persistence layer:**

The backend should keep persistence in a small dedicated module responsible for database initialisation and todo queries. Avoid repository patterns, DTO mapper layers, or unnecessary abstractions unless implementation reveals a concrete need.

### Authentication & Security

**Decision:** No authentication or authorisation.

**Rationale:** The PRD defines a single-user Todo application and explicitly excludes authentication and multi-user support.

**Security approach:**

- Validate input on the backend.
- Trim and reject empty todo descriptions.
- Return safe error responses.
- Do not leak stack traces in normal API responses.
- Keep dependencies and middleware minimal.
- Avoid unnecessary exposed routes or admin surfaces.

### API & Communication Patterns

**Decision:** Use REST over JSON.

**API contract:**

- `GET /health`
- `GET /api/todos`
- `POST /api/todos`
- `PATCH /api/todos/:id`
- `DELETE /api/todos/:id`

**Error handling:**

- Validation errors should return appropriate 4xx responses.
- Missing todos should return an appropriate not-found response.
- Unexpected failures should return a safe 5xx response without internal implementation details.
- Frontend error states should consume these failures and show understandable messages.

### Frontend Architecture

**Decision:** Use a simple single-screen React application.

**Structure:**

- Add todo form.
- Todo list.
- Todo item component.
- Empty state.
- Loading state.
- Error state.
- Small API client module.

**State management:**

Use React state and effects for todos, loading, and error state. Do not add Redux, Zustand, TanStack Query, or another global state/data library unless a concrete implementation need appears.

**Routing:**

No router for MVP. The app has one primary screen.

**Accessibility:**

- Use semantic HTML.
- Provide labelled controls.
- Keep interactions keyboard-friendly.
- Preserve visible focus states.
- Make status and error messages understandable.

### Infrastructure & Deployment

**Decision:** Use Docker Compose with separate frontend and backend containers.

**Docker approach:**

- `frontend/Dockerfile`
- `backend/Dockerfile`
- root `docker-compose.yml`
- backend SQLite data persisted with a volume if needed
- backend health endpoint used for container health checks

**Environment configuration:**

Keep environment variables small and explicit, such as API base URL, backend port, frontend port, and SQLite database path.

**Logging:**

Use practical request and application logging only. No heavy observability stack.

### Testing Architecture

**Decision:** Split tests by level and purpose.

**Frontend:**

- Vitest unit/component tests for key UI behaviours and state rendering.

**Backend:**

- Integration tests for all API endpoints.
- Cover validation, success paths, not-found cases, and safe error behaviour where practical.

**E2E:**

- Playwright tests from the user perspective.
- Cover create, complete, delete, empty state, and error handling.

### Decision Impact Analysis

**Implementation Sequence:**

1. Initialise frontend, backend, and E2E test structure.
2. Implement backend health endpoint, SQLite setup, todo model, validation, routes, and error handling.
3. Implement frontend API client, main screen, add form, list, item, empty/loading/error states.
4. Add unit/component, backend integration, and Playwright E2E tests.
5. Add Dockerfiles, Docker Compose, health checks, environment configuration, and README instructions.
6. Add QA, accessibility, security review, and AI integration documentation.

**Cross-Component Dependencies:**

- Frontend behaviour depends on the REST API contract.
- E2E tests depend on both frontend and backend running together.
- Docker Compose must preserve backend access to SQLite data.
- Accessibility and error-state requirements affect component design and test coverage.
- README and QA documentation must reflect actual commands, Docker behaviour, and test coverage.

## Implementation Patterns & Consistency Rules

### Pattern Categories Defined

Critical conflict points for implementation agents:

- Naming: database fields, API fields, files, components, functions.
- Structure: frontend/backend/test locations.
- Formats: API responses, errors, dates, JSON fields.
- Process: validation, loading states, error handling, logging, tests.

### Naming Patterns

**Database Naming Conventions:**

- Use one table: `todos`.
- Use camelCase in application code: `createdAt`.
- SQLite column names should match API/application fields where practical: `id`, `text`, `completed`, `createdAt`.
- Use `id` as the route and model identifier.

**API Naming Conventions:**

- Use plural REST resource paths: `/api/todos`.
- Use `:id` for route parameters: `/api/todos/:id`.
- Use camelCase JSON fields.
- Use ISO strings for `createdAt`.

**Code Naming Conventions:**

- React components use PascalCase: `AddTodoForm`, `TodoList`, `TodoItem`.
- Functions and variables use camelCase: `loadTodos`, `createTodo`, `isLoading`.
- Test files should use clear names such as `TodoItem.test.tsx` or `todos.integration.test.ts`.

### Structure Patterns

**Project Organisation:**

- `frontend/` contains the Vite React app.
- `backend/` contains the Express API and SQLite persistence.
- `tests/` at repo root contains Playwright E2E tests, unless Playwright setup chooses a clearly documented equivalent.
- `docs/` is only for generated artefacts or supporting documentation if needed.

**Frontend Structure:**

- One main screen only.
- No router for MVP.
- Local React state and effects for todo loading and mutations.
- A small API client module owns backend calls.
- Suggested components:
  - `App` or main screen container
  - `AddTodoForm`
  - `TodoList`
  - `TodoItem`
  - `EmptyState`
  - `LoadingState`
  - `ErrorMessage`

**Backend Structure:**

- App/server bootstrap.
- Route definitions.
- Request validation.
- SQLite persistence module.
- Error handling middleware.
- Health endpoint.
- No repository pattern, service explosion, DTO mapper layer, ORM, shared package, or enterprise layering unless a concrete need appears.

### Format Patterns

**API Response Formats:**

- Success responses should be direct and simple.
- List endpoint returns an array of todos.
- Create/update endpoints return the affected todo where useful.
- Delete endpoint may return a simple success response or appropriate empty response, as long as tests and docs are consistent.

**Error Formats:**

Use a consistent JSON shape for client-visible errors, for example:

```json
{
  "error": {
    "message": "Todo text is required"
  }
}
```

- Validation errors return clear 4xx responses.
- Not-found errors return a clear 404 response.
- Unexpected errors return safe 5xx responses without stack traces.

**Data Exchange Formats:**

- Todo JSON shape: `id`, `text`, `completed`, `createdAt`.
- `completed` is a boolean in API responses.
- `createdAt` is an ISO date string in API responses.

### Communication Patterns

**State Management Patterns:**

- Keep todo data, loading state, and error state local to the main screen/container.
- Use immutable state updates.
- Reload or update local state after successful create, complete, and delete operations.
- Do not add global state libraries unless a real need appears.

**API Client Pattern:**

- Frontend API calls go through one small API client module.
- Components should not duplicate `fetch` logic.
- API client should convert failed responses into predictable errors for UI handling.

### Process Patterns

**Validation Patterns:**

- Trim todo text on create.
- Reject empty text.
- Reject invalid mutation payloads.
- Keep validation in the backend, with optional frontend checks only for user experience.
- Backend validation remains the source of truth.

**Error Handling Patterns:**

- Backend routes pass unexpected failures to central error middleware.
- Normal API responses must not expose stack traces.
- Frontend shows understandable error messages for failed load or mutation requests.
- Error handling must preserve the main UI rather than breaking the whole screen.

**Loading State Patterns:**

- Show loading state during initial todo load.
- Use local pending state for create, complete, and delete where needed.
- Avoid global loading systems.

**Logging Patterns:**

- Use practical console/request logging only.
- Log enough to diagnose local Docker/API issues.
- Do not add a heavy observability stack.

### Testing Patterns

- Frontend unit/component tests use Vitest.
- Backend integration tests cover every API endpoint.
- Playwright E2E tests cover create, complete, delete, empty state, and error handling.
- Keep tests close to the code they validate where practical.
- E2E tests remain user-focused and should not depend on implementation internals.

### Accessibility Patterns

- Use semantic HTML.
- Label form controls.
- Keep interactions keyboard-friendly.
- Preserve visible focus states.
- Make status and error messages understandable.
- Ensure completed todos are visually distinct without relying only on colour.

### Enforcement Guidelines

All implementation work must:

- Follow the documented API contract and Todo model.
- Preserve the single-screen MVP scope.
- Keep frontend and backend responsibilities separate.
- Prefer the smallest clear structure that supports testability and maintainability.
- Avoid router-based multi-page flows, shared packages, global state libraries, ORMs, GraphQL, microservices, background workers, caching layers, and speculative future infrastructure.

## Project Structure & Boundaries

### Complete Project Directory Structure

```text
/
├── .gitignore
├── README.md
├── docker-compose.yml
├── frontend/
│   ├── Dockerfile
│   ├── package.json
│   ├── tsconfig.json
│   ├── vite.config.ts
│   ├── index.html
│   └── src/
│       ├── main.tsx
│       ├── App.tsx
│       ├── api/
│       │   └── todosApi.ts
│       ├── components/
│       │   ├── AddTodoForm.tsx
│       │   ├── TodoList.tsx
│       │   ├── TodoItem.tsx
│       │   ├── EmptyState.tsx
│       │   ├── LoadingState.tsx
│       │   └── ErrorMessage.tsx
│       └── types/
│           └── todo.ts
├── backend/
│   ├── Dockerfile
│   ├── package.json
│   ├── tsconfig.json
│   └── src/
│       ├── server.ts
│       ├── app.ts
│       ├── routes/
│       │   ├── health.ts
│       │   └── todos.ts
│       ├── db/
│       │   ├── sqlite.ts
│       │   └── todosPersistence.ts
│       ├── middleware/
│       │   └── errorHandler.ts
│       ├── validation/
│       │   └── todoValidation.ts
│       └── types/
│           └── todo.ts
└── tests/
    └── e2e/
        ├── todo-crud.spec.ts
        ├── empty-state.spec.ts
        └── error-state.spec.ts
```

`docs/` should only be created if supporting documentation outside BMAD output is genuinely needed. BMAD artefacts remain in `_bmad-output/`.

### Architectural Boundaries

**API Boundaries:**

The backend exposes a small REST JSON API:

- `GET /health`
- `GET /api/todos`
- `POST /api/todos`
- `PATCH /api/todos/:id`
- `DELETE /api/todos/:id`

The frontend communicates with the backend only through `frontend/src/api/todosApi.ts`.

**Component Boundaries:**

- `App.tsx` owns screen-level state: todos, loading, error, and mutation state.
- `AddTodoForm` owns todo creation input.
- `TodoList` renders collections.
- `TodoItem` renders one todo and exposes complete/delete actions.
- `EmptyState`, `LoadingState`, and `ErrorMessage` render state-specific UI.
- Components should not perform raw API calls directly.

**Backend Boundaries:**

- `server.ts` starts the HTTP server.
- `app.ts` configures the Express app and middleware.
- `routes/` owns HTTP endpoints.
- `validation/` owns request validation.
- `db/` owns SQLite initialisation and todo persistence.
- `middleware/errorHandler.ts` owns safe error responses.

**Data Boundaries:**

- SQLite is accessed through the backend persistence module only.
- The frontend never accesses persistence directly.
- Todo data crosses the API boundary as JSON with `id`, `text`, `completed`, and `createdAt`.

### Requirements To Structure Mapping

**Todo Creation:**

- Frontend: `AddTodoForm.tsx`, `todosApi.ts`
- Backend: `routes/todos.ts`, `validation/todoValidation.ts`, `db/todosPersistence.ts`
- Tests: frontend component tests, backend integration tests, Playwright CRUD test

**Todo Viewing:**

- Frontend: `App.tsx`, `TodoList.tsx`, `TodoItem.tsx`, `todosApi.ts`
- Backend: `routes/todos.ts`, `db/todosPersistence.ts`
- Tests: backend `GET /api/todos` integration test, Playwright load/list coverage

**Todo Completion:**

- Frontend: `TodoItem.tsx`, `todosApi.ts`
- Backend: `routes/todos.ts`, `validation/todoValidation.ts`, `db/todosPersistence.ts`
- Tests: backend `PATCH /api/todos/:id` integration test, Playwright complete coverage

**Todo Deletion:**

- Frontend: `TodoItem.tsx`, `todosApi.ts`
- Backend: `routes/todos.ts`, `db/todosPersistence.ts`
- Tests: backend `DELETE /api/todos/:id` integration test, Playwright delete coverage

**Empty, Loading, And Error States:**

- Frontend: `EmptyState.tsx`, `LoadingState.tsx`, `ErrorMessage.tsx`, `App.tsx`
- Tests: component tests and Playwright empty/error state coverage

**Health Checks And Docker:**

- Backend: `routes/health.ts`
- Docker: `backend/Dockerfile`, `frontend/Dockerfile`, `docker-compose.yml`
- Tests/checks: health endpoint integration test and Docker health check configuration

### Integration Points

**Internal Communication:**

- React components communicate through props and local state.
- `App.tsx` coordinates calls to `todosApi.ts`.
- Backend routes call validation and persistence modules directly.

**External Integrations:**

- None for MVP.
- No authentication provider, analytics service, notification provider, search service, or third-party API.

**Data Flow:**

1. User interacts with React UI.
2. `App.tsx` calls `todosApi.ts`.
3. `todosApi.ts` calls Express REST endpoint.
4. Express route validates request.
5. Route calls SQLite persistence module.
6. Backend returns JSON response.
7. Frontend updates local state and renders the result.

### File Organisation Patterns

**Configuration Files:**

- Frontend config stays under `frontend/`.
- Backend config stays under `backend/`.
- Docker Compose stays at repo root.
- Environment examples should be documented clearly, with small explicit variables only.

**Source Organisation:**

- Source code stays in `frontend/src` and `backend/src`.
- No shared package.
- Duplicate small TypeScript types if needed rather than adding package complexity.

**Test Organisation:**

- Frontend unit/component tests should live close to frontend source files where practical.
- Backend integration tests should live under a clear backend test pattern, either `backend/tests/` or alongside backend source files.
- Playwright E2E tests live under `tests/e2e/` at repo root.

**Asset Organisation:**

- Static frontend assets should stay within the Vite frontend structure.
- No asset pipeline beyond what Vite provides.

### Development Workflow Integration

**Development Server Structure:**

- Frontend dev server runs from `frontend/`.
- Backend dev server runs from `backend/`.
- Frontend API base URL points to the backend.

**Build Process Structure:**

- Frontend builds to a static production bundle.
- Backend builds TypeScript to runnable JavaScript or runs through the selected Node TypeScript runtime in development.
- Tests are run per layer: frontend, backend, E2E.

**Deployment Structure:**

- `frontend/Dockerfile` builds and serves the frontend.
- `backend/Dockerfile` builds and runs the Express API.
- `docker-compose.yml` starts both services.
- Backend SQLite data is persisted through a Docker volume if needed.
- Backend health endpoint supports container health checks.

## Architecture Validation Results

### Coherence Validation

**Decision Compatibility:**

The selected stack is internally consistent:

- React + TypeScript + Vite supports the single-screen frontend.
- Node.js + TypeScript + Express supports a small REST API.
- SQLite supports durable local persistence without infrastructure complexity.
- Vitest, backend integration tests, and Playwright cover the required testing layers.
- Dockerfiles and Docker Compose support the assignment deployment requirement.

No selected decision requires authentication, multi-user support, routing, global state, GraphQL, microservices, background workers, caching, or enterprise infrastructure.

**Pattern Consistency:**

Implementation patterns support the architecture:

- Simple React state and effects match the single-screen UI.
- API client module keeps frontend/backend boundaries clear.
- Backend routes, validation, persistence, and error middleware are enough for CRUD without over-layering.
- Error, loading, validation, and accessibility patterns are explicit.
- Test locations and responsibilities are clear.

**Structure Alignment:**

The project structure supports the required architecture:

- `frontend/` and `backend/` keep responsibilities separate.
- `tests/e2e/` supports Playwright user-journey tests.
- Root `docker-compose.yml` supports local deployment.
- Backend `routes/`, `validation/`, `db/`, and `middleware/` cover API, validation, persistence, and error handling.
- Frontend `components/`, `api/`, and `types/` cover the UI and API boundary cleanly.

### Requirements Coverage Validation

**MVP Coverage:**

The architecture supports the full MVP scope:

- Create, view, complete, and delete todos.
- Backend API persistence across refreshes and sessions.
- Clear empty, loading, and error states.
- Responsive single-screen UI.
- Visually distinct completed todos.
- Backend validation and safe error handling.
- SQLite persistence.
- Docker Compose deployment.
- README, QA/security review, and AI integration documentation.

**Testing Coverage:**

The architecture supports:

- Frontend unit/component tests with Vitest.
- Backend integration tests for every API endpoint.
- Playwright E2E tests for create, complete, delete, empty state, and error handling.
- Coverage reporting toward the 70 percent meaningful coverage requirement.

**Delivery Coverage:**

The architecture supports assignment deliverables:

- Architecture documentation.
- API contracts.
- Component structure.
- Unit, integration, and E2E test scenarios.
- Dockerfiles and Docker Compose.
- Health checks.
- Accessibility checks.
- Security and QA review evidence.
- README and AI integration log.

### Explicit Scope Check

The architecture does not introduce implementation scope for:

- Authentication
- Multi-user support
- Collaboration
- Edit functionality
- Priorities
- Deadlines
- Notifications
- Tags
- Categories
- Analytics
- Search
- Filtering
- Sorting
- Router-based multi-page flows
- Global state libraries
- ORMs
- GraphQL
- Microservices
- Event-driven architecture
- Real-time sync
- Background jobs
- Caching layers
- Shared packages
- Enterprise-scale patterns

Any mentions of these items are guardrails stating they are out of scope.

### Gap Analysis Results

**Critical Gaps:** None.

**Important Gaps:** None blocking architecture or implementation.

**Minor Notes:**

- The exact backend test folder convention can be finalised during project initialisation, as long as it remains clearly documented.
- The exact Docker volume name and SQLite file path can be finalised during implementation, as long as persistence across sessions is preserved.

### Architecture Completeness Checklist

**Requirements Analysis**

- [x] PRD used as the primary source of truth.
- [x] Assignment constraints captured as delivery and acceptance constraints.
- [x] MVP scope fully supported.
- [x] Out-of-scope product features excluded.

**Architectural Decisions**

- [x] Frontend stack selected.
- [x] Backend stack selected.
- [x] Persistence approach selected.
- [x] API style selected.
- [x] Testing approach selected.
- [x] Docker Compose approach selected.

**Implementation Patterns**

- [x] Naming conventions established.
- [x] Structure patterns defined.
- [x] API and error formats specified.
- [x] Loading, error, validation, accessibility, logging, and testing patterns documented.

**Project Structure**

- [x] Complete directory structure defined.
- [x] Frontend/backend boundary clear.
- [x] API/persistence boundary clear.
- [x] Test locations clear.
- [x] Docker locations clear.

### Architecture Readiness Assessment

**Overall Status:** Ready for implementation.

**Confidence Level:** High.

**Key Strengths:**

- Small, clear architecture aligned to the PRD.
- Strong assignment coverage without product scope creep.
- Clear API and data model.
- Testable frontend/backend separation.
- Docker Compose deployment path.
- Accessibility, QA, and security review work supported from the architecture.

**Areas For Future Enhancement:**

None for this MVP. Future extension should be limited to clean boundaries, not extra implementation layers.

### Implementation Handoff

Implementation agents should:

- Follow the documented API contract and Todo model.
- Keep the app single-screen and single-user.
- Keep frontend state local unless a concrete need appears.
- Keep backend layers light.
- Preserve SQLite-backed persistence.
- Add tests at frontend, backend integration, and E2E levels.
- Keep Docker, README, QA/security review, accessibility evidence, and AI integration log aligned with the assignment.

**First Implementation Priority:**

Initialise the frontend, backend, and Playwright project structure using the selected starter approach, then implement the backend health endpoint and Todo API contract.
