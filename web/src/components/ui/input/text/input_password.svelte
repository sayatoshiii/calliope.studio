<script lang="ts">
	import { Eye, EyeOff } from '@lucide/svelte';
	import InputText from './input_text.svelte';
	import type { InputTextProps } from './types';

	let props: InputTextProps = $props();
	let hidePassword = $state(true);
</script>

<InputText type={hidePassword ? 'password' : 'text'} {...props}>
	{#snippet inputContainer()}
		<button
			onclick={() => {
				hidePassword = !hidePassword;
			}}
		>
			{#if hidePassword}
				<Eye />
			{:else}
				<EyeOff />
			{/if}
		</button>
	{/snippet}
</InputText>
