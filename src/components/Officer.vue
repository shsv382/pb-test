<template>
  <el-card style="width: 100%">
    <div class="officer">
      <el-avatar shape="square" :size="100" fit="cover" :src="`https://robohash.org/${officer.id}`" />
      <div class="officer__info">
        <span>{{ props.officer.firstName }} {{ officer.lastName }}</span>
      </div>
    </div>
  </el-card>
</template>

<script setup lang="ts">
import { IOfficer } from '@/types';

const props = defineProps<{officer: IOfficer}>()
</script>

<style lang="scss" scoped>
.officer {
  display: flex;
  gap: 1em;
}

.officer__info {
  display: grid;
  place-items: center;
}
</style>