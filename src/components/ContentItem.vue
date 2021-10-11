<template>
	<li class="data-list-item">
		<q-input
			v-model="itemName"
			aria-label="название"
			type="text"
			@input="emit('changeItem', id, itemName)"
			@blur="blurHandler(id, itemName)"
		/>
		<q-button v-if="id > minId" aria-label="удалить" type="icon" @click="emit('deleteItem', id)">
			<ic:baseline-close />
		</q-button>
	</li>
</template>

<script setup lang="ts">
const properties = defineProps({
	id: {
		type: Number,
		required: true,
	},
	name: {
		type: String,
		required: true,
	},
});

const minId = 2;
const itemName = ref(properties.name);
let initValue = '';

onBeforeMount(() => {
	initValue = itemName.value;
});

const emit = defineEmits<{
	(event: 'changeItem', id: number, itemName: string): void;
	(event: 'updateItem', id: number, itemName: string): void;
	(event: 'deleteItem', id: number): void;
}>();

const blurHandler = (id: number, value: string) => {
	if (initValue !== value) {
		initValue = value;
		emit('updateItem', id, value);
	}
};
</script>

<style>
.data-list-item {
	display: grid;
	grid-template-columns: 1fr 40px;
	gap: 20px;
}
</style>
