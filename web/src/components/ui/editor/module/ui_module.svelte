<script lang="ts">
	import { FolderSearch, SquareDashedMousePointer } from '@lucide/svelte';
	import { classNames } from '../../../../utils/misc/utilities';
	import InputButton from '../../input/button/input_button.svelte';
	import { MuseUIColour } from '../../types';
	import { EditorModuleType, type EditorModuleProps } from './types';
	import UiFileExplorer from './explorer/ui_file_explorer.svelte';

	let { position, module }: EditorModuleProps = $props();
	let buttons = [
		{ icon: FolderSearch, name: 'File Explorer', module: EditorModuleType.FILE_EXPLORER },
		{ icon: SquareDashedMousePointer, name: 'Inspector', module: EditorModuleType.INSPECTOR }
	];

	let SelectedModule = $derived.by(() => {
		switch (module) {
			case EditorModuleType.FILE_EXPLORER:
				return UiFileExplorer;
			default:
				return;
		}
	});
</script>

<section class={classNames('module', position)}>
	<selector>
		{#each buttons as button}
			<InputButton
				class="rounded"
				colour={MuseUIColour.MUTED}
				onclick={() => {
					module = button.module;
				}}
			>
				<button.icon size={14} />
				{button.name}
			</InputButton>
		{/each}
	</selector>

	{#if SelectedModule}
		<SelectedModule />
	{/if}
</section>

<style>
	.module {
		width: 350px;
		min-height: 100%;

		display: flex;
		flex-flow: column;

		border: 1px solid var(--muse-colours-subtle-light);
		border-top: none;
		border-bottom: none;
	}

	.left {
		border-left: none;
	}

	.right {
		border-right: none;
	}

	selector {
		display: flex;
		flex-flow: row nowrap;

		align-items: center;
		gap: var(--muse-layout-spacing-sm);

		padding: var(--muse-layout-spacing-md) var(--muse-layout-spacing-sm);
	}
</style>
