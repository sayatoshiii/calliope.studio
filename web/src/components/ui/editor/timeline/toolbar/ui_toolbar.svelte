<script lang="ts">
	import { formatTimestamp } from '../../../../../utils/editor/project/media';
	import type { Project } from '../../../../../utils/editor/project/types';

	let { project }: { project: Project } = $props();
</script>

<div class="toolbar">
	<section></section>
	<section class="timestamp">
		<p><strong>{formatTimestamp(project.timestamp)}</strong> / 02:30:00</p>
	</section>
	<section></section>
</div>

<style>
	.toolbar {
		display: flex;
		flex-flow: row nowrap;

		justify-content: space-between;
		align-items: center;
	}

	.timestamp {
		color: var(--muse-colours-muted);
	}

	.timestamp strong {
		color: var(--muse-colours-semi-important);
	}
</style>
