<script lang="ts">
	import { classNames } from '../../../../utils/misc/utilities';
	import type { InputButtonProps } from './types';

	let { colour, children, ...props }: InputButtonProps = $props();
</script>

<button type="button" {...props} class={classNames(colour, props?.class)}>
	{@render children?.()}
</button>

<style>
	button {
		display: flex;
		flex-flow: row wrap;

		justify-content: center;
		align-items: center;

		gap: var(--muse-layout-spacing-sm);
		padding: var(--muse-layout-spacing-xsm) var(--muse-layout-spacing-md);

		font-weight: 500;

		cursor: pointer;
		transition: transform 0.15s ease;

		&:hover {
			transform: scale(1.015);
		}

		&:active {
			transform: scale(0.99);
		}
	}

	button.primary {
		background-color: var(--muse-colours-primary-bg-solid);
	}

	button.muted {
		background-color: var(--muse-colours-muted-background);
		border: 2px solid var(--muse-colours-subtle-light);

		color: var(--muse-colours-muted);
	}

	button.muted :global(svg) {
		color: var(--muse-colours-muted-solid);
		font-size: 14px;
	}
</style>
