import { acceptHMRUpdate, defineStore } from 'pinia';
import User from '~/types/User';

export const useUserStore = defineStore('user', () => {
	const user: { data: User | null } = reactive({ data: null });

	function setUser(data: User | null) {
		user.data = data;
	}

	function logout() {
		user.data = null;
	}

	return {
		user,
		setUser,
		logout,
	};
});

if (import.meta.hot) import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot));
