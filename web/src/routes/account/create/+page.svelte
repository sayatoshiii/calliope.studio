<script>
	import { Sparkles } from '@lucide/svelte';
	import InputButton from '../../../components/ui/input/button/input_button.svelte';
	import InputPassword from '../../../components/ui/input/text/input_password.svelte';
	import InputText from '../../../components/ui/input/text/input_text.svelte';
	import { MuseUIColour } from '../../../components/ui/types';
</script>

<InputText
	label={'Email'}
	description={'Please pick an email for your account'}
	placeholder={'name@email.com'}
	id={'input_account_email'}
/>

<InputPassword
	label={'Password'}
	description={'Please pick a password for your account'}
	id={'input_account_password'}
/>

<InputButton colour={MuseUIColour.PRIMARY}>
	<Sparkles /> Create Account
</InputButton>
