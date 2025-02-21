<template>
	<template v-if="currentDivision.loading">
		<div v-loading="currentDivision.loading" style="width: 100%; height: 80vh">
			
		</div>
	</template>
	<template v-else>
		<h1 class="division__header" v-if="currentDivision.data">
			{{ currentDivision.data.name }}
		</h1>
		<h1 v-else>Не найдено такого подразделения</h1>

		<!-- <h6 class="division__header" v-if="currentDivisionFullName">
			<template v-for="(w, i) in currentDivisionFullName">
				<span v-if="i > 0">{{ w }}</span>
				<span v-if="i > 0 && i < currentDivisionFullName.length - 2">&nbsp; | &nbsp;</span>
			</template>
		</h6> -->

		<template v-if="currentDivisionStaff.loading">
			<div v-loading="currentDivisionStaff.loading" style="width: 100%; height: 80vh">
				
			</div>
		</template>
		<div v-else class="division__summary">
			<div v-if="divisionChief" class="division__chief">
				<h2 class="officer__chief">Руководитель подразделения</h2>
				<Officer :officer="divisionChief" />
			</div>
			<div class="division__stats">
				<el-card style="width: 100%; height: 100%">
					<div class="division__stats-content">
						<p class="division__stats-unit">
							<i class="icon-user-square icon" />
							Численность подразделения: {{wholeOfficers}} {{ personsCountPluralize(wholeOfficers, ['человек', 'человека', 'человек']) }}
						</p>
						<p class="division__stats-unit">
							<i class="icon-calendar icon" />
							Средний возраст - {{ roundNumber(mediumAge) }} {{ datePluralize(roundNumber(mediumAge), ["год", "года", "лет"]) }}
						</p>
						<p class="division__stats-unit">
							<i class="icon-clock icon" />
							Средний срок службы - {{ roundNumber(mediumPeriod) }} {{ datePluralize(roundNumber(mediumPeriod), ["год", "года", "лет"]) }}
						</p>
						<p class="division__stats-unit">
							<el-button type="primary" plain style="width: 100%" @click="openDialog">Добавить сотрудника</el-button>
							<UserEditDialog
								v-if="currentDivision"
								:visible="dialogVisible"
								@update:visible="dialogVisible = $event"
								@save="handleSave"
							/>
						</p>
					</div>
				</el-card>
			</div>
		</div>

		<el-divider />

		<template v-if="currentDivisionStaff.loading">
			<div v-loading="currentDivisionStaff.loading" style="width: 100%; height: 300px">
				
			</div>
		</template>
		<ul class="division__staff" v-else>
			<li v-for="officer in currentDivisionStaff.data.filter(officer => officer.id !== divisionChief?.id && officer.divisionID === props.id)" :key="officer.id + officer.lastName" class="staff__officer">
				<Officer :officer="officer" />
			</li>
		</ul>
	</template>
</template>

<script setup lang="ts">
import { IDivision, IDivisionRAW, IOfficer } from '@/types';
import { useStaffStore } from '../store/staffStore';
import { useOrgStore } from '../store/orgStore';
import { storeToRefs } from 'pinia';
import { ref, computed, onMounted } from 'vue';
import Officer from './Officer.vue';
import { calculateAverageAge, datePluralize } from '@/helpers/datesHelpers';
import { roundNumber } from '@/helpers/numberHelpers';
import UserEditDialog from './UserEditDialog.vue';

const orgStore = useOrgStore()
const { organization, currentDivision } = storeToRefs(orgStore)
const props = defineProps<{id: number}>()
const staffStore = useStaffStore()
const { staff, currentDivisionStaff } = storeToRefs(staffStore)

const divisionChief = computed<IOfficer | undefined>(() => 
	(currentDivisionStaff.value.data.find(officer => officer.divisionID == props.id && officer.role === 'начальник'))
)

const wholeOfficers = computed(() => currentDivisionStaff.value.data.length)
const mediumAge = computed(() => {
	return calculateAverageAge(currentDivisionStaff.value.data?.map(o => o.birthday))
})

const mediumPeriod = computed(() => {
	return calculateAverageAge(currentDivisionStaff.value.data?.map(o => o.startDate))
})

function personsCountPluralize(count: number, words: [string, string, string]): string {
  const cases = [2, 0, 1, 1, 1, 2];
  return words[count % 100 > 4 && count % 100 < 20 ? 2 : cases[Math.min(count % 10, 5)]];
}

const dialogVisible = ref(false);

const openDialog = () => {
  dialogVisible.value = true;
};

const closeDialog = () => {
  dialogVisible.value = false;
};

const handleSave = () => {
	closeDialog();
	staffStore.getCurrentDivisionStaff(currentDivision?.value.data?.id || 0);
}

onMounted(async () => {
	await orgStore.getCurrentDivision(props.id)
	await staffStore.getCurrentDivisionStaff(props.id)
})
</script>

<style lang="scss" scoped>
@use "../styles/icons";

.division__header {
	display: flex;
	flex-wrap: wrap;
	margin-bottom: 1em;
}

.division__summary, .division__staff {
	padding: 20px 0;
	margin: 0;
	list-style: none;
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
	gap: 20px;
}

.division__chief {
	display: flex;
	flex-direction: column;
	gap: 1em;
}

.division__stats-content {
	height: 100%;
	gap: 0.5em;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
}

.division__stats-unit {
	display: flex;
	align-items: center;
	border-bottom: 1px solid #dfdfdf;
	gap: 0.5em;
	padding: 0.5em;
	&:last-child {
		border-bottom: none;
	}
}

.icon {
	background: linear-gradient(45deg, #0a0a2f, #6876f3);
}
</style>
