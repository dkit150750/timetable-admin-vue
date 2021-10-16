<template>
	<div class="not-work" @click="run" @mousemove="run" @touchstart="run">
		<span class="circle"></span>
		<span class="circle circle--2"></span>
		<div class="not-work__container">
			<div class="not-work__image-wrapper">
				<div class="not-work__image-inner">
					<img class="not-work__image" src="/images/Annoying_Dog-0.gif" alt="" />
				</div>
			</div>
			<h1 class="not-work__title">
				Закрыто
				<ph:play-fill class="not-work__button-icon" />
			</h1>
			<audio ref="audio" autoplay loop class="teleskop-music" src="/audio/Toby Fox - Another Medium.mp3"></audio>
		</div>
	</div>
</template>

<script setup lang="ts">
const audio = ref<HTMLAudioElement | null>(null);

const run = () => {
	try {
		audio.value?.play();
	} catch (error) {
		console.log(error);
	}
};
// console.log(count.value);
</script>

<style>
.not-work {
	position: relative;

	display: grid;
	grid-template-columns: 1fr;
	align-content: center;

	height: 100%;
	padding: 2rem 0;

	overflow: hidden;
}

.not-work::after {
	position: absolute;
	top: 0;
	left: 0;
	content: '';
	z-index: 1;

	width: 100%;
	height: 100%;

	background-color: rgba(0, 0, 0, 0);
	background-image: radial-gradient(hsl(0, 72%, 65%), hsl(235, 62%, 73%));
	background-image: radial-gradient(hsla(0, 12%, 92%, 0.411), hsla(0, 0%, 13%, 0.205));
	background-image: none;

	pointer-events: none;

	animation: glow 4s ease-in-out infinite forwards alternate;
}

.not-work__container {
	position: relative;
	z-index: 100;

	display: grid;
	gap: 20px;
	justify-items: center;
}

.not-work__title {
	display: grid;
	grid-template-columns: max-content min-content;
	align-items: center;

	margin: auto;

	font-size: 3rem;
	line-height: 1;

	user-select: none;
}

.not-work__image-wrapper {
	width: 200px;
}

@media (min-width: 500px) {
	.not-work__image-wrapper {
		width: 250px;
	}
	.not-work__title {
		font-size: 4rem;
	}
}

@media (min-width: 1000px) {
	.not-work__image-wrapper {
		width: 300px;
	}
	.not-work__title {
		font-size: 5rem;
	}
}

@media (min-width: 1200px) {
	.not-work__image-wrapper {
		width: 400px;
	}
	.not-work__title {
		font-size: 6rem;
	}
}

@media (min-width: 1600px) {
	.not-work__image-wrapper {
		width: 500px;
	}
	.not-work__title {
		font-size: 7rem;
	}
}

.not-work__image-inner {
	position: relative;

	padding-bottom: 82.5%;
}

.not-work__image {
	position: absolute;
	top: 0;
	left: 0;

	display: block;

	width: 100%;
	height: 100%;
}

.not-work__button {
	display: flex;
	justify-content: center;
	align-items: center;

	width: 40px;
	height: 40px;
}

.not-work__button-icon {
	height: 0.9em;

	cursor: pointer;

	filter: drop-shadow(3px 3px 3px rgba(151, 8, 207, 0.7)) drop-shadow(3px 3px 3px rgba(151, 8, 207, 0.7))
		drop-shadow(-3px -3px 3px rgba(255, 6, 201, 0.7)) drop-shadow(-3px -3px 3px rgba(255, 6, 201, 0.7));

	animation: glow-button 4s ease-in-out infinite forwards alternate;
}

.not-work__button-icon path {
	fill: hsl(251, 59%, 11%);
}

.circle {
	--color: rgba(255, 6, 201, 0.7);

	position: absolute;
	top: 10vw;
	left: 10vw;

	width: 10vmin;
	height: 10vmin;

	border-radius: 50%;

	background-color: var(--color);

	box-shadow: 10px 10px 10px 10px var(--color);

	animation: circle 2.1s ease-in-out infinite forwards alternate;
}

.circle--2 {
	--color: rgba(135, 6, 255, 0.7);

	top: 10vmax;
	left: auto;
	right: 4vmin;

	width: 30vmin;
	height: 30vmin;

	box-shadow: -10px 10px 5px 5px var(--color);

	transform: scale(3);

	animation: circle2 4s cubic-bezier(0.29, -0.03, 0.42, 1.05) infinite forwards alternate;
}

@media (orientation: landscape) {
	.circle--2 {
		right: 5vmax;
	}
}

@media (orientation: landscape) and (min-width: 1450px) {
	.circle--2 {
		right: 15vmax;
	}
}

.circle::before {
	position: absolute;
	top: -5px;
	left: 2px;
	content: '';

	width: 96%;
	height: 96%;

	border-radius: 50%;

	background-color: hsl(0, 0%, 0%);

	box-shadow: 1px 5px 10px 10px hsl(0, 0%, 0%);
}

.circle--2::before {
	top: -4px;
	left: auto;
	right: 5px;

	width: 95%;
	height: 95%;
}

@keyframes circle {
	0% {
		opacity: 0.7;
		transform: translateY(0);
	}
	100% {
		transform: translateY(30px) rotate(14deg);
	}
}

@keyframes circle2 {
	0% {
		opacity: 0.5;
		transform: translateY(0);
	}
	100% {
		opacity: 1;
		transform: translateY(50px) rotate(-10deg);
	}
}

@keyframes glow {
	0% {
		opacity: 1;
		transform: translateY(0);
	}
	100% {
		opacity: 0;
	}
}

@keyframes glow-button {
	0% {
		opacity: 1;
		filter: drop-shadow(3px 3px 3px rgba(151, 8, 207, 0.7)) drop-shadow(3px 3px 3px rgba(151, 8, 207, 0.7))
			drop-shadow(-3px -3px 3px rgba(255, 6, 201, 0.7)) drop-shadow(-3px -3px 3px rgba(255, 6, 201, 0.7));
		transform: translateY(0) rotate(3deg);
	}
	100% {
		opacity: 0;
		filter: drop-shadow(0 0 0 rgba(151, 8, 207, 0.7)) drop-shadow(0 0 0 rgba(151, 8, 207, 0.7))
			drop-shadow(0 0 0 rgba(255, 6, 201, 0.7)) drop-shadow(0 0 0 rgba(255, 6, 201, 0.7));
		transform: translateY(0) rotate(-10deg);
	}
}
</style>

<route lang="yaml">
meta:
  layout: doggo
</route>
