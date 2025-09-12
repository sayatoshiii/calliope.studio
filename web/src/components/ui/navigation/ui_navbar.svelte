<script lang="ts">
	import { Clapperboard } from '@lucide/svelte';
	import type { Project } from '../../../utils/editor/project/types';
	import InputButton from '../input/button/input_button.svelte';
	import { MuseUIColour } from '../types';
	import { exportProject } from '../../../utils/editor/project/media';

	let { project }: { project: Project } = $props();
</script>

<nav>
	<span style="font-weight: 800; color: var(--muse-colours-semi-important);">Calliope Studio</span>

	<InputButton class="rounded" colour={MuseUIColour.MUTED} onclick={exportProject(project)}>
		<Clapperboard /> Export
	</InputButton>
</nav>

<style>
	nav {
		display: flex;

		align-items: center;
		justify-content: space-between;

		padding: 10px 20px;

		border-bottom: 1px solid var(--muse-colours-subtle-light);
	}
</style>
