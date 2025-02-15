<template>
  <el-card style="width: 100%">
    <div class="officer">
      <el-avatar shape="square" :size="100" fit="cover" :src="`https://robohash.org/${officer.id}`" />
      <div class="officer__info">
        <h4 class="officer__chief" v-if="props.officer.role.toLowerCase() === 'начальник'">Руководитель подразделения</h4>
        <p class="officer__name">{{ props.officer.firstName }} {{ officer.lastName }}</p>
        <p class="officer__role">{{ capitalize(props.officer.role) }}</p>
        <p class="officer__birthday">
          {{ `${props.officer.birthday.getDate()}`.padStart(2, "0") }}.{{ `${props.officer.birthday.getMonth() + 1}`.padStart(2, "0") }}.{{ props.officer.birthday.getFullYear() }} г.р.
        </p>
        <p class="officer__time">{{ getPeriodInWords(props.officer.startDate, new Date()) }}</p>
      </div>
    </div>
  </el-card>
</template>

<script setup lang="ts">
import { IOfficer } from '@/types';
import { getPeriodInWords } from '@/helpers/datesHelpers';
import { capitalize } from '@/helpers/stringHelpers';

const props = defineProps<{officer: IOfficer}>()
</script>

<style lang="scss" scoped>
.officer {
  display: flex;
  gap: 1em;
}

.officer__info {
  display: grid;
}
</style>