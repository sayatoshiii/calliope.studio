<script lang="ts">
	import { onMount } from 'svelte';
	import { Clapperboard } from '@lucide/svelte';
	import type { Project } from '../../../utils/editor/project/types';
	import InputButton from '../input/button/input_button.svelte';
	import { MuseUIColour } from '../types';

	let { project }: { project: Project } = $props();

	let exportProject: (project: Project) => Promise<Blob>;
	let downloadBlob: (blob: Blob, filename: string) => void;

	onMount(async () => {
		const { FFmpeg } = await import('@ffmpeg/ffmpeg');
		const { fetchFile } = await import('@ffmpeg/util');

		exportProject = async (project: Project) => {
			const ffmpeg = new FFmpeg();
			await ffmpeg.load();

			let counter = 0;
			for (const [, media] of Object.entries(project.media ?? {})) {
				const uniqueName = `${counter++}_${media.file.name}`;
				await ffmpeg.writeFile(uniqueName, await fetchFile(media.file));
				(media as any)._ffmpegName = uniqueName;
			}

			const concatList: string[] = [];

			for (const track of Object.values(project.tracks ?? {})) {
				for (const clip of track.clips) {
					const media = project.media?.[clip.id];
					if (!media) continue;
					const seconds = clip.duration / 1000;
					const segName = `seg_${clip.id}.mp4`;

					if (media.file.type.startsWith('image/')) {
						await ffmpeg.exec([
							'-loop',
							'1',
							'-t',
							String(seconds),
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
							String(seconds),
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
				}
			}

			const listFile = 'concat.txt';
			await ffmpeg.writeFile(listFile, new TextEncoder().encode(concatList.join('\n')));

			await ffmpeg.exec(['-f', 'concat', '-safe', '0', '-i', listFile, '-c', 'copy', 'output.mp4']);

			const data = await ffmpeg.readFile('output.mp4');
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
	>
		<Clapperboard /> Export
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
</style>
