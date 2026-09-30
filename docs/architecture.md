# Architecture

```text
Browser
  |-- React static snapshot (always available)
  |-- GET /api/v1/profile, skills, experience, projects
  `-- POST /api/v1/contact
             |
        Spring Boot modular monolith
        controller -> service -> repository
             |
          PostgreSQL
```

The React application owns presentation, routing, theme preference, and the reviewed static fallback. Spring Boot owns public content publication rules and contact acceptance. PostgreSQL is the sole runtime database; MSSQL and MongoDB appear only as substantiated skills and project context.

The backend is intentionally one deployable unit. Feature packages preserve ownership boundaries without introducing network calls or operational overhead between small services.

## Security and privacy

- Production CORS accepts one configured frontend origin.
- Contact input has server-side length, email, and required-field validation.
- A honeypot silently accepts likely bot traffic without persistence.
- A configurable per-client window limits repeated submissions.
- Contact bodies are not logged or publicly queryable.
- Every contact row receives an expiry timestamp for retention cleanup.
- Secrets are supplied by the runtime or protected pipeline variables.

For a multi-instance deployment, replace the in-memory limiter with an external gateway or distributed rate limiter. The current limiter protects each application replica independently.
