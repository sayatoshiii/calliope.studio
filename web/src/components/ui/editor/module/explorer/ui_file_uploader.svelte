<script>
	import { FilePlus, FileStack, ImageUp } from '@lucide/svelte';
	import InputFile from '../../../input/file/input_file.svelte';
</script>

<InputFile>
	{#snippet hovered(files)}
		<section class="rounded">
			{#if (files?.length ?? 0) > 1}
				<FileStack size={40} strokeWidth={1.5} color={'var(--muse-colours-muted-solid)'} />
			{:else}
				<FilePlus size={40} strokeWidth={1.5} color={'var(--muse-colours-muted-solid)'} />
			{/if}
			<div class="info">
				<span>Drop Media</span>
				You can drop your media here to add to your project!
			</div>
		</section>
	{/snippet}

	<section class="rounded">
		<ImageUp size={40} strokeWidth={1.5} color={'var(--muse-colours-muted-solid)'} />
		<div class="info">
			<span>Select Files</span>
			Drag or select media files for this project
		</div>
	</section>
</InputFile>

<style>
	section {
		display: flex;
		flex-flow: column;

		align-items: center;
		justify-content: center;

		gap: var(--muse-layout-spacing-sm);
		flex: 1 1;

		border: 2px dashed var(--muse-colours-subtle-medium);

		margin: var(--muse-layout-spacing-sm);
		padding: var(--muse-layout-spacing-lg);

		-webkit-user-select: none;
		user-select: none;

		cursor: pointer;

		& :global(*) {
			transition: transform 0.15s ease;
		}

		&:hover :global(*) {
			transform: scale(1.02);
		}

		&:active :global(*) {
			transform: scale(0.99);
		}
	}

	.info {
		display: flex;
		flex-flow: column;

		text-align: center;

		span {
			font-size: var(--muse-font-size-md);
			font-weight: 600;

			color: var(--muse-colours-muted-solid);
		}

		font-size: var(--muse-font-size-sm);
		color: var(--muse-colours-subtle-strong);
	}
</style>
