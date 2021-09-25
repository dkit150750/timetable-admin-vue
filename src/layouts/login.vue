<template>
	<div id="login-layout">
		<div class="login-header">
			<div class="login-header__container">
				<p class="login-header__title">Star Trek</p>
			</div>
		</div>
		<main class="login-main">
			<router-view />
		</main>
		<footer class="login-footer">
			<div class="login-footer__container">
				<p class="footer__copy">@teleskop150750 <span class="footer__icon footer__icon--1"></span></p>
				<a class="footer__dkit" href="http://dtivt.ru/"><span class="footer__icon footer__icon--2"></span></a>
			</div>
		</footer>
	</div>
</template>

<style>
#login-layout {
	--max-width: 620px;

	position: relative;

	display: grid;
	grid-template-rows: max-content 1fr max-content;
	grid-template-columns: 1fr;

	max-width: 100%;
	min-height: 100vh;

	background-image: url('/images/bg-2-2x.jpg');
	background-position: center;
	background-size: cover;
}

.login-header {
	z-index: 2;
}

.login-header__container {
	padding: 3em 1rem;
}

.login-header__title {
	margin: 0;

	color: hsl(0, 4%, 95%);
	font-weight: 700;
	font-size: 2em;
	text-align: center;

	user-select: none;
}

.login-main {
	z-index: 2;
}

.login-footer {
	padding: 1.2rem 1rem;
}

.login-footer__container {
	display: flex;
	justify-content: space-between;

	max-width: var(--max-width);
	margin: 0 auto;
	padding: 1em 2em;

	color: rgb(224, 224, 224);
	font-size: 12px;
	line-height: 1;

	border-radius: 4px;

	background-color: hsla(0, 0%, 96%, 0.2);

	backdrop-filter: blur(15px);
}

.login-footer__copy {
	margin: 0;

	color: inherit;
	font-weight: 600;
	font-size: 1.2em;
	font-family: inherit;
	line-height: 1;
	letter-spacing: inherit;

	border: 0;

	background-color: transparent;

	user-select: none;
}

.login-footer__copy:focus {
	outline: none;
}

.login-footer__copy:focus-visible {
	box-shadow: 0 0 0 2px var(--focus-visible-shadow);
}

.login-footer__home {
	font-size: 1.2em;
	text-decoration: none;

	user-select: none;
}

.login-footer__home:focus-visible {
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
