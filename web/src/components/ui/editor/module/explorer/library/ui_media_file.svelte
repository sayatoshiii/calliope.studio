<script lang="ts">
	import { X } from '@lucide/svelte';
	import InputButton from '../../../../input/button/input_button.svelte';
	import { MuseUIColour } from '../../../../types';
	import type { UIMediaFileProps } from './types';
	import UiMediaThumbnail from './ui_media_thumbnail.svelte';

	let { project, id, file }: UIMediaFileProps = $props();

	const onDragStart = (e: DragEvent) => {
		e?.dataTransfer?.setData('text/plain', id);
	};
</script>

<div class="media rounded" draggable={true} ondragstart={onDragStart} role="img">
	<UiMediaThumbnail class="thumbnail" {file} />
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
	<div class="label rounded">{file.name}</div>
</div>

<style>
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
