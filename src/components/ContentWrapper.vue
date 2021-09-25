<template>
	<div class="data">
		<div class="data__container">
			<h1 class="data__title">{{ title }}</h1>
			<div class="data__inner">
				<slot />
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
defineProps({
	title: {
		type: String,
		required: false,
		default: 'Title',
	},
});
</script>

<style>
.data__container {
	display: grid;
	gap: 30px;

	max-width: 1200px;
	padding: 1rem;
}

@media screen and (min-width: 450px) {
	.data__container {
		padding: 2rem;
	}
}

.data__title {
	grid-column: 1 / -1;

	margin: 0;

	font-size: 1.5rem;
}

.data__inner {
	display: grid;
	gap: 50px;
}

@media screen and (min-width: 700px) {
	.data__inner {
		display: grid;
		grid-template-columns: minmax(min-content, 700px) 200px;
		gap: 20px 50px;
		justify-content: space-between;
	}
}
</style>
