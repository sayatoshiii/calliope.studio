<script lang="ts">
	let { marker }: { marker: number } = $props();
</script>

<div class="marker" style={`--position: ${marker}px`}>
	<div class="tag"></div>
</div>

<style>
	.marker {
		width: 1px;

		position: absolute;

		top: 0;
		bottom: 0;

		background-color: var(--muse-colours-muted-solid);
		transform: translateX(var(--position));
		transition: transform 0.25s ease;
	}

	.tag {
		position: absolute;

		top: -8px;
		left: -2.5px;

		width: 6px;
		height: 10px;

		background-color: var(--muse-colours-muted-solid);
		clip-path: polygon(100% 0, 100% 75%, 50% 100%, 0 75%, 0 0);
	}
</style>
