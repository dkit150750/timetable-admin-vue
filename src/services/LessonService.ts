import * as Api from '~/services/Api';
import LessonInfo from '~/types/LessonInfo';

export default {
	updateItem(id: number, payload: LessonInfo): void {
		Api.apiClient.put(`/lessons/${id}`, payload);
	},
};
