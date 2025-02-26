import { type Actions, fail, redirect } from '@sveltejs/kit';
import z from 'zod';
import type { PageServerLoad } from './$types';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { db } from '$lib/server/db';
import { courses } from '$lib/server/db/schema';

const addCourseSchema = z.object({
	courseName: z.string().min(3, "Course name must be at least 3 characters")
		.max(45, "Course name must not exceed 45 characters"),
	professorName: z.string().max(25, "Professor name must not exceed 25 characters").optional(),
})

export const load: PageServerLoad = async () => {
	const form = await superValidate(zod(addCourseSchema));
	return {addCourseForm: form};
}

export const actions: Actions = {
	default: async ({locals, request}) => {
		const form = await superValidate(request, zod(addCourseSchema));
		if (!form.valid) {
			return fail(400, {form});
		}

		const course = await db.insert(courses).values({
			name: form.data.courseName,
			professorName: form.data.professorName ?? undefined,
			userId: locals.user!.id
		}).returning();

		redirect(303, `/dashboard/courses/${course[0].id}`);
	}
}