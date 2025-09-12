<script lang="ts">
	import { pixelsPerMillisecond } from '../../../../utils/editor/project/media';
	import type { Project } from '../../../../utils/editor/project/types';
	import UiMarker from './ui_marker.svelte';

	let { project, zoom }: { project: Project; zoom: number } = $props();

	let isScrubbing = $state(false);
	let ruler: HTMLButtonElement | undefined;

	const updateTimestamp = (e: MouseEvent) => {
		if (!ruler) return;
		const rect = ruler.getBoundingClientRect();

		let x = e.clientX - rect.left;
		x = Math.max(0, Math.min(x, rect.width));

		project.timestamp = Math.round((x * pixelsPerMillisecond) / 100) * 100;
	};

	const onMouseDown = (e: MouseEvent) => {
		isScrubbing = true;

		updateTimestamp(e);
		window.addEventListener('mousemove', updateTimestamp);
		window.addEventListener('mouseup', onMouseUp);
	};

	const onMouseUp = () => {
		isScrubbing = false;
		window.removeEventListener('mousemove', updateTimestamp);
		window.removeEventListener('mouseup', onMouseUp);
	};
</script>

<button
	class="ruler"
	style={`--zoom: ${zoom}`}
	aria-label="video timeline ruler"
	onmousedown={onMouseDown}
	bind:this={ruler}
>
	<UiMarker {project} />
</button>

<style>
	button {
		background: none;
		color: inherit;
		border: none;
		padding: 0;
		font: inherit;
		cursor: pointer;
		outline: inherit;
	}

	.ruler {
		height: 15px;

		grid-column: 2;
		border-top: 1px solid var(--muse-colours-subtle-light-solid);

		background-image: repeating-linear-gradient(
			to right,
			var(--muse-colours-subtle-light-solid),
			var(--muse-colours-subtle-light-solid) 1px,
			transparent 1px,
			transparent calc(50px * var(--zoom, 1))
		);

		-webkit-user-select: none;
		user-select: none;

		cursor: pointer;
	}
</style>
