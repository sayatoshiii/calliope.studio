<script lang="ts">
	import { AudioLines, Film } from '@lucide/svelte';
	import { EditorTimelineTrackType, type EditorTimelineTrack } from '../types';
	let { id, track }: { id: string; track: EditorTimelineTrack } = $props();

	let trackType = track?.type === EditorTimelineTrackType.VIDEO ? 'Video' : 'Audio';
	let TrackIcon = $derived(track?.type === EditorTimelineTrackType.VIDEO ? Film : AudioLines);
</script>

<section class="track">
	<aside class="info">
		<TrackIcon />
		{trackType}
		{track?.position}
	</aside>
	<div class="timeline"></div>
</section>

<style>
	.track {
		display: flex;
		flex-flow: row nowrap;

		flex: 1 1;
		overflow: auto;
	}

	.info {
		display: flex;
		flex-flow: row wrap;

		align-items: center;
		gap: var(--muse-layout-gap-sm);
	}

	.timeline {
		flex: 1 1;
	}

	.track:nth-of-type(even) .timeline {
		background: red;
	}
</style>
