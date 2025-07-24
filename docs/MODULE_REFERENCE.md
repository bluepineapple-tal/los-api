# Module Reference

This guide describes each NestJS module in the LOS API project and how they fit together. Use it alongside `docs/ARCHITECTURE_OVERVIEW.md` for a high-level look at the repository structure.

## AppModule

- **Location:** `src/app.module.ts`
- **Purpose:** Root module that bootstraps the application. It imports all feature modules and global providers (database, GraphQL, BullMQ, event emitter, etc.).
- **Use:** Imported by `main.ts` to start the Nest application.

## AuthModule

- **Location:** `src/auth`
- **Contents:** authentication guard, middleware, and SuperTokens integration.
- **Use:** Register with `AuthModule.forRoot()` in `AppModule` to enable session handling and the `AuthMiddleware` for all routes.

## DashboardModule

- **Location:** `src/dashboard`
- **Contents:** basic controller and service that return counts for loan applications and users.
- **Use:** Imported by `AppModule` and available at `/dashboard` routes.

## ExternalChecksModule

- **Location:** `src/external-checks`
- **Contents:** wraps all external verification checks. Re-exports the AML, credit and KYC submodules and provides an `ExternalChecksService` and resolver.
- **Use:** Import this module when other features need to trigger external checks (for example from `ApplicationProcessingModule`).

### AmlCheckModule

- **Location:** `src/external-checks/aml-check`
- **Contents:** controller, resolver and service for AML screening requests.
- **Use:** Part of `ExternalChecksModule`, can be imported separately if needed.

### CreditCheckModule

- **Location:** `src/external-checks/credit-check`
- **Contents:** controller, resolver and service for credit bureau checks.
- **Use:** Part of `ExternalChecksModule`.

### KycCheckModule

- **Location:** `src/external-checks/kyc-check`
- **Contents:** controller, resolver and service for KYC validation.
- **Use:** Part of `ExternalChecksModule`.

## LoanApplicationsModule

- **Location:** `src/loan-applications`
- **Contents:**
  - CRUD APIs for loan applications
  - `ApplicationDocuments` sub-feature for uploading supporting documents
  - `LoanApplicationHistory` to track status changes
  - `LoanApplicationPdfService` for PDF generation
  - Exports `LoanApplicationsService`
- **Use:** Imported by `AppModule`; other modules (like underwriting) can inject `LoanApplicationsService`.

### ApplicationProcessingModule

- **Location:** `src/loan-applications/application-processing`
- **Contents:** BullMQ queue processors (`LoanProcessingProducer` and `LoanProcessingProcessor`) and the `DecisionEngine` used to orchestrate external checks and underwriting rules.
- **Use:** Imported with `forwardRef(() => LoanApplicationsModule)` so that processing jobs can modify applications. Provides the `LoanProcessingProducer` for queueing jobs.

## LoanOffersModule

- **Location:** `src/loan-offers`
- **Contents:** entity, service, resolver and controller for loan offer management.
- **Use:** Provides `LoanOffersService`; imported by `AppModule`.

## ProductsModule

- **Location:** `src/products`
- **Contents:** manages product categories, makes and models. The module exports three services used when associating loan offers or applications with a product model.
- **Use:** Import when you need to query or modify products.

## UnderwritingModule

- **Location:** `src/underwriting`
- **Contents:**
  - `ManualReviews` for human underwriter input
  - `UnderwritingRules` containing rule definitions
  - `UnderwritingResults` to store outcomes
- **Use:** Imported by `AppModule` and leveraged by `ApplicationProcessingModule` to make approve/decline decisions.

## UsersModule

- **Location:** `src/users`
- **Contents:** user entities (consumer and vendor), GraphQL resolvers, REST controllers and the embedded `BlacklistModule`.
- **Use:** Import for any features that need user lookups or creation.

### BlacklistModule

- **Location:** `src/users/blacklist`
- **Contents:** service, resolver and controller for the user blacklist.
- **Use:** Can be imported alone or via `UsersModule` to check whether a user is blocked.

## Miscellaneous Modules

- **DashboardModule** – simple metrics endpoint, covered above.
- **Real-time Gateway** – `src/realtime/loan-status.gateway.ts` (not a module but provides WebSocket events).
- **Health-check** – controller/service for `/health` endpoint; no dedicated module.

All modules live under `src/` and are wired together in `AppModule`. Refer to this guide whenever you need to locate a service or understand what each module provides.
