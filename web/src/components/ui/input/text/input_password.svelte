<script lang="ts">
	import { Eye, EyeOff } from '@lucide/svelte';
	import InputText from './input_text.svelte';
	import type { InputTextProps } from './types';

	let props: InputTextProps = $props();

	let hidePassword = $state(true);
	const ToggleVisibilityIcon = $derived(hidePassword ? Eye : EyeOff);
</script>

<InputText type={hidePassword ? 'password' : 'text'} {...props}>
	{#snippet inputContainer()}
		<button
			type="button"
			aria-label={hidePassword ? 'Show password' : 'Hide password'}
			onclick={() => {
				hidePassword = !hidePassword;
			}}
		>
			<ToggleVisibilityIcon />
		</button>
	{/snippet}
</InputText>
