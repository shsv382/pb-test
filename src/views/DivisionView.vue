<template>
  <div class="division-page">
    <Division :id="id" :key="id" />
  </div>
</template>

<script setup lang="ts">
import { ref, watchEffect } from 'vue';
import Division from '@/components/Division.vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const id = ref<number>(Number(route.params.id));

watchEffect(() => {
  id.value = Number(route.params.id); // Обновляем userId при изменении параметра маршрута
});
</script>