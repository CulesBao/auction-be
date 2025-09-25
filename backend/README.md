# Auction BE (backend)

Backend for an auction system — built with NestJS, TypeORM and CQRS.

## Overview
- Provides REST APIs for managing users, items, and bids.
- Uses CQRS to separate commands and queries.
- Uses TypeORM for persistence and migrations (Postgres).
- Swagger is available for API documentation.

## Architecture
- NestJS
- TypeORM (Postgres)
- CQRS (@nestjs/cqrs)
- Swagger (`@nestjs/swagger`)

## Requirements
- Node.js 18+ (or compatible LTS)
- PostgreSQL 12+

## Environment configuration
Create a `.env` file at the project root (example):

```
APP_PORT=3000

DATABASE_TYPE=postgres
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USERNAME=postgres
DATABASE_PASSWORD=password
DATABASE_NAME=auction_db
```

## Install
```bash
npm install
```

## Run
- Development:
```bash
npm run start:dev
```
- Production (build + run):
```bash
npm run build
npm run start:prod
```

## Database migrations (TypeORM)
- Create a migration:
```bash
npm run typeorm -- migration:create ./src/database/migrations/NameOfMigration
```
- Run migrations:
```bash
npm run typeorm:run
```

Note: TypeORM CLI is configured to load the data source from `src/database/data-source.ts`, which reads `.env` directly. Ensure environment variables are set before running migrations.

## Swagger
- Once the app is running, open `http://localhost:3000/api` to view the Swagger documentation.

## Development practices
- Write unit tests for services and CQRS handlers.
- Use mappers to convert DTOs ↔ Commands ↔ Domain models.
- Use domain services (e.g. `BidDomainService`) to encapsulate business rules; handlers should orchestrate only.

## Hooks & linting
- Husky + lint-staged + ESLint + Prettier are configured.
- `lint-staged` runs `npm run lint` and `npm run format` on staged files before commit.

## Important folders
- `src/modules/users` — users module (entities, dto, service, cqrs)
- `src/modules/items` — items module
- `src/modules/bids` — bids module
- `src/database` — TypeORM config & data-source
- `src/main.ts` — application entrypoint (Swagger setup, global filters/pipes)

## Contributing
- Create feature branches (`feat/*`) and open pull requests against `main`.
- Add tests for significant changes.

---

If you'd like, I can add a "Quick start with Docker" section (Postgres container + env) or expand the README with CI/CD commands.

