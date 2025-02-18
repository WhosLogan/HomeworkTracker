import { type Handle, redirect } from '@sveltejs/kit';
import { sessionName, validateSessionToken } from '$lib/server/auth/session';

export const sessionMiddleware: Handle = async ({ event, resolve }) => {
	const sessionToken = event.cookies.get(sessionName);
	if (!sessionToken) {
		event.locals.user = null;
		event.locals.session = null;
		return resolve(event);
	}

	const { session, user, update } = await validateSessionToken(sessionToken);

	if (!user || !session) {
		event.cookies.delete(sessionName, {
			path: "/"
		});
		event.locals.user = null;
		event.locals.session = null;
		return resolve(event);
	}

	if (update) {
		event.cookies.set(sessionName, sessionToken, {
			httpOnly: true,
			sameSite: "strict",
			expires: session.expiresAt,
			path: "/"
		});
	}

	user.password = "redacted";

	event.locals.user = user;
	event.locals.session = session;
	return resolve(event);
};


export const protectPages: Handle = async ({event, resolve}) => {
	if (event.url.pathname.startsWith('/dashboard')) {
		if (event.locals.user === null || event.locals.session === null) {
			throw redirect(303, '/login');
		}
	}

	return resolve(event);
}