DROP TABLE "users" CASCADE;--> statement-breakpoint
ALTER TABLE "invoices" ADD COLUMN "userId" text NOT NULL;