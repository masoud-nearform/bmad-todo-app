# Assignment Requirements

## Purpose

Build a complete, well-tested, and deployable application using the BMAD Method and Spec-Driven Development. The suggested project is a full-stack Todo application based on the supplied PRD.

A different application is allowed only if the methodology is followed correctly, but for this project we are using the Todo app PRD as the baseline source of truth.

## Mandatory Methodology Requirements

The project must use the BMAD Framework properly, not just AI-assisted coding without structure.

The work must include:

- Project brief and PRD refinement using BMAD
- Architecture design using BMAD
- Story creation with acceptance criteria
- Test strategy defined as part of the story work
- Implementation guided by BMAD-generated artefacts
- Documentation explaining how BMAD guided the implementation

## Product Scope Constraints

The application must stay focused on a simple, reliable Todo experience.

The application must support:

- Create todo
- View todos
- Complete todo
- Delete todo
- Persist data across refreshes and sessions

Each todo should include:

- short text description
- completion status
- creation time or equivalent basic metadata

The UI must include:

- clear list view
- visually distinct completed items
- empty state
- loading state
- error state
- responsive behaviour across desktop and mobile

The backend must expose a small, clear API for CRUD operations.

The initial version must not include:

- authentication
- multi-user support
- collaboration
- prioritisation
- deadlines
- notifications
- unnecessary extra features

## Step 1 Requirements: BMAD Artefacts

Generate project artefacts through BMAD workflow, including:

- project brief
- refined PRD
- architecture documentation
- API contracts
- component structure
- stories with acceptance criteria
- test scenarios for unit, integration, and E2E testing

## Step 2 Requirements: Build the Application with QA from Day One

### Project Setup

Implementation requirements:

- initialise project structure for frontend, backend, and tests
- use AI assistance guided by BMAD artefacts

QA requirements:

- set up test infrastructure immediately
- configure unit test framework such as Jest or Vitest
- configure Playwright for E2E tests
- add test commands in package.json

### Backend

Implementation requirements:

- build API for CRUD operations on todos
- include validation
- include error handling
- follow BMAD architecture and stories

QA requirements:

- write integration tests for each API endpoint as you build
- validate API contracts using Postman MCP or similar if available

### Frontend

Implementation requirements:

- build UI for todo management
- use AI assistance based on BMAD specs and stories
- ensure fast and responsive updates

QA requirements:

- write component tests during implementation
- use browser debugging tools such as Chrome DevTools MCP if available

### E2E Tests

Implementation requirements:

- create end-to-end tests covering the user journeys defined in stories

QA requirements:

- use Playwright
- cover at minimum:
  - create todo
  - complete todo
  - delete todo
  - empty state
  - error handling

## Step 3 Requirements: Containerise with Docker Compose

### Dockerfiles

Must provide:

- Dockerfile for frontend
- Dockerfile for backend
- multi-stage builds
- non-root users
- health checks where appropriate

### Docker Compose

Must provide:

- docker-compose.yml
- orchestration for all required containers
- networking configuration
- environment configuration
- volume mounts if needed

### Health Checks

Must provide:

- health check endpoints where needed
- healthy container reporting
- logs accessible through docker-compose logs

### Environment Configuration

Must support:

- development and test environments through environment variables
- compose profiles if useful

## Step 4 Requirements: Quality Assurance Activities

### Test Coverage

Must:

- analyse coverage
- identify gaps
- achieve at least 70 percent meaningful code coverage

### Performance Testing

Must:

- review application performance
- document any issues found

### Accessibility Testing

Must:

- run accessibility checks using Lighthouse, axe-core, Playwright, or equivalent
- achieve zero critical WCAG violations

### Security Review

Must:

- review the code for common security issues
- include issues such as XSS, injection, unsafe input handling, and similar risks
- document findings and remediations

## Required Deliverables

The final submission must include:

- BMAD artefacts such as project brief, architecture docs, and stories with acceptance criteria
- working Todo application
- frontend and backend, or a justified alternative only if approved
- unit test suite
- integration test suite
- E2E test suite
- Dockerfiles
- docker-compose.yml
- QA reports covering coverage, accessibility, and security review
- documentation explaining how BMAD guided the implementation

## AI Integration Documentation

Maintain a log throughout the project covering:

- Agent Usage  
  Which tasks were completed with AI assistance and which prompts worked best

- MCP Server Usage  
  Which MCP servers were used and how they helped

- Test Generation  
  How AI helped generate tests and what it missed

- Debugging with AI  
  Cases where AI helped debug issues

- Limitations Encountered  
  What AI could not do well and where human judgement was critical

## Success Criteria

### Phase Deliverables

All required activities must be completed with documented learnings.

### Working Application

Todo app must be fully functional with all core CRUD operations.

### Test Coverage

Minimum 70 percent meaningful code coverage.

### E2E Tests

Minimum 5 passing Playwright tests.

### Docker Deployment

Application must run successfully with docker-compose up.

### Accessibility

Zero critical WCAG violations.

### Documentation

Must include a README with setup instructions and an AI integration log.

## Implementation Guardrails

To maximise marks, keep the scope tight and execution strong.

Prefer:

- simple architecture
- maintainable code
- clear API boundaries
- reliable persistence
- solid tests
- polished UX states
- evidence of BMAD usage

Avoid:

- feature creep
- speculative extras
- complex infrastructure that does not improve the score
- skipping artefacts or QA evidence