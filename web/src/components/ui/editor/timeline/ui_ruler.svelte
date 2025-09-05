<script lang="ts">
	import UiMarker from './ui_marker.svelte';

	let { zoom, marker }: { zoom: number; marker: number } = $props();

	const handleMarker = {
		mouseOver: (e: MouseEvent) => {
			marker = e.offsetX;
		},
		mouseLeave: () => {
			//zoom = 0;
		}
	};
</script>

<div
	class="ruler"
	style={`--zoom: ${zoom}`}
	onmouseover={handleMarker.mouseOver}
	onmouseout={handleMarker.mouseLeave}
	onblur={handleMarker.mouseLeave}
	role="region"
	aria-label="video timeline ruler"
>
	<UiMarker {marker} />
</div>

<style>
	.ruler {
		height: 5px;

		grid-column: 2;
		border-top: 1px solid var(--muse-colours-subtle-light-solid);

		background-image: repeating-linear-gradient(
			to right,
			var(--muse-colours-subtle-light-solid),
			var(--muse-colours-subtle-light-solid) 1px,
			transparent 1px,
			transparent calc(50px * var(--zoom, 1))
		);
	}
</style>
