<template>
	<li class="data-list-item">
		<q-input v-model="itemName" aria-label="название" type="text" @blur="emit('updateItem', id, itemName)" />
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
const itemName = ref('');
// eslint-disable-next-line vue/no-setup-props-destructure
itemName.value = properties.name;

const emit = defineEmits({
	updateItem: null,
	deleteItem: null,
});
</script>

<style>
.data-list-item {
	display: grid;
	grid-template-columns: 1fr 40px;
	gap: 20px;
}
</style>
