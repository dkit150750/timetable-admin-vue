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
	--header-color: hsl(0, 0%, 42%);

	display: grid;
	grid-template-rows: max-content 1fr max-content;

	min-height: 100vh;
}
</style>
