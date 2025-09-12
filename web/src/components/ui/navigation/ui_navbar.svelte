<script lang="ts">
	import { onMount } from 'svelte';
	import { Clapperboard } from '@lucide/svelte';
	import type { Project } from '../../../utils/editor/project/types';
	import InputButton from '../input/button/input_button.svelte';
	import { MuseUIColour } from '../types';
	import { defaultLength } from '../../../utils/editor/project/media';

	let { project }: { project: Project } = $props();

	let exportProject: (project: Project) => Promise<Blob>;
	let downloadBlob: (blob: Blob, filename: string) => void;

	onMount(async () => {
		const { FFmpeg } = await import('@ffmpeg/ffmpeg');
		const { fetchFile } = await import('@ffmpeg/util');

		const ffmpeg = new FFmpeg();

		exportProject = async (project: Project) => {
			if (!ffmpeg.loaded) {
				await ffmpeg.load();
			}

			for (const [, media] of Object.entries(project.media ?? {})) {
				await ffmpeg.writeFile(media.file.name, await fetchFile(media.file));
			}

			const inputs: string[] = [];

			Object.values(project.tracks ?? {}).forEach((track) => {
				track.clips.forEach((clip) => {
					const media = project.media?.[clip.id];
					if (!media) return;

					const inputName = media.file.name;

					if (media.file.type.startsWith('image/')) {
						inputs.push('-loop', '1', '-t', String(defaultLength / 1000), '-i', inputName);
					} else {
						inputs.push('-i', inputName);
					}
				});
			});

			await ffmpeg.exec([...inputs, '-c:v', 'libx264', '-c:a', 'aac', 'output.mp4']);

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
