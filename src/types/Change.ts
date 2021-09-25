import Lesson from '~/types/Lesson';

export default interface Change {
	id: number;
	lessons: Lesson[];
}
