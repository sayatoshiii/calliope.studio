<script lang="ts">
	import type { UIFileExplorerProps } from './types';
	import UiFileUploader from './ui_file_uploader.svelte';
	import UiMediaLibrary from './library/ui_media_library.svelte';

	let { project }: UIFileExplorerProps = $props();
</script>

<explorer>
	<UiFileUploader {project} />
	{#if Object.entries(project?.media ?? {}).length > 0}
		<UiMediaLibrary {project} />
	{/if}
</explorer>

<style>
	explorer {
		min-height: 0;
		display: flex;

		flex: 1 1;
		flex-flow: column;

		overflow: hidden auto;
	}
</style>
