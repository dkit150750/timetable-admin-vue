<template>
	<GroupEditWrapper :group-name="groupModel.name">
		<template #header>
			<q-form-item
				class="group-edit__name"
				label="Название"
				prop="name"
				:class="{ 'q-form-item_is-error': errors.name.active }"
			>
				<q-input id="name" v-model="groupModel.name" type="text" @blur="updateGroupInfo('name')" />
				<div v-if="errors.name.active" class="q-form-item__error">{{ errors.name.message }}</div>
			</q-form-item>
			<q-form-item label="Курс">
				<q-select v-model="courseSelect.id" class="q-input--max-width" :filterable="true">
					<q-option v-for="item in courseSelect.courseOptions" :key="item.id" :label="item.name" :value="item.id" />
				</q-select>
			</q-form-item>
			<q-form-item label="День недели">
				<q-select v-model="daySelect.id" class="q-input--max-width" :filterable="true">
					<q-option v-for="item in daySelect.dayOptions" :key="item.id" :label="item.name" :value="item.id" />
				</q-select>
			</q-form-item>
			<q-button class="group-delete" type="icon" @click="deleteHandler">
				<ic:baseline-close />
			</q-button>
		</template>

		<template #default>
			<GroupEditDay
				v-if="
					daysData && teachersData.list.length > 0 && disciplinesData.list.length > 0 && cabinetsData.list.length > 0
				"
				:day="daysData"
				:teachers="teachersData.list"
				:disciplines="disciplinesData.list"
				:cabinets="cabinetsData.list"
				@updateLesson="updateLesson"
			/>
		</template>
	</GroupEditWrapper>
</template>

<script setup lang="ts">
import { useUserStore } from '~/stores/user';
import AuthService from '~/services/AuthService';
import GroupService from '~/services/GroupService';
import TeacherService from '~/services/TeacherService';
import DisciplineService from '~/services/DisciplineService';
import CabinetService from '~/services/CabinetService';
import LessonService from '~/services/LessonService';
import Group from '~/types/Group';
import Item from '~/types/Item';
import LessonInfo from '~/types/LessonInfo';

const userStore = useUserStore();
const router = useRouter();
const exitIfError = (error: any) => {
	if (error.response && [401, 419, 429, 500].includes(error.response.status)) {
		userStore.logout();
		AuthService.logout();
		router.push('/error');
	}
};

const dayOptions = [
	{ id: 1, name: 'Понедельник' },
	{ id: 2, name: 'Вторник' },
	{ id: 3, name: 'Среда' },
	{ id: 4, name: 'Четверг' },
	{ id: 5, name: 'Пятница' },
	{ id: 6, name: 'Суббота' },
];
const courseOptions = [
	{ id: 1, name: '1 курс' },
	{ id: 2, name: '2 курс' },
	{ id: 3, name: '3 курс' },
	{ id: 4, name: '4 курс' },
];
const daySelect = reactive({ id: 1, dayOptions });
const courseSelect = reactive({ id: 0, courseOptions });

const teachersData: { list: Item[] } = reactive({ list: [] });
const disciplinesData: { list: Item[] } = reactive({ list: [] });
const cabinetsData: { list: Item[] } = reactive({ list: [] });

const groupData: { data: Group | null } = reactive({ data: null });
const groupModel = reactive({ name: '' });
const daysData = computed(() => (groupData.data?.days.length ? groupData.data.days[daySelect.id - 1] : null));

const getGroup = async (slug: string) => {
	try {
		const response = await GroupService.getItem(slug);
		groupData.data = response.data.data;

		// eslint-disable-next-line prefer-destructuring
		groupModel.name = response.data.data.name;
		courseSelect.id = response.data.data.course;
	} catch (error) {
		exitIfError(error);
		router.push('/groups');
	}
};

const getTeachers = async () => {
	try {
		const response = await TeacherService.getItems();
		teachersData.list = [...response.data.data];
	} catch (error) {
		exitIfError(error);
	}
};

const getDisciplines = async () => {
	try {
		const response = await DisciplineService.getItems();
		disciplinesData.list = [...response.data.data];
	} catch (error) {
		exitIfError(error);
	}
};

const getCabinets = async () => {
	try {
		const response = await CabinetService.getItems();
		cabinetsData.list = [...response.data.data];
	} catch (error) {
		exitIfError(error);
	}
};

onBeforeMount(async () => {
	const slug: string | string[] = useRoute()?.params?.slug;
	if (typeof slug === 'string') {
		getGroup(slug.trim());
		getTeachers();
		getDisciplines();
		getCabinets();
	}
});

const errors = reactive({
	name: { active: false, message: '' },
});

const validate = () => {
	errors.name.active = false;
	if (groupModel.name === '') {
		errors.name.message = 'Заполните поле';
		errors.name.active = true;
	}
	return !errors.name.active;
};

const updateGroupInfo = async (field: 'name' | 'course') => {
	if (groupData.data?.slug) {
		if (!validate()) {
			return;
		}
		try {
			const payload: { name?: string; course?: number } = {};
			if (field === 'name') {
				payload.name = groupModel.name;
			} else {
				payload.course = courseSelect.id;
			}
			await GroupService.updateItem(groupData.data.id, payload);
		} catch (error: any) {
			if (error?.response?.data?.errors?.name) {
				errors.name.message = error?.response?.data?.errors?.name[0] ?? '';
				errors.name.active = !!errors.name.message;
			}
			exitIfError(error);
		}
	}
};

const deleteHandler = async () => {
	if (groupData.data?.slug) {
		try {
			await GroupService.deleteItem(groupData.data.slug);
			router.push('/groups');
		} catch (error) {
			exitIfError(error);
		}
	}
};

const updateLesson = async (id: number, payload: LessonInfo) => {
	try {
		await LessonService.updateItem(id, payload);
	} catch (error) {
		exitIfError(error);
	}
};

watch(
	() => courseSelect.id,
	(course, previousCourse) => {
		if (previousCourse) updateGroupInfo('course');
	},
);
</script>

<style>
.add-form {
	max-width: 320px;
}

@media (min-width: 700px) {
	.q-input--max-width {
		max-width: 140px;
	}
}
</style>
