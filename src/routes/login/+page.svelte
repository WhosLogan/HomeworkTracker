<script>
	import { Label, Input, Button, Checkbox } from 'flowbite-svelte';
</script>

<div class="flex items-center justify-center h-screen bg-primary-100">
	<form class="flex flex-col border-black space-y-3 w-11/12 md:w-96 bg-white shadow-lg
	 shadow-primary-200 p-4 rounded-lg">
		<h3 class="mb-4 text-xl font-medium">Sign in</h3>
		<Label class="space-y-2">
			<span>Email</span>
			<Input type="email" name="email" placeholder="name@email.com" required />
		</Label>
		<Label class="space-y-2">
			<span>Password</span>
			<Input type="password" name="password" placeholder="•••••" required />
		</Label>
		<Checkbox>Remember me</Checkbox>
		<Button>Sign In</Button>
		<a href="/register" class="text-primary-700 hover:text-primary-700/80">
			Don't have an account?
		</a>
	</form>
</div>