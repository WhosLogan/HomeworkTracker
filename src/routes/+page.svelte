<script>
	import { Button } from 'flowbite-svelte';
</script>

<div class="flex flex-col h-screen bg-primary-100">
	<!-- Webpage Heading -->
	<div class="flex flex-col space-y-4 md:space-y-0 md:flex-row justify-around mt-4">
		<div class="flex justify-center">
			<h1 class="text-2xl font-semibold">Homework Tracker</h1>
		</div>
		<div class="flex justify-around">
			<a href="/dashboard">
				<Button>Dashboard</Button>
			</a>
		</div>
	</div>

	<!-- First Body Section-->
	<div class="flex flex-col items-center space-y-4 mt-20 text-lg">
		<h2 class="font-bold text-5xl text-center mx-5">Track Homework with Ease</h2>
		<p class="text-center mx-5">Homework tracker allows easy tracking of homework assignments
			so you never miss another assignment again!</p>
		<p class="text-center mx-5">This website is currently in beta, note that some features
			may not be fully functional and data loss may occur.</p>
	</div>
</div>