<template>
	<div id="home">
		<TheHeader />
		<TheMain>
			<router-view />
		</TheMain>
		<footer class="home-footer">
			<div class="home-footer__container">
				<p class="home-footer__copy">@teleskop150750 <span class="footer__icon footer__icon--1"></span></p>
				<a class="home-footer__dkit" href="http://dtivt.ru/"><span class="footer__icon footer__icon--2"></span></a>
			</div>
		</footer>
	</div>
</template>

<style>
#home {
	--max-width: 1520px;

	display: grid;
	grid-template-rows: max-content 1fr;

	height: 100vh;

	overflow-x: hidden;
}

.home-footer {
	position: fixed;
	left: 0;
	bottom: 0;

	width: 100%;
	padding: 1em 0;

	background-color: hsla(240, 10%, 96%, 0.5);

	backdrop-filter: blur(30px);
}

.home-footer__container {
	display: flex;
	justify-content: space-between;

	max-width: var(--max-width);
	margin: 0 auto;
	padding: 0 1em;

	line-height: 1;
}

.home-footer__copy {
	display: grid;
	grid-auto-flow: column;
	gap: 1ch;

	margin: 0;

	color: inherit;
	font-weight: 600;
	font-size: 1.2em;
	font-family: inherit;
	line-height: 1;
	letter-spacing: inherit;

	border: 0;

	background-color: transparent;

	cursor: pointer;
}

.home-footer__copy:focus {
	outline: none;
}

.home-footer__copy.focus-visible {
	box-shadow: 0 0 0 2px hsl(237deg 54% 55%);
}

.home-footer__dkit {
	display: block;
	align-self: center;
}

.home-footer__dkit:focus {
	outline: none;
}

.home-footer__dkit.focus-visible {
	box-shadow: 0 0 0 2px hsl(237deg 54% 55%);
}

.spock-popup-wrapper {
	position: absolute;
}

.home-footer__home {
	font-size: 1.2em;
	text-decoration: none;

	user-select: none;
}

.home-footer__home:focus-visible {
	box-shadow: 0 0 0 2px var(--focus-visible-shadow);
}

.footer__icon {
	display: inline-block;

	width: 1em;
	height: 1em;

	background-image: url('/images/icon-1.webp');
	background-repeat: no-repeat;
	background-size: contain;
}

.footer__icon--2 {
	width: 2em;

	font-size: 1.2em;

	background-image: url('/images/icon-2.webp');
}
</style>
