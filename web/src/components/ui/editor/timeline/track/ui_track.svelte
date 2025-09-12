<script lang="ts">
	import { AudioLines, Film } from '@lucide/svelte';
	import { EditorTimelineTrackType, type EditorTimelineTrack } from '../types';
	import { classNames } from '../../../../../utils/misc/utilities';
	import UiMediaThumbnail from '../../module/explorer/library/ui_media_thumbnail.svelte';
	import type { MediaLength, Project } from '../../../../../utils/editor/project/types';
	import { getMediaLength } from '../../../../../utils/editor/project/media';
	let { project, track }: { project: Project; id: string; track: EditorTimelineTrack } = $props();

	let trackType = track?.type === EditorTimelineTrackType.VIDEO ? 'Video' : 'Audio';
	let TrackIcon = $derived(track?.type === EditorTimelineTrackType.VIDEO ? Film : AudioLines);

	let isDragging = true;
	let draggedMedia: { id: string; pos: number; length: MediaLength } | undefined = $state();

	const onDragOver = async (e: DragEvent) => {
		e.stopPropagation();
		e.preventDefault();

		isDragging = true;

		const target = e.currentTarget as HTMLElement;
		const rect = target.getBoundingClientRect();
		const x = e.clientX - rect.left;

		const media = e?.dataTransfer?.getData('text/plain');
		if (!media) return;

		draggedMedia = {
			id: media,
			pos: x,
			length: await getMediaLength(project, media)
		};

		console.log(draggedMedia);
	};

	const onDragLeave = () => {
		isDragging = false;

		setTimeout(() => {
			if (isDragging) return;
			draggedMedia = undefined;
		}, 50);
	};

	const onDrop = (e: DragEvent) => {
		e.stopPropagation();
		e.preventDefault();

		draggedMedia = undefined;
	};
</script>

<section class="track">
	<aside class={classNames('info', trackType.toLowerCase())}>
		<TrackIcon />
		{trackType}
		{track?.position}
	</aside>

	<div
		class="timeline rounded"
		ondragover={onDragOver}
		ondragleave={onDragLeave}
		ondrop={onDrop}
		role="application"
	>
		{#if draggedMedia}
			<div
				class="dragged rounded"
				style={`--pos: ${draggedMedia.pos}px;--size: ${draggedMedia.length.size}px`}
			>
				<UiMediaThumbnail file={project.media?.[draggedMedia?.id]?.file as File} />
			</div>
		{/if}
	</div>
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
		position: relative;
		border: 1px solid var(--muse-colours-subtle-light);
		grid-column: 2;
	}

	.track:nth-of-type(even) .timeline {
		background-color: var(--muse-colours-subtle-very-light);
	}

	.dragged {
		width: var(--size);
		height: 100%;

		top: 0;
		left: var(--pos);

		position: absolute;
		overflow: hidden;

		transition: all 0.15s ease;
	}
</style>
