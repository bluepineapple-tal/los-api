# TypeORM Migrations Guide

This guide provides a step-by-step process for managing TypeORM migrations in your project.

## 1️⃣ Prerequisites

Ensure you have the following installed:

- Node.js (Latest LTS recommended)
- NPM (Comes with Node.js)
- PostgreSQL (Configured via .env)
- TypeORM CLI (Installed in node_modules)

## 2️⃣ Migration Commands

Below are the key commands to create, run, and revert migrations.

### 🔹 Generate a new migration

To generate a migration file automatically based on your entity changes, use:

``` bash
npm run typeorm migration:generate migrations/<MigrationName>
```

Example:

```bash
npm run typeorm migration:generate migrations/InitSchema
```

💡 This will create a new migration file inside the migrations/ folder.

### 🔹 Run all pending migrations

To apply all new migrations and update the database schema:

```bash
npm run typeorm migration:run
```

💡 This will execute all migrations that haven't been applied yet.

### 🔹 Revert the last migration

If you need to undo the last migration, run:

```bash
npm run typeorm migration:revert
```

💡 This will roll back the most recent migration.

### 🔹 View the list of migrations

To check which migrations have been applied and which are pending:

```bash
npm run typeorm migration:show
```

## 3️⃣ Configuration Overview

The migrations are configured using TypeORM CLI with the following scripts in `package.json`:

```json
"scripts": {
  "typeorm": "NODE_ENV=development ts-node -r tsconfig-paths/register ./node_modules/typeorm/cli.js -d ./typeorm-cli.config.ts",
  "migration:create": "NODE_ENV=development ts-node -r tsconfig-paths/register ./node_modules/typeorm/cli.js migration:create"
}
```

- The typeorm command wraps TypeORM CLI with environment settings.
- The migration:create command allows you to create a blank migration manually.

## 4️⃣ Common Issues & Troubleshooting

### ❌ Error: "Cannot find module 'typeorm'"

✅ Fix: Run the following command to install missing dependencies:

```bash
npm install
```

### ❌ Error: "No changes detected" when generating a migration

✅ Fix: Ensure:

- Your entity files are correct.
- `synchronize: false` is set in `typeorm-cli.config.ts`.
- You made actual schema changes before running `migration:generate`.

### ❌ Error: "relation already exists" when running migration

✅ Fix: The table might already exist from a previous migration. Try:

```bash
npm run typeorm migration:revert
npm run typeorm migration:run
```

## 5️⃣ Best Practices

- ✔️ Run migration:generate after making entity changes.
- ✔️ Commit migration files to Git to keep database versions consistent.
- ✔️ Do not modify existing migrations once applied to avoid schema inconsistencies.
- ✔️ Use migration:revert cautiously in production environments.

## 6️⃣ Example Workflow

### Scenario: You modified an entity

🔹 You changed the User entity by adding a phone column.

Step 1: Generate a migration

```bash
npm run typeorm migration:generate migrations/AddPhoneToUser
```

💡 This creates a file like `1654872345678-AddPhoneToUser.ts`.

Step 2: Run the migration

```bash
npm run typeorm migration:run
```

🔹 Now your database is updated with the new schema!

## 7️⃣ Summary of Commands

| Command    | Description |
| -------- | ------- |
| `npm run typeorm migration:generate migrations/{Name}`  | Create a new migration based on entity changes    |
| `npm run typeorm migration:run` |  Apply all pending migrations    |
| `npm run typeorm migration:revert`    | Revert the last migration    |
| `npm run typeorm migration:show`    | Show migration history    |
