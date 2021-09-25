import { createPinia } from 'pinia';
import { UserModule } from '~/types';
import { useUserStore } from '~/stores/user';

// Setup Pinia
// https://pinia.esm.dev/
export const install: UserModule = ({ isClient, initialState, app, router }) => {
	const pinia = createPinia();
	app.use(pinia);
	// Refer to
	// https://github.com/antfu/vite-ssg/blob/main/README.md#state-serialization
	// for other serialization strategies.
	if (isClient) pinia.state.value = initialState.pinia || {};
	else initialState.pinia = pinia.state.value;
	router.beforeEach((to) => {
		const userStore = useUserStore(pinia);
		if (to.name === 'all') return true;
		if (to.name !== 'login' && !userStore.user.data) return '/login';
		if (to.name === 'login' && userStore.user.data) return '/';
		return true;
	});
};
