<script lang="ts">
	import { onMount } from 'svelte';
	import type { UIMediaLibraryProps } from './types';
	import UiMediaThumbnail from './ui_media_thumbnail.svelte';

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
	{#each Object.entries(project?.media ?? {}) as [_, media]}
		<div class="media rounded">
			<UiMediaThumbnail class="thumbnail" file={media.file} />
			<div class="label rounded">{media.file.name}</div>
		</div>
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

	.media {
		min-width: 0;
		min-height: 0;

		min-height: 75px;
		max-height: 75px;

		position: relative;

		display: flex;
		flex: 1 1 33.3%;

		flex-shrink: 1;

		align-items: flex-end;
		justify-content: space-between;

		background-color: var(--muse-colours-subtle-light);

		-webkit-user-select: none;
		user-select: none;

		overflow: hidden;
	}

	:global(.thumbnail) {
		max-width: 100%;

		position: absolute;
		z-index: -1;

		object-fit: cover;
		flex-shrink: 1;
	}

	.label {
		min-width: 0;
		max-width: 75%;

		display: inline-block;

		white-space: nowrap;
		text-overflow: ellipsis;

		font-size: var(--muse-font-size-xsm);
		color: var(--muse-colours-muted);

		background-color: var(--muse-colours-muted-background);
		border: 2px solid var(--muse-colours-subtle-light);

		padding: calc(var(--muse-layout-spacing-sm) * 0.25) calc(var(--muse-layout-spacing-sm) * 0.5);
		margin: calc(var(--muse-layout-spacing-sm) * 0.5);

		overflow: hidden;
	}
</style>
