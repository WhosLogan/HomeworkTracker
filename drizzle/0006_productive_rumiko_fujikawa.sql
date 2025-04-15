DROP INDEX "users_email_unique";--> statement-breakpoint
ALTER TABLE `assignments` ALTER COLUMN "status" TO "status" text NOT NULL DEFAULT 'Incomplete';--> statement-breakpoint
CREATE UNIQUE INDEX `users_email_unique` ON `users` (`email`);