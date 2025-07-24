# LOS API Architecture Overview

This document provides a high level overview of the code structure for the LOS API project. It is intended to help new contributors understand how the application is organized.

## Core Technologies

- **NestJS** – Main framework used to structure the application.
- **GraphQL** – Exposed via `@nestjs/graphql` with an auto‑generated schema.
- **TypeORM** – ORM used for database interactions and migrations.
- **BullMQ** – Used for background job queues.
- **SuperTokens** – Handles authentication and session management.
- **Event Emitter & CQRS** – Provides an event driven architecture and command/query separation.

## Project Structure

```
src/
  auth/                 Authentication guards, filters and SuperTokens integration
  config/               TypeORM and SuperTokens configuration services
  dashboard/            Basic dashboard example
  external-checks/      KYC, AML and credit checks
  health-check/         Controller and service for application health endpoint
  loan-applications/    Loan application entities, resolvers and PDF generator
  loan-offers/          Offer management APIs
  products/             Product, make and model entities and services
  realtime/             WebSocket gateway for loan status updates
  underwriting/         Manual review, rules and results modules
  users/                User entities, blacklist and resolvers
  app.module.ts         Root Nest module
  main.ts               Application bootstrap file
```

Each feature folder typically contains:

- `*.entity.ts` – TypeORM entities
- `dtos/` – Data transfer objects
- `{feature}.controller.ts` – REST controllers
- `{feature}.resolver.ts` – GraphQL resolvers
- `{feature}.service.ts` – Business logic
- Optional spec files for tests

## Logging

The `logger/` directory configures Winston with daily rotating log files and a request logging middleware. Logs are written to the `logs/` directory in production.

## Migrations

Database migrations are stored in the `migrations/` folder and can be managed using the scripts described in `docs/TYPEORM_MIGRATION_GUIDE.md`.

## Testing

Unit and e2e tests use Jest. Run `npm test` or `npm run test:e2e`. Some test suites are placeholders and may fail until dependencies are configured.

## Documentation Location

All project documentation is kept in the `docs/` directory. Add any new guides or design notes here so they can easily be discovered. A link to this overview has been added to the main `README.md`.

