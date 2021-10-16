<template>
	<div id="layout">
		<TheHeader />
		<TheMain>
			<router-view />
		</TheMain>
		<TheFooter />
	</div>
</template>

<script setup lang="ts">
const router = useRouter();
router.push('/doggo');
</script>

<style>
#layout {
	background-color: black;
}
</style>
