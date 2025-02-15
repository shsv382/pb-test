<template>
	<h1>This is an about page</h1>

	<ul class="staff">
		<li v-for="officer in divisionStaff" :key="officer.id + officer.lastName" class="officer">
			{{ officer.firstName }} {{ officer.lastName }}
		</li>
	</ul>
</template>

<script setup lang="ts">
import { Officer } from '@/types';
import { useStaffStore } from '../store/staffStore';
// import { useOrgStore } from '../store/orgStore';
import { storeToRefs } from 'pinia';
import { ref } from 'vue';

// const orgStore = useOrgStore()
// const { organization } = storeToRefs(orgStore)
const props = defineProps<{id: number}>()
const staffStore = useStaffStore()
const { staff } = storeToRefs(staffStore)

const divisionStaff = ref<Officer[]>(staff.value.filter(officer => officer.divisionID === props.id))
</script>

<style scoped></style>
