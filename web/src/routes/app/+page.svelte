<script lang="ts">
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import { user } from '../../utils/database/client/account';
	import UiTimeline from '../../components/ui/editor/timeline/ui_timeline.svelte';
	import { uuid } from '../../utils/misc/crypto';
	import {
		EditorTimelineTrackType,
		type EditorTimelineProps
	} from '../../components/ui/editor/timeline/types';
	import UiPreview from '../../components/ui/editor/preview/ui_preview.svelte';

	const timeline: EditorTimelineProps = $state({
		tracks: {
			[uuid.v4()]: {
				type: EditorTimelineTrackType.VIDEO,
				position: 1
			},
			[uuid.v4()]: {
				type: EditorTimelineTrackType.AUDIO,
				position: 2
			}
		},
		marker: 0
	});

	onMount(() => {
		if (!user) goto('/account/create');
	});
</script>

<app>
	<UiPreview />
	<UiTimeline {...timeline} />
</app>

<style>
	app {
		width: 100%;
		min-height: 100vh;

		display: flex;
		flex-flow: column;
	}
</style>
