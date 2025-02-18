import { sqliteTable, integer, text } from 'drizzle-orm/sqlite-core';
import type { InferSelectModel } from 'drizzle-orm';

export const users = sqliteTable('users', {
	id: integer('id').primaryKey(),
	firstName: text('first_name').notNull(),
	lastName: text('last_name').notNull(),
	email: text('email').notNull().unique(),
	password: text('password').notNull(),
});

export const sessions = sqliteTable('sessions', {
	id: text('id').primaryKey(),
	userId: integer('user_id').notNull()
		.references(() => users.id),
	expiresAt: integer('expires_at', {mode: 'timestamp'}).notNull(),
	rememberMe: integer('remember_me').default(0),
});

export const courses = sqliteTable('courses', {
	id: integer('id').primaryKey(),
	name: text('name').notNull(),
	professorName: text('professor_name'),
});

export const assignments = sqliteTable('assignments', {
	id: integer('id').primaryKey(),
	courseId: integer('course_id').notNull()
		.references(() => courses.id),
	assignmentName: text('assignment_name').notNull(),
	dueDate: integer('due_date').notNull(),
});

export type Session = InferSelectModel<typeof sessions>;
