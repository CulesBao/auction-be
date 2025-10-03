# auction BE

Backend service for the auction application (NestJS + TypeORM).

This README covers local setup, common developer tasks, and project-specific features such as PDF export and email templates.

## Table of contents
- Overview
- Prerequisites
- Environment variables
- Install & run
- Database migrations
- Important endpoints (PDF / email)
- Templates
- Debugging & troubleshooting
- Contributing

## Overview

A NestJS backend that provides item/auction APIs, PDF export for reports and items, and scheduled email notifications. Templates live in `src/templates` and PDF/email generation is implemented using a small CQRS query handlers pattern.

## Prerequisites
- Node.js (16+ recommended)
- npm
- A running PostgreSQL instance (or the DB configured in your env)

## Environment variables
Create a `.env` or set environment variables in your environment. Common variables used by this project:

- DATABASE_URL (or DB_HOST/DB_USER/DB_PASS etc depending on your TypeORM config)
- PORT (defaults to 3000)
- JWT_SECRET / JWT_PUBLIC_KEY / JWT_PRIVATE_KEY (for auth)
- SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS (for mailer)
- GOOGLE_CLIENT_ID / GOOGLE_CLIENT_SECRET (if using Google OAuth)

Check `src/configuration` or `src/modules/*/configuration` for additional config keys used in your environment.

## Install

```powershell
# from project root
npm install
```

## Run

Development (watch mode):

```powershell
npm run start:dev
```

Production build + start:

```powershell
npm run build
npm run start:prod
```

## Database migrations

Generate a migration:

```powershell
npm run typeorm:migrate src/database/migrations/YourMigrationName
```

Run pending migrations:

```powershell
npm run migration:run
```

## Important endpoints (PDF)

Two endpoints are available to export PDFs (they stream a PDF download):

- Export a single item as PDF

	GET /api/v1/items/pdf/:id

	Example (PowerShell):
	```powershell
	curl.exe -o item.pdf http://localhost:3000/api/v1/items/pdf/<ITEM_ID>
	```

- Export winning bids by user

	GET /api/v1/items/:userId/winning-bids/pdf

	Example:
	```powershell
	curl.exe -o winning-bids.pdf http://localhost:3000/api/v1/items/<USER_ID>/winning-bids/pdf
	```

These endpoints call internal CQRS queries which render Handlebars-like HTML templates located under `src/templates` and convert them to PDF using the configured PDF engine.

## Email templates & scheduled notifications

- Email templates are located in `src/templates/*.html` (for example `notify-to-winner.html`).
- There is a scheduled job (`SendMailToWinnerSchedule`) that finds items that finished recently and prepares the context to send notification emails to winners.
- The mailer is wired through `SendMailWithTemplateQueryHandler` which uses `@nestjs-modules/mailer` — configure SMTP variables (SMTP_HOST/SMTP_PORT/SMTP_USER/SMTP_PASS) to enable sending.

## Templates

Templates used by PDF/email features are in:

```
src/templates/
	winning-bids.html
	item-detail.html
	notify-to-winner.html
```

They expect a context object (examples):

- item template: `{ item, generatedAt, reportId }`
- winning bids: `{ user, items, summary, generatedAt, reportId }`
- notify-to-winner: fields like `{ id, name, description, startTime, endTime, startingPrice, owner, winner }`

## Debugging PDF/email issues

- If the PDF endpoint returns HTML or an error page instead of a PDF, check server logs. The PDF engine (`pdf-creator-node`) may produce HTML error output when templates contain invalid markup or unsupported CSS.
- To inspect the exact HTML passed to the PDF engine, the handlers write rendered HTML to a temporary file under `./tmp/` (or you can modify `CreatePdfQueryHandler` to dump the HTML). Open that file in the browser to verify.
- For mail delivery issues, verify SMTP credentials and check logs from `@nestjs-modules/mailer`.

## Tests

Add unit/e2e tests as needed. Run tests with:

```powershell
npm test
```

## Contributing

- Follow the project's branch naming and PR conventions.
- Keep code changes small and add unit tests for logic where possible.

## Troubleshooting

- Server won't start: ensure `DATABASE_URL` and required env variables are set.
- PDF generation errors: inspect the rendered HTML in `tmp/` and adjust templates.
- Mail not sent: verify SMTP settings and check logs.

If you'd like, I can add a small `make`/`task` script or PowerShell helpers to simplify common flows (start with DB, run migrations, seed, run schedule worker, etc.).


