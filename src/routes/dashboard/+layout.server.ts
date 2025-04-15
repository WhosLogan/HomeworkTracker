import type { LayoutServerLoad } from './$types';
import { db } from '$lib/server/db';
import { eq } from 'drizzle-orm';
import { assignments, courses } from '$lib/server/db/schema';
import { toUTCDateString } from '$lib/dateHelper';

type Assignment = {
	id: number;
	name: string;
	dueDate: string;
	status: "Incomplete"|"Complete"|null;
}

type Course = {
	id: number;
	name: string;
	professor: string|null;
	assignments: Assignment[];
}

export const load: LayoutServerLoad = async ({locals}) => {
	const userCourses = await db.query.courses.findMany({
		where: eq(courses.userId, locals.user!.id)
	});

	const filteredCourses: Course[] = [];

	for (const course of userCourses) {
		const filteredCourse: Course = {
			id: course.id,
			name: course.name,
			professor: course.professorName,
			assignments: []
		}

		const userAssignments = await db.query.assignments.findMany({
			where: eq(assignments.courseId, course.id),
		});

		for (const assignment of userAssignments) {
			filteredCourse.assignments.push({
				id: assignment.id,
				name: assignment.assignmentName,
				dueDate: toUTCDateString(assignment.dueDate),
				status: assignment.status,
			})
		}

		filteredCourses.push(filteredCourse);
	}

	return {
		user: locals.user,
		courses: filteredCourses
	}
}