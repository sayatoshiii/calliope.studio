<script lang="ts">
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import { accountLogout, user } from '../../utils/database/client/account';
	import InputButton from '../../components/ui/input/button/input_button.svelte';

	const handleLogout = async () => {
		await accountLogout();
		goto('/account/login');
	};

	onMount(() => {
		if (!user) goto('/account/create');
	});
</script>

<div>hi</div>
<InputButton onclick={handleLogout}>Log Out</InputButton>
