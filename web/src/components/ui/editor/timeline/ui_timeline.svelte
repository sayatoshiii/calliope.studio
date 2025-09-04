<script lang="ts">
	import UiTrack from './track/ui_track.svelte';
	import type { EditorTimelineProps } from './types';

	let timeline: EditorTimelineProps = $props();
</script>

<section class="timeline">
	{#each Object.entries(timeline?.tracks ?? {}) as [id, track]}
		<UiTrack {id} {track} />
	{/each}
</section>

<style>
	.timeline {
		flex: 1 1;
	}
</style>
