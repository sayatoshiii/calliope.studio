<script lang="ts">
	import { uuid } from '../../../../utils/misc/crypto';
	import type { InputTextProps } from './types';

	let {
		label,
		description,
		placeholder,
		maxlength,
		type = 'text',
		value,
		onChange,
		inputContainer,
		id = uuid.v4()
	}: InputTextProps = $props();

	const onInput = (event: Event) => {
		onChange?.((event.target as HTMLInputElement)?.value, event);
	};
</script>

{#if label || description}
	<aside>
		{#if label}
			<label for={id}>
				<strong>{label}</strong>
			</label>
		{/if}
		{#if description}
			<small id={`${id}-description`}>{description}</small>
		{/if}
	</aside>
{/if}

<div>
	<input
		{type}
		{value}
		{placeholder}
		{maxlength}
		aria-describedby={description && `${id}-description`}
		oninput={onInput}
		{id}
	/>
	{@render inputContainer?.()}
</div>
