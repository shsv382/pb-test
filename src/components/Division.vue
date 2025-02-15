<template>
	<h1 class="division__header" v-if="currentDivisionFullName">
		<span v-for="w in currentDivisionFullName">{{ w }}</span>
	</h1>
	<h1 v-else>Не найдено такого подразделения</h1>

	<ul class="division__staff">
		<li v-for="officer in divisionStaff" :key="officer.id + officer.lastName" class="staff__officer">
			<Officer :officer="officer" />
		</li>
	</ul>
</template>

<script setup lang="ts">
import { IDivision, IDivisionRAW, IOfficer } from '@/types';
import { useStaffStore } from '../store/staffStore';
import { useOrgStore } from '../store/orgStore';
import { storeToRefs } from 'pinia';
import { ref, computed } from 'vue';
import Officer from './Officer.vue';

const orgStore = useOrgStore()
const { divisions } = storeToRefs(orgStore)
const props = defineProps<{id: number}>()
const staffStore = useStaffStore()
const { staff } = storeToRefs(staffStore)

const divisionStaff = ref<IOfficer[]>(staff.value.filter(officer => officer.divisionID === props.id))
const currentDivision = ref<IDivisionRAW | undefined>(divisions.value.find(item => item.id === props.id))
const currentDivisionFullName = computed(() => {
	let name: string[] = [''];
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
</script>

<style scoped>
.division__header{
	display: flex;
	flex-direction: column;
}

.division__staff {
	padding: 20px 0;
	margin: 0;
	list-style: none;
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
	gap: 20px;
}
</style>
