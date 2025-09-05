<script>
	import { Play } from '@lucide/svelte';
</script>

<section class="controls">
	<div class="panel">
		<Play />
	</div>
</section>

<style>
	.controls {
		display: flex;
		flex-flow: row nowrap;

		justify-content: center;
		align-items: center;

		gap: var(--muse-layout-spacing-lg);

		padding: var(--muse-layout-spacing-md);
		border-top: 1px solid var(--muse-colours-subtle-light);
	}

	.panel {
		display: flex;
		flex-flow: row nowrap;

		justify-content: center;
		align-items: center;

		gap: var(--muse-layout-spacing-md);
		color: var(--muse-colours-muted-solid);
	}
</style>
