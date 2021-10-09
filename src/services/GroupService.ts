import * as Api from '~/services/Api';
import Group from '~/types/Group';
import GroupInfo from '~/types/GroupInfo';

type ListResponse = { data: { data: GroupInfo[]; meta: { last_page: number } } };
type ItemResponse = { data: { data: Group } };

export default {
	async getItems(): Promise<ListResponse> {
		return (await Api.apiClient.get('/groups')) as unknown as ListResponse;
	},

	async getCourseItems(course: number): Promise<ListResponse> {
		return (await Api.apiClient.get(`/courses/${course}/groups`)) as unknown as ListResponse;
	},

	async getItem(slug: string): Promise<ItemResponse> {
		return (await Api.apiClient.get(`/groups/${slug}`)) as unknown as ItemResponse;
	},

	async addItem(payload: { name: string; course: number }): Promise<ItemResponse> {
		return (await Api.apiClient.post('/groups', payload)) as unknown as ItemResponse;
	},

	async updateItem(id: number, payload: { name?: string; course?: number }): Promise<ItemResponse> {
		return (await Api.apiClient.put(`/groups/${id}`, payload)) as unknown as ItemResponse;
	},

	async deleteItem(slug: string): Promise<{ id: number }> {
		return (await Api.apiClient.delete(`/groups/${slug}`)) as unknown as { id: number };
	},

	async fresh(day: string): Promise<void> {
		await Api.apiClient.put('/groups/fresh-changes', {
			day,
		});
	},
};
