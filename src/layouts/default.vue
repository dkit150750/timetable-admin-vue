<template>
	<div id="layout">
		<TheHeader />
		<TheMain>
			<router-view />
		</TheMain>
		<TheFooter />
	</div>
</template>

<style>
#layout {
	--max-width: 1520px;

	display: grid;
	grid-template-rows: max-content 1fr max-content;

	height: 100vh;
}
</style>
