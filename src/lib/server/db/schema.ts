import { sqliteTable, integer, text } from 'drizzle-orm/sqlite-core';

export const user = sqliteTable('user', {
	id: integer('id').primaryKey(),
	firstName: text('first_name').notNull(),
	lastName: text('last_name').notNull(),
	email: text('email').notNull().unique(),
	password: text('password').notNull(),
});

export const session = sqliteTable('session', {
	id: text('id').primaryKey(),
	userId: integer('user_id').notNull()
		.references(() => user.id),
	expiresAt: integer('expires_at', {mode: 'timestamp'}).notNull(),
	rememberMe: integer('remember_me').default(0),
})