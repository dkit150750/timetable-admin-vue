<template>
	<router-link class="link-error" to="/">Ошибка :(</router-link>
</template>

<route lang="yaml">
meta:
  layout: error
</route>

<style>
.link-error {
	position: absolute;
	position: fixed;
	left: 50%;
	bottom: 3rem;

	color: hsl(0, 0%, 100%);
	font-size: 1.2rem;

	transform: translateX(-50%);
}

.link-error::after {
	position: relative;
	left: 0;
	bottom: -3px;
	content: '';

	display: block;

	width: 100%;
	height: 1px;

	background-color: currentColor;
}
</style>
