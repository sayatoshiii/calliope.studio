<script lang="ts">
	import { Pause, Play } from '@lucide/svelte';
	import InputButton from '../../input/button/input_button.svelte';
	import { MuseUIColour } from '../../types';
	import type { Project } from '../../../../utils/editor/project/types';

	let { project }: { project: Project } = $props();

	let isPlaying: boolean = $state(false);
	let PlayButton = $derived(isPlaying ? Pause : Play);

	let timestampStart = 0;
	let timestampInterval: NodeJS.Timeout | undefined;

	const togglePreview = () => {
		isPlaying = !isPlaying;

		if (isPlaying) {
			timestampStart = Date.now() - project.timestamp;
			timestampInterval = setInterval(() => {
				project.timestamp = Date.now() - timestampStart;
			}, 10);
		} else {
			clearInterval(timestampInterval);
		}
	};
</script>

<section class="controls">
	<div class="panel">
		<InputButton class="rounded" colour={MuseUIColour.MUTED} onclick={togglePreview}>
			<PlayButton />
		</InputButton>
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
