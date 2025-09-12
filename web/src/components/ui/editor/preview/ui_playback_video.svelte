<script lang="ts">
	import type { Clip, Media, Project } from '../../../../utils/editor/project/types';

	export let clip: Clip;
	export let media: Media;
	export let project: Project;

	let videoEl: HTMLVideoElement;

	const formatTime = (ms: number) => {
		const totalSeconds = Math.floor(ms / 1000);
		const minutes = Math.floor(totalSeconds / 60);
		const seconds = totalSeconds % 60;
		const centiseconds = Math.floor((ms % 1000) / 10);
		return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${centiseconds.toString().padStart(2, '0')}`;
	};

	$: if (videoEl) {
		const clipTime = project.timestamp - clip.timestamp * 10000;
		if (clipTime >= 0 && clipTime <= clip.duration) {
			if (Math.abs(videoEl.currentTime * 1000 - clipTime) > 30) {
				videoEl.currentTime = clipTime / 1000;
			}
			if (!videoEl.paused) videoEl.pause();
		}
	}
</script>

<div class="preview">
	<video
		class="media"
		bind:this={videoEl}
		src={URL.createObjectURL(media.file)}
		muted
		playsinline
	/>
	<div class="time">{formatTime(project.timestamp - clip.timestamp * 10000)}</div>
</div>

<style>
	.preview {
		position: relative;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.media {
		max-width: 100%;
		max-height: 100%;
		object-fit: contain;
	}
	.time {
		position: absolute;
		bottom: 5px;
		right: 10px;
		color: white;
		font-size: 0.8rem;
		background: rgba(0, 0, 0, 0.5);
		padding: 2px 4px;
		border-radius: 2px;
		font-family: monospace;
	}
</style>
