<script lang="ts">
	import { Badge, Table, TableBody, TableBodyRow, TableHead, TableHeadCell } from 'flowbite-svelte';
	import { toUTCDateString } from '$lib/dateHelper';

	const {data} = $props();

	type dueAssignment = {
		name: string,
		course: string,
		due: string
	}

	let dueToday: dueAssignment = [];
	let dueSoon: dueAssignment = [];

	const nowDate = toUTCDateString(new Date(Date.now()));

	function getFutureDates(): string[] {
		let future: string[] = [];
		const now = new Date(Date.now());
		for (let i = 1; i < 2; i++) {
			const date = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() + i));
			future.push(toUTCDateString(date));
		}
		return future;
	}

	let futureDates = getFutureDates();

	for (const course of data.courses) {
		for (const assignment of course.assignments) {
			if (assignment.status === "Complete") continue;
			if (assignment.dueDate === nowDate) {
				dueToday.push({
					name: assignment.name,
					course: course.name,
					due: assignment.dueDate
				});
				continue;
			}
			if (futureDates.includes(assignment.dueDate)) {
				dueSoon.push({
					name: assignment.name,
					course: course.name,
					due: assignment.dueDate
				});
			}
		}
	}
</script>

<h1 class="text-2xl font-semibold">Dashboard</h1>

<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-10 gap-3">
	<div class="border rounded-lg p-3 shadow-sm space-y-4">
		<h2 class="font-semibold text-xl">
			Due Today
			{#if dueToday.length > 0}
				<Badge color="red">{dueToday.length}</Badge>
			{:else}
				<Badge color="green">0</Badge>
			{/if}
		</h2>
		{#if dueToday.length > 0}
			<Table>
				<TableHead>
					<TableHeadCell>Name</TableHeadCell>
					<TableHeadCell>Course</TableHeadCell>
					<TableHeadCell>Due Date</TableHeadCell>
				</TableHead>
				<TableBody>
					{#each dueToday as assignment}
						<TableBodyRow>
							<TableHeadCell>{assignment.name}</TableHeadCell>
							<TableHeadCell>{assignment.course}</TableHeadCell>
							<TableHeadCell>{assignment.due}</TableHeadCell>
						</TableBodyRow>
					{/each}
				</TableBody>
			</Table>
		{:else}
			<p class="text-center m-4">Congratulations, you're all caught up!</p>
		{/if}
	</div>

	<div class="border rounded-lg p-3 shadow-sm space-y-4">
		<h2 class="font-semibold text-xl">
			Due Soon
			{#if dueSoon.length > 0}
				<Badge color="red">{dueSoon.length}</Badge>
			{:else}
				<Badge color="green">0</Badge>
			{/if}
		</h2>
		{#if dueSoon.length > 0}
			<Table>
				<TableHead>
					<TableHeadCell>Name</TableHeadCell>
					<TableHeadCell>Course</TableHeadCell>
					<TableHeadCell>Due Date</TableHeadCell>
				</TableHead>
				<TableBody>
					{#each dueSoon as assignment}
						<TableBodyRow>
							<TableHeadCell>{assignment.name}</TableHeadCell>
							<TableHeadCell>{assignment.course}</TableHeadCell>
							<TableHeadCell>{assignment.due}</TableHeadCell>
						</TableBodyRow>
					{/each}
				</TableBody>
			</Table>
		{:else}
			<p class="text-center m-4">Congratulations, you're all caught up!</p>
		{/if}
	</div>
</div>