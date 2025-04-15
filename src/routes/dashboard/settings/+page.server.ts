import z from 'zod';
import { message, setError, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { type Actions, error, fail } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import { assignments, courses, users } from '$lib/server/db/schema';
import { and, eq } from 'drizzle-orm';
import { hashPassword, verifyPassword } from '$lib/server/auth/hashing';

const changePasswordSchema = z.object({
	currentPassword: z.string().min(8, "Current password is too short").max(128, "Current password is too long"),
	newPassword: z.string().min(8, "New password is too short").max(128, "New password is too long"),
	confirmPassword: z.string(),
}).refine(data => data.newPassword === data.confirmPassword, {
	path: ['confirmPassword'],
	message: 'New passwords must match'
});

export const load = async ({locals}) => {
	const form = await superValidate(zod(changePasswordSchema));
	const userCourses = await db.query.courses.findMany({
		where: eq(courses.userId, locals.user!.id)
	});

	return {
		changePasswordForm: form,
		courses: userCourses
	}
}

export const actions: Actions = {
	changePassword: async ({request, locals}) => {
		const form = await superValidate(request,
			zod(changePasswordSchema));

		if (!form.valid) {
			return fail(400, {form});
		}

		const user = await db.query.users.findFirst({
			where: eq(users.id, locals.user!.id)
		});

		if (!user) {
			error(500, 'Internal server error');
		}

		if (!verifyPassword(form.data.currentPassword, user.password)) {
			return setError(form, 'currentPassword', 'Invalid current password');
		}

		await db.update(users).set({
			password: hashPassword(form.data.confirmPassword)
		});

		return message(form, 'Changed password successfully');
	},
	deleteCourse: async ({request, locals}) => {
		const form = await request.formData();
		const courseId = parseInt(form.get('courseId') as string);

		const course = await db.query.courses.findFirst({
			where: and(eq(courses.id, courseId), eq(courses.userId, locals.user!.id))
		});

		if (!course) {
			error(400, "Invalid request");
		}

		await db.delete(assignments).where(eq(assignments.courseId, course.id));
		await db.delete(courses).where(eq(courses.id, course.id));
	}
}