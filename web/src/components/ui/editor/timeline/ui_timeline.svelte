<script lang="ts">
	import { Headphones, ListMusic, ListVideo, Videotape } from '@lucide/svelte';
	import InputButton from '../../input/button/input_button.svelte';
	import { MuseUIColour } from '../../types';
	import UiToolbar from './toolbar/ui_toolbar.svelte';
	import UiTrack from './track/ui_track.svelte';
	import { EditorTimelineTrackType, type EditorTimelineProps } from './types';
	import UiRuler from './ui_ruler.svelte';
	import { uuid } from '../../../../utils/misc/crypto';
	import Tooltip from '../../hints/tooltip/tooltip.svelte';
	import { TooltipPosition } from '../../hints/tooltip/types';

	let { project, zoom = 1, marker = 0 }: EditorTimelineProps = $props();

	const handleZoom = (e: WheelEvent) => {
		if (!e.ctrlKey && !e.metaKey) return;
		e.preventDefault();

		const scale = Math.exp(-e.deltaY * 0.0015);
		zoom = Math.min(Math.max(zoom * scale, 0.1), 20);
	};

	const handleNewTrack = (type: EditorTimelineTrackType = EditorTimelineTrackType.VIDEO) => {
		project.tracks = {
			...project?.tracks,
			...{
				[uuid.v4()]: {
					type,
					position: Object.keys(project?.tracks ?? {}).length + 1
				} as never
			}
		};
	};
</script>

<section class="view">
	<UiToolbar />
	<div class="timeline" onwheel={handleZoom}>
		<UiRuler {zoom} {marker} />

		{#each Object.entries(project?.tracks ?? {}).sort(([, a], [, b]) => a.position - b.position) as [id, track]}
			<UiTrack {project} {id} {track} />
		{/each}

		<aside class="manage">
			<Tooltip position={TooltipPosition.BOTTOM_LEFT}>
				{#snippet message()}
					<Videotape color="var(--muse-colours-muted-solid)" /> Create Video Track
				{/snippet}
				<InputButton colour={MuseUIColour.MUTED} class="rounded" onclick={() => handleNewTrack()}>
					<ListVideo size={20} />
				</InputButton>
			</Tooltip>

			<Tooltip position={TooltipPosition.BOTTOM_LEFT}>
				{#snippet message()}
					<Headphones color="var(--muse-colours-muted-solid)" /> Create Audio Track
				{/snippet}
				<InputButton
					colour={MuseUIColour.MUTED}
					class="rounded"
					onclick={() => handleNewTrack(EditorTimelineTrackType.AUDIO)}
				>
					<ListMusic size={20} />
				</InputButton>
			</Tooltip>
		</aside>
	</div>
</section>

<style>
	.view {
		padding: var(--muse-layout-spacing-md);
		padding-top: 0;

		border-top: 1px solid var(--muse-colours-subtle-light);
	}

	.timeline {
		width: 100%;

		position: relative;
		display: grid;

		grid-template-rows: auto;
		grid-template-columns: auto 1fr;

		row-gap: var(--muse-layout-spacing-sm);
		grid-gap: var(--muse-layout-spacing-md);
	}

	.manage {
		display: flex;
		flex-flow: row nowrap;

		justify-content: center;
		align-items: center;

		gap: var(--muse-layout-spacing-sm);
	}
</style>
