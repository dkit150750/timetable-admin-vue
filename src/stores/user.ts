import { acceptHMRUpdate, defineStore } from 'pinia';
import User from '~/types/User';

let userLocal: User | null = null;
const isServer = typeof window === 'undefined';
if (!isServer) {
	const userLocalStorage = localStorage.getItem('user');
	userLocal = userLocalStorage != null ? JSON.parse(userLocalStorage) : null;
}

export const useUserStore = defineStore('user', () => {
	const user: { data: User | null } = reactive({ data: userLocal });

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
