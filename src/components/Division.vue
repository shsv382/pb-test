<template>
	<h1>This is an about page</h1>

	<ul class="staff">
		<li v-for="officer in divisionStaff" :key="officer.id + officer.lastName" class="staff__officer">
			<Officer :officer="officer" />
		</li>
	</ul>
</template>

<script setup lang="ts">
import { IOfficer } from '@/types';
import { useStaffStore } from '../store/staffStore';
// import { useOrgStore } from '../store/orgStore';
import { storeToRefs } from 'pinia';
import { ref } from 'vue';
import Officer from './Officer.vue';
import { orderBy } from 'element-plus/es/components/table/src/util';

// const orgStore = useOrgStore()
// const { organization } = storeToRefs(orgStore)
const props = defineProps<{id: number}>()
const staffStore = useStaffStore()
const { staff } = storeToRefs(staffStore)

const divisionStaff = ref<IOfficer[]>(staff.value.filter(officer => officer.divisionID === props.id))
</script>

<style scoped>
.staff {
	padding: 20px 0;
	margin: 0;
	list-style: none;
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
	gap: 20px;
}
</style>
