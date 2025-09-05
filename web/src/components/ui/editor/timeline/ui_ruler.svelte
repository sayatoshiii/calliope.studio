<script lang="ts">
	let { zoom }: { zoom: number } = $props();
</script>

<div class="ruler" style={`--zoom: ${zoom}`}></div>

<style>
	.ruler {
		grid-row: 0;
		grid-column: 2;

		height: 5px;

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
