<script lang="ts">
	import { classNames } from '../../../../utils/misc/utilities';
	import { TooltipPosition, type TooltipProps } from './types';

	let { position = TooltipPosition.BOTTOM, message, children }: TooltipProps = $props();
</script>

<tooltip>
	{@render children()}
	<popup class={classNames('rounded', position)}>
		{@render message()}
	</popup>
</tooltip>

<style>
	tooltip {
		position: relative;
	}

	tooltip:hover > popup {
		opacity: 1;
		transform: scale(1, 1) translate(0);
	}

	.bottom {
		--posX: 0;
		--posY: 25px;
	}

	.bottomLeft {
		--posX: -25px;
		--posY: 25px;
	}

	.bottomRight {
		--posX: 25px;
		--posY: 25px;
	}

	popup {
		width: max-content;
		position: absolute;

		top: -40px;
		left: 0;

		display: flex;
		flex-flow: row;

		align-items: center;
		gap: var(--muse-layout-spacing-sm);

		padding: var(--muse-layout-spacing-sm) var(--muse-layout-spacing-md);
		border: 1px solid var(--muse-colours-subtle-light);

		background-color: var(--muse-colours-subtle-light-solid);
		color: var(--muse-colours-muted);

		transform: scale(0.5, 0.25) translate(var(--posX), var(--posY));

		opacity: 0;
		transition:
			opacity 0.25s ease,
			transform 0.25s ease;
	}
</style>
