CREATE TABLE `assignments` (
	`id` integer PRIMARY KEY NOT NULL,
	`course_id` integer NOT NULL,
	`assignment_name` text NOT NULL,
	`due_date` integer NOT NULL,
	FOREIGN KEY (`course_id`) REFERENCES `courses`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `courses` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`professor_name` text
);
