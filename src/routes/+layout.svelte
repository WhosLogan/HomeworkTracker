<script lang="ts">
	import '../app.css';
	let { children } = $props();
</script>

<svelte:head>
	<title>Homework Tracker</title>
</svelte:head>

{@render children()}
