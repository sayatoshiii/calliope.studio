<script lang="ts">
	import { DiamondPlus } from '@lucide/svelte';
	import InputButton from '../../input/button/input_button.svelte';
	import { MuseUIColour } from '../../types';
	import UiToolbar from './toolbar/ui_toolbar.svelte';
	import UiTrack from './track/ui_track.svelte';
	import { EditorTimelineTrackType, type EditorTimelineProps } from './types';
	import UiRuler from './ui_ruler.svelte';
	import { uuid } from '../../../../utils/misc/crypto';

	let { tracks, zoom = 1 }: EditorTimelineProps = $props();

	const handleZoom = (e: WheelEvent) => {
		if (!e.ctrlKey && !e.metaKey) return;
		e.preventDefault();

		const scale = Math.exp(-e.deltaY * 0.0015);
		zoom = Math.min(Math.max(zoom * scale, 0.1), 20);
	};

	const handleNewTrack = () => {
		tracks = {
			...tracks,
			...{
				[uuid.v4()]: {
					type: EditorTimelineTrackType.VIDEO,
					position: Object.keys(tracks ?? {}).length + 1
				} as never
			}
		};
	};
</script>

<section class="view">
	<UiToolbar />
	<div class="timeline" onwheel={handleZoom}>
		<UiRuler {zoom} />

		{#each Object.entries(tracks ?? {}).sort(([, a], [, b]) => a.position - b.position) as [id, track]}
			<UiTrack {id} {track} />
		{/each}

		<InputButton colour={MuseUIColour.MUTED} class="rounded" onclick={handleNewTrack}>
			<DiamondPlus size={20} /> Create Track
		</InputButton>
	</div>
</section>

<style>
	.view {
		flex: 1 1;
	}

	.timeline {
		width: 100%;
		display: grid;

		grid-template-rows: auto;
		grid-template-columns: auto 1fr;

		row-gap: var(--muse-layout-spacing-sm);
	}
</style>
