<script lang="ts">
	import UiTimeline from '../../components/ui/editor/timeline/ui_timeline.svelte';
	import { uuid } from '../../utils/misc/crypto';
	import { type EditorTimelineProps } from '../../components/ui/editor/timeline/types';
	import UiPreview from '../../components/ui/editor/preview/ui_preview.svelte';
	import UiModule from '../../components/ui/editor/module/ui_module.svelte';
	import { EditorModulePosition, EditorModuleType } from '../../components/ui/editor/module/types';
	import { TrackType, type Project } from '../../utils/editor/project/types';
	import UiNavbar from '../../components/ui/navigation/ui_navbar.svelte';

	const project: Project = $state({
		timestamp: 0,
		media: {},
		tracks: {
			[uuid.v4()]: {
				type: TrackType.VIDEO,
				position: 1,
				clips: []
			},
			[uuid.v4()]: {
				type: TrackType.AUDIO,
				position: 2,
				clips: []
			}
		}
	});

	const timeline: EditorTimelineProps = $state({
		project
	});
</script>

<app>
	<UiNavbar {project} />
	<section>
		<UiModule
			position={EditorModulePosition.TOP_LEFT}
			module={EditorModuleType.FILE_EXPLORER}
			{project}
		/>
		<UiPreview {project} />
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
