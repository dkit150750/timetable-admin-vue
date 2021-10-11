<template>
	<div class="day">
		<h2 class="day__name">{{ day.name }}</h2>
		<div class="day__lessons">
			<GroupEditDayLesson
				v-for="(lesson, index) in day.lessons"
				:key="lesson.id"
				:index="index"
				:lesson="lesson"
				:teachers="teachers"
				:disciplines="disciplines"
				:cabinets="cabinets"
				@updateLesson="updateLessonHanlder"
			/>
		</div>
	</div>
</template>

<script setup lang="ts">
import { PropType } from 'vue';
import Lesson from '~/types/Lesson';
import LessonInfo from '~/types/LessonInfo';
import Item from '~/types/Item';

defineProps({
	day: {
		type: Object,
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
	(event: 'updateLesson', id: number, payloadIds: LessonInfo, payloadData: Lesson): void;
}>();

const updateLessonHanlder = (id: number, payloadIds: LessonInfo, payloadData: Lesson) => {
	emit('updateLesson', id, payloadIds, payloadData);
};
</script>

<style>
.day__name {
	margin-top: 0;
	padding: 0 1rem;
}

@media screen and (min-width: 450px) {
	.day__name {
		padding: 0 2rem;
	}
}

.day__lessons {
	display: grid;
	gap: 10px;
}

@media screen and (min-width: 520px) {
	.day__lessons {
		justify-content: start;

		padding: 1rem;
	}
}
</style>
