import type { Actions, PageServerLoad } from './$types';
import { error, fail, redirect } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import { and, eq } from 'drizzle-orm';
import { assignments, courses } from '$lib/server/db/schema';
import z from 'zod';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';

const addAssignmentSchema = z.object({
	assignmentName: z.string().min(3, "Assignment Name must be at least 3 characters")
		.max(40, "Assignment Name must not exceed 40 characters"),
	dueDate: z.date({required_error: "Due date is required"}),
});

export const load: PageServerLoad = async ({locals, params}) => {
	if (isNaN(Number(params.id))) {
		redirect(303, '/dashboard');
	}

	const course = await db.query.courses.findFirst({
		where: and(eq(courses.id, parseInt(params.id)), eq(courses.userId, locals.user!.id))
	});

	if (!course) {
		redirect(303, '/dashboard');
	}

	const allAssignments = await db.query.assignments.findMany({
		where: eq(assignments.courseId, course.id)
	});

	const addAssignmentForm = await superValidate(zod(addAssignmentSchema));

	return {course, addAssignmentForm, assignments: allAssignments};
}

export const actions: Actions = {
	addAssignment: async ({request, locals, params}) => {
		const form = await superValidate(request, zod(addAssignmentSchema));

		if (!form.valid) {
			return fail(400, {form});
		}

		const course = await db.query.courses.findFirst({
			where: and(eq(courses.id, parseInt(params.id)), eq(courses.userId, locals.user!.id))
		});

		if (!course) {
			error(400, "Invalid request");
		}

		await db.insert(assignments).values({
			courseId: course.id,
			assignmentName: form.data.assignmentName,
			dueDate: form.data.dueDate
		});
	},
	removeAssignment: async ({request, locals, params}) => {
		const form = await request.formData();
		const assignmentId = parseInt(form.get('assignmentId') as string);

		const course = await db.query.courses.findFirst({
			where: and(eq(courses.id, parseInt(params.id)), eq(courses.userId, locals.user!.id))
		});

		if (!course) {
			error(400, "Invalid request");
		}

		await db.delete(assignments).where(and(eq(assignments.id, assignmentId),
			eq(assignments.courseId, course.id)));
	},
	toggleComplete: async ({request, locals, params}) => {
		const form = await request.formData();
		const assignmentId = parseInt(form.get('assignmentId') as string);

		const course = await db.query.courses.findFirst({
			where: and(eq(courses.id, parseInt(params.id)), eq(courses.userId, locals.user!.id))
		});

		if (!course) {
			error(400, "Invalid request");
		}

		const assignment = await db.query.assignments.findFirst({
			where: and(eq(assignments.id, assignmentId), eq(assignments.courseId, course.id))
		});

		if (!assignment) {
			error(400, "Invalid request");
		}

		await db.update(assignments).set({
			status: assignment.status === 'Incomplete' ? 'Complete' : 'Incomplete',
		}).where(eq(assignments.id, assignmentId));
	}
}