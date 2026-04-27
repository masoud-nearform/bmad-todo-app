---
title: "Product Brief: Full-Stack Todo App"
status: "complete"
created: "2026-04-27"
updated: "2026-04-27"
inputs:
  - "docs/input/todo-app-prd.md"
  - "docs/input/assignment-requirements.md"
---

# Product Brief: Full-Stack Todo App

## Executive Summary

This project will deliver a simple, reliable full-stack Todo application that helps an individual user manage personal tasks without onboarding, account setup, or unnecessary complexity. The product focuses on the core todo loop: create a task, view the list, mark work as complete, and delete items that are no longer needed.

The application must feel complete despite its deliberately narrow scope. Users should immediately understand what to do, see their todos clearly, and trust that their data remains available after refreshes and across sessions. Completed items must be visually distinct, and the interface must handle empty, loading, and error states with the same care as the happy path.

This brief follows the supplied PRD as the product source of truth. Assignment requirements are captured as implementation, quality, deployment, documentation, and acceptance constraints. They do not expand the product into authentication, multi-user support, prioritisation, deadlines, notifications, collaboration, or other advanced features.

## User Goals

The primary user is an individual managing personal tasks. They need to:

- Add a short todo quickly.
- See all todos in a clear list when opening the application.
- Understand which todos are active and which are complete.
- Mark a todo as complete with immediate visual feedback.
- Delete todos they no longer need.
- Return later and find their todo data still available.
- Use the app comfortably on desktop and mobile.
- Recover gracefully from empty, loading, or error states without confusion.

## MVP Scope

The MVP includes only the core Todo application required by the PRD:

- Create todos with a short text description.
- View all todos in a clear list.
- Complete todos by changing their completion status.
- Delete todos.
- Store basic todo metadata, including creation time or an equivalent timestamp.
- Persist todo data through an API-backed backend so data survives refreshes and user sessions.
- Provide a responsive frontend for desktop and mobile.
- Show visually distinct completed items.
- Include sensible empty, loading, and error states.
- Expose a small, clear backend API for CRUD operations.
- Include validation and error handling on both client and server.

## Explicit Exclusions

The first version must not include:

- Authentication or user accounts.
- Multi-user support.
- Collaboration.
- Task prioritisation.
- Deadlines or due dates.
- Notifications.
- Any extra product feature that is not needed for the core todo experience.

The architecture may avoid blocking future extension, but the implementation must not spend MVP effort building future-facing features.

## Success Criteria

Business and assessment success means the project demonstrates disciplined BMAD execution and produces a complete, assessable submission:

- BMAD artefacts are produced and used to guide implementation, including this brief, refined PRD, architecture, API contracts, component structure, stories, acceptance criteria, and test scenarios.
- The final application is working, understandable, and demonstrably guided by the BMAD method rather than ad hoc AI-assisted coding.
- The submission includes documentation explaining how BMAD shaped the implementation.
- The README provides clear setup and run instructions.
- An AI integration log records agent usage, MCP server usage where applicable, test generation support, debugging support, limitations encountered, and where human judgement was required.

Technical success means:

- All core CRUD behaviours work reliably: create, view, complete, and delete.
- Todo data persists across refreshes and sessions through the backend API.
- The frontend remains fast and responsive under normal use.
- The backend API is small, clear, validated, and covered by integration tests.
- The application runs successfully with `docker-compose up`.
- Unit, integration, and E2E tests pass.
- Meaningful code coverage reaches at least 70 percent.
- At least five Playwright E2E tests pass.
- Accessibility checks report zero critical WCAG violations.
- Coverage, accessibility, performance, and security review evidence is documented.

## Non-Functional Requirements

The system should prioritise simplicity, performance, maintainability, accessibility, and deployability:

- Interactions should feel immediate under normal conditions.
- The codebase should be easy for future developers to understand, test, deploy, and extend.
- Client and server errors should be handled gracefully without breaking the user flow.
- The UI should be responsive across desktop and mobile.
- Accessibility must be checked with Lighthouse, axe-core, Playwright, or an equivalent tool, with zero critical WCAG violations.
- Performance must be reviewed and any issues documented.
- The architecture should keep clear API boundaries and reliable persistence without introducing unnecessary infrastructure.

## Implementation And Acceptance Constraints

The delivery must follow the full BMAD method:

- Create or refine the project brief and PRD.
- Create architecture documentation through BMAD.
- Define API contracts and component structure.
- Create stories with acceptance criteria.
- Define test strategy as part of the story work.
- Implement from BMAD-generated artefacts.
- Document how BMAD guided the build.

Testing must be planned and implemented from the start:

- Configure unit test infrastructure, such as Jest or Vitest.
- Configure Playwright for E2E testing.
- Add test commands to `package.json`.
- Write unit or component tests for frontend behaviour.
- Write integration tests for each backend API endpoint.
- Cover the core E2E journeys: create todo, complete todo, delete todo, empty state, and error handling.
- Analyse coverage, identify gaps, and reach at least 70 percent meaningful coverage.

Deployment must be containerised:

- Provide separate Dockerfiles for frontend and backend.
- Use multi-stage builds.
- Run containers as non-root users.
- Add health checks where appropriate.
- Provide a `docker-compose.yml` that orchestrates required services, networking, environment configuration, and any required volumes.
- Ensure logs are available through `docker-compose logs`.
- Support development and test configuration through environment variables.

Security and QA expectations must be evidenced:

- Review the code for common security risks, including XSS, injection, unsafe input handling, and similar issues.
- Document security findings and remediations, including a clear statement if no issue is found for a reviewed area.
- Produce QA reports covering test coverage, accessibility, performance review, and security review.

## Delivery Principle

The project should maximise quality, evidence, and clarity rather than feature count. A small, polished Todo app with reliable persistence, strong tests, accessible UX states, clean Docker deployment, and clear BMAD documentation is the target outcome.
