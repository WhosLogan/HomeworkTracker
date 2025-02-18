import { redirect, type RequestHandler } from '@sveltejs/kit';
import { invalidateSession } from '$lib/server/auth/session';

export const GET: RequestHandler = async ({locals}) => {
	if (locals.session) {
		await invalidateSession(locals.session.id);
	}

	redirect(303, '/');
}