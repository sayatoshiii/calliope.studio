<script lang="ts">
	import type { InputButtonProps } from './types';

	let { colour, children, ...props }: InputButtonProps = $props();
</script>

<button type="button" class={colour} {...props}>
	{@render children?.()}
</button>

<style>
	button {
		display: flex;
		flex-flow: row wrap;

		align-items: center;
		gap: var(--muse-layout-gap-sm);

		padding: var(--muse-layout-padding-xsm) var(--muse-layout-padding-md);
	}

	button.primary {
		background-color: var(--muse-colours-primary-bg-solid);
	}
</style>
