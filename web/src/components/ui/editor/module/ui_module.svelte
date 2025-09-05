<script lang="ts">
	import { classNames } from '../../../../utils/misc/utilities';
	import type { EditorModuleProps } from './types';

	let { position }: EditorModuleProps = $props();
</script>

<section class={classNames('module', position)}></section>

<style>
	.module {
		width: 350px;
		min-height: 100%;

		border: 1px solid var(--muse-colours-subtle-light);
		border-top: none;
		border-bottom: none;
	}

	.left {
		border-left: none;
	}

	.right {
		border-right: none;
	}
</style>
