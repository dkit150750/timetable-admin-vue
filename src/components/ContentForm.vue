<template>
	<q-form ref="form" class="add-form" :model="formModel" @submit.prevent="handleSubmitClick()">
		<q-form-item :label="label" prop="name" :class="{ 'q-form-item_is-error': errors.name.active }">
			<q-input
				id="name"
				v-model="formModel.name"
				type="text"
				autocomplete="off"
				@blur="emit('blurInput', formModel.name)"
			/>
			<div v-if="errors.name.active" class="q-form-item__error">{{ errors.name.message }}</div>
		</q-form-item>
		<div class="q-form__footer">
			<q-button @click="handleSubmitClick()">Добавить</q-button>
		</div>
	</q-form>
</template>

<script setup lang="ts">
import { QFormInstance } from '@qvant/qui-max';

defineProps({
	label: {
		type: String,
		required: true,
	},
	errors: {
		type: Object,
		required: true,
	},
});

const emit = defineEmits({
	submitForm: null,
	blurInput: null,
});

const formModel = reactive({ name: '' });

const form = ref<QFormInstance>();

const handleSubmitClick = async (): Promise<void> => {
	emit('submitForm', formModel.name);
	formModel.name = '';
};
</script>
