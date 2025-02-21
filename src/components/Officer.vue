<template>
  <el-card style="width: 100%; position: relative">
    <div class="officer">
      <el-avatar shape="square" :size="100" fit="cover" :src="`https://robohash.org/${officer.id}`" />
      <div class="officer__info">
        <p class="officer__name">{{ props.officer.firstName }} {{ props.officer.lastName }}</p>
        <p class="officer__role">{{ capitalize(officer.role) }}</p>
        <p class="officer__birthday">
          {{ `${new Date(props.officer.birthday).getDate()}`.padStart(2, "0") }}.{{ `${new Date(props.officer.birthday).getMonth() + 1}`.padStart(2, "0") }}.{{ new Date(props.officer.birthday).getFullYear() }} г.р.
        </p>
        <p class="officer__time">{{ getPeriodInWords(new Date(props.officer.startDate), new Date()) }}</p>
      </div>
    </div>
    <i class="icon-edit edit" @click="openDialog" />
  </el-card>
  <UserEditDialog
    :visible="dialogVisible"
    @update:visible="dialogVisible = $event"
    :officer="props.officer"
    @save="getCurrentDivisionStaff(props.officer.divisionID)"
  />
</template>

<script setup lang="ts">
import { IOfficer } from '@/types';
import { getPeriodInWords } from '@/helpers/datesHelpers';
import { capitalize } from '@/helpers/stringHelpers';
import UserEditDialog from './UserEditDialog.vue';
import { ref } from 'vue';
import { useStaffStore } from '../store/staffStore';

const { getCurrentDivisionStaff } = useStaffStore()

const props = defineProps<{officer: IOfficer}>()

const dialogVisible = ref(false);

const openDialog = () => {
  dialogVisible.value = true;
};

const closeDialog = () => {
  dialogVisible.value = false;
};

</script>

<style lang="scss" scoped>
@use "../styles/icons";

.officer {
  display: flex;
  gap: 1em;
}

.officer__info {
  display: grid;
}

.edit {
  position: absolute;
  bottom: 1em;
  right: 1em;
	background: linear-gradient(45deg, #0a0a2f, #6876f3);
  &:hover {
    cursor: pointer;
  }
}
</style>