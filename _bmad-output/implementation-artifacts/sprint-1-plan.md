# Sprint 1 Plan - Full-Stack Todo App

**Date:** 2026-04-27
**Status:** Planned
**Readiness Gate:** PASS - `_bmad-output/planning-artifacts/implementation-readiness-report-2026-04-27.md`

## Sprint Goal

Establish the project foundation for implementation: scaffold the frontend, backend, and E2E test structure; configure baseline automated testing; prove the backend can run through a health endpoint; and add the SQLite persistence foundation.

Sprint 1 is intentionally limited to Epic 1. It should not attempt to implement the full Todo CRUD API, product UI, Docker runtime completion, full E2E journeys, accessibility audit, QA/security review, README finalisation, or AI integration evidence beyond any placeholders needed by setup.

## Sprint Scope

### Story 1.1: Initialise Project Structure And Tooling

**Implementation order:** 1
**Dependencies:** None
**Why first:** This story creates the repository structure, frontend scaffold, backend project, E2E area, scripts or documented commands, and environment variable placeholders required by all later work.

### Story 1.2: Configure Baseline Automated Test Infrastructure

**Implementation order:** 2
**Dependencies:** Story 1.1
**Why second:** Test and coverage setup depends on the frontend/backend package boundaries and gives later stories a working quality baseline.

### Story 1.3: Create Backend App Skeleton And Health Endpoint

**Implementation order:** 3
**Dependencies:** Story 1.1, Story 1.2
**Why third:** The backend skeleton and `GET /health` endpoint prove the backend can run and that integration tests can hit the Express app contract.

### Story 1.4: Create SQLite Persistence Foundation

**Implementation order:** 4
**Dependencies:** Story 1.1, Story 1.2, Story 1.3
**Why fourth:** SQLite schema initialisation should land after the backend skeleton and test harness are available, so the persistence foundation is verified with an automated check.

## Out Of Scope For Sprint 1

- Todo CRUD API endpoints beyond the persistence foundation.
- Frontend Todo UI beyond the initial scaffold.
- Full Playwright user journeys.
- Dockerfile and Docker Compose runtime completion.
- Accessibility review and fixes.
- QA/security review documentation.
- Final README and AI integration log.
- Authentication, multi-user support, edit todo text, search, filtering, sorting, analytics, or any speculative architecture.

## Sprint Tracking

Sprint tracking is recorded in `_bmad-output/implementation-artifacts/sprint-status.yaml`.

Current best first story to create and implement:

`Story 1.1: Initialise Project Structure And Tooling`

## Completion Signal

Sprint 1 is complete when all four Epic 1 stories reach `done` in `sprint-status.yaml`, with each story passing through story creation, development, review, and completion.
