/*
 * Это начальный интерфейс API
 * мы задаем базовый URL-адрес для API
 */

import axios from 'axios';
import { useUserStore } from '~/stores/user';

let token = '';
const apiData: { baseURL: string; headers?: { Authorization: string } } = { baseURL: 'https://api-time.dtivt.ru/api' };
const isServer = typeof window === 'undefined';
if (!isServer) {
	token = localStorage.getItem('user-token') || '';

	if (token !== '') {
		apiData.headers = { Authorization: `Bearer ${token}` };
	}
}

export const apiClient = axios.create(apiData);

/*
 * Добавьте перехватчик ответов
 */
apiClient.interceptors.response.use(
	function f(response) {
		// Любой код состояния, который находится в диапазоне 2xx, вызывает срабатывание этой функции
		// Сделайте что-нибудь с данными ответа
		return response;
	},
	function f(error) {
		if (error.response && [401, 419, 429, 500].includes(error.response.status)) {
			const userStore = useUserStore();
			userStore.logout();
		}
		return Promise.reject(error);
	},
);
