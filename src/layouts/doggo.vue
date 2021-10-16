<template>
	<div id="work">
		<router-view />
	</div>
</template>

<style>
#work {
	display: grid;
	grid-template-columns: 1fr;

	min-height: 100vh;

	color: hsl(0, 0%, 100%);
	font-family: Graphik, Arial, Helvetica, sans-serif;
	line-height: 1.2;

	background-color: black;
}
</style>
