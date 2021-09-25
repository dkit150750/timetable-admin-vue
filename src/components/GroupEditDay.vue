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
				@updateLesson="updateHanlder"
			/>
		</div>
	</div>
</template>

<script setup lang="ts">
import { PropType } from 'vue';
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

const emit = defineEmits({
	updateLesson: null,
});

type Peyload = {
	id: number;
	oddDiscipline_id: number;
	evenDiscipline_id: number;
	firstOddTeacher_id: number;
	secondOddTeacher_id: number;
	firstEvenTeacher_id: number;
	secondEvenTeacher_id: number;
	firstOddCabinet_id: number;
	secondOddCabinet_id: number;
	firstEvenCabinet_id: number;
	secondEvenCabinet_id: number;
};

const updateHanlder = (id: number, payload: Peyload) => {
	emit('updateLesson', id, payload);
};
</script>

<style>
.day__name {
	margin-top: 0;
}

.day__lessons {
	display: grid;
	gap: 30px;
}
</style>
