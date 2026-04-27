# Sprint 2 Plan - Full-Stack Todo App

**Date:** 2026-04-27
**Status:** Planned
**Readiness Gate:** PASS - `_bmad-output/planning-artifacts/implementation-readiness-report-2026-04-27.md`

## Sprint Goal

Deliver the backend Todo API and persistence behaviour needed for the core Todo workflow: create todos, list todos, complete todos, delete todos, and return predictable safe errors.

Sprint 2 is intentionally limited to Epic 2 backend work. It should not include frontend Todo UI, Playwright user journeys, Docker runtime completion, accessibility audit, QA/security documentation, README finalisation, AI integration log work, or later-epic test evidence beyond the backend integration tests required by these API stories.

## Sprint Scope

### Story 2.1: Implement Todo Creation API

**Implementation order:** 1
**Dependencies:** Stories 1.1, 1.2, 1.3, and 1.4
**Why first:** Creation establishes the initial `POST /api/todos` route, validates text input, persists a Todo row, returns the API Todo shape, and creates the first reusable backend API patterns for later Epic 2 stories.

### Story 2.2: Implement Todo List Retrieval API

**Implementation order:** 2
**Dependencies:** Story 2.1
**Why second:** Retrieval should follow creation so tests can prove created todos are read back through `GET /api/todos`, with the agreed JSON shape, ISO `createdAt`, boolean `completed`, and ascending `createdAt` ordering.

### Story 2.3: Implement Todo Completion API

**Implementation order:** 3
**Dependencies:** Stories 2.1 and 2.2
**Why third:** Completion depends on existing todos and list retrieval so integration tests can prove `PATCH /api/todos/:id` persists only the `completed` field and can be read back through `GET /api/todos`.

### Story 2.4: Implement Todo Deletion API

**Implementation order:** 4
**Dependencies:** Stories 2.1 and 2.2
**Why fourth:** Deletion depends on create and list behaviour so tests can prove `DELETE /api/todos/:id` removes persisted rows and later list responses no longer include deleted todos.

### Story 2.5: Standardise Backend Error Handling

**Implementation order:** 5
**Dependencies:** Stories 2.1, 2.3, and 2.4
**Why fifth:** Error handling should be standardised after the main success and failure paths exist, while still remaining part of Epic 2 rather than being deferred to later cleanup.

## Implementation Notes

- Build on the existing Express app, health route, SQLite schema, backend Vitest setup, and isolated backend test database path from Epic 1.
- Keep backend integration tests focused on the Express app/API contract rather than direct persistence helper calls.
- Keep `PATCH /api/todos/:id` limited to `{ "completed": true }` or `{ "completed": false }`; editing todo text remains out of scope.
- Use ascending `createdAt` ordering for list responses unless a later approved requirement changes this.
- Return `createdAt` as an ISO 8601 string in API responses.
- Use isolated backend test database paths so development data is not contaminated.
- Keep the backend small: route modules, validation, SQLite persistence, and safe error handling only where needed.

## Out Of Scope For Sprint 2

- Epic 3 frontend API client, Todo UI, empty/loading/error UI states, and responsive UI work.
- Epic 4 full automated test coverage work, Playwright user journeys, and coverage evidence beyond backend checks required by Epic 2 stories.
- Epic 5 Dockerfiles, Docker Compose runtime completion, accessibility review, QA/security documentation, README finalisation, and AI integration log.
- Authentication, multi-user support, edit todo text, priorities, deadlines, notifications, tags, categories, analytics, search, filtering, sorting, bulk actions, admin features, AI product features, GraphQL, microservices, real-time sync, background jobs, caching layers, shared packages, or enterprise-scale architecture.

## Sprint Tracking

Sprint tracking is recorded in `_bmad-output/implementation-artifacts/sprint-status.yaml`.

Best first story to create and implement:

`Story 2.1: Implement Todo Creation API`

## Completion Signal

Sprint 2 is complete when all five Epic 2 stories reach `done` in `sprint-status.yaml`, with each story passing through story creation, development, review, and completion.
