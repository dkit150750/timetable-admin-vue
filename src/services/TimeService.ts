import * as Api from '~/services/Api';
import Time from '~/types/Time';
import TimeService from '~/types/TimeService';

export default {
	async getItem() {
		return (await Api.apiClient.get('/times')) as unknown as Time;
	},
	async updateItem(payload: Time) {
		await Api.apiClient.put('/times', payload);
	},
} as unknown as TimeService;
