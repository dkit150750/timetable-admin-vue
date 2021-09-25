<template>
	<ContentWrapper title="Изменение пароля">
		<q-form ref="form" class="password-form" :model="formModel">
			<q-form-item
				label="Текущий пароль"
				prop="current_password"
				:class="{ 'q-form-item_is-error': errors.current_password.active }"
			>
				<q-input
					id="current_password"
					v-model="formModel.current_password"
					type="text"
					autocomplete="off"
					@keyup.enter="handleSubmitClick()"
				/>
				<div v-if="errors.current_password.active" class="q-form-item__error">
					{{ errors.current_password.message }}
				</div>
			</q-form-item>
			<q-form-item label="Новый пароль" prop="password" :class="{ 'q-form-item_is-error': errors.password.active }">
				<q-input
					id="password"
					v-model="formModel.password"
					type="text"
					autocomplete="off"
					@keyup.enter="handleSubmitClick()"
				/>
				<div v-if="errors.password.active" class="q-form-item__error">{{ errors.password.message }}</div>
			</q-form-item>
			<div class="login-form__footer">
				<q-button @click="handleSubmitClick()">Изменить</q-button>
			</div>
		</q-form>
	</ContentWrapper>
</template>

<script setup lang="ts">
import { QFormInstance } from '@qvant/qui-max';
import { useUserStore } from '~/stores/user';
import AuthService from '~/services/AuthService';

const userStore = useUserStore();
const router = useRouter();
const exitIfError = (error: any) => {
	if (error.response && [401, 419, 429, 500].includes(error.response.status)) {
		userStore.logout();
		AuthService.logout();
		router.push('/error');
		localStorage.removeItem('user-token');
		localStorage.removeItem('user');
	}
};

const formModel = reactive({ current_password: 'password', password: 'password' });

const errors = reactive({
	current_password: { active: false, message: '' },
	password: { active: false, message: '' },
});

const form = ref<QFormInstance>();

const validate = () => {
	errors.current_password.active = false;
	if (formModel.current_password === '') {
		errors.current_password.message = 'Заполните поле';
		errors.current_password.active = true;
	}

	errors.password.active = false;
	if (formModel.password === '') {
		errors.password.message = 'Заполните поле';
		errors.password.active = true;
	}
	return !(errors.current_password.active || errors.password.active);
};

const handleSubmitClick = async (): Promise<void> => {
	if (!validate()) {
		return;
	}
	if (!userStore.user.data?.login) {
		return;
	}
	const payload = {
		login: userStore.user.data.login,
		current_password: formModel.current_password,
		password: formModel.password,
	};
	try {
		await AuthService.changePassword(payload);
		formModel.current_password = '';
		formModel.password = '';
	} catch (error: any) {
		if (error?.response?.data?.current_password) {
			errors.current_password.message = error?.response?.data?.current_password;
			errors.current_password.active = true;
		}
		exitIfError(error);
	}
};
</script>

<style>
.password-form {
	max-width: 300px;
}
</style>
