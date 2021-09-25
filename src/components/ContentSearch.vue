<template>
	<q-form-item label="Поиск" prop="search">
		<q-input id="search" v-model="searchModel" type="text" autocomplete="off" />
	</q-form-item>
</template>

<script setup lang="ts">
const properties = defineProps({
	search: {
		type: String,
		required: true,
	},
});

const emit = defineEmits({
	searchForm: null,
});

const searchModel = ref('');
// eslint-disable-next-line vue/no-setup-props-destructure
searchModel.value = properties.search;

watch(
	() => searchModel.value,
	(search) => {
		emit('searchForm', search.trim());
	},
);
</script>
