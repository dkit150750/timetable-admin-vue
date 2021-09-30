<template>
	<ContentWrapper title="Группы">
		<q-form ref="form" class="add-form data__add-item" :model="formModel" @submit.prevent="handleSubmitClick()">
			<q-form-item label="Название" prop="name" :class="{ 'q-form-item_is-error': errors.name.active }">
				<q-input id="name" v-model="formModel.name" type="text" @keyup.enter="handleSubmitClick()" />
				<div v-if="errors.name.active" class="q-form-item__error">{{ errors.name.message }}</div>
			</q-form-item>
			<q-form-item label="Курс" prop="course" :class="{ 'q-form-item_is-error': errors.course.active }">
				<q-input id="course" v-model="formModel.course" type="number" @keyup.enter="handleSubmitClick()" />
				<div v-if="errors.course.active" class="q-form-item__error">{{ errors.course.message }}</div>
			</q-form-item>
			<div class="q-form__footer">
				<q-button @click="handleSubmitClick()">Добавить</q-button>
			</div>
		</q-form>

		<div class="groups__course-list">
			<div class="groups__course">
				<h2 class="groups__course-title">1 Курс</h2>
				<ul v-if="groupsData[0].length > 0" class="groups__list">
					<li v-for="group in groupsData[0]" :key="group.id" class="groups__item">
						<router-link class="q-link q-link--secondary" :to="'/groups/' + group.slug">
							<span class="groups__link-span q-button__inner">{{ group.name }}</span>
						</router-link>
					</li>
				</ul>
				<p v-else class="not-group">Нет групп</p>
			</div>
			<div class="groups__course">
				<h2 class="groups__course-title">2 Курс</h2>
				<ul v-if="groupsData[1].length > 0" class="groups__list">
					<li v-for="group in groupsData[1]" :key="group.id" class="groups__item">
						<router-link class="q-link q-link--secondary" :to="'/groups/' + group.slug">
							<span class="groups__link-span q-button__inner">{{ group.name }}</span>
						</router-link>
					</li>
				</ul>
				<p v-else class="not-group">Нет групп</p>
			</div>
			<div class="groups__course">
				<h2 class="groups__course-title">3 Курс</h2>
				<ul v-if="groupsData[2].length > 0" class="groups__list">
					<li v-for="group in groupsData[2]" :key="group.id" class="groups__item">
						<router-link class="q-link q-link--secondary" :to="'/groups/' + group.slug">
							<span class="groups__link-span q-button__inner">{{ group.name }}</span>
						</router-link>
					</li>
				</ul>
				<p v-else class="not-group">Нет групп</p>
			</div>
			<div class="groups__course">
				<h2 class="groups__course-title">4 Курс</h2>
				<ul v-if="groupsData[3].length > 0" class="groups__list">
					<li v-for="group in groupsData[3]" :key="group.id" class="groups__item">
						<router-link class="q-link q-link--secondary" :to="'/groups/' + group.slug">
							<span class="groups__link-span q-button__inner">{{ group.name }}</span>
						</router-link>
					</li>
				</ul>
				<p v-else class="not-group">Нет групп</p>
			</div>
		</div>
	</ContentWrapper>
</template>

<script setup lang="ts">
import { useUserStore } from '~/stores/user';
import AuthService from '~/services/AuthService';
import GroupService from '~/services/GroupService';
import GroupInfo from '~/types/GroupInfo';

const userStore = useUserStore();
const router = useRouter();
const exitIfError = (error: any) => {
	if (error.response && [401, 419, 429, 500].includes(error.response.status)) {
		userStore.logout();
		AuthService.logout();
		router.push('/error');
	}
};

const formModel = reactive<{ name: string; course: string }>({ name: '4-П-1', course: '4' });
const groupsData: [GroupInfo[], GroupInfo[], GroupInfo[], GroupInfo[]] = reactive([[], [], [], []]);

const getGroups = async () => {
	try {
		const response = await GroupService.getItems();
		const groups = response.data.data;

		groupsData[0] = groups.filter(({ course }) => course === 1);
		groupsData[1] = groups.filter(({ course }) => course === 2);
		groupsData[2] = groups.filter(({ course }) => course === 3);
		groupsData[3] = groups.filter(({ course }) => course === 4);
	} catch (error) {
		exitIfError(error);
	}
};

onBeforeMount(async () => {
	await getGroups();
});

const errors = reactive({
	name: { active: false, message: '' },
	course: { active: false, message: '' },
});

const validate = () => {
	errors.name.active = false;
	if (formModel.name === '') {
		errors.name.message = 'Заполните поле';
		errors.name.active = true;
	}

	errors.course.active = false;
	const course = Number.parseFloat(formModel.course);
	if (course < 1 || course > 4) {
		errors.course.message = 'Заполните поле';
		errors.course.active = true;
	}
	return !(errors.name.active || errors.course.active);
};

const isLoaded = ref(false);

const handleSubmitClick = async (): Promise<void> => {
	isLoaded.value = true;
	if (!validate()) {
		return;
	}
	try {
		const payloag = {
			name: formModel.name,
			course: Number.parseFloat(formModel.course),
		};
		const response = await GroupService.addItem(payloag);
		groupsData[response.data.data.course - 1].unshift(response.data.data);
		formModel.name = '';
		formModel.course = '1';
	} catch (error: any) {
		if (error?.response?.data?.errors?.name) {
			errors.name.message = error?.response?.data?.errors?.name[0] ?? '';
			errors.name.active = !!errors.name.message;
		}
		if (error?.response?.data?.errors?.course) {
			errors.course.message = error?.response?.data?.errors?.course[0] ?? '';
			errors.course.active = !!errors.course.message;
		}
		exitIfError(error);
	}
	isLoaded.value = false;
};
</script>

<style>
.add-form {
	max-width: 320px;
}

@media screen and (min-width: 700px) {
	.data__add-item {
		order: 2;
	}
}

.groups__course-list {
	display: grid;
	gap: 2em;
}

.groups__course {
	display: grid;
	gap: 1em;
}

.groups__course-title {
	margin: 0;
}

.groups__list {
	display: flex;
	flex-wrap: wrap;
	gap: 1rem;

	margin: 0;
	padding: 0;

	list-style: none;
}

.not-group {
	margin: 0;

	font-weight: 600;
}

.pagination {
	display: flex;
	flex-wrap: wrap;
}
</style>
