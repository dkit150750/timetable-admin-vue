import * as Api from '~/services/Api';

type Lesson = {
	id: number;
	oddDiscipline_id: number;
	evenDiscipline_id: number;

	firstOddCabinet_id: number;
	secondOddCabinet_id: number;
	firstEvenCabinet_id: number;
	secondEvenCabinet_id: number;

	firstOddTeacher_id: number;
	secondOddTeacher_id: number;
	firstEvenTeacher_id: number;
	secondEvenTeacher_id: number;
};

export default {
	async updateItem(id: number, payload: Lesson): Promise<void> {
		await Api.apiClient.put(`/changes/${id}`, payload);
	},
};
