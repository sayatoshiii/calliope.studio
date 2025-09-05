<script lang="ts">
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import { accountLogout, user } from '../../utils/database/client/account';
	import InputButton from '../../components/ui/input/button/input_button.svelte';
	import UiTimeline from '../../components/ui/editor/timeline/ui_timeline.svelte';
	import { uuid } from '../../utils/misc/crypto';
	import {
		EditorTimelineTrackType,
		type EditorTimelineProps
	} from '../../components/ui/editor/timeline/types';

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
		}
	});

	// const handleLogout = async () => {
	// 	await accountLogout();
	// 	goto('/account/login');
	// };

	onMount(() => {
		if (!user) goto('/account/create');
	});
</script>

<UiTimeline {...timeline} />

<!-- <div>hi</div> -->
<!-- <InputButton onclick={handleLogout}>Log Out</InputButton> -->
