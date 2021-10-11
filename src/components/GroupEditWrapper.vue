<template>
	<div class="group-edit">
		<div class="group-edit__container">
			<h2 class="group-edit__title">
				{{ titleText }} <span class="group-edit__title-group">{{ groupName }}</span>
			</h2>
			<div class="group-edit__header">
				<slot name="header" />
			</div>
			<slot />
		</div>
	</div>
</template>

<script setup lang="ts">
const properties = defineProps({
	groupName: {
		type: String,
		required: false,
		default: '',
	},
	isChanges: {
		type: Boolean,
		required: false,
		default: false,
	},
});

const titleText = computed(() => (properties.isChanges ? 'Изменения для группы' : 'Редактирование группы'));
</script>

<style>
.group-edit__container {
	padding: 1rem 0;
}

@media screen and (min-width: 450px) {
	.group-edit__container {
		padding: 2rem 0;
	}
}
.group-edit__title {
	margin-top: 0;
	margin-bottom: 1em;
	padding: 0 1rem;

	font-size: 1.8em;
	line-height: 1.3;
}

@media screen and (min-width: 450px) {
	.group-edit__title {
		padding: 0 2rem;
	}
}

.group-edit__title-group {
	white-space: nowrap;
}

.group-edit__header {
	display: grid;
	grid-template-columns: repeat(2, minmax(100px, 140px));
	gap: 20px 10px;
	align-items: flex-end;

	padding: 0 1rem;
}

@media screen and (min-width: 450px) {
	.group-edit__header {
		padding: 0 2rem;
	}
}

@media screen and (min-width: 510px) {
	.group-edit__header {
		grid-template-columns: repeat(3, minmax(100px, 140px));
	}
}

@media screen and (min-width: 700px) {
	.group-edit__header {
		grid-template-columns: repeat(4, minmax(100px, 140px));
	}
}

@media screen and (min-width: 800px) {
	.group-edit__header {
		grid-template-columns: repeat(5, minmax(100px, 140px));
	}
}

.group-edit__name {
	max-width: 200px;
}

.group-edit__header > .group-delete {
	margin-bottom: 24px;
}
</style>
