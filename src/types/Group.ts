import Day from '~/types/Day';
import Change from '~/types/Change';

export default interface Group {
	id: number;
	name: string;
	slug: string;
	course: number;
	days: Day[];
	changes: Change[];
}
