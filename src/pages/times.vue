<template>
	<ContentWrapper title="Расписание занятий">
		<div class="time-lists">
			<div class="time-list-wrapper">
				<h2 class="time-list-title">Основное</h2>
				<div class="time-list">
					<q-form-item class="time-list__item" label="Первый" prop="first">
						<q-input id="first" v-model="timeData.data.first" type="text" @blur="updateTime()" />
					</q-form-item>
					<q-form-item class="time-list__item" label="Второй" prop="second">
						<q-input id="second" v-model="timeData.data.second" type="text" @blur="updateTime()" />
					</q-form-item>
					<q-form-item class="time-list__item" label="Третий" prop="third">
						<q-input id="third" v-model="timeData.data.third" type="text" @blur="updateTime()" />
					</q-form-item>
					<q-form-item class="time-list__item" label="Четвертый" prop="fourth">
						<q-input id="fourth" v-model="timeData.data.fourth" type="text" @blur="updateTime()" />
					</q-form-item>
					<q-form-item class="time-list__item" label="Пятый" prop="fifth">
						<q-input id="fifth" v-model="timeData.data.fifth" type="text" @blur="updateTime()" />
					</q-form-item>
				</div>
			</div>
			<div class="time-list-wrapper">
				<h2 class="time-list-title">Изменения</h2>
				<div class="time-list">
					<q-form-item class="time-list__item" label="Первый" prop="firstChanges">
						<q-input id="firstChanges" v-model="timeChangeData.data.first" type="text" @blur="updateChangeTime()" />
					</q-form-item>
					<q-form-item class="time-list__item" label="Второй" prop="secondChanges">
						<q-input id="secondChanges" v-model="timeChangeData.data.second" type="text" @blur="updateChangeTime()" />
					</q-form-item>
					<q-form-item class="time-list__item" label="Третий" prop="thirdChanges">
						<q-input id="thirdChanges" v-model="timeChangeData.data.third" type="text" @blur="updateChangeTime()" />
					</q-form-item>
					<q-form-item class="time-list__item" label="Четвертый" prop="fourthChanges">
						<q-input id="fourthChanges" v-model="timeChangeData.data.fourth" type="text" @blur="updateChangeTime()" />
					</q-form-item>
					<q-form-item class="time-list__item" label="Пятый" prop="fifthChanges">
						<q-input id="fifthChanges" v-model="timeChangeData.data.fifth" type="text" @blur="updateChangeTime()" />
					</q-form-item>
				</div>
			</div>
		</div>
	</ContentWrapper>
</template>

<script setup lang="ts">
import { useUserStore } from '~/stores/user';
import ChangeTimeService from '~/services/ChangeTimeService';
import TimeService from '~/services/TimeService';
import AuthService from '~/services/AuthService';

const userStore = useUserStore();
const router = useRouter();
const exitIfError = (error: any) => {
	if (error.response && [401, 419, 429, 500].includes(error.response.status)) {
		userStore.logout();
		AuthService.logout();
		router.push('/error');
	}
};

const timeData = reactive({ data: { fifth: '', first: '', fourth: '', second: '', third: '' } });
const timeChangeData = reactive({ data: { fifth: '', first: '', fourth: '', second: '', third: '' } });

const getChangeTime = async () => {
	try {
		const response = await ChangeTimeService.getItem();
		timeChangeData.data = response.data.data;
	} catch (error) {
		exitIfError(error);
	}
};

const getTime = async () => {
	try {
		const response = await TimeService.getItem();
		timeData.data = response.data.data;
	} catch (error) {
		exitIfError(error);
	}
};

onBeforeMount(async () => {
	getChangeTime();
	getTime();
});

const updateTime = async () => {
	try {
		await TimeService.updateItem(timeData.data);
	} catch (error) {
		exitIfError(error);
	}
};

const updateChangeTime = async () => {
	try {
		await ChangeTimeService.updateItem(timeChangeData.data);
	} catch (error) {
		exitIfError(error);
	}
};
</script>

<style>
.time-list-wrapper {
	display: grid;
	gap: 10px;
}

.time-list-title {
	margin: 0;

	font-size: 1.2em;
}
.time-lists {
	display: flex;
	gap: 30px;
}

.time-list__item {
	max-width: 130px;
}
</style>
