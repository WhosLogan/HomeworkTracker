<script lang="ts">
	import type { PageProps } from './$types';

	const {data}: PageProps = $props();
</script>

<div class="flex flex-col items-center">
	<h1 class="text-xl font-semibold">{data.course.name}</h1>
	{#if data.course.professorName}
		<p>Professor: {data.course.professorName}</p>
	{/if}
</div>