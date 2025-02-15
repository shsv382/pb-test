<template>
  <el-card style="width: 100%; position: relative">
    <div class="officer">
      <el-avatar shape="square" :size="100" fit="cover" :src="`https://robohash.org/${officer.id}`" />
      <div class="officer__info">
        <h4 class="officer__chief" v-if="local_officer.role.toLowerCase() === 'начальник'">Руководитель подразделения</h4>
        <p class="officer__name">{{ local_officer.firstName }} {{ local_officer.lastName }}</p>
        <p class="officer__role">{{ capitalize(officer.role) }}</p>
        <p class="officer__birthday">
          {{ `${props.officer.birthday.getDate()}`.padStart(2, "0") }}.{{ `${props.officer.birthday.getMonth() + 1}`.padStart(2, "0") }}.{{ props.officer.birthday.getFullYear() }} г.р.
        </p>
        <p class="officer__time">{{ getPeriodInWords(local_officer.startDate, new Date()) }}</p>
      </div>
    </div>
    <i class="icon-edit edit" @click="openDialog" />
  </el-card>
  <UserEditDialog
      :visible="dialogVisible"
      @update:visible="dialogVisible = $event"
      :user="local_officer"
      @save="handleSave"
    />
</template>

<script setup lang="ts">
import { IOfficer } from '@/types';
import { getPeriodInWords } from '@/helpers/datesHelpers';
import { capitalize } from '@/helpers/stringHelpers';
import UserEditDialog from './UserEditDialog.vue';
import { ref } from 'vue';

const props = defineProps<{officer: IOfficer}>()

const local_officer = ref<IOfficer>(props.officer)

const dialogVisible = ref(false);

const openDialog = () => {
  dialogVisible.value = true;
};

const closeDialog = () => {
  dialogVisible.value = true;
};

const handleSave = (updatedUser: any) => {
  local_officer.value = {
    ...local_officer.value,
    firstName: updatedUser.firstName,
    lastName: updatedUser.lastName,
    role: updatedUser.role,
	  birthday: new Date(updatedUser.birthday)
  }

  closeDialog()
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