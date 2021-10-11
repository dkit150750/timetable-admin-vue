<template>
	<div class="lesson">
		<h3 class="lesson__number">{{ numberLesson }} - Урок</h3>
		<div class="lesson__titles">
			<span></span>
			<p class="lesson__title">Дисциплина</p>
			<p class="lesson__title">Преподаватель</p>
			<p class="lesson__title">Кабинет</p>
			<p class="lesson__title">Преподаватель /2</p>
			<p class="lesson__title">Кабинет /2</p>
		</div>
		<p class="lesson__even-name">Желтая</p>
		<p class="lesson__odd-name">Зелёная</p>
		<div class="lesson__odd-info">
			<div class="lesson__odd-info-line-name">Ж</div>
			<!-- Дисциплина -->
			<q-select
				v-model="lessonData.oddDisciplineName.id"
				class="changes__select"
				:filterable="true"
				@search="handleLessonSearch"
			>
				<q-option
					v-for="item in lessonData.oddDisciplineName.options"
					:key="item.id"
					:label="item.name"
					:value="item.id"
				/>
			</q-select>
			<!-- Преподаватель -->
			<q-select
				v-model="lessonData.firstOddTeacherName.id"
				class="changes__select"
				:filterable="true"
				@search="handleTeacherSearch"
			>
				<q-option
					v-for="item in lessonData.firstOddTeacherName.options"
					:key="item.id"
					:label="item.name"
					:value="item.id"
				/>
			</q-select>
			<!-- Кабинет -->
			<q-select
				v-model="lessonData.firstOddCabinetName.id"
				class="changes__select"
				:filterable="true"
				@search="handleCabinetSearch"
			>
				<q-option
					v-for="item in lessonData.firstOddCabinetName.options"
					:key="item.id"
					:label="item.name"
					:value="item.id"
				/>
			</q-select>
			<!-- Преподаватель /2 -->
			<q-select
				v-model="lessonData.secondOddTeacherName.id"
				class="changes__select"
				:filterable="true"
				@search="handleTeacherSearch"
			>
				<q-option
					v-for="item in lessonData.secondOddTeacherName.options"
					:key="item.id"
					:label="item.name"
					:value="item.id"
				/>
			</q-select>
			<!-- Кабинет /2 -->
			<q-select
				v-model="lessonData.secondOddCabinetName.id"
				class="changes__select"
				:filterable="true"
				@search="handleCabinetSearch"
			>
				<q-option
					v-for="item in lessonData.secondOddCabinetName.options"
					:key="item.id"
					:label="item.name"
					:value="item.id"
				/>
			</q-select>
		</div>
		<div class="lesson__even-info">
			<div class="lesson__even-info-line-name">З</div>
			<!-- Дисциплина -->
			<q-select
				v-model="lessonData.evenDisciplineName.id"
				class="changes__select"
				:filterable="true"
				@search="handleLessonSearch"
			>
				<q-option
					v-for="item in lessonData.evenDisciplineName.options"
					:key="item.id"
					:label="item.name"
					:value="item.id"
				/>
			</q-select>
			<!-- Преподаватель -->
			<q-select
				v-model="lessonData.firstEvenTeacherName.id"
				class="changes__select"
				:filterable="true"
				@search="handleTeacherSearch"
			>
				<q-option
					v-for="item in lessonData.firstEvenTeacherName.options"
					:key="item.id"
					:label="item.name"
					:value="item.id"
				/>
			</q-select>
			<!-- Кабинет -->
			<q-select
				v-model="lessonData.firstEvenCabinetName.id"
				class="changes__select"
				:filterable="true"
				@search="handleCabinetSearch"
			>
				<q-option
					v-for="item in lessonData.firstEvenCabinetName.options"
					:key="item.id"
					:label="item.name"
					:value="item.id"
				/>
			</q-select>
			<!-- Преподаватель /2 -->
			<q-select
				v-model="lessonData.secondEvenTeacherName.id"
				class="changes__select"
				:filterable="true"
				@search="handleTeacherSearch"
			>
				<q-option
					v-for="item in lessonData.secondEvenTeacherName.options"
					:key="item.id"
					:label="item.name"
					:value="item.id"
				/>
			</q-select>
			<!-- Кабинет /2 -->
			<q-select
				v-model="lessonData.secondEvenCabinetName.id"
				class="changes__select"
				:filterable="true"
				@search="handleCabinetSearch"
			>
				<q-option
					v-for="item in lessonData.secondEvenCabinetName.options"
					:key="item.id"
					:label="item.name"
					:value="item.id"
				/>
			</q-select>
		</div>
	</div>
</template>

<script setup lang="ts">
import { PropType } from 'vue';
import Lesson from '~/types/Lesson';
import Item from '~/types/Item';
import LessonInfo from '~/types/LessonInfo';

const properties = defineProps({
	lesson: {
		type: Object as PropType<Lesson>,
		required: true,
	},
	index: {
		type: [Number, String, Symbol] as PropType<string | number | symbol>,
		required: true,
	},
	teachers: {
		type: Array as PropType<Item[]>,
		required: true,
	},
	disciplines: {
		type: Array as PropType<Item[]>,
		required: true,
	},
	cabinets: {
		type: Array as PropType<Item[]>,
		required: true,
	},
	changes: {
		type: Boolean,
		required: false,
		default: false,
	},
});

const emit = defineEmits<{
	(event: 'updateLesson', id: number, payload: LessonInfo): void;
}>();

const numberLesson = computed(() => {
	if (typeof properties.index === 'string') {
		return Number.parseInt(properties.index, 10) + 1;
	}
	if (typeof properties.index === 'symbol') {
		return 1;
	}
	return properties.index + 1;
});

const lessonData = reactive({
	// дисциплины
	oddDisciplineName: {
		remoteLoading: false,
		id: properties.lesson.oddDiscipline.id,
		options: properties.disciplines,
	},
	evenDisciplineName: {
		remoteLoading: false,
		id: properties.lesson.evenDiscipline.id,
		options: properties.disciplines,
	},
	// преподаватели
	firstOddTeacherName: {
		remoteLoading: false,
		id: properties.lesson.firstOddTeacher.id,
		options: properties.teachers,
	},
	secondOddTeacherName: {
		remoteLoading: false,
		id: properties.lesson.secondOddTeacher.id,
		options: properties.teachers,
	},
	firstEvenTeacherName: {
		remoteLoading: false,
		id: properties.lesson.firstEvenTeacher.id,
		options: properties.teachers,
	},
	secondEvenTeacherName: {
		remoteLoading: false,
		id: properties.lesson.secondEvenTeacher.id,
		options: properties.teachers,
	},
	// кабинеты
	firstOddCabinetName: {
		remoteLoading: false,
		id: properties.lesson.firstOddCabinet.id,
		options: properties.cabinets,
	},
	firstEvenCabinetName: {
		remoteLoading: false,
		id: properties.lesson.firstEvenCabinet.id,
		options: properties.cabinets,
	},
	secondOddCabinetName: {
		remoteLoading: false,
		id: properties.lesson.secondOddCabinet.id,
		options: properties.cabinets,
	},
	secondEvenCabinetName: {
		remoteLoading: false,
		id: properties.lesson.secondOddCabinet.id,
		options: properties.cabinets,
	},
});

const handleLessonSearch = (query: string) => {
	lessonData.evenDisciplineName.options =
		query !== ''
			? properties.disciplines.filter((item) => {
					return item.name?.toLowerCase().includes(query.toLowerCase());
			  })
			: properties.disciplines;
};

const handleTeacherSearch = (query: string) => {
	lessonData.firstEvenTeacherName.options =
		query !== ''
			? properties.teachers.filter((item) => {
					return item.name?.toLowerCase().includes(query.toLowerCase());
			  })
			: properties.teachers;
};

const handleCabinetSearch = (query: string) => {
	lessonData.firstEvenCabinetName.options =
		query !== ''
			? properties.cabinets.filter((item) => {
					return item.name?.toLowerCase().includes(query.toLowerCase());
			  })
			: properties.cabinets;
};

watch(
	() => lessonData,
	(data) => {
		const { id } = properties.lesson;
		const payload = {
			id,
			// дисциплины
			oddDiscipline_id: data.oddDisciplineName.id,
			evenDiscipline_id: data.evenDisciplineName.id,
			// преподаватели
			firstOddTeacher_id: data.firstOddTeacherName.id,
			secondOddTeacher_id: data.secondOddTeacherName.id,
			firstEvenTeacher_id: data.firstEvenTeacherName.id,
			secondEvenTeacher_id: data.secondEvenTeacherName.id,
			// кабинеты
			firstOddCabinet_id: data.firstOddCabinetName.id,
			secondOddCabinet_id: data.secondOddCabinetName.id,
			firstEvenCabinet_id: data.firstEvenCabinetName.id,
			secondEvenCabinet_id: data.secondEvenCabinetName.id,
		};
		emit('updateLesson', id, payload);
	},
	{
		deep: true,
	},
);
</script>
<style>
.lesson {
	display: grid;
	grid-template-columns: 1fr 1fr;

	padding: 1rem;

	column-gap: 20px;
}

.lesson:nth-child(even) {
	background-color: hsl(0, 0%, 90%);
}

@media screen and (min-width: 520px) {
	.lesson {
		display: grid;
		grid-template-columns: repeat(2, 210px);

		column-gap: 20px;
	}
}

@media screen and (min-width: 870px) {
	.lesson {
		grid-template-columns: 1fr;

		column-gap: 20px;
	}
}

.lesson__number {
	grid-column: 1 / -1;

	margin: 0 0 5px;
}

.lesson__titles {
	display: none;
}

@media screen and (min-width: 870px) {
	.lesson__titles {
		margin-bottom: 10px;
	}
}

.lesson__even-info,
.lesson__odd-info {
	display: grid;
	align-items: flex-start;
	row-gap: 20px;
}

@media screen and (min-width: 870px) {
	.lesson__titles,
	.lesson__even-info,
	.lesson__odd-info {
		display: grid;
		grid-template-columns: 10px 210px 150px 90px 150px 90px;

		column-gap: 20px;
	}
}

@media screen and (min-width: 870px) {
	.lesson__odd-info {
		margin-bottom: 20px;
	}
}

.lesson__title {
	margin: 0;
}

.lesson__even-name,
.lesson__odd-name {
	margin: 0;
	padding: 0.4em;
}

@media screen and (min-width: 870px) {
	.lesson__even-name,
	.lesson__odd-name {
		display: none;
	}
}

.lesson__odd-info-line-name,
.lesson__even-info-line-name {
	align-self: center;
}

@media screen and (max-width: 869px) {
	.lesson__odd-info-line-name,
	.lesson__even-info-line-name {
		display: none;
	}
}
</style>
