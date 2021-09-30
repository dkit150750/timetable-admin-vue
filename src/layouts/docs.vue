<template>
	<div id="docs">
		<TheHeader />
		<TheMain>
			<router-view />
		</TheMain>
		<TheFooter />
	</div>
</template>

<script setup lang="ts">
import '~/assets/styles/prism-base.css';
</script>

<style>
#docs {
	--max-width: 1520px;
	--header-color: hsl(0, 0%, 61%);

	display: grid;
	grid-template-rows: max-content 1fr max-content;

	min-height: 100vh;

	color: hsl(0, 0%, 61%);

	background-color: hsl(0, 0%, 7%);
}
</style>
