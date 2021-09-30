<template>
	<header class="header">
		<div class="header__container">
			<router-link class="header__title" to="/" @click.self="isOpenMenu = false">Admin Panel</router-link>
			<button class="header__burger" type="button" @click="changeMenu">
				<eva:menu-fill />
			</button>
			<nav class="nav" :class="menuClass" @click.self="isOpenMenu = false">
				<div class="nav__inner">
					<ul class="nav__list">
						<li class="nav__item">
							<router-link
								class="nav__link"
								exact-active-class="nav__link--active"
								to="/groups"
								@click="isOpenMenu = false"
								>Группы</router-link
							>
						</li>
						<li class="nav__item">
							<router-link
								class="nav__link"
								exact-active-class="nav__link--active"
								to="/changes"
								@click="isOpenMenu = false"
								>Изменения</router-link
							>
						</li>
						<li class="nav__item">
							<router-link
								class="nav__link"
								exact-active-class="nav__link--active"
								to="/times"
								@click="isOpenMenu = false"
								>Время</router-link
							>
						</li>
						<li class="nav__item">
							<router-link
								class="nav__link"
								exact-active-class="nav__link--active"
								to="/teachers"
								@click="isOpenMenu = false"
								>Преподаватели</router-link
							>
						</li>
						<li class="nav__item">
							<router-link
								class="nav__link"
								exact-active-class="nav__link--active"
								to="/disciplines"
								@click="isOpenMenu = false"
								>Дисциплины</router-link
							>
						</li>
						<li class="nav__item">
							<router-link
								class="nav__link"
								exact-active-class="nav__link--active"
								to="/cabinets"
								@click="isOpenMenu = false"
								>Кабинеты</router-link
							>
						</li>
						<li class="nav__item">
							<router-link
								class="nav__link"
								exact-active-class="nav__link--active"
								to="/user"
								@click="isOpenMenu = false"
								>User</router-link
							>
						</li>
						<li class="nav__item">
							<button class="nav__link" @click="logout">Выйти</button>
						</li>
					</ul>
				</div>
			</nav>
		</div>
	</header>
</template>

<script setup lang="ts">
import { useUserStore } from '~/stores/user';
import AuthService from '~/services/AuthService';

const router = useRouter();

const isOpenMenu = ref(false);
const menuClass = computed(() => ({
	'nav--active': isOpenMenu.value,
}));

const changeMenu = () => {
	isOpenMenu.value = !isOpenMenu.value;
};

const logout = () => {
	AuthService.logout();
	const userStore = useUserStore();
	userStore.logout();
	router.push('/login');
};
</script>

<style>
.header {
	z-index: 100;

	display: flex;
	align-items: center;

	height: 64px;

	border-bottom: 1px solid var(--header-color);
}

.header__container {
	display: flex;
	justify-content: space-between;
	align-items: center;

	width: 100%;
	padding: 0 1.5rem;
}

.header__title {
	color: var(--header-color);
	font-weight: 700;
	font-size: 1.5rem;
}

.header__title:focus-visible {
	box-shadow: 0 0 0 2px hsl(237, 54%, 55%);
}

.header__burger {
	display: block;

	width: 40px;
	height: 40px;
	padding: 0;

	color: inherit;
	font-size: 2em;

	border: 0;

	background-color: transparent;
}

.header__burger:focus-visible {
	box-shadow: 0 0 0 2px hsl(237, 54%, 55%);
}

@media screen and (min-width: 930px) {
	.header__burger {
		display: none;
	}
}

@media screen and (max-width: 929px) {
	.nav {
		position: absolute;
		top: 64px;
		left: 0;
		right: 0;

		height: calc(100vh - 64px);

		pointer-events: none;
	}

	.nav--active {
		pointer-events: all;
	}

	.nav .nav__inner {
		position: absolute;
		top: 0;
		left: 0;
		bottom: 0;
		z-index: 150;

		width: 14rem;
		padding: 1rem;

		border-right: 1px solid var(--header-color);

		background-color: hsl(240, 10%, 96%);

		transform: translateX(-100%);

		transition: transform 0.2s cubic-bezier(0.39, 0.58, 0.57, 1);
	}

	.nav--active .nav__inner {
		transform: translateX(0);
	}
}

.nav__list {
	display: grid;
	grid-template-columns: 1fr;
	gap: 0.8rem;
	justify-items: start;

	margin: 0;
	padding: 0;

	list-style: none;
}

@media screen and (min-width: 930px) {
	.nav__list {
		grid-auto-columns: max-content;
		grid-auto-flow: column;
	}
}

.nav__link {
	position: relative;

	display: block;

	margin: 0;
	padding: 0 0.2em;
	padding: 0;

	color: var(--header-color);
	font-weight: 600;
	font-size: 1rem;
	line-height: 1.5;

	border: 0;

	background-color: transparent;

	cursor: pointer;
}

.nav__link:focus-visible {
	box-shadow: 0 0 0 2px hsl(237, 54%, 55%);
}

.nav__link--active::before {
	position: absolute;
	left: 0;
	bottom: -3px;
	content: '';

	display: block;

	width: 100%;
	height: 2px;

	background-color: hsl(234, 60%, 62%);
}
</style>
