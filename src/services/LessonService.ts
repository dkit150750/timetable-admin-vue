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
	updateItem(id: number, payload: Lesson): void {
		Api.apiClient.put(`/lessons/${id}`, payload);
	},
};
