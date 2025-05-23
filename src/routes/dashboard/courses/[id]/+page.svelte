<script lang="ts">
	import type { PageProps } from './$types';
	import {
		Badge,
		Button,
		Helper,
		Input,
		Label,
		Modal, Spinner,
		Table,
		TableBody, TableBodyCell,
		TableBodyRow,
		TableHead,
		TableHeadCell
	} from 'flowbite-svelte';
	import { superForm } from 'sveltekit-superforms';
	import {toUTCDateString} from '$lib/dateHelper';

	const {data}: PageProps = $props();

	let addMenu = $state(false);

	const {enhance: addAssignmentEnhance, form: addAssignmentForm, errors: addAssignmentErrors,
		delayed: addAssignmentDelayed,
		submitting: addAssignmentSubmitting} = superForm(data.addAssignmentForm, {
		onResult: async ({result}) => {
			if (result.type === 'success') addMenu = false;
		}
	});

	const {enhance: changeAssignmentEnhance, delayed: changeAssignmentDelayed,
		submitting: changeAssignmentSubmitting} = superForm(data.changeAssignmentForm);
</script>

<div class="flex flex-col items-center">
	<h1 class="text-xl font-semibold">{data.course.name}</h1>
	{#if data.course.professorName}
		<p>Professor: {data.course.professorName}</p>
	{/if}
</div>

<!-- Assignment Display -->

{#if data.assignments.length > 0}
	<Table class="mt-10">
		<TableHead>
			<TableHeadCell>Assignment Name</TableHeadCell>
			<TableHeadCell>Due Date</TableHeadCell>
			<TableHeadCell>Status</TableHeadCell>
			<TableHeadCell>Actions</TableHeadCell>
		</TableHead>
		<TableBody>
			{#each data.assignments as assignment}
				<TableBodyRow>
					<TableBodyCell>{assignment.assignmentName}</TableBodyCell>
					<TableBodyCell>{toUTCDateString(assignment.dueDate)}</TableBodyCell>
					<TableBodyCell>
						{#if assignment.status === 'Incomplete'}
							<Badge color="yellow">Incomplete</Badge>
						{:else}
							<Badge color="green">Complete</Badge>
						{/if}
					</TableBodyCell>
					<TableBodyCell>
						<div class="flex space-x-3">
							<form action="?/toggleComplete" method="post" use:changeAssignmentEnhance>
								<input type="hidden" name="assignmentId" value={assignment.id} />
								{#if assignment.status === 'Incomplete'}
									<Button type="submit" disabled={$changeAssignmentSubmitting}>
										{#if $changeAssignmentDelayed}
											<Spinner class="me-3" size="4" />
										{/if}
										Mark Complete
									</Button>
								{:else}
									<Button type="submit" disabled={$changeAssignmentSubmitting}>
										{#if $changeAssignmentDelayed}
											<Spinner class="me-3" size="4" />
										{/if}
										Mark Incomplete
									</Button>
								{/if}
							</form>
							<form action="?/removeAssignment" method="post" use:changeAssignmentEnhance>
								<input type="hidden" name="assignmentId" value={assignment.id} />
								<Button color="red" type="submit" disabled={$changeAssignmentSubmitting}>Remove</Button>
							</form>
						</div>
					</TableBodyCell>
				</TableBodyRow>
			{/each}
		</TableBody>
	</Table>
{:else}
	<h2 class="text-center">Add an assignment to get started</h2>
{/if}

<Modal title="Add Assignment" bind:open={addMenu}>
	<form action="?/addAssignment" method="post" class="flex flex-col space-y-5 overflow-visible" use:addAssignmentEnhance>
		<Label class="space-y-2 w-full">
			<span>Assignment Name</span>
			<Input type="text" name="assignmentName" placeholder="My Assignment" required bind:value={$addAssignmentForm.assignmentName} />
					{#if $addAssignmentErrors.assignmentName}
						<Helper color='red'>{$addAssignmentErrors.assignmentName}</Helper>
					{/if}
		</Label>
		<Label class="space-y-2 w-full">
			<span>Due Date</span>
			<Input name="dueDate" required type="date" bind:value={$addAssignmentForm.dueDate} />
					{#if $addAssignmentErrors.dueDate}
						<Helper color='red'>{$addAssignmentErrors.dueDate}</Helper>
					{/if}
		</Label>
		<Button type="submit" disabled={$addAssignmentSubmitting}>
			{#if $addAssignmentDelayed}
				<Spinner class="me-3" size="4" />
			{/if}
			Create Assignment
		</Button>
	</form>
</Modal>

<!-- Add Assignment Button-->
<div class="fixed bottom-5 right-5">
	<Button onclick={() => addMenu = true}>Add Assignment</Button>
</div>