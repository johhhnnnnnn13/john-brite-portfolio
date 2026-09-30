# John Brite Portfolio

A production-oriented full stack portfolio for John Brite, built with React, TypeScript, Spring Boot, and PostgreSQL. The frontend ships a reviewed static content snapshot so core pages remain available when the API is offline; the contact form reports service failures without discarding typed content.

## Repository

- `frontend/` React/Vite site, routes, accessibility, fallback content, and UI tests
- `backend/` Spring Boot modular monolith, public APIs, contact persistence, and Flyway migrations
- `infra/` Docker builds and local Compose environment
- `pipelines/` reusable Azure DevOps jobs
- `docs/` architecture, content, deployment, and rollback notes

## Local development

Requirements: Node 20+, Java 21+, Maven 3.9+, and PostgreSQL 16+. Docker Compose is the easiest way to run the complete stack.

```bash
cp .env.example .env
docker compose -f infra/compose.yml up --build
```

Open `http://localhost:4173`. The API is available at `http://localhost:8080/api/v1`.

Without Docker, start PostgreSQL and run:

```bash
cd backend
./mvnw spring-boot:run
```

In another terminal:

```bash
cd frontend
npm ci
npm run dev
```

Open `http://localhost:5173`.

## Validation

```bash
cd frontend && npm ci && npm run lint && npm test && npm run build
cd backend && ./mvnw test && ./mvnw package
```

## Configuration

Copy `.env.example` and keep actual credentials out of Git. Production must set `DATABASE_URL`, `DATABASE_USERNAME`, `DATABASE_PASSWORD`, and the exact `FRONTEND_ORIGIN`. `CONTACT_RETENTION` controls when contact records become eligible for deletion. A scheduled database job should delete records where `expires_at < now()`.

Contact messages are intentionally not available through a public endpoint. The owner can retrieve them through a restricted PostgreSQL account or an approved administrative reporting path. Do not reuse the application database credential for owner access.

## Content editing

Static fallback content lives in `frontend/src/content/portfolio.ts`. API seed content lives in versioned Flyway migrations under `backend/src/main/resources/db/migration`. Keep the two reviewed snapshots aligned when publishing changes. See `docs/content-guide.md` before adding employers, dates, social profiles, source links, or metrics.

The resume file is not included because no owner-reviewed PDF was provided. Add it at `frontend/public/John-Brite-Resume.pdf` before publication. GitHub and LinkedIn controls stay absent until verified URLs are configured.

## Release policy

Pull requests run validation only. Merges to `main` build and publish immutable frontend and backend images tagged with the commit SHA, deploy those exact images to staging, run smoke checks, then wait on the Azure DevOps `portfolio-production` environment approval before production. Required service connections and protected variables are documented in `docs/deployment.md`.

## Hosting choice

The documented target is Azure Container Apps for the frontend and backend, with Azure Database for PostgreSQL Flexible Server. Container Apps keeps the release artifact identical between staging and production and supports revision rollback. Costs depend on region, replicas, traffic, log retention, and database tier; use the Azure pricing calculator before provisioning.

See `docs/architecture.md` and `docs/deployment.md` for diagrams, prerequisites, migration handling, smoke checks, and rollback constraints.
