<script>
	import { KeyRound } from '@lucide/svelte';
	import InputButton from '../../../components/ui/input/button/input_button.svelte';
	import InputPassword from '../../../components/ui/input/text/input_password.svelte';
	import InputText from '../../../components/ui/input/text/input_text.svelte';
	import { MuseUIColour } from '../../../components/ui/types';
	import { getInputValue } from '../../../utils/page/input';
	import { accountLogin, user } from '../../../utils/database/client/account';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';

	const handleAccountLogin = async () => {
		const email = getInputValue('input_account_email');
		const password = getInputValue('input_account_password');

		await accountLogin(email, password);
		goto('/app');
	};

	onMount(() => {
		if (user) goto('/app');
	});
</script>

<InputText
	label={'Email'}
	description={'Please enter your account email'}
	id={'input_account_email'}
/>

<InputPassword
	label={'Password'}
	description={'Please enter your account password'}
	id={'input_account_password'}
/>

<InputButton colour={MuseUIColour.PRIMARY} onclick={handleAccountLogin}>
	<KeyRound /> Login
</InputButton>
