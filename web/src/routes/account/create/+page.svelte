<script>
	import InputPassword from '../../../components/ui/input/text/input_password.svelte';
	import InputText from '../../../components/ui/input/text/input_text.svelte';
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
	placeholder={'name@email.com'}
	id={'input_account_password'}
/>
