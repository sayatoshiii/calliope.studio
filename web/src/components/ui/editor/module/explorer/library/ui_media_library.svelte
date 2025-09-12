<script lang="ts">
	import { onMount } from 'svelte';
	import type { UIMediaLibraryProps } from './types';
	import UiMediaFile from './ui_media_file.svelte';

	let { project }: UIMediaLibraryProps = $props();

	let library: HTMLElement | undefined;
	let relativeHeight: number = $state(0);

	const pageResize = () => {
		const module = library?.parentElement?.parentElement;
		relativeHeight = module?.getBoundingClientRect()?.height ?? 0;
	};

	onMount(() => {
		pageResize();
		window.addEventListener('resize', pageResize);

		return () => window.removeEventListener('resize', pageResize);
	});
</script>

<section class="library" style={`--relativeHeight: ${relativeHeight}px`} bind:this={library}>
	{#each Object.entries(project?.media ?? {}) as [id, media]}
		<UiMediaFile {project} {id} file={media.file} />
	{/each}
</section>

<style>
	.library {
		min-height: 75px;
		max-height: calc(var(--relativeHeight) * 0.8 - 120px);

		display: flex;

		flex: 0 1 auto;
		flex-flow: row wrap;

		gap: var(--muse-layout-spacing-sm);
		padding: var(--muse-layout-spacing-md);

		overflow: hidden auto;
	}
</style>
