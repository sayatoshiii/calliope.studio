<script lang="ts">
	import { AudioLines, Film } from '@lucide/svelte';
	import { EditorTimelineTrackType, type EditorTimelineTrack } from '../types';
	import { classNames } from '../../../../../utils/misc/utilities';
	let { id, track }: { id: string; track: EditorTimelineTrack } = $props();

	let trackType = track?.type === EditorTimelineTrackType.VIDEO ? 'Video' : 'Audio';
	let TrackIcon = $derived(track?.type === EditorTimelineTrackType.VIDEO ? Film : AudioLines);
</script>

<section class="track">
	<aside class={classNames('info', trackType.toLowerCase())}>
		<TrackIcon />
		{trackType}
		{track?.position}
	</aside>

	<div class="timeline rounded"></div>
</section>

<style>
	.track {
		display: contents;
	}

	.info {
		display: flex;
		flex-flow: row wrap;

		align-items: center;
		gap: var(--muse-layout-spacing-sm);

		padding: var(--muse-layout-spacing-sm) var(--muse-layout-spacing-md);
		grid-column: 1;

		color: var(--muse-colours-muted-solid);
	}

	.info.video {
		--padding: 25px;
		--padding-side: calc(var(--padding) / 2);

		padding-top: var(--padding-side);
		padding-bottom: var(--padding-side);
	}

	.timeline {
		border: 1px solid var(--muse-colours-subtle-light);
		grid-column: 2;
	}

	.track:nth-of-type(even) .timeline {
		background-color: var(--muse-colours-subtle-very-light);
	}
</style>
