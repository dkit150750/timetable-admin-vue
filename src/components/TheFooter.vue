<template>
	<footer class="footer">
		<div class="footer__container">
			<p class="footer__copy">@teleskop150750 <span class="footer__icon footer__icon--1"></span></p>
			<a class="footer__dkit" href="https://dkit-timetable.netlify.app/" target="_blank"
				><span class="footer__icon footer__icon--2"></span
			></a>
		</div>
	</footer>
</template>

<route>
meta:
  layout: admin
</route>

<style>
.footer {
	padding: 1em 0;
}

.footer__container {
	display: flex;
	justify-content: space-between;

	max-width: var(--max-width);
	margin: 0 auto;
	padding: 0 1em;

	line-height: 1;
}

.footer__copy {
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

.footer__copy:focus {
	outline: none;
}

.footer__copy:focus-visible {
	box-shadow: 0 0 0 2px var(--focus-visible-shadow);
}

.footer__dkit {
	font-size: 1.2em;
	text-decoration: none;

	user-select: none;
}

.footer__dkit:focus-visible {
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
