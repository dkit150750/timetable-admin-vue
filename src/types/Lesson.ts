import Discipline from '~/types/Discipline';
import Cabinet from '~/types/Cabinet';
import Teacher from '~/types/Teacher';

export default interface Lesson {
	id: number;
	oddDiscipline: Discipline;
	evenDiscipline: Discipline;

	firstOddCabinet: Cabinet;
	secondOddCabinet: Cabinet;
	firstEvenCabinet: Cabinet;
	secondEvenCabinet: Cabinet;

	firstOddTeacher: Teacher;
	secondOddTeacher: Teacher;
	firstEvenTeacher: Teacher;
	secondEvenTeacher: Teacher;
}
