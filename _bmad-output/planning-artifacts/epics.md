---
stepsCompleted:
  - "step-01-validate-prerequisites"
  - "step-02-design-epics"
  - "step-03-create-stories"
  - "step-04-final-validation"
inputDocuments:
  - "_bmad-output/planning-artifacts/prd.md"
  - "_bmad-output/planning-artifacts/architecture.md"
  - "_bmad-output/planning-artifacts/product-brief-full-stack-todo-app.md"
  - "docs/input/todo-app-prd.md"
  - "docs/input/assignment-requirements.md"
workflowType: "epics-and-stories"
project_name: "Full-Stack Todo App"
---

# Full-Stack Todo App - Epic Breakdown

## Overview

This document provides the complete epic and story breakdown for Full-Stack Todo App, decomposing the requirements from the PRD, supporting product brief, architecture decisions, and assignment constraints into implementable stories.

## Requirements Inventory

### Functional Requirements

FR1: The system must allow the user to create a todo by entering a short text description.

FR2: The system must validate todo creation input and reject empty or invalid descriptions with a clear error response or message.

FR3: The system must store each todo with at least an id, text, completed status, and createdAt metadata.

FR4: The system must allow the user to view the current list of todos.

FR5: The system must retrieve todos from the backend API when the application loads or refreshes.

FR6: The system must allow the user to mark an existing todo as complete.

FR7: The system must persist completion state changes through the backend API.

FR8: The system must allow the user to delete an existing todo.

FR9: The system must persist todo deletion through the backend API.

FR10: The frontend must visually distinguish completed todos from active todos.

FR11: The frontend must provide a clear empty state when no todos exist.

FR12: The frontend must provide a clear loading state while todo data is being loaded or relevant actions are in progress.

FR13: The frontend must provide a clear error state or message when load or mutation requests fail.

FR14: The application must behave responsively across desktop and mobile screen sizes.

FR15: The backend must expose a REST API over JSON for todo operations.

FR16: The backend must expose a health endpoint for operational checks.

FR17: The backend must implement safe error handling and return appropriate HTTP responses for validation errors and unexpected failures.

FR18: The system must persist todo data across browser refreshes and user sessions.

FR19: The solution must include automated unit tests, backend integration tests, and Playwright E2E tests covering the core journeys.

FR20: The solution must be runnable through Docker Compose using frontend and backend containers.

### NonFunctional Requirements

NFR1: The application should feel responsive under normal local and test conditions, with common user actions such as loading todos, creating a todo, completing a todo, and deleting a todo appearing prompt and smooth.

NFR2: The system must persist todo data reliably across browser refreshes and user sessions.

NFR3: The frontend must provide clear, understandable empty, loading, and error states so the interface never feels broken or ambiguous.

NFR4: The user interface must be responsive and usable across common desktop and mobile screen sizes.

NFR5: The user interface must meet accessibility expectations for a small modern web application, including semantic structure, usable labels, keyboard accessibility where relevant, visible focus behaviour, and zero critical WCAG violations in accessibility testing.

NFR6: The backend must validate inputs and handle errors safely, returning appropriate HTTP responses without leaking unnecessary internal details.

NFR7: The solution must avoid common web security issues appropriate to this scope, including unsafe input handling and unnecessary exposure of internal implementation details.

NFR8: The codebase must be easy to understand, maintain, and extend by future developers, with clear separation between frontend and backend responsibilities.

NFR9: The solution must be testable and include automated unit, integration, and E2E coverage for the core user journeys.

NFR10: The solution must achieve at least 70 percent meaningful automated test coverage.

NFR11: The solution must include at least 5 passing Playwright E2E tests covering the required core journeys.

NFR12: The application must be deployable locally through Docker Compose with working frontend and backend containers.

NFR13: The backend should expose a health endpoint suitable for container health checks.

NFR14: The project must include clear setup and usage documentation in a README.

NFR15: The project must include an AI integration log documenting BMAD usage, AI assistance, test generation support, debugging support, MCP usage if applicable, and limitations encountered.

### Additional Requirements

- Use a greenfield structure with separate `frontend/`, `backend/`, and root `tests/e2e/` areas.
- Initialise the frontend with React, TypeScript, and Vite.
- Initialise the backend with Node.js, TypeScript, and Express.
- Use SQLite for durable local persistence.
- Use REST over JSON for API communication.
- Use Vitest for frontend unit/component tests and backend unit tests.
- Use backend integration tests for every API endpoint.
- Use Playwright for E2E tests from the user perspective.
- Use Dockerfiles for frontend and backend plus root Docker Compose orchestration.
- Implement `GET /health`, `GET /api/todos`, `POST /api/todos`, `PATCH /api/todos/:id`, and `DELETE /api/todos/:id`.
- Use a minimal Todo model with `id`, `text`, `completed`, and `createdAt`.
- Keep the frontend single-screen with no router for MVP.
- Use local React state and effects; do not add a global state library.
- Keep backend layers light: app bootstrap, routes, validation, SQLite persistence, error handling middleware, and health endpoint.
- Use one small SQLite persistence module, not an ORM or enterprise repository layer.
- Validate todo creation by trimming text and rejecting empty values.
- Reject invalid mutation payloads with clear 4xx responses.
- Return safe 5xx responses for unexpected failures without leaking stack traces.
- Use clear API error responses suitable for frontend error-state rendering.
- Provide frontend components for add form, todo list, todo item, empty state, loading state, and error message.
- Use semantic HTML, labelled controls, keyboard-friendly interactions, visible focus states, and understandable status/error messages.
- Ensure completed todos are visually distinct without relying only on colour.
- Persist SQLite data through Docker volume configuration if needed.
- Keep environment variables small and explicit, such as API base URL, backend port, frontend port, and SQLite database path.
- Use practical console/request logging only; do not add a heavy observability stack.
- Produce README instructions for setup, development, testing, Docker, and usage.
- Produce QA/security review documentation covering coverage, accessibility, performance review, security review, findings, and remediations.
- Maintain an AI integration log covering BMAD usage, AI assistance, test generation support, debugging support, MCP usage if applicable, limitations, and human judgement.
- Do not add authentication, multi-user support, collaboration, edit todo text, priorities, deadlines, notifications, tags, categories, analytics, search, filtering, sorting, admin features, AI product features, GraphQL, microservices, real-time sync, background jobs, caching layers, shared packages, or enterprise-scale patterns.

### UX Design Requirements

No separate UX design document exists yet. UX requirements are currently captured in the PRD and architecture:

UX-DR1: The frontend must provide a single main screen for the Todo experience.

UX-DR2: The frontend must include a clear add todo form.

UX-DR3: The frontend must render the current todo list clearly.

UX-DR4: The frontend must make completed todos visually distinct from active todos.

UX-DR5: The frontend must show a clear empty state when no todos exist.

UX-DR6: The frontend must show a clear loading state while todo data is loading or relevant actions are in progress.

UX-DR7: The frontend must show a clear error message or state when load or mutation requests fail.

UX-DR8: The UI must behave responsively across common desktop and mobile screen sizes.

UX-DR9: The UI must use semantic structure, labelled controls, keyboard-friendly interactions, visible focus states, and understandable state messaging.

### FR Coverage Map

FR1: Epic 2 and Epic 3 - Create todo through API and UI.

FR2: Epic 2 - Validate todo creation input.

FR3: Epic 1 and Epic 2 - Todo model and SQLite persistence.

FR4: Epic 2 and Epic 3 - View todo list through API and UI.

FR5: Epic 2 and Epic 3 - Load todos from backend on app load/refresh.

FR6: Epic 2 and Epic 3 - Complete todo through API and UI.

FR7: Epic 2 - Persist completion state.

FR8: Epic 2 and Epic 3 - Delete todo through API and UI.

FR9: Epic 2 - Persist deletion.

FR10: Epic 3 - Visually distinguish completed todos.

FR11: Epic 3 - Empty state.

FR12: Epic 3 - Loading state.

FR13: Epic 3 - Error state.

FR14: Epic 3 - Responsive behaviour.

FR15: Epic 1 and Epic 2 - REST JSON API.

FR16: Epic 1 - Health endpoint.

FR17: Epic 2 - Safe backend error handling.

FR18: Epic 1 and Epic 2 - Persistence across refreshes and sessions.

FR19: Epic 4 - Unit, integration, and E2E tests.

FR20: Epic 5 - Docker Compose runtime.

## Epic List

### Epic 1: Project Foundation And Runtime Skeleton

Establish the greenfield project structure, frontend/backend scaffolds, baseline test infrastructure, health endpoint, and SQLite persistence foundation so the app has a clear, runnable technical base.

**FRs covered:** FR3, FR15, FR16, FR18, FR20

### Epic 2: Backend Todo API And Persistence

Deliver the complete REST API for creating, viewing, completing, and deleting todos, with validation, SQLite persistence, and safe error handling.

**FRs covered:** FR1, FR2, FR3, FR4, FR5, FR6, FR7, FR8, FR9, FR15, FR17, FR18

### Epic 3: Single-Screen Todo User Interface

Deliver the React single-screen Todo UI that lets the user complete the core todo workflow with clear visual states and accessibility-conscious interactions.

**FRs covered:** FR1, FR4, FR5, FR6, FR8, FR10, FR11, FR12, FR13, FR14

### Epic 4: Automated Test Coverage And E2E Confidence

Add the required automated test coverage across frontend components, backend API integration, and Playwright user journeys.

**FRs covered:** FR19

### Epic 5: Dockerised Delivery, Accessibility, QA, Security, And Documentation

Package the app for Docker Compose delivery and produce the required submission evidence: README, AI integration log, accessibility review, QA/security review, and supporting documentation.

**FRs covered:** FR20

## Epic 1: Project Foundation And Runtime Skeleton

Establish the greenfield project structure, frontend/backend scaffolds, baseline test infrastructure, health endpoint, and SQLite persistence foundation so later stories can build safely.

### Story 1.1: Initialise Project Structure And Tooling

As a developer,
I want the frontend, backend, and E2E test project structure initialised,
So that implementation can proceed from a clear, testable foundation.

**Acceptance Criteria:**

**Given** the repository is empty or contains only planning artefacts  
**When** the project structure is initialised  
**Then** the repository contains `frontend/`, `backend/`, `tests/e2e/`, `.gitignore`, `README.md`, and `docker-compose.yml` placeholders where appropriate  
**And** the frontend is scaffolded with React, TypeScript, and Vite  
**And** the backend is initialised with Node.js, TypeScript, and Express dependencies  
**And** Playwright is configured at repo root or in a clearly documented equivalent location  
**And** clear root-level scripts or documented commands exist for starting the frontend, backend, and E2E tooling  
**And** basic environment variable placeholders are defined for frontend API base URL, backend port, and SQLite database path  
**And** no router, global state library, ORM, shared package, GraphQL, microservice tooling, or speculative infrastructure is added

### Story 1.2: Configure Baseline Automated Test Infrastructure

As a developer,
I want baseline frontend, backend, and E2E test commands configured,
So that QA is present from day one.

**Acceptance Criteria:**

**Given** the frontend and backend projects exist  
**When** test infrastructure is configured  
**Then** the frontend has Vitest configured for unit/component tests  
**And** the backend has Vitest and Supertest-style integration test support  
**And** Playwright has at least one placeholder or smoke test location under `tests/e2e/`  
**And** package scripts exist for running frontend tests, backend tests, and E2E tests  
**And** frontend and backend coverage commands or configuration exist, even if the target coverage threshold is reached later  
**And** backend tests use an isolated test SQLite database path rather than the normal development database file  
**And** the setup supports later coverage reporting toward the 70 percent meaningful coverage requirement

### Story 1.3: Create Backend App Skeleton And Health Endpoint

As a developer,
I want a minimal Express backend with a health endpoint,
So that the backend can be verified directly and used by Docker health checks.

**Acceptance Criteria:**

**Given** the backend project exists  
**When** the backend app skeleton is implemented  
**Then** `server.ts` starts the HTTP server  
**And** `app.ts` configures the Express app  
**And** `routes/health.ts` exposes `GET /health`  
**And** `GET /health` returns HTTP 200 with a small JSON body such as `{ "status": "ok" }`  
**And** backend integration tests verify the health endpoint status code and response body  
**And** the backend does not include authentication, authorisation, admin routes, or unrelated endpoints

### Story 1.4: Create SQLite Persistence Foundation

As a developer,
I want a small SQLite persistence module for todos,
So that todo data can be stored durably without unnecessary infrastructure.

**Acceptance Criteria:**

**Given** the backend app skeleton exists  
**When** SQLite persistence is added  
**Then** the backend includes a small database initialisation module  
**And** a `todos` table or equivalent schema exists with `id`, `text`, `completed`, and `createdAt` fields  
**And** the schema can be initialised on startup or through a small documented init path  
**And** the SQLite database path can be configured through an explicit environment variable  
**And** an automated backend test or setup check proves the schema initialises successfully and the configured database path is usable  
**And** no ORM, repository abstraction layer, migration framework, or enterprise data layer is added unless a concrete need appears

## Epic 2: Backend Todo API And Persistence

Deliver the complete REST API for creating, viewing, completing, and deleting todos, with validation, SQLite persistence, safe error handling, and integration-first backend tests.

### Story 2.1: Implement Todo Creation API

As a user,
I want the backend to create a todo from a short text description,
So that my task can be stored for later use.

**Acceptance Criteria:**

**Given** the backend API and SQLite persistence foundation exist  
**When** a client sends `POST /api/todos` with non-empty text  
**Then** the backend trims and validates the text  
**And** creates a todo with `id`, `text`, `completed`, and `createdAt`  
**And** `completed` defaults to `false`  
**And** `createdAt` is returned as an ISO 8601 string in API responses  
**And** the new todo is persisted in SQLite  
**And** backend integration tests use an isolated test database path  
**And** backend integration tests prove the created todo can be read back from SQLite via `GET /api/todos`

**Given** a client sends `POST /api/todos` with empty or invalid text  
**When** the request is processed  
**Then** the backend returns a clear 4xx validation response using the standard error shape  
**And** no todo is persisted  
**And** backend integration tests cover invalid creation input

### Story 2.2: Implement Todo List Retrieval API

As a user,
I want the backend to return the current list of todos,
So that the app can show my saved tasks after opening or refreshing.

**Acceptance Criteria:**

**Given** todos exist in SQLite  
**When** a client sends `GET /api/todos`  
**Then** the backend returns a JSON array of todos  
**And** each todo includes `id`, `text`, `completed`, and `createdAt`  
**And** completed values are returned as booleans  
**And** `createdAt` values are returned as ISO 8601 strings  
**And** todos are returned in ascending `createdAt` order unless a later approved requirement changes this  
**And** backend integration tests cover list retrieval with existing todos and verify ordering

**Given** no todos exist  
**When** a client sends `GET /api/todos`  
**Then** the backend returns an empty JSON array  
**And** backend integration tests cover the empty list case

### Story 2.3: Implement Todo Completion API

As a user,
I want the backend to mark a todo as complete,
So that completed status persists across refreshes and sessions.

**Acceptance Criteria:**

**Given** an active todo exists  
**When** a client sends `PATCH /api/todos/:id` with `{ "completed": true }` or `{ "completed": false }`  
**Then** the backend validates that `completed` is the only supported mutation field  
**And** updates only the todo completed status in SQLite  
**And** does not support editing todo text through this endpoint  
**And** returns the updated todo as JSON with `createdAt` as an ISO 8601 string  
**And** backend integration tests prove the updated completed status can be read back from SQLite via `GET /api/todos`

**Given** the todo id does not exist  
**When** a client sends `PATCH /api/todos/:id`  
**Then** the backend returns a clear 404 response using the standard error shape  
**And** backend integration tests cover the not-found case

**Given** the mutation payload is invalid, missing `completed`, includes non-boolean `completed`, or attempts to update `text`  
**When** a client sends `PATCH /api/todos/:id`  
**Then** the backend returns a clear 4xx validation response using the standard error shape  
**And** backend integration tests cover invalid mutation input

### Story 2.4: Implement Todo Deletion API

As a user,
I want the backend to delete a todo,
So that removed tasks no longer appear in my list.

**Acceptance Criteria:**

**Given** a todo exists  
**When** a client sends `DELETE /api/todos/:id`  
**Then** the backend removes the todo from SQLite  
**And** returns a simple success response or appropriate empty response  
**And** subsequent `GET /api/todos` responses no longer include the deleted todo  
**And** backend integration tests use an isolated test database path  
**And** backend integration tests prove the deletion is persisted in SQLite by reading the list after deletion

**Given** the todo id does not exist  
**When** a client sends `DELETE /api/todos/:id`  
**Then** the backend returns a clear 404 response using the standard error shape  
**And** backend integration tests cover the not-found case

### Story 2.5: Standardise Backend Error Handling

As a developer,
I want backend errors to be handled consistently and safely,
So that API failures are predictable and do not leak internal details.

**Acceptance Criteria:**

**Given** any todo or health API route produces a validation, not-found, or unexpected error  
**When** the error reaches the API response layer  
**Then** the backend returns a consistent JSON error shape  
**And** validation and not-found errors use appropriate 4xx status codes  
**And** unexpected failures use safe 5xx responses without stack traces in normal API responses  
**And** practical request/application logging exists for local debugging  
**And** the standard error handling approach is applied across Stories 2.1, 2.3, and 2.4 rather than deferred as later cleanup  
**And** backend integration or unit tests cover the expected error response behaviour

## Epic 3: Single-Screen Todo User Interface

Deliver the React single-screen Todo UI that lets the user complete the core todo workflow with clear visual states, responsive behaviour, and accessibility-conscious interactions.

### Story 3.1: Create Frontend API Client And Todo Types

As a developer,
I want the frontend to use a small typed API client,
So that UI components communicate with the backend consistently.

**Acceptance Criteria:**

**Given** the backend Todo API contract is defined  
**When** the frontend API client is implemented  
**Then** `frontend/src/api/todosApi.ts` exposes simple functions for loading, creating, completing, and deleting todos  
**And** `frontend/src/types/todo.ts` defines the Todo shape with `id`, `text`, `completed`, and `createdAt`  
**And** API errors are converted into predictable frontend errors for UI handling  
**And** components do not duplicate raw `fetch` logic  
**And** the API client remains a small set of clear functions, not a mini SDK or broad abstraction layer  
**And** unit tests cover API client success and failure behaviour where practical

### Story 3.2: Build Main Todo Screen And Initial Load Behaviour

As a user,
I want the app to load my current todos when I open it,
So that I can immediately see my saved tasks.

**Acceptance Criteria:**

**Given** the frontend application starts  
**When** the main screen renders  
**Then** it requests todos from the backend API  
**And** shows a clear loading state while the initial request is in progress  
**And** shows the loaded todo list when the request succeeds with todos  
**And** shows the empty state when the request succeeds with an empty array  
**And** shows a clear error message or state when the request fails  
**And** user-facing status and error messages are programmatically exposed in a way assistive technologies can understand  
**And** the screen uses semantic structure suitable for a small web app  
**And** controls and status messages are understandable to keyboard and assistive technology users where relevant  
**And** component tests cover loading, success, empty, and error rendering

### Story 3.3: Build Add Todo Form

As a user,
I want to add a todo from the main screen,
So that I can capture a personal task quickly.

**Acceptance Criteria:**

**Given** the user is on the main Todo screen  
**When** they enter a short task description and submit the form  
**Then** the frontend sends a create request to the backend API  
**And** the new todo appears promptly after a successful response  
**And** the form input is cleared after successful creation  
**And** empty input is prevented or messaged for user experience, while backend validation remains authoritative  
**And** duplicate rapid submits do not create accidental double requests while a create request is already in flight  
**And** failed create requests show an understandable error message without breaking the screen  
**And** user-facing error or status messages are programmatically exposed in a way assistive technologies can understand  
**And** the form has a labelled input and accessible submit control  
**And** keyboard submission works as expected  
**And** component tests cover successful submission, invalid input, pending submit behaviour, and failed submission

### Story 3.4: Build Todo List And Todo Item Actions

As a user,
I want to view, complete, and delete todos from the list,
So that I can manage my task list from one screen.

**Acceptance Criteria:**

**Given** one or more todos are loaded  
**When** the list renders  
**Then** active and completed todos are shown clearly  
**And** completed todos are visually distinct from active todos without relying only on colour  
**And** each todo exposes a completion control and delete control  
**And** completing a todo calls `PATCH /api/todos/:id` with only `{ "completed": true }` or `{ "completed": false }`  
**And** deleting a todo calls `DELETE /api/todos/:id`  
**And** successful complete and delete operations update the UI promptly  
**And** failed complete or delete operations show an understandable error message without breaking the screen  
**And** failed complete or delete operations do not leave the UI falsely showing success  
**And** user-facing error or status messages are programmatically exposed in a way assistive technologies can understand  
**And** controls are labelled and keyboard-accessible  
**And** component tests cover completed styling, complete action, delete action, and action failure states

### Story 3.5: Implement Empty State And Responsive Layout

As a user,
I want the app to look clear when I have no todos and on different screen sizes,
So that I understand what to do on desktop or mobile.

**Acceptance Criteria:**

**Given** the backend returns an empty todo list  
**When** the main screen renders  
**Then** the frontend shows a clear empty state  
**And** the empty state makes it obvious how to add the first todo  
**And** the layout remains usable on common desktop and mobile widths  
**And** text, controls, spacing, and focus states remain readable and usable  
**And** the empty state and any status messaging are programmatically exposed in a way assistive technologies can understand  
**And** component tests cover empty state rendering  
**And** responsive behaviour is verified by component-level checks where sensible or by at least one Playwright viewport-based check in the E2E suite

## Epic 4: Automated Test Coverage And E2E Confidence

Add the required automated test coverage across frontend components, backend API integration, and Playwright user journeys so the core app behaviour can be verified consistently.

### Story 4.1: Complete Backend API Integration Test Suite

As a developer,
I want integration tests for every backend endpoint,
So that the API contract and persistence behaviour are protected.

**Acceptance Criteria:**

**Given** the backend Todo API exists  
**When** backend integration tests run  
**Then** tests hit the Express app/API contract rather than direct persistence helpers  
**And** `GET /health` is covered  
**And** `GET /api/todos` is covered for empty and populated states  
**And** `POST /api/todos` is covered for valid and invalid input  
**And** `PATCH /api/todos/:id` is covered for valid completion updates, invalid payloads, attempts to edit text, and not-found ids  
**And** `DELETE /api/todos/:id` is covered for successful deletion and not-found ids  
**And** tests use an isolated SQLite test database path  
**And** tests prove create, complete, and delete writes persist by reading back through the API  
**And** expected 4xx and safe 5xx error response shapes are covered where practical

### Story 4.2: Complete Frontend Unit And Component Test Coverage

As a developer,
I want useful frontend unit and component tests,
So that the Todo UI states and interactions are protected without over-testing implementation details.

**Acceptance Criteria:**

**Given** the frontend Todo UI exists  
**When** frontend tests run  
**Then** component tests cover the add todo form, todo list, todo item, empty state, loading state, and error message behaviour  
**And** tests cover completed todo visual distinction in a maintainable way  
**And** tests cover failed load or mutation states where practical  
**And** accessibility-related assertions use roles, labels, accessible names, and visible state assertions where applicable  
**And** status and error messaging tests verify that messages are discoverable through user-facing or assistive-technology-friendly queries where applicable  
**And** tests avoid asserting internal implementation details that would make refactoring unnecessarily brittle  
**And** frontend coverage reporting is available

### Story 4.3: Implement Playwright E2E Tests For Core Journeys

As an assessor or developer,
I want Playwright tests for the core user journeys,
So that the application can be verified from the user's perspective.

**Acceptance Criteria:**

**Given** the frontend and backend can run together  
**When** the Playwright E2E suite runs  
**Then** at least 5 clearly separate Playwright tests pass  
**And** one test covers creating a todo  
**And** one test covers completing a todo  
**And** one test covers deleting a todo  
**And** one test covers the empty state  
**And** one test covers error handling for a failed load or mutation using Playwright route interception or another test-only failure simulation that does not add product endpoints  
**And** at least one test or project configuration verifies the UI at a mobile-sized viewport or otherwise checks responsive behaviour  
**And** tests interact with the UI as a user would, not through implementation internals

### Story 4.4: Add Coverage Commands And Coverage Evidence

As a developer,
I want clear coverage commands and coverage evidence,
So that the assignment's meaningful coverage requirement can be demonstrated.

**Acceptance Criteria:**

**Given** frontend and backend automated tests exist  
**When** coverage commands are run  
**Then** frontend coverage output is generated  
**And** backend coverage output is generated  
**And** a short QA summary explains the overall meaningful coverage position using the separate frontend and backend coverage reports  
**And** the project avoids extra tooling solely to merge coverage into one number unless it is genuinely simple  
**And** coverage gaps are identified in QA documentation  
**And** coverage commands are documented in the README

### Story 4.5: Stabilise Test Data And Test Isolation

As a developer,
I want test data and environment isolation to be reliable,
So that tests do not contaminate development data or each other.

**Acceptance Criteria:**

**Given** backend integration and E2E tests run repeatedly  
**When** tests create, complete, or delete todos  
**Then** backend integration tests use isolated SQLite database paths  
**And** E2E tests run against a predictable test database or resettable state, not the normal development database  
**And** E2E tests start from a predictable state through setup, teardown, or documented reset behaviour  
**And** tests do not rely on execution order except where explicitly controlled by the test runner  
**And** test commands can be run repeatedly without manual cleanup  
**And** the README or QA notes explain how test data is isolated

## Epic 5: Dockerised Delivery, Accessibility, QA, Security, And Documentation

Package the app for Docker Compose delivery and produce the required submission evidence: Dockerfiles, Docker Compose, accessibility review, QA/security review, README, and AI integration log.

### Story 5.1: Add Frontend And Backend Dockerfiles

As a developer,
I want separate Dockerfiles for the frontend and backend,
So that each part of the application can be built and run consistently in containers.

**Acceptance Criteria:**

**Given** the frontend and backend projects exist  
**When** Dockerfiles are added  
**Then** `frontend/Dockerfile` builds the frontend application  
**And** `backend/Dockerfile` builds and runs the Express backend  
**And** both Dockerfiles use multi-stage builds where appropriate  
**And** both runtime containers run as non-root users where practical  
**And** the backend image supports the configured SQLite database path  
**And** the backend runtime image is compatible with the chosen SQLite driver, avoiding unnecessary native-module friction such as unproven Alpine usage with `better-sqlite3`  
**And** no extra services, platforms, or enterprise deployment tooling are introduced

### Story 5.2: Add Docker Compose Runtime

As an assessor or developer,
I want to run the full application with Docker Compose,
So that the app can be started and reviewed with one clear command.

**Acceptance Criteria:**

**Given** frontend and backend Dockerfiles exist  
**When** `docker-compose up` is run from the repo root  
**Then** Docker Compose starts frontend and backend services  
**And** the frontend can reach the backend through explicit environment configuration  
**And** Docker Compose uses explicit environment configuration for frontend API base URL, backend port, and SQLite database path  
**And** development and test environment differences are supported through environment variables  
**And** compose profiles are added only if they genuinely help development or test usage, not just for show  
**And** the backend uses an explicit SQLite database path  
**And** backend SQLite data is persisted through a Docker volume if needed  
**And** backend health checks use `GET /health`  
**And** the application is reachable and usable after `docker-compose up`, not merely running containers  
**And** service logs are available through `docker-compose logs`  
**And** the README documents the Docker Compose run command and any required environment variables

### Story 5.3: Complete Accessibility Review And Fixes

As a user,
I want the Todo app to meet practical accessibility expectations,
So that the core workflow is usable with common assistive and keyboard interactions.

**Acceptance Criteria:**

**Given** the Todo UI is implemented  
**When** accessibility checks are run using Lighthouse, axe-core, Playwright, or an equivalent tool  
**Then** the app has zero critical WCAG violations  
**And** semantic structure, labelled controls, keyboard interaction, visible focus states, and status/error messaging are reviewed  
**And** completed todo styling is reviewed to ensure it is not communicated by colour alone  
**And** any critical issues found are fixed in the product itself, not only documented in QA notes  
**And** accessibility review results and fixes are documented in QA evidence

### Story 5.4: Complete Security And QA Review Documentation

As an assessor or developer,
I want security and QA review findings documented,
So that the submission shows deliberate quality review rather than just implementation.

**Acceptance Criteria:**

**Given** the app, tests, and Docker setup are implemented  
**When** QA and security review is completed  
**Then** QA documentation covers frontend tests, backend integration tests, Playwright E2E tests, coverage reports, and known gaps  
**And** security review covers input validation, unsafe input handling, XSS-style risks, injection-style risks, safe error responses, and unnecessary exposure of internal details  
**And** performance review is documented at a practical level for this local Todo app  
**And** coverage evidence is included using frontend and backend coverage outputs and a short meaningful-coverage summary  
**And** known limitations and residual risks are documented honestly  
**And** findings and remediations are documented, including a clear statement when no issue is found for a reviewed area  
**And** no enterprise security or compliance framework is introduced

### Story 5.5: Write README With Setup, Test, And Docker Instructions

As an assessor or developer,
I want a clear README,
So that the project can be installed, run, tested, and reviewed without guesswork.

**Acceptance Criteria:**

**Given** the application implementation and Docker setup exist  
**When** the README is written  
**Then** it explains the project scope and explicitly notes the minimal Todo feature set  
**And** it documents local setup for frontend and backend  
**And** it documents environment variables for frontend API base URL, backend port, and SQLite database path  
**And** it documents frontend, backend, coverage, and Playwright test commands  
**And** it documents `docker-compose up` and `docker-compose logs` usage  
**And** it documents accessibility, QA, and security review artefacts  
**And** it does not claim support for excluded features such as authentication, multi-user support, search, filtering, sorting, analytics, or edit functionality

### Story 5.6: Create AI Integration Log

As an assessor,
I want an AI integration log,
So that the submission clearly shows how BMAD and AI assistance guided the project.

**Acceptance Criteria:**

**Given** BMAD planning and implementation work has been performed  
**When** the AI integration log is created  
**Then** it documents BMAD artefact usage across brief, PRD, architecture, epics, stories, and implementation  
**And** it documents AI assistance used for implementation tasks  
**And** it documents test generation support and what AI missed  
**And** it documents debugging support where applicable  
**And** it documents MCP usage if applicable  
**And** it documents limitations encountered and where human judgement was required  
**And** it remains a delivery evidence document, not an end-user product feature
