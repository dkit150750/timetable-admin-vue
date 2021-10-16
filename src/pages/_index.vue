<template>
	<div class="home">
		<img class="home__img" src="/images/admin-bg-2x.webp" alt="Стар трек" />
	</div>
</template>

<script setup lang="ts"></script>

<route lang="yaml">
meta:
  layout: home
</route>

<style>
.home {
	position: relative;

	height: 100%;
}

.home__img {
	position: absolute;
	top: 0;
	left: 0;

	display: block;

	width: 100%;
	height: 100%;

	object-fit: cover;
}
</style>
