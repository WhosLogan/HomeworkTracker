<script lang="ts">
	import { Button, Helper, Input, Label, Toast } from 'flowbite-svelte';
	import { superForm } from 'sveltekit-superforms';
	import {CheckCircleSolid} from "flowbite-svelte-icons";

	const {data} = $props();

	const { form: changePasswordForm, enhance: changePasswordEnhance, errors: changePasswordErrors,
		message: changePasswordMessage } = superForm(data.changePasswordForm);
</script>

<div class="fixed bottom-2 right-2">
	{#if $changePasswordMessage}
		<Toast color="green">
			<svelte:fragment slot="icon">
				<CheckCircleSolid class="w-5 h-5" />
				<span class="sr-only">Check icon</span>
			</svelte:fragment>
			{$changePasswordMessage}
		</Toast>
	{/if}
</div>

<div class="flex flex-col space-y-5">
	<h1 class="text-2xl font-semibold self-center">Settings</h1>

	<div class="border rounded-lg p-3 shadow-sm space-y-4">
		<h2 class="text-xl self-start">Change Password</h2>
		<form class="flex flex-col space-y-4" method="post" action="?/changePassword"
					use:changePasswordEnhance>
			<Label class="space-y-2">
				<span>Current Password</span>
				<Input name="currentPassword" placeholder="•••••" type="password" 
							 bind:value={$changePasswordForm.currentPassword} />
				{#if $changePasswordErrors.currentPassword}
					<Helper color='red'>{$changePasswordErrors.currentPassword}</Helper>
				{/if}
			</Label>

			<Label class="space-y-2">
				<span>New Password</span>
				<Input name="newPassword" placeholder="•••••" type="password"
							 bind:value={$changePasswordForm.newPassword} />
				{#if $changePasswordErrors.newPassword}
					<Helper color='red'>{$changePasswordErrors.newPassword}</Helper>
				{/if}
			</Label>

			<Label class="space-y-2">
				<span>Confirm Password</span>
				<Input name="confirmPassword" placeholder="•••••" type="password"
							 bind:value={$changePasswordForm.confirmPassword} />
				{#if $changePasswordErrors.confirmPassword}
					<Helper color='red'>{$changePasswordErrors.confirmPassword}</Helper>
				{/if}
			</Label>
			
			<Button type="submit">Change Password</Button>
		</form>
	</div>
</div>