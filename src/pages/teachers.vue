<template>
	<ContentWrapper title="Преподаватели">
		<div class="data__add-item">
			<ContentForm label="Имя" :errors="errors" @submitForm="addItemHandler" @blurInput="validate" />
		</div>

		<div class="data-list">
			<div class="data-list__search">
				<ContentSearch :search="searchModel" @searchForm="searchForm" />
			</div>
			<template v-if="data.list.length > 0">
				<ul class="data-list__inner">
					<ContentItem
						v-for="teacher in data.list"
						:id="teacher.id"
						:key="teacher.id"
						:name="teacher.name"
						@changeItem="changeItemHandler"
						@updateItem="updateItemHandler"
						@deleteItem="deleteItemHandler"
					/>
				</ul>
				<q-pagination
					class="data-list__pagination"
					:page-count="lastPage"
					:current-page="currentPage"
					:pager-count="4"
					@current-change="handlePageChange"
				/>
			</template>
		</div>
	</ContentWrapper>
</template>

<script setup lang="ts">
import AuthService from '~/services/AuthService';
import TeacherService from '~/services/TeacherService';
import Item from '~/types/Item';
import { useUserStore } from '~/stores/user';
import { Content } from '~/helpers';

const isLoading = reactive({ status: false });
const userStore = useUserStore();
const router = useRouter();
const exitIfError = (error: any) => {
	if (error.response && [401, 419, 429, 500].includes(error.response.status)) {
		userStore.logout();
		AuthService.logout();
		router.push('/error');
	}
};

const currentPage = ref(1);
const lastPage = ref(1);
const searchModel = ref('');
const data: { list: Item[] } = reactive({ list: [] });

const getData = Content.getDataDecorator(TeacherService, data, lastPage);

onBeforeMount(async () => {
	try {
		await getData();
	} catch (error) {
		exitIfError(error);
	}
});

const errors = reactive({
	name: { active: false, message: '' },
});
const validate = Content.validateDecorator(errors);

const addItem = Content.addItemDecorator(TeacherService, data, validate, errors);
const addItemHandler = async (name: string) => {
	try {
		await addItem(name);
	} catch (error) {
		exitIfError(error);
	}
};

const changeItemHandler = async (id: number, name: string) => {
	const item = data.list.find((element) => element.id === id);
	if (item) {
		item.name = name;
	}
};

const updateItem = Content.updateItemDecorator(TeacherService, data, 1);
const updateItemHandler = async (id: number, name: string) => {
	try {
		await updateItem(id, name);
	} catch (error) {
		exitIfError(error);
	}
};

const searchForm = async (search: string) => {
	try {
		searchModel.value = search;
		await getData(1, search);
	} catch (error) {
		exitIfError(error);
	}
};

const deleteItem = Content.deleteItemDecorator(TeacherService);
const deleteItemHandler = async (id: number) => {
	if (isLoading.status) return;
	isLoading.status = true;
	try {
		await deleteItem(id);
		if (data.list.length === 1 && currentPage.value !== 1) {
			currentPage.value = lastPage.value - 1;
		}
		await getData(currentPage.value, searchModel.value.trim());
	} catch (error) {
		exitIfError(error);
	}
	isLoading.status = false;
};

const handlePageChange = async (value: number) => {
	try {
		currentPage.value = value;
		await getData(value, searchModel.value.trim());
	} catch (error) {
		exitIfError(error);
	}
};
</script>

<style>
@media screen and (min-width: 700px) {
	.data__add-item {
		order: 2;
	}
}

.data-list__search {
	max-width: 240px;
}

.data-list__inner {
	display: grid;
	grid-template-columns: minmax(200px, 300px);
	gap: 20px;

	margin: 0;
	padding: 0;

	list-style: none;
}

.data-list__item {
	display: grid;
	grid-template-columns: 1fr 40px;
	gap: 20px;
}
</style>
