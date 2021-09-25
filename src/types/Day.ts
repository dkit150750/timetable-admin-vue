import Lesson from '~/types/Lesson';

export default interface Day {
	id: number;
	number: number;
	name: string;
	lessons: Lesson[];
}
