<script lang="ts">
	import { ListMusic, ListVideo } from '@lucide/svelte';
	import InputButton from '../../input/button/input_button.svelte';
	import { MuseUIColour } from '../../types';
	import UiToolbar from './toolbar/ui_toolbar.svelte';
	import UiTrack from './track/ui_track.svelte';
	import { EditorTimelineTrackType, type EditorTimelineProps } from './types';
	import UiRuler from './ui_ruler.svelte';
	import { uuid } from '../../../../utils/misc/crypto';

	let { tracks, zoom = 1, marker = 0 }: EditorTimelineProps = $props();

	const handleZoom = (e: WheelEvent) => {
		if (!e.ctrlKey && !e.metaKey) return;
		e.preventDefault();

		const scale = Math.exp(-e.deltaY * 0.0015);
		zoom = Math.min(Math.max(zoom * scale, 0.1), 20);
	};

	const handleNewTrack = (type: EditorTimelineTrackType = EditorTimelineTrackType.VIDEO) => {
		tracks = {
			...tracks,
			...{
				[uuid.v4()]: {
					type,
					position: Object.keys(tracks ?? {}).length + 1
				} as never
			}
		};
	};
</script>

<section class="view">
	<UiToolbar />
	<div class="timeline" onwheel={handleZoom}>
		<UiRuler {zoom} {marker} />

		{#each Object.entries(tracks ?? {}).sort(([, a], [, b]) => a.position - b.position) as [id, track]}
			<UiTrack {id} {track} />
		{/each}

		<aside class="manage">
			<InputButton colour={MuseUIColour.MUTED} class="rounded" onclick={() => handleNewTrack()}>
				<ListVideo size={20} />
			</InputButton>
			<InputButton
				colour={MuseUIColour.MUTED}
				class="rounded"
				onclick={() => handleNewTrack(EditorTimelineTrackType.AUDIO)}
			>
				<ListMusic size={20} />
			</InputButton>
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
