# Deployment and rollback

## Azure prerequisites

- Azure Container Registry and the `portfolio-acr` Azure DevOps service connection
- Azure Container Apps environments for staging and production
- Azure Database for PostgreSQL Flexible Server with private networking or strict firewall rules
- The `portfolio-azure` service connection scoped to the portfolio resource groups
- Protected variables for resource groups, registry host, database credentials, and public URLs
- Approval configured on the `portfolio-production` Azure DevOps environment

Container Apps was selected for both web and API so the exact immutable image verified in staging is promoted to production. PostgreSQL migrations run when the API starts. Schema changes must remain backward compatible while old and new revisions can coexist.

## Rollback

1. Identify the last healthy frontend and backend image SHA and the corresponding Container Apps revisions.
2. Route traffic back to those revisions or update both apps to the previous SHA-tagged images.
3. Run homepage, profile API, project 404, and contact-validation smoke checks.
4. Investigate migration compatibility before rolling back application code. Never reverse a destructive migration automatically.

Use expand-and-contract migrations: add compatible schema first, deploy code that can use both shapes, migrate data, and only remove old schema in a later reviewed release. Restore PostgreSQL from point-in-time recovery only for a confirmed data incident, not as a normal application rollback.

## Status language

- Configured: source and environment settings exist.
- Tested: the stated automated or manual verification ran successfully.
- Deployed: the named environment is live and smoke-tested.

Do not describe staging or production as deployed until the Azure resources and pipeline run exist.
