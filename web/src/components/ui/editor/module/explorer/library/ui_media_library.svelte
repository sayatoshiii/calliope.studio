<script lang="ts">
	import { onMount } from 'svelte';
	import type { UIMediaLibraryProps } from './types';
	import UiMediaThumbnail from './ui_media_thumbnail.svelte';
	import { X } from '@lucide/svelte';
	import InputButton from '../../../../input/button/input_button.svelte';
	import { MuseUIColour } from '../../../../types';

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
		<div class="media rounded" draggable={true}>
			<UiMediaThumbnail class="thumbnail" file={media.file} />
			<div class="controls">
				<InputButton
					colour={MuseUIColour.MUTED}
					style="padding: 2px;border-radius: 100%;"
					onclick={() => {
						if (!project?.media) return;
						delete project.media[id];
					}}
				>
					<X size={16} color={'var(--muse-colours-muted-solid)'} />
				</InputButton>
			</div>
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

		flex-flow: column;
		flex-shrink: 1;

		justify-content: space-between;

		background-color: var(--muse-colours-subtle-light);

		-webkit-user-select: none;
		user-select: none;

		overflow: hidden;

		&:hover .controls {
			opacity: 1;
		}
	}

	:global(.thumbnail) {
		max-width: 100%;

		position: absolute;
		z-index: -1;

		object-fit: cover;
		flex-shrink: 1;
	}

	.controls {
		display: flex;
		flex-flow: row wrap;

		justify-content: flex-end;

		opacity: 0;
		transition: opacity 0.15s ease;
	}

	.label {
		width: fit-content;
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
