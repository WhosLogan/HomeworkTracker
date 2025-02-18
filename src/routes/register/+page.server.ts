import { type Actions, fail, redirect } from '@sveltejs/kit';
import z from "zod";
import type { PageServerLoad } from './$types';
import { setError, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { db } from '$lib/server/db';
import { eq } from 'drizzle-orm';
import { users } from '$lib/server/db/schema';
import { hashPassword } from '$lib/server/auth/hashing';
import { createSession, generateSecureToken, sessionName } from '$lib/server/auth/session';

const registerSchema = z.object({
	firstName: z.string().trim().min(2, "First Name is too short").max(20, "First Name is too long"),
	lastName: z.string().trim().min(2, "Last Name is too short").max(20, "Last Name is too long"),
	email: z.string().trim().toLowerCase()
		.email("Email is invalid").max(100, "Email is too long"),
	password: z.string().min(8, "Password is too short").max(128, "Password is too long"),
});

export const load: PageServerLoad = async ({locals}) => {
	if (locals.user) {
		throw redirect(303, '/dashboard');
	}

	const registerForm = await superValidate(zod(registerSchema));

	return {
		registerForm
	}
}

// TODO: Add remember me functionality
export const actions: Actions = {
	default: async ({request, cookies}) => {
		// Validate form
		const registerForm = await superValidate(request,
			zod(registerSchema));

		if (!registerForm.valid) {
			return fail(400, {registerForm});
		}

		// Try to fetch user
		const exists = await db.query.users.findFirst({
			columns: {
				id: true,
			},
			where: eq(users.email, registerForm.data.email)
		});

		if (exists) {
			return setError(registerForm, 'email', 'Email already exists.');
		}

		// Create user
		const user = await db.insert(users).values({
			firstName: registerForm.data.firstName,
			lastName: registerForm.data.lastName,
			email: registerForm.data.email,
			password: hashPassword(registerForm.data.password),
		}).returning();

		// Create token
		const token = generateSecureToken();

		// Create session
		const session = await createSession(token, user[0].id, false);

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