import type { PageServerLoad } from './$types';
import { setError, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import z from "zod";
import { type Actions, fail, redirect } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import { users } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import { verifyPassword } from '$lib/server/auth/hashing';
import { createSession, generateSecureToken, sessionName } from '$lib/server/auth/session';

const loginSchema = z.object({
	email: z.string().trim().toLowerCase()
		.email("Email is invalid").max(100, "Email is too long"),
	password: z.string().min(8, "Password is too short").max(128, "Password is too long"),
});

export const load: PageServerLoad = async ({locals}) => {
	if (locals.user) {
		throw redirect(303, '/dashboard');
	}

	const loginForm = await superValidate(zod(loginSchema));

	return {loginForm};
}

export const actions: Actions = {
	default: async ({request, cookies}) => {
		const form =
			await superValidate(request, zod(loginSchema));

		if (!form.valid) {
			return fail(400, {form});
		}

		const user = await db.query.users.findFirst({
			where: eq(users.email, form.data.email)
		});

		if (!user) {
			setError(form, 'password', 'Invalid Email or Password');
			return setError(form, 'email', 'Invalid Email or Password');
		}

		if (!verifyPassword(form.data.password, user.password)) {
			setError(form, 'password', 'Invalid Email or Password');
			return setError(form, 'email', 'Invalid Email or Password');
		}

		// Create token
		const token = generateSecureToken();

		// Create session
		const session = await createSession(token, user.id, false);

		// Add the session
		cookies.set(sessionName, token, {
			httpOnly: true,
			sameSite: "strict",
			expires: session.expiresAt,
			path: "/"
		});

		// Redirect to dashboard
		redirect(302, "/dashboard");
	}
}