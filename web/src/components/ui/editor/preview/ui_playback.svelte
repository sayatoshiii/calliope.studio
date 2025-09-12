<script lang="ts">
	import { formatTimestamp } from '../../../../utils/editor/project/media';
	import type { Clip, Media, Project } from '../../../../utils/editor/project/types';
	import UiPlaybackVideo from './ui_playback_video.svelte';

	let { project }: { project: Project } = $props();

	const getMediaForClip = (clip: Clip): Media | undefined => project.media?.[clip.id];
	const isVideo = (media: Media) => media.file.type.startsWith('video/');
	const isImage = (media: Media) => media.file.type.startsWith('image/');
</script>

<div class="playback">
	{#each Object.entries(project?.tracks ?? {}) as [trackId, track]}
		<div class="layer">
			{#each track.clips as clip}
				{#if project.timestamp >= clip.timestamp * 10000 && project.timestamp <= clip.timestamp * 10000 + clip.duration}
					{#if getMediaForClip(clip) && isVideo(getMediaForClip(clip))}
						{#key clip.id}
							<UiPlaybackVideo {clip} {project} media={getMediaForClip(clip)} />
						{/key}
					{:else if getMediaForClip(clip) && isImage(getMediaForClip(clip))}
						<img
							class="media"
							src={URL.createObjectURL(getMediaForClip(clip)?.file)}
							alt={clip.id}
						/>
					{/if}
				{/if}
			{/each}
		</div>
	{/each}
</div>

<style>
	.playback {
		position: relative;
		flex: 1 1;
		background: var(--muse-colours-foreground);
	}

	.layer {
		width: 100%;
		height: 100%;

		position: absolute;
		flex: 1 1;

		overflow: hidden;
	}

	.media {
		width: auto;
		height: 100%;

		flex: 1 1;
	}
</style>
