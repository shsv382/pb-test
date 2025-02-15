<template>
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
				<p>
					Численность подразделения: {{wholeOfficers}} {{ personsCountPluralize(wholeOfficers, ['человек', 'человека', 'человек']) }}
				</p>
				<p>
					Средний возраст - {{ roundNumber(mediumAge) }} {{ datePluralize(roundNumber(mediumAge), ["год", "года", "лет"]) }}
				</p>
				<p>
					Средний срок службы - {{ roundNumber(mediumPeriod) }} {{ datePluralize(roundNumber(mediumPeriod), ["год", "года", "лет"]) }}
				</p>
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

<script setup lang="ts">
import { IDivision, IDivisionRAW, IOfficer } from '@/types';
import { useStaffStore } from '../store/staffStore';
import { useOrgStore } from '../store/orgStore';
import { storeToRefs } from 'pinia';
import { ref, computed, onMounted } from 'vue';
import Officer from './Officer.vue';
import { calculateAverageAge, datePluralize } from '@/helpers/datesHelpers';
import { roundNumber } from '@/helpers/numberHelpers';

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

<style scoped>
.division__header{
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
</style>
