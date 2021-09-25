<template>
	<div id="error">
		<router-view />
	</div>
</template>

<style>
#error {
	height: 100vh;
	padding: 1rem;

	background-image: url('/images/error.webp');
	background-position: center;
	background-size: cover;
}
</style>
