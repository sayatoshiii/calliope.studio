<script lang="ts">
	import { onMount } from 'svelte';
	import { uuid } from '../../../../utils/misc/crypto';
	import type { InputFileProps } from './types';

	let { hovered, children, onDrop }: InputFileProps = $props();

	const id = uuid.v4();
	let dropzone: HTMLButtonElement | undefined;
	let files: DataTransferItemList | undefined = $state(undefined);

	let isFileHovering = $state(false);
	let Display = $derived(isFileHovering ? (hovered ?? children) : children);

	const openFile = (e: Event) => {
		e?.preventDefault();
		e?.stopPropagation();

		isFileHovering = false;

		let fileInput = document.createElement('input');
		fileInput.style = 'display: none';
		fileInput.type = 'file';
		fileInput.multiple = true;
		fileInput.onchange = () => {
			let files: File[] = Array.from(fileInput.files as never);
			onDrop?.(files);
		};
		fileInput.click();
	};

	onMount(() => {
		dropzone?.addEventListener('dragover', (e) => {
			e.preventDefault();
			e.stopPropagation();

			const items = e?.dataTransfer?.items;

			isFileHovering = true;
			files = items;
		});

		dropzone?.addEventListener('dragleave', () => {
			isFileHovering = false;
			files = undefined;
		});

		dropzone?.addEventListener('drop', (e) => {
			isFileHovering = false;

			e.preventDefault();
			e.stopPropagation();

			let files: File[] = Array.from((e?.dataTransfer?.files as never) ?? []);
			onDrop?.(files);
		});
	});
</script>

<button onclick={openFile} bind:this={dropzone} id={`${id}-dropzone`}>
	{@render Display?.(files)}
</button>

<style>
	button {
		display: contents;
	}
</style>
