<script>
	export let name;
	export let description;

	export let placeholder;
	export let value = '';

	export let id;
</script>

{#if name || description}
	<label for={id}>
		{#if name}<b>{name}</b>{/if}
		{#if description}{description}{/if}
	</label>
{/if}

<input type="text" bind:value {placeholder} {id} />
