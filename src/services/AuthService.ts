import * as Api from '~/services/Api';
import User from '~/types/User';

type UserResponse = { data: { user: User; token: string } };

export default {
	async login(payload: { login: string; password: string; device_name: string }): Promise<UserResponse> {
		const response = (await Api.apiClient.post('/login', payload)) as unknown as UserResponse;
		Api.apiClient.defaults.headers.common.Authorization = `Bearer ${response.data.token}`;
		return response;
	},
	logout(): void {
		delete Api.apiClient.defaults.headers.common.Authorization;
		Api.apiClient.post('/logout');
	},
	async changePassword(payload: {
		login: string;
		current_password: string;
		password: string;
	}): Promise<{ message?: string | undefined }> {
		const response = Api.apiClient.put('/password', payload) as unknown as { message?: string };
		return response;
	},
};
