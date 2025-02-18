import { type Session, sessions, type User, users } from '$lib/server/db/schema';
import { encodeBase32LowerCaseNoPadding } from '@oslojs/encoding';
import { sha256 } from '@oslojs/crypto/sha2';
import { db } from '$lib/server/db';
import { eq } from 'drizzle-orm';

export const sessionName = "auth-session";

export function generateSecureToken(): string {
	const bytes = new Uint8Array(20);
	crypto.getRandomValues(bytes);
	return encodeBase32LowerCaseNoPadding(bytes);
}

export async function createSession(token: string, userId: number, rememberMe: boolean): Promise<Session> {
	const sessionId = encodeBase32LowerCaseNoPadding(sha256(new TextEncoder().encode(token)));
	const session: Session = {
		id: sessionId,
		userId: userId,
		expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
		rememberMe: rememberMe ? 1 : 0,
	};
	await db.insert(sessions).values(session);
	return session;
}

export async function validateSessionToken(token: string): Promise<SessionValidationResult> {
	const sessionId = encodeBase32LowerCaseNoPadding(sha256(new TextEncoder().encode(token)));
	const result = await db
		.select({ user: users, session: sessions })
		.from(sessions)
		.innerJoin(users, eq(sessions.userId, users.id))
		.where(eq(sessions.id, sessionId));

	if (result.length < 1) {
		return { session: null, user: null, update: false };
	}

	const { user, session } = result[0];

	if (Date.now() >= session.expiresAt.getTime()) {
		await invalidateSession(session.id);
		return { session: null, user: null, update: false };
	}

	if (Date.now() >= session.expiresAt.getTime() - 1000 * 60 * 60 * 24 * 15) {
		session.expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 30);
		await db
			.update(sessions)
			.set({
				expiresAt: session.expiresAt
			})
			.where(eq(sessions.id, session.id));
		return { session, user, update: true };
	}

	return { session, user, update: false };
}

export async function invalidateSession(sessionId: string): Promise<void> {
	await db.delete(sessions).where(eq(sessions.id, sessionId));
}

export async function invalidateAllSessions(userId: number): Promise<void> {
	await db.delete(sessions).where(eq(sessions.userId, userId));
}


export type SessionValidationResult =
	| { session: Session; user: User, update: boolean }
	| { session: null; user: null, update: boolean };
