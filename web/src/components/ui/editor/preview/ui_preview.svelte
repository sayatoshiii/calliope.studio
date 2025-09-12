<script lang="ts">
	import type { Project } from '../../../../utils/editor/project/types';
	import UiPlayback from './ui_playback.svelte';
	import UiPlaybackControls from './ui_playback_controls.svelte';

	let { project }: { project: Project } = $props();
</script>

<section class="preview">
	<UiPlayback {project} />
	<UiPlaybackControls {project} />
</section>

<style>
	.preview {
		display: flex;

		flex-flow: column;
		flex: 1 1;
	}
</style>
