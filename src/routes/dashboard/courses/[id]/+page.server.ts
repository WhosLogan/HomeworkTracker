import type { PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import { and, eq } from 'drizzle-orm';
import { courses } from '$lib/server/db/schema';

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

	return {course};
}