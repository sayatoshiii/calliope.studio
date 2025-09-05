<script lang="ts">
	import UiMarker from './ui_marker.svelte';

	let { zoom, marker }: { zoom: number; marker: number } = $props();

	const handleMarker = {
		mouseOver: (e: MouseEvent) => {
			marker = e.offsetX;
		}
	};
</script>

<div
	class="ruler"
	style={`--zoom: ${zoom}`}
	onmousemove={handleMarker.mouseOver}
	role="region"
	aria-label="video timeline ruler"
>
	<UiMarker {marker} />
</div>

<style>
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
