<script lang="ts">
	import { AudioLines, Film } from '@lucide/svelte';
	import { classNames } from '../../../../../utils/misc/utilities';
	import UiMediaThumbnail from '../../module/explorer/library/ui_media_thumbnail.svelte';
	import {
		TrackType,
		type MediaLength,
		type Project,
		type Track
	} from '../../../../../utils/editor/project/types';
	import {
		addMediaToTrack,
		defaultLength,
		getMediaLength,
		pixelsPerMillisecond
	} from '../../../../../utils/editor/project/media';
	let { project, id, track }: { project: Project; id: string; track: Track } = $props();

	let trackType = track?.type === TrackType.VIDEO ? 'Video' : 'Audio';
	let TrackIcon = $derived(track?.type === TrackType.VIDEO ? Film : AudioLines);

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

		const target = e.currentTarget as HTMLElement;
		const rect = target.getBoundingClientRect();
		const x = e.clientX - rect.left;

		const media = e?.dataTransfer?.getData('text/plain');
		if (!media) return;

		addMediaToTrack(project, id, media, x / pixelsPerMillisecond);
		setTimeout(() => {
			draggedMedia = undefined;
		}, 50);
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
		{#each track.clips as clip}
			<div
				class="clip rounded"
				style={`--pos: ${(clip?.timestamp ?? 0) * pixelsPerMillisecond}px;--size: ${(clip?.duration ?? defaultLength) / pixelsPerMillisecond}px`}
			>
				<UiMediaThumbnail file={project.media?.[clip?.id ?? '']?.file as File} class="thumbnail" />
			</div>
		{/each}
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

	.dragged,
	.clip {
		width: var(--size);
		height: 100%;

		top: 0;
		left: var(--pos);

		position: absolute;
		overflow: hidden;

		background-color: var(--muse-colours-subtle-light);

		& :global(img) {
			width: 100%;
			height: 100%;
			z-index: 1 !important;
		}

		transition: left 0.15s ease;
	}
</style>
