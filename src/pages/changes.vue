<template>
	<GroupEditWrapper :group-name="titleGroupName" :is-changes="true">
		<template #header>
			<q-form-item class="group-edit__name form-item--no-error" label="Дата" prop="date">
				<q-input id="date" v-model="dateModel.name" class="q-input--max-width" type="text" @blur="updateDate" />
			</q-form-item>
			<q-form-item class="form-item--no-error" label="День недели">
				<q-select v-model="daySelect.id" class="q-input--max-width" :filterable="true" @search="handleDaySearch">
					<q-option v-for="item in daySelect.dayOptions" :key="item.id" :label="item.name" :value="item.id" />
				</q-select>
			</q-form-item>
			<q-form-item v-if="groupSelect.id" class="form-item--no-error" label="Группа">
				<q-select v-model="groupSelect.id" class="q-input--max-width" :filterable="true" @search="handleGroupSearch">
					<q-option
						v-for="groupItem in groupSelect.groupOptions"
						:key="groupItem.id"
						:label="groupItem.name"
						:value="groupItem.id"
					/>
				</q-select>
			</q-form-item>
			<q-form-item class="form-item--no-error" label="Курс">
				<q-select v-model="courseSelect.id" class="q-input--max-width" :filterable="true">
					<q-option v-for="item in courseSelect.courseOptions" :key="item.id" :label="item.name" :value="item.id" />
				</q-select>
			</q-form-item>

			<q-button tyoe="icon" @click="fresh">Сбосить</q-button>
		</template>

		<template #default>
			<GroupEditDay
				v-if="
					changesData && teachersData.list.length > 0 && disciplinesData.list.length > 0 && cabinetsData.list.length > 0
				"
				:day="changesData"
				:teachers="teachersData.list"
				:disciplines="disciplinesData.list"
				:cabinets="cabinetsData.list"
				:changes="true"
				@updateLesson="updateLesson"
			/>
		</template>
	</GroupEditWrapper>
</template>

<script setup lang="ts">
import AuthService from '~/services/AuthService';
import GroupService from '~/services/GroupService';
import TeacherService from '~/services/TeacherService';
import DisciplineService from '~/services/DisciplineService';
import CabinetService from '~/services/CabinetService';
import DateService from '~/services/DateService';
import ChangeService from '~/services/ChangeService';
import Group from '~/types/Group';
import GroupInfo from '~/types/GroupInfo';
import Item from '~/types/Item';
import { useUserStore } from '~/stores/user';

const userStore = useUserStore();
const router = useRouter();
const exitIfError = (error: any) => {
	if (error.response && [401, 419, 429, 500].includes(error.response.status)) {
		userStore.logout();
		AuthService.logout();
		router.push('/error');
		localStorage.removeItem('user-token');
		localStorage.removeItem('user');
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
const daySelect = reactive({
	id: new Date().getDay() + 1 >= 5 ? 1 : new Date().getDay() + 1,
	dayOptions,
});
const courseSelect = reactive({ id: 1, courseOptions });
const groupSelect: { id: number | null; groupOptions: GroupInfo[] } = reactive({ id: null, groupOptions: [] });
const dayName = computed(() => daySelect.dayOptions.find((item) => item.id === daySelect.id)?.name);
const groupSlug = computed(() => groupSelect.groupOptions.find((item) => item.id === groupSelect.id)?.slug);

const teachersData: { list: Item[] } = reactive({ list: [] });
const disciplinesData: { list: Item[] } = reactive({ list: [] });
const cabinetsData: { list: Item[] } = reactive({ list: [] });

const dateModel = reactive({ name: '' });
const groupsData: { list: GroupInfo[] } = reactive({ list: [] });
const groupData: { data: Group | null } = reactive({ data: null });
const changesData = computed(() =>
	groupData.data ? { id: groupData.data.id, name: '', lessons: groupData.data.changes } : null,
);
const titleGroupName = computed(() =>
	groupsData.list.length > 0 ? groupsData.list.find((item) => item.id === groupSelect.id)?.name : '',
);

const getDate = async () => {
	try {
		const response = await DateService.getItem();
		dateModel.name = response.data.data.name;
	} catch (error) {
		exitIfError(error);
	}
};

const getGroup = async (slug: string) => {
	try {
		groupData.data = null;
		const response = await GroupService.getItem(slug);
		groupData.data = response.data.data;
	} catch (error) {
		exitIfError(error);
	}
};

const getGroups = async () => {
	try {
		groupSelect.id = null;
		const respone = await GroupService.getCourseItems(courseSelect.id);
		groupsData.list = respone.data.data;
		if (groupsData.list.length > 0) {
			groupSelect.id = groupsData.list[0].id;
			groupSelect.groupOptions = groupsData.list;
		} else {
			groupSelect.groupOptions = [];
			groupData.data = null;
		}
	} catch (error) {
		exitIfError(error);
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
	getDate();
	getGroups();
	getTeachers();
	getDisciplines();
	getCabinets();
});

const updateDate = async () => {
	try {
		await DateService.updateItem({ name: dateModel.name });
	} catch (error) {
		exitIfError(error);
	}
};

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

const updateLesson = async (id: number, payload: Peyload) => {
	try {
		ChangeService.updateItem(id, payload);
	} catch (error) {
		exitIfError(error);
	}
};

const isLoaded = ref(false);
const fresh = async () => {
	if (isLoaded.value) return;
	isLoaded.value = true;
	try {
		if (typeof dayName.value === 'string') {
			await GroupService.fresh(dayName.value);
			if (typeof groupSlug.value === 'string') {
				getGroup(groupSlug.value);
			}
		}
	} catch (error) {
		exitIfError(error);
	}
	isLoaded.value = false;
};

watch(
	() => courseSelect.id,
	() => {
		getGroups();
	},
);

watch(
	() => groupSlug.value,
	(slug) => {
		if (typeof slug === 'string') {
			getGroup(slug);
		}
	},
);

const handleDaySearch = (query: string) => {
	daySelect.dayOptions =
		query !== ''
			? dayOptions.filter((item) => {
					return item.name?.toLowerCase().includes(query.toLowerCase());
			  })
			: dayOptions;
};

const handleGroupSearch = (query: string) => {
	groupSelect.groupOptions =
		query !== ''
			? groupsData.list.filter((item) => {
					return item.name?.toLowerCase().includes(query.toLowerCase());
			  })
			: groupsData.list;
};
</script>

<style>
.group-edit__name {
	max-width: 200px;
}

.q-input--max-width {
	min-width: 100px;
	max-width: 140px;
}
</style>
