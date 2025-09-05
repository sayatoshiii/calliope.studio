<script>
	import UiPlayback from './ui_playback.svelte';
	import UiPlaybackControls from './ui_playback_controls.svelte';
</script>

<section class="preview">
	<UiPlayback />
	<UiPlaybackControls />
</section>

<style>
	.preview {
		display: flex;

		flex-flow: column;
		flex: 1 1;
	}
</style>
