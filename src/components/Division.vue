<template>
	<template v-if="loading">
		<div v-loading="loading" style="width: 100%; height: 80vh">
			
		</div>
	</template>
	<template v-else>
		<h1 class="division__header" v-if="currentDivision">
			{{ currentDivision.name }}
		</h1>
		<h1 v-else>Не найдено такого подразделения</h1>

		<h6 class="division__header" v-if="currentDivisionFullName">
			<template v-for="(w, i) in currentDivisionFullName">
				<span v-if="i > 0">{{ w }}</span>
				<span v-if="i > 0 && i < currentDivisionFullName.length - 2">&nbsp; | &nbsp;</span>
			</template>
		</h6>

		<div class="division__summary">
			<div class="division__chief">
				<Officer v-if="divisionChief" :officer="divisionChief" />
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
					</div>
				</el-card>
			</div>
		</div>

		<el-divider />

		<ul class="division__staff">
			<li v-for="officer in divisionStaff.filter((o) => o.role.toLowerCase() !== 'начальник')" :key="officer.id + officer.lastName" class="staff__officer">
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


// По-хорошему здесь будет useFetch
// Имитация запроса сотрудников с сервера
const data = ref<any>(null)
const loading = ref<boolean>(true)

const fetchData = async () => {
	loading.value = true;

	new Promise((resolve) => {
		setTimeout(() => {
	resolve({ status: 200, message: 'Данные успешно загружены' }); // Имитация ответа от сервера
	}, 1000); // Имитация задержки в 1 секунду
	})
		.then((response) => {
			data.value = response; 
		})
		.finally(() => {
			loading.value = false; 
		});
};

onMounted(fetchData)


const orgStore = useOrgStore()
const { divisions, organization } = storeToRefs(orgStore)
const props = defineProps<{id: number}>()
const staffStore = useStaffStore()
const { staff } = storeToRefs(staffStore)

const divisionChief = ref<IOfficer | undefined>(staff.value.find(officer => officer.divisionID === props.id && officer.role === 'начальник'))
const divisionStaff = ref<IOfficer[]>(staff.value.filter(officer => officer.divisionID === props.id))

const currentDivision = ref<IDivisionRAW | undefined>(divisions.value.find(item => item.id === props.id))
const currentDivisionFullName = computed(() => {
	let name: string[] = [];
	let division = currentDivision.value
	if (division) {
		name.push(division.name)
		while (division?.id !== 0) {
			division = divisions.value.find(div => div.id === division?.parentID)
			if (division) name.push(division.name)
		}
	}
	return name
})

const wholeIDs = computed(() => {
	if (currentDivision.value) {
		let ids: any = orgStore.getAllChildren(organization.value, currentDivision.value.id).map(child => child.id)
		ids.push(currentDivision.value.id)
		return ids
	} else {
		return []
	}
})

const wholeOfficers = computed(() => {
	return staff.value.filter(officer => {
		return wholeIDs.value.indexOf(officer.divisionID) >= 0
	}).length
})


const mediumAge = computed(() => {
	return calculateAverageAge(divisionStaff.value.map(o => o.birthday))
})

const mediumPeriod = computed(() => {
	return calculateAverageAge(divisionStaff.value.map(o => o.startDate))
})

function personsCountPluralize(count: number, words: [string, string, string]): string {
  const cases = [2, 0, 1, 1, 1, 2];
  return words[count % 100 > 4 && count % 100 < 20 ? 2 : cases[Math.min(count % 10, 5)]];
}
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
	border: 1px solid #dfdfdf;
	gap: 0.5em;
	padding: 0.5em;
}

.icon {
	background: linear-gradient(45deg, #0a0a2f, #6876f3);
}
</style>
