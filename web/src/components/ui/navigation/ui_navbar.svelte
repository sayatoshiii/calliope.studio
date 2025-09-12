<script lang="ts">
	import { onMount } from 'svelte';
	import { Clapperboard, LoaderCircle } from '@lucide/svelte';
	import type { Project } from '../../../utils/editor/project/types';
	import InputButton from '../input/button/input_button.svelte';
	import { MuseUIColour } from '../types';

	let { project }: { project: Project } = $props();

	let exportProject: (project: Project) => Promise<Blob>;
	let downloadBlob: (blob: Blob, filename: string) => void;
	let exporting = $state(false);
	let progress = $state(0);

	onMount(async () => {
		const { FFmpeg } = await import('@ffmpeg/ffmpeg');
		const { fetchFile } = await import('@ffmpeg/util');

		exportProject = async (project: Project) => {
			const ffmpeg = new FFmpeg();
			ffmpeg.on('progress', ({ progress: p }) => {
				progress = Math.round(p * 100);
			});

			await ffmpeg.load();
			exporting = true;
			progress = 0;

			let counter = 0;
			for (const [, media] of Object.entries(project.media ?? {})) {
				const uniqueName = `${counter++}_${media.file.name}`;
				await ffmpeg.writeFile(uniqueName, await fetchFile(media.file));
				(media as any)._ffmpegName = uniqueName;
			}

			const concatList: string[] = [];
			let timelineEnd = 0;

			for (const track of Object.values(project.tracks ?? {})) {
				for (const clip of track.clips) {
					const media = project.media?.[clip.id];
					if (!media) continue;

					const start = clip.timestamp / 1000;
					const duration = clip.duration / 1000;

					// fill gap with black
					if (start > timelineEnd) {
						const gap = start - timelineEnd;
						const gapName = `gap_${clip.id}.mp4`;
						await ffmpeg.exec([
							'-f',
							'lavfi',
							'-i',
							`color=size=1280x720:rate=30:color=black:d=${gap}`,
							'-c:v',
							'libx264',
							'-pix_fmt',
							'yuv420p',
							gapName
						]);
						concatList.push(`file '${gapName}'`);
						timelineEnd = start;
					}

					const segName = `seg_${clip.id}.mp4`;

					if (media.file.type.startsWith('image/')) {
						await ffmpeg.exec([
							'-loop',
							'1',
							'-t',
							String(duration),
							'-i',
							(media as any)._ffmpegName,
							'-vf',
							'scale=1280:720,fps=30',
							'-c:v',
							'libx264',
							'-pix_fmt',
							'yuv420p',
							segName
						]);
					} else if (media.file.type.startsWith('video/')) {
						await ffmpeg.exec([
							'-i',
							(media as any)._ffmpegName,
							'-t',
							String(duration),
							'-vf',
							'scale=1280:720,fps=30',
							'-c:v',
							'libx264',
							'-pix_fmt',
							'yuv420p',
							segName
						]);
					}
					concatList.push(`file '${segName}'`);
					timelineEnd = start + duration;
				}
			}

			const listFile = 'concat.txt';
			await ffmpeg.writeFile(listFile, new TextEncoder().encode(concatList.join('\n')));

			await ffmpeg.exec(['-f', 'concat', '-safe', '0', '-i', listFile, '-c', 'copy', 'output.mp4']);

			const data = await ffmpeg.readFile('output.mp4');
			exporting = false;
			progress = 100;
			return new Blob([data], { type: 'video/mp4' });
		};

		downloadBlob = (blob: Blob, filename: string) => {
			const url = URL.createObjectURL(blob);
			const a = document.createElement('a');
			a.href = url;
			a.download = filename;
			document.body.appendChild(a);
			a.click();
			document.body.removeChild(a);
			URL.revokeObjectURL(url);
		};
	});
</script>

<nav>
	<span style="font-weight: 800; color: var(--muse-colours-semi-important);">
		Calliope Studio
	</span>

	<InputButton
		class="rounded"
		colour={MuseUIColour.MUTED}
		onclick={async () => {
			if (exportProject) {
				const blob = await exportProject(project);
				downloadBlob(blob, 'project.mp4');
			}
		}}
		disabled={exporting}
	>
		{#if exporting}
			<span class="exporting"><LoaderCircle size={18} /></span> Exporting… {progress}%
		{:else}
			<Clapperboard /> Export
		{/if}
	</InputButton>
</nav>

<style>
	nav {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 10px 20px;
		border-bottom: 1px solid var(--muse-colours-subtle-light);
	}

	.exporting {
		display: flex;
		align-items: center;
		justify-content: center;
		animation: spin 1s linear infinite;
	}

	@keyframes spin {
		from {
			transform: rotate(0deg);
		}
		to {
			transform: rotate(360deg);
		}
	}
</style>
