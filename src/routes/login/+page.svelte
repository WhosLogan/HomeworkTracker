<script lang="ts">
	import { Label, Input, Button, Checkbox, Helper, Spinner } from 'flowbite-svelte';
	import { superForm } from 'sveltekit-superforms';
	import type {PageProps} from "./$types";

	const {data}: PageProps = $props();

	const {form, enhance, errors, delayed, submitting} = superForm(data.loginForm);
</script>

<div class="flex items-center justify-center h-screen bg-primary-100">
	<form class="flex flex-col border-black space-y-3 w-11/12 md:w-96 bg-white shadow-lg
	 shadow-primary-200 p-4 rounded-lg" method="post" use:enhance>
		<h3 class="mb-4 text-xl font-medium">Sign in</h3>
		<Label class="space-y-2">
			<span>Email</span>
			<Input type="email" name="email" placeholder="name@email.com" required
						 bind:value={$form.email}/>
			{#if $errors.email}
				<Helper color='red'>{$errors.email}</Helper>
			{/if}
		</Label>
		<Label class="space-y-2">
			<span>Password</span>
			<Input type="password" name="password" placeholder="•••••" required
						 bind:value={$form.password} />
			{#if $errors.password}
				<Helper color='red'>{$errors.password}</Helper>
			{/if}
		</Label>
		<Checkbox>Remember me</Checkbox>
		<Button type="submit" disabled={$submitting}>
			{#if $delayed}
				<Spinner class="me-3" size="4" />
			{/if}
				Sign In
		</Button>
		<a href="/register" class="text-primary-700 hover:text-primary-700/80">
			Don't have an account?
		</a>
	</form>
</div>