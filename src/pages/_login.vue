<template>
	<div class="login-wrapper">
		<div class="login-card">
			<h1 class="login-card__title">Вход</h1>
			<form class="login-form" @submit.prevent="handleSubmitClick">
				<div class="login-field" :class="{ 'login-field--error': errors.login.active }">
					<label class="login-field__login" for="login">Login</label>
					<input id="login" v-model="formModel.login" class="login-field__input" type="text" autocomplete="off" />
					<div v-if="errors.login.active" class="login-field__error">{{ errors.login.message }}</div>
				</div>
				<div class="login-field" :class="{ 'login-field--error': errors.password.active }">
					<label class="login-field__login" for="password">Password</label>
					<input id="password" v-model="formModel.password" class="login-field__input" type="text" autocomplete="off" />
					<div v-if="errors.password.active" class="login-field__error">{{ errors.password.message }}</div>
				</div>
				<div class="login-form__footer">
					<button class="login-field__button">Войти</button>
				</div>
			</form>
		</div>
	</div>
</template>
<script setup lang="ts">
import { useUserStore } from '~/stores/user';

import AuthService from '~/services/AuthService';

const router = useRouter();

const formModel = reactive({ login: 'admin', password: 'password' });

const errors = reactive({
	login: { active: false, message: '' },
	password: { active: false, message: '' },
});

const validate = () => {
	errors.login.active = false;
	if (formModel.login === '') {
		errors.login.message = 'Заполните поле';
		errors.login.active = true;
	}

	errors.password.active = false;
	if (formModel.password === '') {
		errors.password.message = 'Заполните поле';
		errors.password.active = true;
	}
	return !(errors.login.active || errors.password.active);
};

const handleSubmitClick = async () => {
	if (!validate()) {
		return;
	}
	try {
		const payload = { login: formModel.login, password: formModel.password, device_name: 'teleskop' };
		const response = await AuthService.login(payload);
		const userStore = useUserStore();
		userStore.setUser(response.data.user);
		router.push('/');
	} catch (error: any) {
		errors.login.message = error?.response?.data?.errors.login[0];
		errors.login.active = !!errors.login.message;
	}
};
</script>

<route lang="yaml">
meta:
  layout: login
</route>

<style>
.login-wrapper {
	display: flex;

	height: 100%;
	padding: 1rem;
}

.login-card {
	z-index: 2;

	width: 100%;
	max-width: 460px;
	margin: auto;
	padding: 2rem 2rem;

	color: hsl(0, 0%, 100%);

	border-radius: 6px;

	background-color: hsla(0, 0%, 96%, 0.2);

	backdrop-filter: blur(35px);
}

@media (min-width: 400px) {
	.login-card {
		padding: 2rem 3rem;
	}
}

.login-card__title {
	margin-top: 0;

	font-size: 1.6em;
}

.login-field {
	--color-error: hsl(0, 100%, 69%);

	display: grid;
}

.login-field + .login-field {
	margin-top: 0.4rem;
}

.login-field__login {
	margin-bottom: 0.1em;
}

.login-field__input {
	margin-bottom: 5px;
	padding: 0.3em 0.9em;

	color: hsl(0, 0%, 24%);
	font-weight: 600;

	border: 1px solid transparent;
	border-radius: 2px;

	background-color: hsla(0, 0%, 100%, 0.85);

	outline: none;
}

.login-field__input:focus-visible {
	box-shadow: 0 0 0 2px hsl(0, 0%, 0%);
}

.login-field--error .login-field__input {
	box-shadow: 0 0 0 2px var(--color-error);
}

.login-field__error {
	color: var(--color-error);
	font-weight: 600;
	font-size: 12px;
	line-height: 1;
}

.login-form__footer {
	display: flex;
	flex-wrap: wrap;
	gap: 1rem;
	justify-content: space-between;

	margin-top: 1rem;
}

.login-field__button {
	padding: 0.5em 1.5em;

	color: hsl(0, 0%, 100%);

	border: 0;
	border-radius: 3px;

	background-color: hsl(258, 72%, 49%);

	cursor: pointer;
}

.login-field__button:focus-visible {
	box-shadow: 0 0 0 2px hsl(0, 0%, 0%);
}
</style>
