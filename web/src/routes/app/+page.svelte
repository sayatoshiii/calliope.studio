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
	import UiModule from '../../components/ui/editor/module/ui_module.svelte';
	import { EditorModulePosition, EditorModuleType } from '../../components/ui/editor/module/types';
	import UiNavbar from '../../components/ui/navigation/ui_navbar.svelte';
	import type { Project } from '../../utils/editor/project/types';

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

	const project: Project = $state({
		media: {}
	});

	onMount(() => {
		if (!user) goto('/account/create');
	});
</script>

<app>
	<UiNavbar />
	<section>
		<UiModule
			position={EditorModulePosition.TOP_LEFT}
			module={EditorModuleType.FILE_EXPLORER}
			{project}
		/>
		<UiPreview />
		<UiModule
			position={EditorModulePosition.TOP_RIGHT}
			module={EditorModuleType.INSPECTOR}
			{project}
		/>
	</section>
	<UiTimeline {...timeline} />
</app>

<style>
	app {
		width: 100%;
		min-height: 100vh;

		display: flex;
		flex-flow: column;
	}

	section {
		display: flex;
		flex-flow: row wrap;

		align-items: stretch;
		flex: 1 1;
	}
</style>
