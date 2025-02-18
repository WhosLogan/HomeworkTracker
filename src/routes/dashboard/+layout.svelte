<script lang="ts">
	const { children } = $props();
</script>

<div class="flex">
	<div class="h-screen flex">
		<p>Homework Tracker</p>
	</div>

	{@render children()}
</div>
