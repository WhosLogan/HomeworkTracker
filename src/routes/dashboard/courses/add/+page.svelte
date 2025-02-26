<script lang="ts">
	import { Button, Helper, Input, Label } from 'flowbite-svelte';
	import type { PageProps } from './$types';
	import { superForm } from 'sveltekit-superforms';

	const {data}: PageProps = $props();

	const {form, errors, enhance} = superForm(data.addCourseForm);
</script>

<div class="flex justify-center">
	<form method="post" class="flex flex-col items-center w-11/12 md:w-1/2 lg:w-1/3 space-y-4"
				use:enhance>
		<h1 class="text-2xl font-semibold">Add Course</h1>
		<Label class="space-y-2 w-full">
			<span>Course Title</span>
			<Input type="text" name="courseName" placeholder="MTH 102" required
						 bind:value={$form.courseName} />
			{#if $errors.courseName}
				<Helper color='red'>{$errors.courseName}</Helper>
			{/if}
		</Label>
		<Label class="space-y-2 w-full">
			<span>Professor Name (Optional)</span>
			<Input type="text" name="professorName" placeholder="Prof. Monty"
						 bind:value={$form.professorName} />
			{#if $errors.professorName}
				<Helper color='red'>{$errors.professorName}</Helper>
			{/if}
		</Label>
		<Button size="lg" type="submit">Add Course</Button>
	</form>
</div>