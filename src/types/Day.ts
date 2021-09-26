import Lesson from '~/types/Lesson';

export default interface Day {
	id: number;
	name: string;
	lessons: Lesson[];
}
