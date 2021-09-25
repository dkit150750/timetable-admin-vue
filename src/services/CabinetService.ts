import * as Api from '~/services/Api';
import Service from '~/types/Service';
import Item from '~/types/Item';

type ListResponse = { data: { data: Item[]; meta: { last_page: number } } };
type ItemResponse = { data: { data: Item } };

export default {
	async getItems(search = null) {
		return (await Api.apiClient.get('/cabinets', {
			params: {
				search,
			},
		})) as unknown as ListResponse;
	},
	async getPagen(page = null, search = null) {
		return (await Api.apiClient.get('/cabinets/pagen', {
			params: {
				page,
				search,
			},
		})) as unknown as ListResponse;
	},
	async addItem(payload: { name: string }) {
		return (await Api.apiClient.post('/cabinets', payload)) as unknown as ItemResponse;
	},
	async updateItem(id: number, payload: { name: string }) {
		await Api.apiClient.put(`/cabinets/${id}`, payload);
	},
	async deleteItem(id: number) {
		await Api.apiClient.delete(`/cabinets/${id}`);
	},
} as unknown as Service;
